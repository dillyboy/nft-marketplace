import React from 'react';
import styles from './Home.module.scss';
import Products from '../../Components/Products/Products'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const navigateTo = (id) => {
    navigate(`/products/${id}`);
  }
  return <div className="animate__animated animate__fadeIn">
    <div className={styles.hero}>
      <h1>NFT <br/>Market <br/> Place</h1>
    </div>
    <Products topic="Live Auction" navigate={navigateTo} />
  </div>
}

export default Home;
