import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const query = graphql`
query{
  allNodeServiceAndTech {
    nodes {
      title
      field_service_and_tech_subtitle
      field_service_and_tech_body
      relationships {
        field_service_and_tech_icon {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout:CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`

const ServicesandTechs = (props) => {
  const services = useStaticQuery(query).allNodeServiceAndTech.nodes;
  return (
    <Wrapper id="solutions">
      {/* title of the section */}
      <div className='services-header'>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
      <section className='services-body'>
        <div className='cards-container'>
          {services.map((service, index) => {
            return (
              <div key={index} className='service-card'>
                <div className='service-card-container'>
                  <div className='card-icon-container'>
                    <GatsbyImage
                      image={getImage(service.relationships.field_service_and_tech_icon.localFile)}
                      alt='icon'
                      className='card-icon'
                    />
                  </div>
                  <h2 className='card-title'>{service.title}</h2>
                  <div className='text-container'>
                    <h4 className='card-subtitle'>{service.field_service_and_tech_subtitle}</h4>
                    <p className='card-body'>{service.field_service_and_tech_body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Wrapper>
  )
}


const Wrapper = styled.div`
.services-header{
  width: 50%;
  margin: 100px auto 0px auto;
  text-align: center;
  color: #000B28;
}
.services-header h2{
  font-size: 47px;
} 
.services-header p{
  font-weight: 400px !important;
  color: rgba(0, 11, 40, 0.6);
  width: 420px;
  margin: 10px auto 0px auto;
}
.services-body{
  width: 100%;
  display: grid;
  align-items: center;
}

.cards-container{
  display:grid;
  grid-template-columns: repeat(3 ,1fr);
  column-gap: 100px;
  row-gap: 30px;
  margin: 50px auto 100px auto;
}
.service-card{
  transition: 0.2s;
  width: 350px;
  height: 320px;
  display: inline-block;
}
.service-card:hover{
  box-shadow: 0 15px 250px 15px rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-style: solid;
    border-image-source: linear-gradient(
      89.63deg,
      #339999 5.4%,
      #ff9933 49.53%
    );
    border-image-slice: 1;
    border-width: 5px;
}
.service-card-container{
  /* border: 1px solid #e7eaee; */
  height: 100%;
  margin: 20px auto 0px auto;
  width: 90%;
}
.service-card-container:hover{
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  border-top: 0;
}
.card-icon-container{
  width: 100px;
  height: 85px;
  border-radius: 100%;
  /* overflow: hidden; */
  /* position: absolute; */
  /* margin: 20px auto 5px 0px; */
}
.card-icon{
  width: 100%;
  height: auto;
  margin-left: 25px;
}

.card-title {
  font-size: 25px;
  color: #000B28;
  margin: 0px auto 0px 50px;
}
.text-container{
  width: 80%;
  margin: 15px 0px auto 50px;
}
.card-subtitle{
  font-size: 16px;
  font-weight: 700;
  color: #000B28;
}
.card-body{
  margin-top: 20px;
  font-size: 16px;
}

@media only screen and (max-width: 1100px){
  .cards-container{
    grid-template-columns: repeat(2 ,1fr);
  }
}
@media only screen and (max-width: 700px){
  .cards-container{
    grid-template-columns: repeat(1 ,1fr);
  }
}
@media only screen and (max-width: 500px){
  .services-header{
    width: 90%;
  }
}
`

export default ServicesandTechs
