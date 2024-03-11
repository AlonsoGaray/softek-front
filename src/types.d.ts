export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

export type ToggleGroupItemType = {
  value: string;
  ariaLabel: string;
  iconSrc: string;
  title: string;
  description: string;
};
