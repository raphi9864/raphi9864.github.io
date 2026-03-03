export interface StackItem {
  name:  string;
  icon:  string;
  level: number;
}

export interface StackCategory {
  label: string;
  items: StackItem[];
}
