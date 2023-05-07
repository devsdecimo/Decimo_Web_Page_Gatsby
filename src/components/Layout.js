import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import '../assets/css/main.css'
import ToTop from './ToTop'

const Layout = ({children}) => {

  //Depending on the state of the navbar, the scrolling of the page is disabled or activated
  const toggleBodyScroll = (disableScroll) => {
    // console.log(disableScroll)
    disableScroll
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  };

  return (
    <>
      <Navbar toggleBodyScroll = {toggleBodyScroll}/>
      {children}
      <Footer/>
      <ToTop/>
    </>
  )
}

export default Layout