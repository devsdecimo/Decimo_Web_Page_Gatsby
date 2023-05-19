import React from 'react'
import { Carousel } from 'react-bootstrap';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const query = graphql`
query{
  allNodePartenerComment {
    nodes {
      title
      field_partner_coment_text
      field_partner_charge
    }
  }
}
`
//recordar las props
const Feedback = (props) => {
  const data = useStaticQuery(query).allNodePartenerComment.nodes;
  return (
    <Wrapper>
      <div className='gradient'>
      <div className='upper-line'></div>
      <div className='carousel-cont'>
      <Carousel fade={true} controls={false} className='carousel-style'>

        {data.map((comment, index) => {
          {/* aqui adentro va toda la info de cada entrada */ }
          return (
            <Carousel.Item key={index}>
              <div className='car-header'>
                <h2 className='carousel-title'>{props.title}</h2>
                {/* <p className='carousel-subtitle'>{props.subtitle}</p> */}
              </div>
              <div className='carousel-body'>
                {/* comentario */}
                <div className='comment-text'>
                  <p>{comment.field_partner_coment_text}</p>
                </div>
                {/* nombre de la persona y su cargo */}
                <div className='author-info'>
                  <p className='author-name'>{comment.title}</p><p className='author-line'>|</p><span className='charge'>{comment.field_partner_charge}</span>
                </div>
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
      </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.gradient{
  padding-top: 60px;
  background: radial-gradient(40% 10% at 5% 10%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
  radial-gradient(40% 10% at 60% 10%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
  border-radius: 20px 0px 0px 0px;
}
.carousel-cont{
  background: #000B28;
  width: auto;
  height: 750px;
}

.carousel{
  position: relative !important;
}

.carousel-indicators{
  bottom: -50px;
}
.carousel .carousel-indicators button{
  width: 7px; 
  height: 7px; 
  border-radius: 100%;
  border: 4px solid white;
  opacity: 5;
  margin-right: 10px;
  
}
.carousel-indicators [data-bs-target]{
  background-color: transparent;
}
.carousel-indicators .active {
  border: 4px solid #339999 !important;
}
.upper-line{
width: 100%;
height: 7px;
left: 0px;
background: linear-gradient(89.63deg, #339999 10.13%, #FF9933 90.06%);
}
.carousel-style{
  background: #000B28;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px !important;
  color: white;
  margin: 0 !important;
}
.car-header{
  background: #000B28;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  margin: 0 !important;
}
.carousel-title{
  margin: 100px auto 30px auto;
  width: 600px;
  height: 43px;
  font-style: normal;
  letter-spacing: 0em;
  font-weight: 500;
  font-size: 40px;
  text-align: center;
}
.carousel-subtitle{
  margin: 20px auto;
  width: 479px;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
}
.carousel-body{
  display: flex;
  flex-direction: column;
}
.comment-text{
  display: flex;
  width: 90%;
  max-height: 70%;
  width: 1538px;
  margin: 50px auto;
  align-items: center;
  justify-content:center;
  font-weight: 600;
  line-height: 52px;
  background: linear-gradient(90.17deg, rgba(255, 255, 255, 0.9) 2.49%, rgba(51, 153, 153, 0.9) 31.87%, rgba(255, 153, 51, 0.702) 48.3%, rgba(255, 255, 255, 0.9) 85.64%), #FFFFFF;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent; 
}

.comment-text p{
  width: fit-content;
  height: fit-content;
  font-size: 37px;
  letter-spacing: -0.02em;
}

.author-info{
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: flex-end;
  flex-direction: row;
  gap: 46px;
}

.author-name{
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height, or 133% */
  letter-spacing: -0.015em;
  color: #FFFFFF;
}

.author-line{
  width: 12px;
  height: 0px;
  margin-left: -28px;
  margin-right: -34px;
}

.charge{
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.09px;
  color: #FFFFFF;
}

@media only screen and (max-width: 1700px){
  .comment-text {
    width: 80%;
  }
  .comment-text p{
     font-size: 25px
  }
}
@media only screen and (max-width: 1260px){
  .comment-text {
    width: 90%;
  }
  .comment-text p{
     font-size: 25px
  }
}
@media only screen and (max-width: 900px){
  .comment-text {
    width: 90%;
    margin-bottom: 30px;
    margin-top: 5px;
    background: #FFFFFF;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .comment-text p{
    font-size: 25px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .carousel-indicators{
    bottom: 0px;
  }
  .author-info{
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .author-name{
    font-size: 22px;
    color: #339999;
  }
  .author-line{
    color: #339999;
  }
  .charge{
    font-size: 20px;
    color: #339999;
    width: 160px;
  }
}

@media only screen and (max-width: 590px){
  .carousel-style{
    height: 700px !important;
  }
  .carousel-title{
    width: 400px;
    font-size: 25px;
  }
  .carousel-subtitle{
    width: 400px;
    font-size: 20px;
  }

}

  @media only screen and (max-width: 428px){
    .comment-text{
    font-size: 10px !important;
    line-height: 22px;
    margin: 80px auto 10px auto;
    margin-top: -10px;
  }
  .comment-text p{
    font-size: 22px !important;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .carousel-style{
    height: 500px !important;
  }
  .carousel-indicators{
  bottom: -210px;
  }
  .author-info{
    padding-top: 15px;
    text-align: center;
  }
  .author-name{
    font-size: 16px;
    color: #339999;
  }
  .author-line{
    color: #339999;
  }
  .charge{
    color: #339999;
    font-size: 13px;
    width: 150px;
  }
}
@media only screen and (max-width: 414px){
  .comment-text{
    font-size: 10px !important;
    line-height: 22px;
    margin: 80px auto 10px auto;
    margin-top: -20px;
    margin-bottom: 5px;
  }
  .comment-text p{
    font-size: 20px !important;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .carousel-style{
    height: 500px !important;
  }
  .carousel-indicators{
  bottom: -210px;
  }
  .author-info{
    padding-top: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .author-name{
    font-size: 18px;
    color: #339999;
  }
  .author-line{
    color: #339999;
    margin-left: -30px;
    margin-right: -30px;
  }
  .charge{
    color: #339999;
    font-size: 14px;
  }
}
@media only screen and (max-width: 375px){
  .carousel-title{
    margin-top: 70px;
    margin-left: -20px;
}
  .comment-text{
    font-size: 10px !important;
    line-height: 22px;
    margin: 80px auto 10px auto;
    margin-top: -20px;
    margin-bottom: 0px;
  }
  .comment-text p{
    font-size: 18px !important;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .carousel-style{
    height: 500px !important;
  }
  .carousel-indicators{
  bottom: -210px;
  }
  .author-info{
    padding-top: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .author-name{
    font-size: 16px;
    color: #339999;
  }
  .author-line{
    color: #339999;
    margin-left: -30px;
    margin-right: -30px;
  }
  .charge{
    color: #339999;
    font-size: 13px;
  }
}

@media only screen and (max-width: 320px){
  .carousel-title{
    margin-top: 70px;
    margin-left: -40px;
}
  .comment-text{
    font-size: 10px !important;
    line-height: 22px;
    margin: 80px auto 10px auto;
    margin-top: -20px;
    margin-bottom: 0px;
  }
  .comment-text p{
    font-size: 18px !important;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .carousel-style{
    height: 500px !important;
  }
  .carousel-indicators{
  bottom: -210px;
  }
  .author-info{
    padding-top: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .author-name{
    font-size: 16px;
    color: #339999;
  }
  .author-line{
    color: #339999;
    margin-left: -30px;
    margin-right: -30px;
  }
  .charge{
    color: #339999;
    font-size: 13px;
  }
}
`

export default Feedback