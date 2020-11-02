import { useEffect } from 'react';

export default function useInterval(fn: () => void, ms: number) {
  useEffect(() => {
    const interval = setInterval(fn, ms);
    return () => clearInterval(interval);
  }, [fn, ms]);
}
