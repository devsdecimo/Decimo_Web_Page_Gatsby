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
                    <div className='about-title'>
                    <h2 className='aboutus-title'>{data.title}</h2>
                    </div>
                    {/* texto largo */}
                    <div>
                        <p className='aboutus-maintext'>{data.field_about_us_main_text}</p>
                    </div>
                    {/* autor */}
                    <div className='aboutus-author'>
                        <p className='about-name'>{data.field_about_us_author_and_charge[0]}</p><p className='about-line'>|</p><span className='clear-text'>{data.field_about_us_author_and_charge[1]}</span>
                    </div>
                    {/* iconos de redes sociales */}
                    <div className='icons-container'>
                        <a href={data.field_about_us_link[0].uri} target='_blank'>
                            {/* <img className='aboutus-icon' src={Linkedin}></img> */}
                            <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[0].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        />
                        </a>
                            {/* icono de twitter */}
                            
                            {/* <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[1].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        /> */}
                            {/* icono de facebook */}

                            {/* <GatsbyImage
                            image={getImage(data.relationships.field_about_us_icons[2].localFile)}
                            alt='alt'
                            className='aboutus-icon'
                        /> */}
                            {/* icono de instagram */}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
#aboutus{
    position: relative;
}
.clear-text{
    color: #ACB4C3;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.09px;
}
.aboutus-cont{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 50px 0px 0px 232px;
}
.section-1{
    width: 70%;
    margin-top: 0.5%;
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
    margin-left: 130px;
    margin-top: 50px;
    margin-bottom: -29px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 700;
    font-size: 47px;
    line-height: 57px;
    letter-spacing: -0.02em;
}
.aboutus-maintext{
    margin: 90px 0px 0px 130px !important;
    font-weight: 400;
    width: 580px;
    line-height: 150%;
    height: 200px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
}
.about-name{
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.015em; 
}
.about-line{
    color: #ACB4C3;
    margin-left: 12px;
    margin-right: 12px;
}
.aboutus-author{
    display: flex;
    justify-content: flex-start;
    margin-left: 130px;
}
.icons-container{
    margin: 30px 0px 20px 120px ;
}
.aboutus-icon{
    width: 40px;
    height: 40px;
    margin: 10px;
    margin-right: 2px;
    border: 1px solid #E7EAEE;
    border-radius: 4px;
    
}
.aboutus-cont{
        display: flex;
        align-items: center;
        justify-content: center;
    }


/* RESPONSIVE */
@media only screen and (max-width: 1440px){
    .aboutus-cont{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
 /* @media only screen and (max-width: 1830px){
    .aboutus-text-container{
    margin: 0px 50px 0px 0px;
    }
} */

@media only screen and (max-width: 1270px){
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
    .section-1{
        transform: translate(0, 100px);
        margin-bottom: -125px;
    }
    .about-title{
        transform: translate(0, -400px);
    }
    .aboutus-title{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 47px;
        line-height: 30px;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .aboutus-maintext{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: #07090D;
        text-align: center;
        margin-bottom: 100px !important;
    }
    .aboutus-author{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
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
    .aboutus-maintext{
        margin-left: auto !important;
        margin-right: auto !important;
    }
    .section-1{
        transform: translate(0, 100px);
        margin-bottom: -125px;
    }
    .about-title{
        transform: translate(0, -400px);
    }
    .aboutus-title{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 47px;
        line-height: 30px;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .aboutus-maintext{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: #07090D;
        text-align: center;
        margin-bottom: 100px !important;
    }
    .aboutus-author{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
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
    .aboutus-maintext{
        margin-left: 0px !important;
    }
    .section-1{
        transform: translate(0, 100px);
        margin-bottom: -200px;
    }
    .about-title{
        transform: translate(0, -300px);
    }
    .logo-cont{
        background: linear-gradient(180deg, #80CACB 0%, rgba(255, 204, 153, 0.47) 53.12%, rgba(246, 247, 249, 0) 74%);
        border-radius: 250px 250px 0px 0px;
    }
    .aboutus-title{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .aboutus-maintext{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 150%;
        color: #07090D;
        text-align: center;
        margin-bottom: -190px !important;
        width: 100%;
    }
    .aboutus-author{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
}
@media only screen and (max-width: 428px){
    .section-1, .logo-cont, .aboutus-logo, .aboutus-text-container, .aboutus-author{
        width: 300px;
    }
    .aboutus-logo{
        max-width: 100%;
        height: auto;
    }
    .aboutus-maintext{
        margin-left: 0px !important;
    }
    .section-1{
        transform: translate(0, 100px);
        margin-bottom: -250px;
    }
    .about-title{
        transform: translate(0, -250px);
    }
    .logo-cont{
        background: linear-gradient(180deg, #80CACB 0%, rgba(255, 204, 153, 0.47) 53.12%, rgba(246, 247, 249, 0) 62%);
        border-radius: 250px 250px 0px 0px;
        width: 256px;
    }
    .aboutus-title{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .aboutus-maintext{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        color: #07090D;
        text-align: center;
        margin-bottom: -190px !important;
    }
    .aboutus-author{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    }
    .aboutus-cont{
        transform: translate(0, -6rem);
        margin-bottom: -8rem;
    }
}

@media only screen and (max-width: 390px){
    .aboutus-maintext{
        margin-left: 0px !important;
    }
    .section-1{
        transform: translate(0, 100px);
        margin-bottom: -250px;
    }
    .about-title{
        transform: translate(0, -250px);
    }
    .aboutus-title{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .aboutus-maintext{
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        color: #07090D;
        text-align: center;
        width: 300px;
        margin-bottom: -190px !important;
    }
    .logo-cont{
        background: linear-gradient(180deg, #80CACB 0%, rgba(255, 204, 153, 0.47) 53.12%, rgba(246, 247, 249, 0) 62%);
        border-radius: 250px 250px 0px 0px;
        width: 256px;
    }
    .aboutus-author{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
}

`

export default AboutUs
