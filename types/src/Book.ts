export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  key: string;
  title: string;
  cover_id?: number;
  authors: Author[];
  first_publish_year: number;
  isRecommended?: boolean;
}

export interface CreateBookInput {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year: number;
  isRecommended?: boolean;
  authors?: number[];
}
