import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const query = graphql`
{
  allNodeAboutUs {
    nodes {
      title
      field_about_us_main_text
      field_about_us_author_and_charge
      field_about_us_link {
        uri
      }
      relationships {
        field_about_us_decimo_logo {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        field_about_us_icons {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`

const AboutUs = () => {
    const allData = useStaticQuery(query);
    const data = allData.allNodeAboutUs.nodes[0];
    return (
        <Wrapper id='aboutus'>
            <div className='aboutus-cont'>
                {/* container del logo con  su fondo*/}
                <div className='section-1'>
                    {/* bg del logo */}
                    <div className='logo-cont'>
                        {/* imagen del logo */}
                        <div>
                            <GatsbyImage
                                image={getImage(data.relationships.field_about_us_decimo_logo.localFile)}
                                alt='alt'
                                className='aboutus-logo'
                            />
                        </div>
                    </div>
                </div>
                {/* container del texto */}
                <div className='aboutus-text-container'>
                    {/* titulo */}
                    <h1 className='aboutus-title'>{data.title}</h1>
                    {/* texto largo */}
                    <div>
                        <p className='aboutus-maintext'>{data.field_about_us_main_text}</p>
                    </div>
                    {/* autor */}
                    <div className='aboutus-author'>
                        <div>{data.field_about_us_author_and_charge[0]} <span className='clear-text'>| {data.field_about_us_author_and_charge[1]}</span></div>
                    </div>
                    {/* iconos de redes sociales */}
                    <div className='icons-container'>
                        <a href={data.field_about_us_link[0].uri} target='_blank'>
                            {/* <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[0].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        /> */}
                            {/* icono de twitter */}
                            <svg className='aboutus-icon' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" fill="white" />
                                <path d="M27.7626 15.1539C27.1795 15.4118 26.561 15.5813 25.9278 15.6565C26.5952 15.2573 27.0948 14.6291 27.3333 13.8889C26.7069 14.2617 26.0202 14.5229 25.3044 14.6642C24.8237 14.1498 24.1864 13.8086 23.4917 13.6938C22.797 13.5789 22.0838 13.6968 21.463 14.029C20.8423 14.3613 20.3486 14.8893 20.0589 15.5311C19.7692 16.1728 19.6996 16.8923 19.861 17.5777C18.5907 17.514 17.348 17.1839 16.2136 16.6088C15.0792 16.0337 14.0784 15.2265 13.2762 14.2395C12.9923 14.7272 12.8431 15.2816 12.8439 15.846C12.8439 16.9536 13.4076 17.9321 14.2647 18.5051C13.7575 18.4891 13.2615 18.3521 12.8179 18.1055V18.1453C12.8181 18.883 13.0733 19.5979 13.5404 20.1689C14.0075 20.7398 14.6577 21.1317 15.3808 21.278C14.9099 21.4056 14.4162 21.4244 13.937 21.333C14.1409 21.9679 14.5382 22.5233 15.0734 22.9212C15.6085 23.3191 16.2547 23.5397 16.9215 23.5521C16.2588 24.0725 15.5001 24.4573 14.6886 24.6843C13.8771 24.9113 13.0288 24.9762 12.1923 24.8751C13.6526 25.8143 15.3526 26.3129 17.0888 26.3112C22.9654 26.3112 26.1791 21.443 26.1791 17.221C26.1791 17.0835 26.1753 16.9444 26.1692 16.8085C26.7947 16.3564 27.3346 15.7963 27.7634 15.1546L27.7626 15.1539Z" fill="#1C2436" />
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#E7EAEE" />
                            </svg>
                        </a>
                        <a href={data.field_about_us_link[1].uri} target='_blank'>
                            {/* <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[1].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        /> */}
                            {/* icono de facebook */}
                            <svg className='aboutus-icon' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" fill="white" />
                                <path d="M20 12.3608C15.781 12.3608 12.3611 15.7808 12.3611 19.9997C12.3611 23.8123 15.1546 26.9725 18.8068 27.5462V22.2074H16.8665V19.9997H18.8068V18.3169C18.8068 16.4026 19.9465 15.3454 21.692 15.3454C22.5277 15.3454 23.4016 15.4943 23.4016 15.4943V17.3735H22.4391C21.4896 17.3735 21.1939 17.9624 21.1939 18.5667V19.9997H23.3122L22.9738 22.2074H21.1939V27.5462C24.8453 26.9733 27.6389 23.8115 27.6389 19.9997C27.6389 15.7808 24.2189 12.3608 20 12.3608Z" fill="#1C2436" />
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#E7EAEE" />
                            </svg>
                        </a>
                        <a href={data.field_about_us_link[2].uri} target='_blank'>
                            {/* <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[2].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        /> */}
                            {/* icono de instagram */}
                            <svg className='aboutus-icon' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" fill="white" />
                                <path d="M20 12.3608C22.0755 12.3608 22.3344 12.3685 23.1487 12.4067C23.9623 12.4449 24.5161 12.5724 25.0034 12.7619C25.5076 12.9559 25.9323 13.2187 26.3571 13.6426C26.7455 14.0245 27.0461 14.4864 27.2378 14.9963C27.4265 15.4829 27.5548 16.0374 27.593 16.851C27.6289 17.6653 27.6389 17.9242 27.6389 19.9997C27.6389 22.0752 27.6312 22.3342 27.593 23.1485C27.5548 23.962 27.4265 24.5158 27.2378 25.0032C27.0466 25.5133 26.746 25.9753 26.3571 26.3568C25.9751 26.7451 25.5132 27.0457 25.0034 27.2376C24.5168 27.4263 23.9623 27.5546 23.1487 27.5928C22.3344 27.6287 22.0755 27.6386 20 27.6386C17.9245 27.6386 17.6655 27.631 16.8512 27.5928C16.0377 27.5546 15.4839 27.4263 14.9965 27.2376C14.4865 27.0462 14.0245 26.7456 13.6429 26.3568C13.2544 25.975 12.9538 25.5131 12.7621 25.0032C12.5727 24.5166 12.4451 23.962 12.4069 23.1485C12.371 22.3342 12.3611 22.0752 12.3611 19.9997C12.3611 17.9242 12.3687 17.6653 12.4069 16.851C12.4451 16.0367 12.5727 15.4836 12.7621 14.9963C12.9533 14.4861 13.2539 14.0241 13.6429 13.6426C14.0246 13.254 14.4866 12.9534 14.9965 12.7619C15.4839 12.5724 16.0369 12.4449 16.8512 12.4067C17.6655 12.3708 17.9245 12.3608 20 12.3608ZM20 16.1803C18.987 16.1803 18.0155 16.5827 17.2992 17.299C16.5829 18.0153 16.1805 18.9867 16.1805 19.9997C16.1805 21.0127 16.5829 21.9842 17.2992 22.7005C18.0155 23.4168 18.987 23.8192 20 23.8192C21.013 23.8192 21.9844 23.4168 22.7007 22.7005C23.417 21.9842 23.8194 21.0127 23.8194 19.9997C23.8194 18.9867 23.417 18.0153 22.7007 17.299C21.9844 16.5827 21.013 16.1803 20 16.1803V16.1803ZM24.9653 15.9893C24.9653 15.7361 24.8647 15.4932 24.6856 15.3141C24.5065 15.1351 24.2636 15.0345 24.0104 15.0345C23.7571 15.0345 23.5143 15.1351 23.3352 15.3141C23.1561 15.4932 23.0555 15.7361 23.0555 15.9893C23.0555 16.2426 23.1561 16.4854 23.3352 16.6645C23.5143 16.8436 23.7571 16.9442 24.0104 16.9442C24.2636 16.9442 24.5065 16.8436 24.6856 16.6645C24.8647 16.4854 24.9653 16.2426 24.9653 15.9893ZM20 17.7081C20.6078 17.7081 21.1907 17.9495 21.6204 18.3793C22.0502 18.809 22.2916 19.3919 22.2916 19.9997C22.2916 20.6075 22.0502 21.1904 21.6204 21.6202C21.1907 22.05 20.6078 22.2914 20 22.2914C19.3922 22.2914 18.8093 22.05 18.3795 21.6202C17.9497 21.1904 17.7083 20.6075 17.7083 19.9997C17.7083 19.3919 17.9497 18.809 18.3795 18.3793C18.8093 17.9495 19.3922 17.7081 20 17.7081V17.7081Z" fill="#1C2436" />
                                <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#E7EAEE" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.clear-text{
    color: #ACB4C3;
}
.aboutus-cont{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 50px 0px 0px 80px
}
.section-1{
    width: 70%;
}
.logo-cont{
    background: linear-gradient(180deg, #80CACB 0%, rgba(255, 204, 153, 0.47) 53.12%, rgba(246, 247, 249, 0) 100%, #F6F7F9 100%);
    border-radius: 250px 250px 0px 0px;
    height: 500px;
    width: 480px;
    margin: 0px 0px 40px 100px;
    position: relative;
    overflow: visible;
}
.aboutus-logo{
    height: 140px;
    width: 580px;
    margin: 200px 0px 800px 65px;
    position: absolute;
    transform: translate(-20%, -10%);
}

.aboutus-text-container{
    margin: 0px 300px 0px 0px;
    width: 800px;
}
.aboutus-title{
    font-size: 47px;
    font-weight: 500;
}
.aboutus-maintext{
    margin: 90px 0px 0px 0px;
    font-size: 18px;
    font-weight: 400;
    line-height: 150%;
    height: 200px;
}
.icons-container{
    margin: 100px 0px 0px 50px;
}
.aboutus-icon{
    width: 40px;
    height: 40px;
    margin: 10px;
}


/* RESPONSIVE */
@media only screen and (max-width: 1830px){
    .aboutus-text-container{
    margin: 0px 50px 0px 0px;
}
}
@media only screen and (max-width: 1600px){
    .aboutus-cont{
        display: block;
    }

    .aboutus-title{
        margin: 20px auto;
    }

    .aboutus-maintext, .aboutus-author, .aboutus-title{  
        text-align: center;
    }

    .icons-container{
        margin: 20px auto;
        display: flex;
        align-items:center;
        justify-content: center;
        gap: 20px;
    }
    .logo-cont, .section-1, .aboutus-text-container, .aboutus-cont, .aboutus-maintext, .aboutus-author, .aboutus-icon{
        margin: auto;
    }
}
@media only screen and (max-width: 800px){
    .aboutus-text-container{
        width: 600px;
    }
    .aboutus-maintext{
        margin-bottom: 100px;
        padding: 0px;
    }
    .aboutus-author{
        margin-top: 40px;
    }
}
@media only screen and (max-width: 640px){
    .section-1, .logo-cont, .aboutus-author, .aboutus-text-container{
        width: 400px;
        margin: auto;
    }
    .aboutus-logo{
        width: 410px;
        height: 100px;
        margin: auto;
        transform: translate(-1.5%, 200%);
        overflow: visible;
    }
    .aboutus-title, .aboutus-maintext{
        text-align: center;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .aboutus-author{
        margin: 350px 0px 10px 0;
    }

}
@media only screen and (max-width: 420px){
    .section-1, .logo-cont, .aboutus-logo, .aboutus-text-container, .aboutus-author{
        width: 300px;
    }
    .aboutus-logo{
        max-width: 100%;
        height: auto;
    }
}

`

export default AboutUs
