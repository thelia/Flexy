export type FilterPillProps = {
  classes?: string;
  value: string | number;
  iconColor?: string;
  customText: string;
  name: string;
  disabled?: boolean;
  inputType?: string;
  onChange?: (obj: { checked: boolean, value: string | number }) => void;
  defaultChecked?: boolean;
};
