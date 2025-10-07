'use client';

import { useState } from 'react';
import type { Acronym } from '@/lib/types/acronym';

interface ResultCardProps {
  result: Acronym;
  onSelect?: (acronym: Acronym) => void;
}

export default function ResultCard({ result, onSelect }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  // コピー機能
  const handleCopy = async () => {
    const text = `${result.acronym}: ${result.fullName}\n${result.description}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // 選択イベントを発火（履歴用）
      onSelect?.(result);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  // 外部検索機能
  const handleExternalSearch = () => {
    const query = encodeURIComponent(`${result.acronym} ${result.fullName} IT`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');

    // 選択イベントを発火（履歴用）
    onSelect?.(result);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* 略語 */}
      <div className="flex items-baseline gap-3 mb-2">
        <h3 className="text-2xl font-bold text-gray-900">{result.acronym}</h3>
        <span className="text-sm text-gray-500">{result.fullNameJa}</span>
      </div>

      {/* 正式名称 */}
      <p className="text-base text-gray-700 mb-2 font-medium">{result.fullName}</p>

      {/* 説明 */}
      <p className="text-sm text-gray-600 mb-3">{result.description}</p>

      {/* 関連語 */}
      {result.related && (
        <p className="text-xs text-gray-500 mb-3">
          関連: <span className="font-medium">{result.related}</span>
        </p>
      )}

      {/* アクションボタン */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleCopy}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                     ${copied
                       ? 'bg-green-500 text-white'
                       : 'bg-blue-500 text-white hover:bg-blue-600'
                     }`}
        >
          {copied ? '✓ コピーしました' : 'コピー'}
        </button>
        <button
          onClick={handleExternalSearch}
          className="flex-1 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md
                     hover:bg-gray-200 transition-colors duration-200"
        >
          検索
        </button>
      </div>
    </div>
  );
}
