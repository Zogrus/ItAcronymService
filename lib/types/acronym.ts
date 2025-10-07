export interface Acronym {
  acronym: string;
  fullName: string;
  fullNameJa: string;
  description: string;
  related: string;
}

export interface SearchResult extends Acronym {
  score?: number;
}
