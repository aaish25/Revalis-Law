import { AppRouter } from './router';
import { Toaster } from "@/components/ui/toaster";
import { ConsultationFeeProvider } from './contexts/ConsultationFeeContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import './App.css';
import './styles/home.css';
import './styles/service-page.css';
import './styles/fraud-investigation.css';

function App() {
  return (
    <SiteSettingsProvider>
      <ConsultationFeeProvider>
        <AppRouter />
        <Toaster />
      </ConsultationFeeProvider>
    </SiteSettingsProvider>
  );
}

export default App;
