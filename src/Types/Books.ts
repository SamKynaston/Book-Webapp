export interface Author {
  name: string;
}

export interface Book {
  key: string;
  title: string;
  cover_id?: number;
  authors?: Author[];
  first_publish_year: number;
}
