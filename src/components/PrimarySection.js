import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Button from './Button'
import Newsletter from './Newsletter'

const PrimarySection = (props) => {
    const maintitle = { __html: props.maintitle.value }
    return (
        <Wrapper>
            <div className='main-container'>
                <div className='text-container'>
                    <p className='small-title'>{props.smalltitle}</p>
                    <div dangerouslySetInnerHTML={maintitle} className='main-title' />
                    <p className='subtitle'>{props.subtitle}</p>
                    <div className='links-container'>
                        <div className='give-call'>
                            <Button
                                route='contact-page'
                                text={props.giveacall} />
                        </div>
                        {/* <Link to='/' className='learn-more'>
                        {props.learnmore}<svg className='learn-more-arrow' width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.17084 11.3083C1.025 11.1624 0.952087 10.9898 0.952087 10.7903C0.952087 10.5911 1.025 10.4187 1.17084 10.2728L5.44375 5.99992L1.15625 1.71242C1.02014 1.57631 0.952087 1.40617 0.952087 1.202C0.952087 0.997835 1.025 0.822835 1.17084 0.677002C1.31667 0.531169 1.48934 0.458252 1.68884 0.458252C1.88795 0.458252 2.06042 0.531169 2.20625 0.677002L7.10625 5.59159C7.16459 5.64992 7.206 5.71311 7.2305 5.78117C7.25462 5.84922 7.26667 5.92214 7.26667 5.99992C7.26667 6.0777 7.25462 6.15061 7.2305 6.21867C7.206 6.28672 7.16459 6.34992 7.10625 6.40825L2.19167 11.3228C2.05556 11.4589 1.88795 11.527 1.68884 11.527C1.48934 11.527 1.31667 11.4541 1.17084 11.3083Z" fill="#339999"/>
</svg>
                    </Link> */}
                    </div>
                    <Newsletter />
                </div>
                <div className='image-section'>
                    <GatsbyImage
                        image={getImage(props.image.localFile)}
                        alt='Home'
                        className='home-image'
                    />
                    <div className='orange-gradiant'></div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.newsletter{
    padding-top: 30px;
}
.main-container{
    display: grid; 
    grid-template-columns: 1fr 1fr;
    margin: 80px auto 200px 120px;
}
.text-container{
    display: flex;
    flex-direction: column;
    flex: start;
    margin: 20px auto 20px 0px;
    width: 620px;
    height: 220px;
}
.small-title{
    font-size: 17px;
    line-height: 16px;
    word-spacing: 4px;
    letter-spacing: 2px;
    font-weight: 700;
    /* margin-bottom: 5000px;
    color: red; */
}
.main-title{
    margin-top: 20px;
}
.main-title p{
    font-size: 70px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 70px;
    /* margin-top: 20px; */
}
.main-title span{
    background: linear-gradient(89.63deg, #339999 5.4%, #FF9933 49.53%);;
    /* background: linear-gradient(rgba(51, 153, 153, 0.9) 31.87%, rgba(255, 153, 51, 0.702) 48.3%); */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.subtitle{
    font-weight: 600;
    font-size: 16px;
    color: rgba(0, 11, 40, 0.6);
    width: 60%;
    line-height: 24px;
    margin-top: 25px;
}
.links-container{
    display: flex;
    flex-direction: row;
    gap: 25px;
    margin-top: 40px;
    align-items: center;
}
.give-call{
    margin-top: 15px;
}
.learn-more{
    color:#339999;
    text-decoration: none;
}
.learn-more-arrow{
    margin: 0px 0px 2px 12px;
}
.image-section{
    background-color: #FF9933;
    display: flex; 
    justify-content: end;
    position: relative;
    overflow: visible;
    padding-bottom: 100px;
    margin: 20px 0px 0px auto;
    border-radius: 259px 0px 0px 259px;
    width: 614px;
    height: 397px;
}
.home-image{
    position: absolute;
    width: 614px;
    height: 397px;
    border-radius: 259px 0px 0px 259px;
    top: 0;
    right: 0;
    transform: translate(0%, -11%);
}
.orange-gradiant{
    position: absolute;
    width: 150%;
    height: 120%;
    top: 230px;
    background: radial-gradient(50% 50% at right, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
}
/* 992
768
1200
576 */
@media only screen and (max-width: 1100px){
    .main-container{
        width: auto;
        display: flex;
        justify-content: center;
        margin: 80px auto 400px auto;
    }
    .subtitle{
    width: 100%;
    }
    .text-container{
        text-align: center;
        margin: 0px;
    }
    .links-container{
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        justify-content: center;
    }
    .image-section{
        /* width: 95%;
        margin: 60px auto;
        border-radius: 25px; */
        display: none;
    }
    .home-image{
        /* width: 90%;
        margin: 40px auto;
        border-radius: 25px;
        transform: translate(-5%, -15%); */
        display: none;
    }
}
@media only screen and (max-width: 1920px){
    /* .text-container{
        margin-left: 120px;
    } */
    .image-section, .home-image {
    width: 100%;
    height: calc(720px / 1.546);
  }    
  /*.text-container {
        width: 900px;
        height: calc(720px / 2.82);
        
    } */
    .main-container{
        gap: 40px;
    }
}

@media only screen and (max-width: 1350px){
    .main-container{
        margin: 80px auto 400px 40px;
    }
    .image-section{
        width: 100%;
        height: 397px;
    }
    .home-image{
        width: 100%;
        height: 397px;
    }
}

@media only screen and (max-width: 760px){
    .main-container{
        width: 90%;
        margin: 80px auto 400px 20px;
    } 
    .main-title{
        width: 100%;
        font-size: 35px;
        margin: auto;
    }
    .text-container{
        width: 80%;
    }
    .main-title p{
        margin: 10px auto auto auto;
        text-align: center;
        font-size: 35px;
        letter-spacing: -0.04em;
        line-height: 38px;
    }
    .small-title{
    font-size: 14px;
    line-height: 16px;
    word-spacing: 2px;
    letter-spacing: 1px;
    }
    .subtitle{
        font-size: 14px;
    }
}
`
export default PrimarySection
 
