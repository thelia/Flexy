import priceFormat from '@utils/priceFormat';

export default function Price({
  price,
  isUntaxed,
  quantity
}: {
  price: number | null;
  isUntaxed?: boolean;
  quantity?: number;
}) {
  return (
    <div className="Price">
      {price ? (
        <>
          <span>{priceFormat(price)}</span>{' '}
          <span>
            {isUntaxed ? 'HT' : 'TTC'}
            {quantity ? ` x ${quantity}` : ''}
          </span>
        </>
      ) : (
        <span>Free</span>
      )}
    </div>
  );
}
