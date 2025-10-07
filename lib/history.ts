import type { Acronym } from './types/acronym';

const HISTORY_KEY = 'acronym-history';
const MAX_HISTORY = 3;

/**
 * 履歴を取得する
 */
export function getHistory(): Acronym[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('履歴の取得に失敗しました:', error);
    return [];
  }
}

/**
 * 履歴に追加する
 * 最大3件まで保持し、重複は除去
 */
export function addToHistory(acronym: Acronym): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    let history = getHistory();

    // 重複を除去（同じacronymがあれば削除）
    history = history.filter(item => item.acronym !== acronym.acronym);

    // 先頭に追加
    history.unshift(acronym);

    // 最大件数を超えたら削除
    if (history.length > MAX_HISTORY) {
      history = history.slice(0, MAX_HISTORY);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('履歴の保存に失敗しました:', error);
  }
}

/**
 * 履歴をクリアする
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('履歴のクリアに失敗しました:', error);
  }
}
