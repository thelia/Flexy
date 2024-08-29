export type PseSelectorProps = {
  attributes: Attribute[];
  currentCombination?: any;
  setAttributes: React.Dispatch<React.SetStateAction<[] | undefined>>;
};

export type Attribute = {
  id: string;
  title: string;
  values: { id: string; title: string }[];
};

export interface PSE {
  id: number;
  isDefault: boolean;
  isPromo: boolean;
  isNew: boolean;
  ref: string;
  ean: string;
  quantity: number;
  weight: number;
  price: number;
  untaxedPrice: number;
  promoPrice: number;
  promoUntaxedPrice: number;
  combination: [];
  typeDistribution: string | null;
  displayPrice: string;
  isRental: boolean;
}

export interface CurrentCombination {
  [key: string | number]: string | number;
}
