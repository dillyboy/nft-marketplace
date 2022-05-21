import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import { useEffect } from 'react';
import axios from 'axios';
import { getAll } from './features/nft/nftSlice';
import { useDispatch } from 'react-redux';
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('https://dillyboy.github.io/nft-marketplace/sample-api.json');
    axios.get('https://dillyboy.github.io/nft-marketplace/sample-api.json')
    // axios.get('/sample-api.json')
      .then(res => {
        dispatch(getAll(res.data));
      }).catch(err => {
      console.error(err);
    })
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
