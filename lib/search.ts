import Fuse from 'fuse.js';
import acronymsData from '@/data/acronyms.json';
import type { Acronym, SearchResult } from './types/acronym';

const acronyms: Acronym[] = acronymsData;

// Fuse.jsの設定
const fuseOptions = {
  keys: [
    { name: 'acronym', weight: 2 },        // 略語を最優先
    { name: 'fullName', weight: 1 },      // 正式名称
    { name: 'description', weight: 0.5 }, // 説明文
    { name: 'related', weight: 0.3 },     // 関連語
  ],
  threshold: 0.4,          // 曖昧さの許容度（0=完全一致、1=何でも）
  distance: 100,           // 文字列の距離
  minMatchCharLength: 1,   // 最小マッチ文字数
  includeScore: true,      // スコアを含める
  shouldSort: true,        // スコア順にソート
};

const fuse = new Fuse(acronyms, fuseOptions);

/**
 * 略語を検索する
 * @param query 検索クエリ
 * @param limit 最大結果数（デフォルト3）
 * @returns 検索結果の配列
 */
export function searchAcronyms(query: string, limit: number = 3): SearchResult[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const results = fuse.search(query, { limit });

  return results.map(result => ({
    ...result.item,
    score: result.score,
  }));
}

/**
 * すべての略語を取得する
 * @returns 略語の配列
 */
export function getAllAcronyms(): Acronym[] {
  return acronyms;
}

/**
 * ランダムな略語を取得する
 * @param count 取得する数
 * @returns ランダムな略語の配列
 */
export function getRandomAcronyms(count: number = 3): Acronym[] {
  const shuffled = [...acronyms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
