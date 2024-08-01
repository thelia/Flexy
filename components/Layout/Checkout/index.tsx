import messages, { locale } from '@utils/intl';
import Checkout from './Checkout';
import { IntlProvider } from 'react-intl';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@openstudio/thelia-api-utils';
import { createRoot } from 'react-dom/client';

export default function CheckoutPage() {
  const DOMElement = document.getElementById('Checkout');

  if (!DOMElement) return;

  const root = createRoot(DOMElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Checkout />
      </IntlProvider>
    </QueryClientProvider>
  );
}
