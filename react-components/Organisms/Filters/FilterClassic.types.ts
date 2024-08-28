import { Attribute } from '@react/Layout/PseSelector/PseSelector.types';

export type FilterClassicProps = {
  label: string | null;
  options: Attribute['values'];
  name: string;
  onChange?: (obj: { checked: boolean, value: string | number, name: string }) => void;
  defaultValue?: any;
};
