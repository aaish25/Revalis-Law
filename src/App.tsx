import { AppRouter } from './router';
import { Toaster } from "@/components/ui/toaster";
import { ConsultationFeeProvider } from './contexts/ConsultationFeeContext';
import './App.css';
import './styles/home.css';
import './styles/service-page.css';
import './styles/fraud-investigation.css';

function App() {
  return (
    <ConsultationFeeProvider>
      <AppRouter />
      <Toaster />
    </ConsultationFeeProvider>
  );
}

export default App;
