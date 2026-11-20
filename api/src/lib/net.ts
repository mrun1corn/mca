import net from "node:net";
import { Request } from "express";

/** Cloudflare edge ranges (https://www.cloudflare.com/ips/). A stale entry only
 * makes rate limiting stricter, never weaker. */
const CLOUDFLARE_IPV4: Array<[string, number]> = [
  ["173.245.48.0", 20],
  ["103.21.244.0", 22],
  ["103.22.200.0", 22],
  ["103.31.4.0", 22],
  ["141.101.64.0", 18],
  ["108.162.192.0", 18],
  ["190.93.240.0", 20],
  ["188.114.96.0", 20],
  ["197.234.240.0", 22],
  ["198.41.128.0", 17],
  ["162.158.0.0", 15],
  ["104.16.0.0", 13],
  ["104.24.0.0", 14],
  ["172.64.0.0", 13],
  ["131.0.72.0", 22],
];

const CLOUDFLARE_IPV6: Array<[string, number]> = [
  ["2400:cb00::", 32],
  ["2606:4700::", 32],
  ["2803:f800::", 32],
  ["2405:b500::", 32],
  ["2405:8100::", 32],
  ["2a06:98c0::", 29],
  ["2c0f:f248::", 29],
];

function ipv4ToInt(address: string): number {
  const parts = address.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function inIpv4Cidr(address: string, base: string, bits: number): boolean {
  if (!net.isIPv4(address)) return false;
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (ipv4ToInt(address) & mask) === (ipv4ToInt(base) & mask);
}

function expandIpv6(address: string): string[] {
  const [head, tail] = address.toLowerCase().split("::");
  const headParts = head ? head.split(":") : [];
  const tailParts = tail !== undefined ? (tail ? tail.split(":") : []) : [];
  const missing = 8 - headParts.length - tailParts.length;
  const middle = Array.from({ length: Math.max(0, missing) }, () => "0");
  return [...headParts, ...middle, ...tailParts].map((part) => part || "0");
}

function inIpv6Cidr(address: string, base: string, bits: number): boolean {
  if (!net.isIPv6(address)) return false;
  const addr = expandIpv6(address);
  const netParts = expandIpv6(base);
  let remaining = bits;
  for (let i = 0; i < 8 && remaining > 0; i++) {
    const take = Math.min(16, remaining);
    const mask = take === 16 ? 0xffff : (0xffff << (16 - take)) & 0xffff;
    if ((parseInt(addr[i], 16) & mask) !== (parseInt(netParts[i], 16) & mask)) return false;
    remaining -= take;
  }
  return true;
}

function isCloudflareAddress(address: string): boolean {
  const value = address.replace(/^::ffff:/i, "").split("%")[0];
  if (net.isIPv4(value)) {
    return CLOUDFLARE_IPV4.some(([base, bits]) => inIpv4Cidr(value, base, bits));
  }
  return CLOUDFLARE_IPV6.some(([base, bits]) => inIpv6Cidr(value, base, bits));
}

function isPrivateAddress(address: string): boolean {
  const value = address.replace(/^::ffff:/i, "").split("%")[0];
  if (net.isIPv4(value)) {
    const [a, b] = value.split(".").map(Number);
    return (
      a === 127 ||
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254) ||
      a === 0
    );
  }
  const lower = value.toLowerCase();
  return lower === "::1" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80");
}

/**
 * Resolves the client address for rate limiting without trusting arbitrary
 * client-supplied headers.
 *
 * - Direct connections (public socket address) use the socket address, so
 *   `X-Forwarded-For` / `CF-Connecting-IP` sent by the internet are ignored.
 * - When the socket peer is a local reverse proxy, the right-most
 *   `X-Forwarded-For` entry (appended by that proxy) is authoritative.
 * - `CF-Connecting-IP` is honoured only when that authoritative peer is a
 *   Cloudflare edge address, because Cloudflare rewrites the header itself.
 */
export function clientIp(req: Request): string {
  const socketIp = req.socket?.remoteAddress || "";

  // Serverless platforms (Vercel) terminate the connection on our behalf and
  // expose the client through their own headers; there is no socket peer to
  // trust, so opt in explicitly and use the platform-supplied value.
  const platformProxy = process.env.VERCEL === "1" || process.env.TRUST_PROXY_HEADERS === "1";
  if (platformProxy) {
    const realIp = req.headers["x-real-ip"];
    if (typeof realIp === "string" && realIp.trim()) return realIp.trim();
    const forwardedPlatform = req.headers["x-forwarded-for"];
    if (typeof forwardedPlatform === "string" && forwardedPlatform.trim()) {
      const parts = forwardedPlatform.split(",").map((part) => part.trim()).filter(Boolean);
      if (parts.length > 0) return parts[parts.length - 1];
    }
    return socketIp;
  }

  if (!isPrivateAddress(socketIp)) return socketIp;

  const forwarded = req.headers["x-forwarded-for"];
  const proxiedPeer =
    typeof forwarded === "string"
      ? forwarded.split(",").map((part) => part.trim()).filter(Boolean).pop()
      : undefined;

  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim() && isCloudflareAddress(proxiedPeer || socketIp)) {
    return cf.trim();
  }

  return proxiedPeer || socketIp;
}
