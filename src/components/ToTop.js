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
         <button
      className={`scroll-to-top-button${showButton ? ' show' : ''}`}
      onClick={scrollToTop}
    >
        &#8593;
      
    </button>
    </Wrapper>
   
  )
}
const Wrapper = styled.div`
/* src/components/ScrollToTopButton.css */

.scroll-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color:#FF9933;
  color: #000B28;
  border: solid #339993 0.5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
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
