export type SearchBarProps = {
  type?: 'classic' | 'white';
  value?: string;
  onSearch?: (query: string) => void;
}
