// Ensures production safeguards (Secure cookies, strict startup checks) are
// active when the app is started manually via `npm run start:prod`.
process.env.NODE_ENV = process.env.NODE_ENV || "production";
