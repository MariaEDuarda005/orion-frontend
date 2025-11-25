import { BrowserRouter } from 'react-router-dom'
import Header from './components/header';
import AppRoutes from './router/appRoutes';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main style={{ padding: "1rem 2rem", flex: 1 }}>
        <AppRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App
