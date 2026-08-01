import { useEffect, useState } from 'react';

interface TimerProps {
  targetSeconds: number;
  resetKey: string;
}

export default function Timer({ targetSeconds, resetKey }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 500);
    return () => clearInterval(id);
  }, [resetKey]);

  const over = elapsed > targetSeconds;
  return (
    <span className={`timer${over ? ' over' : ''}`}>
      {elapsed}s <span style={{ opacity: 0.6 }}>/ 目安{targetSeconds}s</span>
    </span>
  );
}
