/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import styles from "./Carousel.module.scss";

const Carousel = ({images}) => {
  const [activeImage, setActiveImage] = useState(null);
  const [appearAnimation, setAppearAnimation] = useState(true);

  useEffect(() => {
    setActiveImage(images[0]);

    images.forEach((picture) => {
       new Image().src = process.env.PUBLIC_URL + '/images/'+ picture; // preload images for faster performance
    });

    const timer = setTimeout(() => {
      setAppearAnimation(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [images])

  const nextPrev = (next = true) => {
    const carouselImageIndex = images.indexOf(activeImage);
    const carouselImageFinalIndex = images.length - 1;

    if (next) {
      if (carouselImageIndex === carouselImageFinalIndex) {
        setActiveImage(images[0]);
      } else {
        setActiveImage(images[carouselImageIndex + 1]);
      }
    } else {
      if (carouselImageIndex === 0) {
        setActiveImage(images[carouselImageFinalIndex]);
      } else {
        setActiveImage(images[carouselImageIndex - 1]);
      }
    }

    setAppearAnimation(true);
    setTimeout(() => {
      setAppearAnimation(false);
    }, 500);
  }

  return <>
    {activeImage ? <img src={process.env.PUBLIC_URL + '/images/'+ activeImage} alt="" className={appearAnimation ? 'animate__animated animate__fadeIn' : ''}/> : null}
    <div style={{textAlign: 'right'}} className={styles.controls}>
      <a role="button" className={styles.next} onClick={nextPrev}>NEXT</a>
      /
      <a role="button" className={styles.prev}  onClick={() => nextPrev(false)}>PREV</a>
    </div>
  </>
}

export default Carousel;
