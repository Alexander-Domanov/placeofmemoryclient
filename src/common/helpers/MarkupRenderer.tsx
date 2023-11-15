import { useEffect, useRef } from 'react';

export const MarkupRenderer = ({ markup }: { markup: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = markup;
    }
  }, [markup]);

  return <div ref={containerRef} />;
};
