import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/helpers";

export function CountUp({ target = 10, duration = 2000, start = 0 }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(progress / duration, 1);
      setCount(Math.round(start + (target - start) * increment));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return <span>{formatNumber(count)}</span>;
}
