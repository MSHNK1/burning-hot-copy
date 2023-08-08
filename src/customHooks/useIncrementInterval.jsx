import { useState, useEffect } from 'react';

function useIncrementInterval(initialAmount, incrementValue, intervalDuration) {
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prevAmount) => prevAmount + incrementValue);
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, [initialAmount, incrementValue, intervalDuration]);

  return amount;
}

export default useIncrementInterval;