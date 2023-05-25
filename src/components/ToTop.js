import React from 'react'
import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

const ToTop = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      scroll.scrollToTop({ duration: 500 });
    };
  return (
    <Wrapper>
<svg onClick={scrollToTop}  className={`scroll-to-top-button${showButton ? ' show' : ''}`} viewBox="0 0 118 121" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1530_518)">
<path d="M32 16C32 11.5817 35.5817 8 40 8H78C82.4183 8 86 11.5817 86 16V57C86 61.4183 82.4183 65 78 65H40C35.5817 65 32 61.4183 32 57V16Z" fill="white"/>
</g>
<path d="M68.6047 41.6189C68.3412 41.873 68.0292 42 67.6688 42C67.309 42 66.9974 41.873 66.7339 41.6189L59.0132 34.1755L51.2661 41.6443C51.0202 41.8814 50.7128 42 50.3439 42C49.975 42 49.6588 41.873 49.3953 41.6189C49.1318 41.3649 49 41.0641 49 40.7166C49 40.3697 49.1318 40.0693 49.3953 39.8152L58.2754 31.2794C58.3808 31.1778 58.4949 31.1057 58.6179 31.063C58.7409 31.021 58.8726 31 59.0132 31C59.1537 31 59.2855 31.021 59.4084 31.063C59.5314 31.1057 59.6456 31.1778 59.751 31.2794L68.6311 39.8406C68.877 40.0778 69 40.3697 69 40.7166C69 41.0641 68.8682 41.3649 68.6047 41.6189Z" fill="#000B28"/>
<defs>
<filter id="filter0_d_1530_518" x="0" y="0" width="118" height="121" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="24"/>
<feGaussianBlur stdDeviation="16"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.0431373 0 0 0 0 0.156863 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1530_518"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1530_518" result="shape"/>
</filter>
</defs>
</svg>

    </Wrapper>
   
  )
}
const Wrapper = styled.div`
/* src/components/ScrollToTopButton.css */

.scroll-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
  font-size: 30px;
}

.scroll-to-top-button.show {
  opacity: 0.8;
}

.scroll-to-top-button:hover {
  opacity: 1;
}


`
export default ToTop
