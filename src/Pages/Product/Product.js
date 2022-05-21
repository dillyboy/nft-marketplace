import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Product.module.scss';
import Carousel from "../../Components/Carousel/Carousel";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useDispatch } from 'react-redux';
import {updateBid} from "../../features/nft/nftSlice";
import { useNavigate } from 'react-router-dom';

const Product = () => {
  let {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nftsFromRedux = useSelector((state) => state.nft.nfts);
  const [nft, setNft] = useState({carouselImages: [], bidPrice: {amount: 0, coin: ''}});
  const [bid, setBid] = useState(0);
  const [bidError, setBidError] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);

  useEffect(() => {
    if (nftsFromRedux.length > 0) {
      const obj = nftsFromRedux.find(nft => nft.id === parseInt(id));
      setNft(obj);
    }
  }, [id, nftsFromRedux])

  const changeUserBid = (amount) => {
    if (!isNaN(parseFloat(amount)) && amount > nft.bidPrice.amount) {
      setBidError(false);
      setBid(amount);
    } else {
      setBidError(true);
    }
  }

  const handleBidClick = () => {
    if (bidError === false && bid > 0) {
      const nftCopy = {...nft, userBid: {amount: bid, coin: nft.bidPrice.coin}}
      dispatch(updateBid(nftCopy));
      navigate(`/`);
    } else {
      setBidError(true);
      setShakeButton(true);
      setTimeout(() => {
        setShakeButton(false);
      }, 500);
    }
  }

  return <div style={{color: 'white'}}>
    <div className={styles.productContainer}>
      <div className={styles.carousel}>
        <Carousel images={nft.carouselImages} />
      </div>
      <div className={styles.details}>
        <h1 className={styles.title + ' animate__animated animate__fadeIn'}>{nft.title}</h1>
        <div className={styles.meta  + ' animate__animated animate__fadeIn'}>
          <span>#{nft.no}</span>
          <span className={styles.time}>2H 40m 30s</span>
        </div>
        <h2 className={styles.detailsLabel  + ' animate__animated animate__fadeIn'}>Details</h2>
        <p className="animate__animated animate__fadeIn">{nft.description}</p>
        <h2 className={styles.detailsLabel  + ' animate__animated animate__fadeIn'}>Current Price</h2>
        <p className={styles.price  + ' animate__animated animate__fadeIn'}>{nft.bidPrice.amount} {nft.bidPrice.coin}</p>
        <div className={styles.inputBid  + ' animate__animated animate__fadeIn'}>
          <Input label="YOUR BID" suffix={nft.bidPrice.coin} type="number" error={bidError} onChange={ev => changeUserBid(ev)}/>
        </div>
        <div className={styles.inputBid + ' ' + (shakeButton ? 'animate__animated  animate__shakeX' : '')}>
          <Button label="Place a bid" onClick={handleBidClick}/>
        </div>

      </div>
    </div>
  </div>
}

export default Product;
