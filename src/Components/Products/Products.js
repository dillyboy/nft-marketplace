import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useSelector } from "react-redux";

const Products = ({topic, navigate}) => {

  const [nfts, setNfts] = useState([]);
  const nftsFromRedux = useSelector((state) => state.nft.nfts);

  useEffect(() => {
    setNfts(nftsFromRedux);
  }, [nftsFromRedux])

  const highlightImage = (nft) => {
    if (nft.hasOwnProperty('userBid')) {
      return { filter: 'contrast(60%)' };
    } else {
      return {};
    }
  }

  return <div className={styles.productsContainer}>
      <h2 className={styles.productHeading}>{topic}</h2>
      <div className={styles.products}>

        {nfts.map(nft => (
          <div key={nft.id} className={styles.product + " animate__animated animate__pulse"} onClick={() => navigate(nft.id)}>
            {nft.userBid?.amount ? (
              <div className={styles.bidPlaced}>
                <p className={styles.label}>Bid Placed</p>
                <p className={styles.amount}>{nft.userBid.amount} {nft.userBid.coin}</p>
              </div>
            ): null}
            <img src={process.env.PUBLIC_URL + '/images/'+nft.image} alt="" style={highlightImage(nft)}/>
            <div className={styles.description}>
              <p className={styles.time}>2H 40M 30S</p>
              <p className={styles.name}>#{nft.no} {nft.title}</p>
            </div>
          </div>
        ))}
      </div>
  </div>

}

export default Products;
