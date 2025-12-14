import { AppRouter } from './router';
import { Toaster } from "@/components/ui/toaster";
import './App.css';
import './styles/home.css';
import './styles/service-page.css';
import './styles/fraud-investigation.css';

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
