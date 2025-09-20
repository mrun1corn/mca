import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props<T> = {
  items: readonly T[];
  itemHeight: number;
  width?: number | string;
  height: number;
  overscan?: number;
  render: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
};

type Range = { start: number; end: number };

export default function VirtualList<T>({
  items,
  itemHeight,
  width = "100%",
  height,
  overscan = 4,
  render,
  keyExtractor,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [range, setRange] = useState<Range>(() => computeRange(0, height, itemHeight, overscan, items.length));

  const handleScroll = useCallback(() => {
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    setRange(computeRange(scrollTop, height, itemHeight, overscan, items.length));
  }, [height, itemHeight, overscan, items.length]);

  const visibleItems = useMemo(() => items.slice(range.start, range.end), [items, range]);

  useEffect(() => {
    setRange((prev) => {
      const next = computeRange(containerRef.current?.scrollTop ?? 0, height, itemHeight, overscan, items.length);
      if (next.start === prev.start && next.end === prev.end) return prev;
      return next;
    });
  }, [items.length, height, itemHeight, overscan]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{ height, width }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: range.start * itemHeight,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, idx) => {
            const actualIndex = range.start + idx;
            const key = keyExtractor ? keyExtractor(item, actualIndex) : String(actualIndex);
            return (
              <div key={key} style={{ height: itemHeight }} className="px-1 py-1">
                {render(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function computeRange(
  scrollTop: number,
  height: number,
  itemHeight: number,
  overscan: number,
  itemCount: number
): Range {
  const itemsPerViewport = Math.ceil(height / itemHeight);
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(itemCount, start + itemsPerViewport + overscan * 2);
  return { start, end };
}
