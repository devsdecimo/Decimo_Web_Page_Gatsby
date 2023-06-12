import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { Link as ReactLink } from "react-scroll";
import Linkedin from "../images/linkedin.png"


export const query = graphql`
{
  allNodeFooter {
    nodes {
      field_footeritems
      field_footercopyright
      relationships {
        field_footericons {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        field_footerlogo {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      field_footer_links {
        uri
      }
    }
  }
}
`

const Footer = () => {
  const isHomePage = () => {
    return typeof window !== 'undefined' && window.location.pathname === '/';
  }
  const allData = useStaticQuery(query);
  const data = allData.allNodeFooter.nodes[0];
  if (isHomePage()) {
    return (
      <Wrapper>
        <div className='main'>
          <div className='footer'>
            <hr className='footer-upper-line'></hr>
            {/* logo and items section */}
            <div className='first-section'>
              <div className="column1"><GatsbyImage
                image={getImage(data.relationships.field_footerlogo.localFile)}
                alt='Logo'
                className='footer-logo'
                /><Link className='logo' to='/'></Link>
              </div>
              <div className="column2"><ReactLink className='btn-footer' to='aboutus' spy={false} smooth={true} duration={100} offset={-100}>{data.field_footeritems[0]}</ReactLink>
              </div>
              <div className="column3"><ReactLink className='btn-footer' to='solutions' spy={false} smooth={true} duration={100} offset={-100}>{data.field_footeritems[1]}</ReactLink>
              </div>
              <div className="column4"><a className='btn-footer' href='https://decimoempleo.com/' target='_blank'>{data.field_footeritems[2]}</a>
              </div>
              <div className="column5"><Link className='btn-footer' to='/contact-page'>{data.field_footeritems[3]}</Link>
              </div>
            </div>
            <hr className='footer-lower-line'></hr>
            {/* icons and copy right section */}
            <div className='second-section'>
              {/* icons */}
              <div className='column-left'>
                {/* <GatsbyImage
                        image = {getImage(data.relationships.field_footericons[0].localFile)}
                        alt='icon'
                        className='footer-icon'/> */}
                {/* icono de linkedin */}
                <a href={data.field_footer_links[0].uri} target='_blank'>
                  <img className='linkedin-icon' src={Linkedin}/>
                </a>
              </div>
              {/* copyright */}
              <div className='column-right'>
                <p>{data.field_footercopyright}</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <div className='main'>
          <div className='footer'>
            <hr className='footer-upper-line'></hr>
            {/* logo and items section */}
            <div className='first-section-2'>
              <div className="column1-v2"><GatsbyImage
                image={getImage(data.relationships.field_footerlogo.localFile)}
                alt='Logo'
                className='footer-logo'
              /><Link className='logo' to='/'></Link></div>
              <div className="column2-v2"><Link className='btn-footer' to='/'>Home</Link></div>
              <div className="column4-v2"><a className='btn-footer' href='https://decimoempleo.com/' target='_blank'>{data.field_footeritems[2]}</a></div>
              <div className='column5-v2'><Link className='btn-footer' to='/contact-page'>{data.field_footeritems[3]}</Link></div>
            </div>
            <hr className='footer-lower-line'></hr>
            {/* icons and copy right section */}
            <div className='second-section'>
              {/* icons */}
              <div className='column-left'>
                {/* <GatsbyImage
                        image = {getImage(data.relationships.field_footericons[0].localFile)}
                        alt='icon'
                        className='footer-icon'/> */}
                {/* icono de linkedin */}
                <a href={data.field_footer_links[0].uri} target='_blank'>
                  <img className='linkedin-icon' src={Linkedin}/>
                </a>
              </div>
              {/* copyright */}
              <div className='column-right'>
                <p>{data.field_footercopyright}</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
const Wrapper = styled.div`
/*CSS if main containers*/
.main{
    height: 100%;
    display: grid;
    place-items: center;
      background: radial-gradient(8% 50% at 10% 55%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      radial-gradient(50% 50% at 80% 50%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
              radial-gradient(30% 50% at 30% 55%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    margin-bottom: 0px;
}
.footer{
    width: 85%;
    height: 300px;
    border-radius: 30px;
    background-color: #FFFFFF;
    transform: translate(0%, -20%);
}
.footer-icon{
  margin-right: 24.55px  !important;
}
.linkedin-icon{
  width: 20px;
  height: 20px;
}
.btn-footer{
  margin-right: auto;
}
.logo{
  margin-right: auto; 
}
.column2, .column3, .column4, .column5{
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 1.25px;
  text-transform: uppercase;
}
.column-right{
  transform: translate(-2px,0);
  p{
    font-family: 'Cabin';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  letter-spacing: -0.09px;  
  }
}
/*CSS of the lines*/
.footer-upper-line{
    border: none; 
    border-top: 2px solid #E6E6E6;
    margin: 40px 120px;
}

.footer-lower-line{
    border: none;
    border-top: 2px solid #E6E6E6;
    margin: 10px 120px;
}
/* CSS of the first section */
.first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr !important;
    justify-items: start;
    padding: 20px 0px 40px 120px;
    margin-right: 3.5% !important;
    align-items: center;
    a{
      color:black;
    }
    
}
.column1 {
  grid-column: 1 / span 2; 
}

.column2 {
  grid-column: 3;
}
.column2:hover{
  cursor: pointer;
}

.column3 {
  grid-column: 4;
}
.column3:hover{
  cursor: pointer;
}

.column4 {
  grid-column: 5;
}

.column5 {
  grid-column: 6; 
}
.footer-logo{
    width: 128px;
    height: 31px;
}
/* Responsive CSS for the first section */
@media only screen and (max-width: 2560px){
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 0px 40px 120px;
    margin-right: 6% !important;
    align-items: center;
    a{
      color:black;
    }
  }

  .first-section-2{
    margin-right: -1.5% !important;
  }
}
@media only screen and (max-width: 2000px){
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 70px 40px 120px;
    margin-right: 3.5% !important;
    align-items: center;
    a{
      color:black;
    }
    
  }
  .first-section-2{
    margin-right: 1.2% !important;
  }
}
@media only screen and (max-width: 1900px){
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 80px 40px 120px;
    align-items: center;
    a{
      color:black;
    }
    
}
}
@media only screen and (max-width: 1792px){
  .first-section{
    padding: 20px 82px 40px 120px;
  }
  .first-section-2{
    margin-right: 2.3% !important;
  }
}
@media only screen and (max-width: 1700px){
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 120px 40px 120px;
    margin-right: 0.5% !important;
    align-items: center;
    a{
      color:black;
    }
    
  }
  .first-section-2{
    margin-right: 3% !important;
  }
}
@media only screen and (max-width: 1470px){
  .first-section{
    margin-right: -4.2%;
  }
  .first-section-2{
    margin-right: 5% !important;
  }
}

@media only screen and (max-width: 1400px){
  .first-section{
    margin-right: -4.2%;
  }
  .first-section-2{
    margin-right: 6% !important;
  }
}

@media only screen and (max-width: 1150px){
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 120px 40px 120px;
    margin-right: -35px;
    align-items: center;
    a{
      color:black;
    }
  }
  .first-section-2{
    margin-right: 10% !important;
  }
}

@media only screen and (max-width: 1080px){
  .first-section{
    margin-right: -2%;
  }
}
@media only screen and (max-width: 996px){
  .column-left{
    display: flex;
  }
  .column-right{
    margin: auto;
    transform: translate(0,0);
  }
  .footer{
    height: 450px;
  }
  .first-section {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 2fr 2fr !important;
    padding: 20px 120px 40px 120px;
    a{
      color:black;
    }
    
  }
}

/* CSS of the second section */
.second-section{
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 20px;
    margin-top: 30px;
    margin-left: 50px;
}

.column-left{
    grid-column: 1 / 2;
    padding: 0px 0px 0px 10px;
    margin-left: 60px;
}

.footer-icon{
    margin: 5px 40px 5px 0px;
    width: 24px;
    height: 24px;
}

.column-right{
    grid-column: 3 / 3;
    margin-right: 120px;
}

@media only screen and (max-width: 1192px) {
  .footer-icon{
    margin: 5px;
  }
  .first-section-2{
    margin-right: 9% !important;
  }
}
  @media only screen and (max-width: 992px) {
  .footer-icon{
    margin: 2px;
  }
  .first-section-2{
    margin-right: 13% !important;
  }
}
@media only screen and (max-width: 940px) {
  .first-section {
    display: grid;
    padding: 20px 120px 40px 85px;
    a{
      color:black;
    }
    
  }
  .second-section{
    align-items: center;
  }
  .column-left{
    grid-column: 1;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 796px) {
  .column-left{
    margin-left: 0px;
  }
  .first-section{
    display: flex !important;
    flex-direction: column;
    padding: 20px 0px 40px 2% !important; 
  }
  .first-section-2{
    display: flex !important;
    flex-direction: column;
    padding-right: 4% !important;
    padding: 20px 0px 40px 15% !important; 
  }
  .column1-v2{
    margin-bottom: 50px;
    margin-top: -20%;
    
  }
  .column2-v2, .column4-v2, .column5-v2{
    font-family: 'Cabin' !important;
    font-style: normal !important;
    font-weight: 500 !important; 
    font-size: 18px !important;
    line-height: 24px !important;
    letter-spacing: 1.25px !important;
    text-transform: uppercase !important;
  }
  .column2-v2{
    margin-bottom: 40px !important;
  }
  .column4-v2{
    margin-bottom: 40px !important;
  }
  .main{
    background: #F5F5F5;
  }
  .footer{
    background-color: #FFFFFF !important;
    margin-top: 150px;
    height: 100%;
    margin-bottom: -5%;
  }
  .second-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -100px;
  }
  .column-right{
    margin: auto;
    padding-bottom: 23px;
    p{
      font-family: 'Cabin';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.09px;
    }
  }
  .column-left{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1%;
  }
  .linkedin-icon{
    width: 28px;
    height: 28px;
  }
  .column1{
    margin-bottom: 50px;
    margin-top: -20px;
  }
  .column2{
    margin-bottom: 40px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column3{
    margin-bottom: 40px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column4{
    margin-bottom: 40px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column5{
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .first-section{
    margin: auto;
  }
}
/* @media only screen and (max-width: 900px) {
  .main{
    background: #F5F5F5;
  }
  .footer{
    background-color: #FFFFFF !important;
    margin-top: 150px;
    height: 100%;
    margin-bottom: -5%;
  }
  .second-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -100px;
  }
  .column-right{
    margin: auto;
    padding-bottom: 23px;
    p{
      font-family: 'Cabin';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.09px;
    }
  }
  .column-left{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1%;
  }
  .linkedin-icon{
    width: 28px;
    height: 28px;
  }
  .column1{
    margin-bottom: 30px;
    margin-top: -20px;
  }
  .column2{
    margin-bottom: 16px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column3{
    margin-bottom: 16px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column4{
    margin-bottom: 16px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .column5{
    margin-bottom: 16px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .first-section{
    margin: auto;
  }
} */

//CSS SECOND FOOTER

.first-section-2 {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 20px 0px 40px 120px;
    margin-right: 1.5%;
    align-items: center;
    a{
      color:black;
    }
    
}

.column2-v2, .column4-v2, .column5-v2{
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
`

export default Footer