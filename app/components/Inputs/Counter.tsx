'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          className="w-10 h-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-600 cursor-pointer transition hover:opacity-80"
          onClick={onReduce}
        >
          <AiOutlineMinus />
        </button>
        <p className="font-light text-xl text-neutral-600">{value}</p>
        <button
          className="w-10 h-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-600 cursor-pointer transition hover:opacity-80"
          onClick={onAdd}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
