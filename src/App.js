import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { useDispatch } from 'react-redux';
import { fetchNts } from './features/nft/nftSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNts())
  }, [dispatch])

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products/:id' element={<Product />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
