import Checkout from './Checkout';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@openstudio/thelia-api-utils';
import { createRoot } from 'react-dom/client';

export default function CheckoutPage() {
  const DOMElement = document.getElementById('Checkout');

  if (!DOMElement) return;

  const root = createRoot(DOMElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <Checkout />
    </QueryClientProvider>
  );
}
