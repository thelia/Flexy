export type Product = {
  id: number;
  ref: string;
  visible: boolean;
  position: number;
  virtual: boolean;
  productCategories: string[];
  productSaleElements: ProductSaleElement[];
  i18ns: {
    [key: string]: Translation;
  };
  publicUrl: string;
};

export type ProductSaleElement = {
  id: number;
  ref: string;
  quantity: number;
  promo: boolean;
  newness: boolean;
  weight: number;
  isDefault: boolean;
  productPrices: ProductPrice[];
};

export type ProductPrice = {
  currency: string;
  price: number;
  promoPrice: number;
};

export type Translation = {
  title: string;
  chapo: string;
  description: string;
  postscriptum: string;
};

export type Category = {
  id: number;
  parent: number;
  visible: boolean;
  position: number;
  defaultTemplateId: number;
  i18ns: {
    [key: string]: Translation;
  };
  publicUrl: string;
};
