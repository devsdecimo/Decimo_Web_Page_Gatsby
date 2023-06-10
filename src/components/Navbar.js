import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as ReactLink } from "react-scroll";
import { IconContext } from "react-icons";

export const query = graphql`
  query getNodeNavbar {
    allNodeNavbar {
      nodes {
        field_navbaritems
        relationships {
          field_navbarimage {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setShowOverlay(!showOverlay);
  };

  const data = useStaticQuery(query);
  const items = data.allNodeNavbar.nodes[0].field_navbaritems;
  const image = getImage(
    data.allNodeNavbar.nodes[0].relationships.field_navbarimage.localFile
  );
  const isHomePage = () => {
    return typeof window !== "undefined" && window.location.pathname === "/";
  };
  if (isHomePage()) {
    return (
      <Wrapper>
        <header className="navbar">
          {/* img */}
          <div className="nav-logo">
            <Link to="/">
              <GatsbyImage image={image} alt="Decimo logo" className="logo" />
            </Link>
          </div>

          {/* items */}
          <nav className="nav-items">
            <ul className={`nav-menu ${clicked ? "active" : ""}`}>
              <li className={`nav-item btn-fatimes`}>
                <span className="btn-fatimes-cursor">
                  <IconContext.Provider value={{ size: 25, color: "white" }}>
                    <FaTimes onClick={handleClick} />
                  </IconContext.Provider>
                </span>
              </li>
              <li className="nav-item">
                <Link to="/" className="menu-link" onClick={handleClick}>
                  {items[0]}
                </Link>
              </li>
              <li className="nav-item">
                <ReactLink
                  to="solutions"
                  className="menu-link"
                  spy={false}
                  smooth={true}
                  duration={100}
                  offset={-100}
                >
                  {items[1]}
                </ReactLink>
              </li>
              <li className="nav-item">
                <ReactLink
                  to="aboutus"
                  className="menu-link"
                  spy={false}
                  smooth={true}
                  duration={100}
                  offset={-100}
                >
                  {items[2]}
                </ReactLink>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="menu-link" onClick={handleClick}>
                  {items[3]}
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://decimoempleo.com/"
                  className="menu-link"
                  target="_blank"
                >
                  {items[4]}
                </a>
              </li>
              <li className="nav-item btn-contact">
                <Link
                  to="/contact-page"
                  onClick={handleClick}
                  className="menu-link btn-content"
                >
                  {items[5]}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hamburger" onClick={handleClick}>
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4" width="19.8" height="2.2" rx="1.1" fill="#000B28" />
              <rect
                y="8.3999"
                width="19.8"
                height="2.2"
                rx="1.1"
                fill="#000B28"
              />
              <rect width="19.8" height="2.2" rx="1.1" fill="#000B28" />
              <rect
                y="12.8"
                width="19.8"
                height="2.2"
                rx="1.1"
                fill="#000B28"
              />
            </svg>
          </div>
        </header>
        <div className={`overlay ${!showOverlay ? "" : "active"}`}></div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <header className="navbar">
          {/* img */}
          <div className="nav-logo">
            <Link to="/">
              <GatsbyImage image={image} alt="Decimo logo" className="logo" />
            </Link>
          </div>

          {/* items */}
          <nav className="nav-items">
            <ul className={`nav-menu ${clicked ? "active" : ""}`}>
              <li className={`nav-item btn-fatimes hidden`}>
                <span className="btn-fatimes-cursor">
                  <IconContext.Provider value={{ size: 25, color: "white" }}>
                    <FaTimes onClick={handleClick} />
                  </IconContext.Provider>
                </span>
              </li>
              <li className="nav-item">
                <Link to="/" className="menu-link" onClick={handleClick}>
                  {items[0]}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="menu-link" onClick={handleClick}>
                  {items[3]}
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://decimoempleo.com/"
                  className="menu-link"
                  target="_blank"
                >
                  {items[4]}
                </a>
              </li>
              <li className="nav-item btn-contact">
                <Link
                  to="/contact-page"
                  className="menu-link btn-content"
                  onClick={handleClick}
                >
                  {items[5]}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hamburger hidden" onClick={handleClick}>
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4" width="19.8" height="2.2" rx="1.1" fill="#000B28" />
              <rect
                y="8.3999"
                width="19.8"
                height="2.2"
                rx="1.1"
                fill="#000B28"
              />
              <rect width="19.8" height="2.2" rx="1.1" fill="#000B28" />
              <rect
                y="12.8"
                width="19.8"
                height="2.2"
                rx="1.1"
                fill="#000B28"
              />
            </svg>
          </div>
        </header>
        <div className={`overlay ${!showOverlay ? "" : "active"}`}></div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  ul {
    padding-left: 0rem;
  }
  .hidden {
    display: none !important;
  }
  li {
    list-style: none;
  }

  .navbar {
    min-height: 70px;
    display: flex;
    align-items: center;
    padding: 45px 0px;
    /* max-width: 1190px; */
    margin: 0 120px;
  }

  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-items {
    display: flex;
    justify-content: end;
    gap: 49px;
  }

  .nav-item {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }
  .nav-item:not(:nth-last-child(2)) {
    margin-right: 40px;
  }

  .nav-logo {
    width: 147px;
  }

  .menu-link {
    font-size: 16px;
    color: black;
    text-decoration: none;
    transition: 0.4s ease;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }

  .btn-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-item.btn-contact {
    margin-left: 46px;
  }

  .menu-link:hover {
    color: #1b7e7e;
  }

  .btn-contact {
    width: 125px;
    height: 48px;
    border-radius: 25px;
    background-color: #ff9933;
    border: none;
    transition: 0.4s ease;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }

  .btn-contact a {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }

  .btn-contact:hover a {
    color: #ff9933;
  }

  .btn-contact:hover {
    background-color: white;
    transition: 0.3s;
    border: solid 1px #ff9933;
  }

  .hamburger {
    display: none;
    cursor: pointer;
  }
  .btn-fatimes {
    display: none;
  }

  .btn-fatimes-cursor {
    cursor: pointer;
  }

  .hamburger-icon {
    height: 2em;
  }

  @media (max-width: 1100px) {
    .navbar {
      padding: 30px 0;
      max-width: 100%;
      margin: 0 40px;
    }

    .hamburger {
      display: block !important;
    }

    ul.nav-menu {
      padding-left: 0;
    }

    .nav-menu {
      display: block;
      position: fixed;
      right: -320px;
      top: 0;
      gap: 0;
      flex-direction: column;
      background-color: #339999;
      width: 320px;
      text-align: center;
      -webkit-transition: 0.5s ease;
      transition: 0.5s ease;
      height: 100%;
      z-index: 3;
    }

    .nav-item {
      margin: 40px 0px;
      cursor: pointer;
    }

    .btn-fatimes {
      display: block !important;
    }

    .nav-menu.active {
      right: 0% !important;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .overlay.active {
      opacity: 1 !important;
      visibility: visible !important;
    }

    .nav-menu .menu-link {
      display: block;
      font-size: 20px;
      color: white;
    }

    .menu-link:hover {
      color: #ff9933;
    }

    .btn-contact {
      width: 100%;
      height: 48px;
      border-radius: 0px;
      background-color: #339999;
      padding-right: 0 !important;
      border: none;
      text-align: center;
    }

    .btn-contact .menu-link {
      color: white;
      font-size: 20px;
      font-weight: normal;
    }

    .btn-content {
      display: block;
    }

    .nav-item.btn-contact {
      margin-left: 0px;
    }

    .nav-item:not(:nth-last-child(2)) {
      margin-right: 0;
    }

    .btn-contact:hover {
      background-color: #339999;
      transition: 0.3s;
      border: none;
    }
  }
  @media (max-width: 300px) {
    .nav-item {
      margin: 20px 0px;
    }
  }
`;

export default Navbar;
