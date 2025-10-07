'use client';

import { useEffect, useRef } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "略語を入力... (例: MVP, API, REST)" }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // 初回レンダリング時にフォーカスを当てる
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-lg
                   focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   transition-all duration-200 shadow-sm hover:border-gray-400
                   placeholder:text-gray-400 placeholder:font-normal placeholder:text-lg"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
