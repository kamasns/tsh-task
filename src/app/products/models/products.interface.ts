export interface IProducts {
  items: IItem[];
  meta: IMeta;
  links: ILinks;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  rating: Rating;
  image: string;
  promo: boolean;
  active: boolean;
}

export interface IMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ILinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export type Rating = 0|1|2|3|4|5;
