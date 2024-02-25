import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employee from './pages/Employee';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Employee} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
