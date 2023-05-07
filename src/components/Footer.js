import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { Link as ReactLink } from "react-scroll";


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
              <Link to='/'><div className="column1"><GatsbyImage
                image={getImage(data.relationships.field_footerlogo.localFile)}
                alt='Logo'
                className='footer-logo'
              /></div></Link>
              <ReactLink to='aboutus' spy={false} smooth={true} duration={100} offset={-100}><div className="column2">{data.field_footeritems[0]}</div></ReactLink>
              <ReactLink to='solutions' spy={false} smooth={true} duration={100} offset={-100}><div className="column3">{data.field_footeritems[1]}</div></ReactLink>
              <Link to='/'> <div className="column4">{data.field_footeritems[2]}</div></Link>
              <Link to='/contact-page'><div className="column5">{data.field_footeritems[3]}</div></Link>
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
                {/* icono de facebook */}
                <a href={data.field_footer_links[0].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99997 0.36084C3.78101 0.36084 0.361084 3.78077 0.361084 7.99973C0.361084 11.8123 3.15463 14.9725 6.80678 15.5462V10.2074H4.8665V7.99973H6.80678V6.31688C6.80678 4.40258 7.9465 3.34535 9.69199 3.34535C10.5277 3.34535 11.4016 3.49431 11.4016 3.49431V5.37348H10.4391C9.48956 5.37348 9.19393 5.96244 9.19393 6.56667V7.99973H11.3122L10.9738 10.2074H9.19393V15.5462C12.8453 14.9733 15.6389 11.8115 15.6389 7.99973C15.6389 3.78077 12.2189 0.36084 7.99997 0.36084Z" fill="#1C2436" />
                </svg>
                </a>
                {/* <GatsbyImage
                  image={getImage(data.relationships.field_footericons[1].localFile)}
                  alt='icon'
                  className='footer-icon' /> */}
                {/* icono de instagram */}
                <a href={data.field_footer_links[1].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99997 0.36084C10.0755 0.36084 10.3344 0.368479 11.1487 0.406673C11.9623 0.444868 12.5161 0.572437 13.0034 0.761882C13.5076 0.955909 13.9323 1.21869 14.3571 1.64265C14.7455 2.02451 15.0461 2.48643 15.2378 2.99626C15.4265 3.48285 15.5548 4.03744 15.593 4.85098C15.6289 5.66528 15.6389 5.92424 15.6389 7.99973C15.6389 10.0752 15.6312 10.3342 15.593 11.1485C15.5548 11.962 15.4265 12.5158 15.2378 13.0032C15.0466 13.5133 14.746 13.9753 14.3571 14.3568C13.9751 14.7451 13.5132 15.0457 13.0034 15.2376C12.5168 15.4263 11.9623 15.5546 11.1487 15.5928C10.3344 15.6287 10.0755 15.6386 7.99997 15.6386C5.92449 15.6386 5.66553 15.631 4.85122 15.5928C4.03768 15.5546 3.48386 15.4263 2.9965 15.2376C2.48647 15.0462 2.02447 14.7456 1.64289 14.3568C1.25438 13.975 0.953809 13.5131 0.762126 13.0032C0.572681 12.5166 0.445112 11.962 0.406917 11.1485C0.371014 10.3342 0.361084 10.0752 0.361084 7.99973C0.361084 5.92424 0.368723 5.66528 0.406917 4.85098C0.445112 4.03667 0.572681 3.48362 0.762126 2.99626C0.953278 2.48612 1.25392 2.02407 1.64289 1.64265C2.02458 1.254 2.48655 0.953411 2.9965 0.761882C3.48386 0.572437 4.03692 0.444868 4.85122 0.406673C5.66553 0.37077 5.92449 0.36084 7.99997 0.36084ZM7.99997 4.18028C6.98699 4.18028 6.0155 4.58269 5.29922 5.29897C4.58293 6.01526 4.18053 6.98675 4.18053 7.99973C4.18053 9.01271 4.58293 9.9842 5.29922 10.7005C6.0155 11.4168 6.98699 11.8192 7.99997 11.8192C9.01295 11.8192 9.98444 11.4168 10.7007 10.7005C11.417 9.9842 11.8194 9.01271 11.8194 7.99973C11.8194 6.98675 11.417 6.01526 10.7007 5.29897C9.98444 4.58269 9.01295 4.18028 7.99997 4.18028ZM12.9653 3.98931C12.9653 3.73607 12.8647 3.49319 12.6856 3.31412C12.5065 3.13505 12.2636 3.03445 12.0104 3.03445C11.7571 3.03445 11.5143 3.13505 11.3352 3.31412C11.1561 3.49319 11.0555 3.73607 11.0555 3.98931C11.0555 4.24256 11.1561 4.48543 11.3352 4.6645C11.5143 4.84357 11.7571 4.94417 12.0104 4.94417C12.2636 4.94417 12.5065 4.84357 12.6856 4.6645C12.8647 4.48543 12.9653 4.24256 12.9653 3.98931ZM7.99997 5.70806C8.60776 5.70806 9.19066 5.9495 9.62043 6.37927C10.0502 6.80905 10.2916 7.39194 10.2916 7.99973C10.2916 8.60752 10.0502 9.19041 9.62043 9.62018C9.19066 10.05 8.60776 10.2914 7.99997 10.2914C7.39219 10.2914 6.80929 10.05 6.37952 9.62018C5.94975 9.19041 5.70831 8.60752 5.70831 7.99973C5.70831 7.39194 5.94975 6.80905 6.37952 6.37927C6.80929 5.9495 7.39219 5.70806 7.99997 5.70806Z" fill="#1C2436" />
                </svg>
                </a>
                {/* <GatsbyImage
                  image={getImage(data.relationships.field_footericons[2].localFile)}
                  alt='icon'
                  className='footer-icon' /> */}
                {/* icono de twitter */}
                <a href={data.field_footer_links[2].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7626 2.15379C15.1795 2.41175 14.561 2.58117 13.9278 2.65643C14.5952 2.25725 15.0948 1.62901 15.3333 0.888792C14.7069 1.26157 14.0202 1.52282 13.3044 1.66414C12.8237 1.14972 12.1864 0.808556 11.4917 0.693683C10.797 0.578811 10.0838 0.696667 9.46305 1.02893C8.84226 1.36119 8.34863 1.88924 8.05891 2.53099C7.76918 3.17274 7.6996 3.89223 7.86097 4.57761C6.59071 4.51394 5.34803 4.18384 4.21362 3.60874C3.07921 3.03364 2.07843 2.2264 1.27625 1.23942C0.992304 1.72712 0.84309 2.28153 0.843888 2.84587C0.843888 3.95351 1.40764 4.93205 2.26472 5.50497C1.75751 5.489 1.26145 5.35203 0.817916 5.10546V5.14518C0.818069 5.88287 1.07334 6.5978 1.54044 7.16877C2.00754 7.73973 2.65773 8.13158 3.38076 8.27789C2.90991 8.40548 2.41621 8.42429 1.93701 8.33289C2.14087 8.96786 2.5382 9.52318 3.07337 9.92109C3.60854 10.319 4.25475 10.5396 4.92153 10.552C4.25884 11.0724 3.50007 11.4572 2.68859 11.6842C1.87711 11.9112 1.02885 11.9761 0.192291 11.875C1.65262 12.8142 3.35257 13.3128 5.08882 13.3111C10.9654 13.3111 14.1791 8.44289 14.1791 4.22087C14.1791 4.08337 14.1753 3.94435 14.1692 3.80837C14.7947 3.35628 15.3346 2.79624 15.7634 2.15456L15.7626 2.15379Z" fill="#1C2436" />
                </svg>
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
            <div className='first-section'>
              <Link to='/'><div className="column1"><GatsbyImage
                image={getImage(data.relationships.field_footerlogo.localFile)}
                alt='Logo'
                className='footer-logo'
              /></div></Link>
              <Link to='/'><div className="column2">Home</div></Link>
              <Link to='/'> <div className="column4">{data.field_footeritems[2]}</div></Link>
              <Link to='/contact-page'><div className="column5">{data.field_footeritems[3]}</div></Link>
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
                {/* icono de facebook */}
                <a href={data.field_footer_links[0].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99997 0.36084C3.78101 0.36084 0.361084 3.78077 0.361084 7.99973C0.361084 11.8123 3.15463 14.9725 6.80678 15.5462V10.2074H4.8665V7.99973H6.80678V6.31688C6.80678 4.40258 7.9465 3.34535 9.69199 3.34535C10.5277 3.34535 11.4016 3.49431 11.4016 3.49431V5.37348H10.4391C9.48956 5.37348 9.19393 5.96244 9.19393 6.56667V7.99973H11.3122L10.9738 10.2074H9.19393V15.5462C12.8453 14.9733 15.6389 11.8115 15.6389 7.99973C15.6389 3.78077 12.2189 0.36084 7.99997 0.36084Z" fill="#1C2436" />
                </svg>
                </a>
                {/* <GatsbyImage
                  image={getImage(data.relationships.field_footericons[1].localFile)}
                  alt='icon'
                  className='footer-icon' /> */}
                {/* icono de instagram */}
                <a href={data.field_footer_links[1].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99997 0.36084C10.0755 0.36084 10.3344 0.368479 11.1487 0.406673C11.9623 0.444868 12.5161 0.572437 13.0034 0.761882C13.5076 0.955909 13.9323 1.21869 14.3571 1.64265C14.7455 2.02451 15.0461 2.48643 15.2378 2.99626C15.4265 3.48285 15.5548 4.03744 15.593 4.85098C15.6289 5.66528 15.6389 5.92424 15.6389 7.99973C15.6389 10.0752 15.6312 10.3342 15.593 11.1485C15.5548 11.962 15.4265 12.5158 15.2378 13.0032C15.0466 13.5133 14.746 13.9753 14.3571 14.3568C13.9751 14.7451 13.5132 15.0457 13.0034 15.2376C12.5168 15.4263 11.9623 15.5546 11.1487 15.5928C10.3344 15.6287 10.0755 15.6386 7.99997 15.6386C5.92449 15.6386 5.66553 15.631 4.85122 15.5928C4.03768 15.5546 3.48386 15.4263 2.9965 15.2376C2.48647 15.0462 2.02447 14.7456 1.64289 14.3568C1.25438 13.975 0.953809 13.5131 0.762126 13.0032C0.572681 12.5166 0.445112 11.962 0.406917 11.1485C0.371014 10.3342 0.361084 10.0752 0.361084 7.99973C0.361084 5.92424 0.368723 5.66528 0.406917 4.85098C0.445112 4.03667 0.572681 3.48362 0.762126 2.99626C0.953278 2.48612 1.25392 2.02407 1.64289 1.64265C2.02458 1.254 2.48655 0.953411 2.9965 0.761882C3.48386 0.572437 4.03692 0.444868 4.85122 0.406673C5.66553 0.37077 5.92449 0.36084 7.99997 0.36084ZM7.99997 4.18028C6.98699 4.18028 6.0155 4.58269 5.29922 5.29897C4.58293 6.01526 4.18053 6.98675 4.18053 7.99973C4.18053 9.01271 4.58293 9.9842 5.29922 10.7005C6.0155 11.4168 6.98699 11.8192 7.99997 11.8192C9.01295 11.8192 9.98444 11.4168 10.7007 10.7005C11.417 9.9842 11.8194 9.01271 11.8194 7.99973C11.8194 6.98675 11.417 6.01526 10.7007 5.29897C9.98444 4.58269 9.01295 4.18028 7.99997 4.18028ZM12.9653 3.98931C12.9653 3.73607 12.8647 3.49319 12.6856 3.31412C12.5065 3.13505 12.2636 3.03445 12.0104 3.03445C11.7571 3.03445 11.5143 3.13505 11.3352 3.31412C11.1561 3.49319 11.0555 3.73607 11.0555 3.98931C11.0555 4.24256 11.1561 4.48543 11.3352 4.6645C11.5143 4.84357 11.7571 4.94417 12.0104 4.94417C12.2636 4.94417 12.5065 4.84357 12.6856 4.6645C12.8647 4.48543 12.9653 4.24256 12.9653 3.98931ZM7.99997 5.70806C8.60776 5.70806 9.19066 5.9495 9.62043 6.37927C10.0502 6.80905 10.2916 7.39194 10.2916 7.99973C10.2916 8.60752 10.0502 9.19041 9.62043 9.62018C9.19066 10.05 8.60776 10.2914 7.99997 10.2914C7.39219 10.2914 6.80929 10.05 6.37952 9.62018C5.94975 9.19041 5.70831 8.60752 5.70831 7.99973C5.70831 7.39194 5.94975 6.80905 6.37952 6.37927C6.80929 5.9495 7.39219 5.70806 7.99997 5.70806Z" fill="#1C2436" />
                </svg>
                </a>
                {/* <GatsbyImage
                  image={getImage(data.relationships.field_footericons[2].localFile)}
                  alt='icon'
                  className='footer-icon' /> */}
                {/* icono de twitter */}
                <a href={data.field_footer_links[2].uri} target='_blank'>
                <svg className='footer-icon' width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7626 2.15379C15.1795 2.41175 14.561 2.58117 13.9278 2.65643C14.5952 2.25725 15.0948 1.62901 15.3333 0.888792C14.7069 1.26157 14.0202 1.52282 13.3044 1.66414C12.8237 1.14972 12.1864 0.808556 11.4917 0.693683C10.797 0.578811 10.0838 0.696667 9.46305 1.02893C8.84226 1.36119 8.34863 1.88924 8.05891 2.53099C7.76918 3.17274 7.6996 3.89223 7.86097 4.57761C6.59071 4.51394 5.34803 4.18384 4.21362 3.60874C3.07921 3.03364 2.07843 2.2264 1.27625 1.23942C0.992304 1.72712 0.84309 2.28153 0.843888 2.84587C0.843888 3.95351 1.40764 4.93205 2.26472 5.50497C1.75751 5.489 1.26145 5.35203 0.817916 5.10546V5.14518C0.818069 5.88287 1.07334 6.5978 1.54044 7.16877C2.00754 7.73973 2.65773 8.13158 3.38076 8.27789C2.90991 8.40548 2.41621 8.42429 1.93701 8.33289C2.14087 8.96786 2.5382 9.52318 3.07337 9.92109C3.60854 10.319 4.25475 10.5396 4.92153 10.552C4.25884 11.0724 3.50007 11.4572 2.68859 11.6842C1.87711 11.9112 1.02885 11.9761 0.192291 11.875C1.65262 12.8142 3.35257 13.3128 5.08882 13.3111C10.9654 13.3111 14.1791 8.44289 14.1791 4.22087C14.1791 4.08337 14.1753 3.94435 14.1692 3.80837C14.7947 3.35628 15.3346 2.79624 15.7634 2.15456L15.7626 2.15379Z" fill="#1C2436" />
                </svg>
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
    height: 400px;
    display: grid;
    place-items: center;
      background: radial-gradient(8% 50% at 10% 55%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      radial-gradient(50% 50% at 80% 50%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
              radial-gradient(30% 50% at 30% 55%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    transform: translate(0%, -20%);
    margin-bottom: 0px;
}
.footer{
    width: 85%;
    height: 300px;
    border-radius: 30px;
    background-color: #FFFFFF;
}
@media only screen and (max-width: 996px){
  .footer{
    height: 450px;
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
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 20px 120px 40px 120px;
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
@media only screen and (max-width: 992px) {
  .first-section {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    padding: 0px;
  }
  .column2{
    grid-column: 1;
    padding: 10px 0px;
  }
  .column3{
    grid-column: 1;
    padding: 10px 0px;
  }
  .column4{
    grid-column: 1;
    padding: 10px 0px;
  }
  .column5{
    grid-column: 1;
    padding: 10px 0px;
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
    padding: 10px;
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
}
  @media only screen and (max-width: 992px) {
  .footer-icon{
    margin: 2px;
  }
}
@media only screen and (max-width: 940px) {
  .second-section{
    align-items: center;
  }
  .column-left{
    grid-column: 1;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 762px) {
  .column-left{
    margin-left: 0px;
  }
}

`

export default Footer