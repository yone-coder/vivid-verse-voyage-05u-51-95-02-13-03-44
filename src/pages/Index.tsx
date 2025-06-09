
import PaytmHome from '@/components/paytm/PaytmHome';
import { LanguageProvider } from '@/context/LanguageContext';

export default function Index() {
  return (
    <LanguageProvider>
      <PaytmHome />
    </LanguageProvider>
  );
}
