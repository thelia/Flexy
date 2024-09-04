export function formatProductsResults(data = [], imageFormat = 'full/!100,') {
  return data.map((product) => formatOneProductResult(product, imageFormat));
}

export function formatOneProductResult(product, imageFormat = 'full/!100,') {
  const defaultPSE =
    product?.productSaleElements?.find((pse) => pse.default) ||
    product?.productSaleElements?.[0];

  return {
    id: product.id,
    pseId: defaultPSE?.id,
    title: product?.i18n?.title,
    description: product?.i18n?.description,
    chapo: product?.i18n?.chapo,
    url: product.url,
    price: defaultPSE.price.taxed,
    promoPrice: defaultPSE.promoPrice.taxed,
    promo: defaultPSE.promo,
    reference: product?.reference,
    quantity: defaultPSE.quantity || 0,
    image: product?.images[0].url
  };
}
