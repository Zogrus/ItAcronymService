'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ResultCard from '@/components/ResultCard';
import { searchAcronyms } from '@/lib/search';
import { getHistory, addToHistory } from '@/lib/history';
import type { Acronym, SearchResult } from '@/lib/types/acronym';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<Acronym[]>([]);

  // 履歴を初期読み込み
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // 検索クエリが変更されたら即座に検索
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = searchAcronyms(query, 3);
    setResults(searchResults);
  }, [query]);

  // 選択時に履歴に追加
  const handleSelect = (acronym: Acronym) => {
    addToHistory(acronym);
    setHistory(getHistory());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            IT略語検索
          </h1>
          <p className="text-gray-600">
            略語を入力すると即座に意味が表示されます
          </p>
        </header>

        {/* 検索バー */}
        <div className="mb-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* 検索結果 */}
        {results.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">検索結果</h2>
            <div className="space-y-4">
              {results.map((result) => (
                <ResultCard
                  key={result.acronym}
                  result={result}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {/* 該当なし */}
        {query.trim() !== '' && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              「{query}」に該当する略語が見つかりませんでした
            </p>
            <p className="text-gray-400 text-sm mt-2">
              別の略語を試してみてください
            </p>
          </div>
        )}

        {/* 履歴 */}
        {history.length > 0 && query.trim() === '' && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">最近参照した略語</h2>
            <div className="space-y-4">
              {history.map((item) => (
                <ResultCard
                  key={item.acronym}
                  result={item}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {/* 初回表示時のガイド */}
        {query.trim() === '' && history.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                使い方
              </h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• 上の検索バーに略語を入力</li>
                <li>• 入力と同時に候補が表示されます</li>
                <li>• 「コピー」で内容をクリップボードへ</li>
                <li>• 「検索」で詳細をGoogle検索</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  例: MVP, API, REST, CI/CD など
                </p>
              </div>
            </div>
          </div>
        )}

        {/* フッター */}
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>IT略語即時参照サービス</p>
          <p className="mt-1">130+ IT用語を収録</p>
        </footer>
      </div>
    </div>
  );
}
