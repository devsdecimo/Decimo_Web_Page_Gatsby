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
                        <div dangerouslySetInnerHTML={maintitle} className='main-title'/>
                    <p className='subtitle'>{props.subtitle}</p>
                    <div className='links-container'>
                    <Button
                        route='/ContactPage'
                        text={props.giveacall} />
                    <Link to='/' className='learn-more'>
                        {props.learnmore + " >"}  
                    </Link>
                    </div>
                        <Newsletter/>
                </div>
                <div className='image-section'>
                    <GatsbyImage
                        image = {getImage(props.image.localFile)}
                        alt = 'Home'
                        className='home-image'
                    />
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
    margin: 40px auto;
}
.text-container{
    display: flex;
    flex-direction: column;
    flex: start;
    margin: 20px auto;
}
.small-title{
    font-size: 17px;
    line-height: 16px;
    word-spacing: 4px;
    letter-spacing: 2px;
}
.main-title p{
    font-size: 60px;
    font-weight: 700;
}
.main-title span{
    background: linear-gradient(89.63deg, rgb(51, 153, 153, 1) 5.4%, rgba(255, 153, 51) 100.53%);
    /* background: linear-gradient(rgba(51, 153, 153, 0.9) 31.87%, rgba(255, 153, 51, 0.702) 48.3%); */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-fill-color:transparent;
}
.subtitle{
    width: 50%;
    line-height: 24px;
}
.links-container{
    display: flex;
    flex-direction: row;
    gap: 25px;
    margin-top: 40px;
    align-items: center;
}
.learn-more{
    color:#339999;
    text-decoration: none;
}
.image-section{
    background-color: #FF9933;
    display: flex; 
    justify-content: end;
    position: relative;
    overflow: visible;
    padding-bottom: 100px;
    margin: 40px 0px 0px auto;
    border-radius: 198.5px 0px 0px 198.5px;
    width: 600px;
    height: 400px;
}
.home-image{
    position: absolute;
    width: 600px;
    height: 400px;
    border-radius: 198.5px 0px 0px 198.5px;
    top: 0;
    right: 0;
    transform: translate(0%, -15%);
}

@media only screen and (max-width: 1600px){
    .main-container{
        grid-template-columns: 1fr;
    }
    .subtitle{
    width: 100%;
    }
    .text-container{
        text-align: center;
    }
    .links-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .image-section{
        width: 95%;
        margin: 60px auto;
        border-radius: 25px;
    }
    .home-image{
        width: 90%;
        margin: 40px auto;
        border-radius: 25px;
        transform: translate(-5%, -15%);
    }
}
@media only screen and (max-width: 420px){
    .main-container{
        width: 90%;
    }
    .text-container .main-title{
        width: 80%;
    }
    .main-title p{
        width: 50%;
        margin: auto 10px;
        text-align: left;
        font-size: 50px;
    }
    .small-title{
    font-size: 17px;
    line-height: 16px;
    word-spacing: 2px;
    letter-spacing: 1px;
    }
}
`
export default PrimarySection
