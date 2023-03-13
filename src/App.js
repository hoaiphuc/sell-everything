// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AuthContextProvider } from "./context/AuthContext"

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <AuthContextProvider>
      <Router />

      </AuthContextProvider>
      
    </ThemeProvider>
  );
}
