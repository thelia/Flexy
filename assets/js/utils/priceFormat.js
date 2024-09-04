let fn = null;

export default function priceFormat(
  price,
  options = {
    currency: global.DEFAULT_CURRENCY_CODE || 'EUR'
  }
) {
  const currency = options.currency || global.DEFAULT_CURRENCY_CODE;
  if (typeof price !== 'number' || !currency) return '0 €';

  if (isNaN(price)) return '0 €';

  if (!fn) {
    fn = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    });
  }

  return fn.format(price);
}
