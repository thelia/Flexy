import Checkout from './Checkout';
import { QueryClientProvider } from 'react-query';
import { createRoot } from 'react-dom/client';
import { queryClient } from '../../../assets/js/lib/queryClient';

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
