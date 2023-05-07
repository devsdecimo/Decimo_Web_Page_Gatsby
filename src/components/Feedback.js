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
                <p className='carousel-subtitle'>{props.subtitle}</p>
              </div>
              <div className='carousel-body'>
                {/* comentario */}
                <div className='comment-text'>
                  <p>{comment.field_partner_coment_text}</p>
                </div>
                {/* nombre de la persona y su cargo */}
                <div className='author-info'>
                  <p>{comment.title}  |  <span className='charge'>{comment.field_partner_charge}</span></p>
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
.carousel .carousel-indicators button{
  width: 10px; 
  height: 10px; 
  border-radius: 50%;
  border: 5px solid white;
  opacity: 5;
  
}
.carousel-indicators [data-bs-target]{
  background-color: transparent;
}
.carousel-indicators .active {
  border: 5px solid #339999 !important;
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
  margin: 80px auto 10px auto;
  width: 600px;
  height: 60px;
  font-weight: 700;
  font-size: 35px;
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
  width: 80%;
  max-height: 70%;
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
}

.author-info{
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: flex-end;
  flex-direction: row;
  gap: 46px;
}
.charge{
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}

@media only screen and (max-width: 850px){
  .comment-text p{
    font-size: 25px;
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

  @media only screen and (max-width: 420px){
    .comment-text{
    font-size: 10px !important;
    line-height: 22px;
    margin: 80px auto 10px auto;
  }
  .comment-text p{
    font-size: 15px !important;
  }
  .carousel-style{
    height: 500px !important;
  }
}
`

export default Feedback