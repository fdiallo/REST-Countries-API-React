import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './components/Home';
import Details from './components/Details';

/**
 * The main entry of the app
 * Uses Dynamic Routes. Routing is handled by react-router-dom
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Details />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
