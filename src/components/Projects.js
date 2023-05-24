import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const query = graphql`
    query{
  allNodeProjects {
    nodes {
      relationships {
        field_project_image {
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

const Projects = (props) => {

  const projects = useStaticQuery(query).allNodeProjects.nodes;
  return (
    <Wrapper>
      <div className='gradient'>
      <div className='projects'>
        {/* titulo y subtitulo */}
        <div className='title-container'>
          <h2>{props.title}</h2>
          {/* <p>{props.subtitle}</p> */}
        </div>
        {/* contenedor de las imagenes */}
        <div className='projects-container'>
          {projects.map((project, index) => {
            return (
              /* d */
              <div className='img-cont' key = {index}>
                <GatsbyImage
                  image={getImage(project.relationships.field_project_image.localFile)}
                  alt="project"
                  className='project-image' />
              </div>

            );
          })}
        </div>
      </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.gradient{
  background: radial-gradient(50% 50% at 100% 50%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
              radial-gradient(50% 50% at 50% 50%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
}
              

    .projects{
        width: 90%;
        background-color: white;
        height: auto;
        padding-bottom: 100px;
        margin: 10px auto;
        border-radius: 30px;
        transform: translate(0%, -10%);
        margin: 0px auto 60px auto;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .title-container{
        width: 50%;
        margin: auto;
        text-align: center;
        padding-top: 80px;
    }
    .title-container h2{
      font-weight: 700;
      font-size: 35px;
    }
    .title-container p {
        margin-top: 30px;
        color: grey;
        font-size: 20px;
      }
    /* .projects-container{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        width: 90%;
        margin:0px auto auto auto;
    } */
    .projects-container{
      display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: 90%;
        margin:80px auto auto auto;
    }
    .img-cont{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px auto;
      max-width: 150px;
      max-height: 150px;
      object-fit: contain;
    }
    @media only screen and (max-width: 1600px){
      .projects-container{
        grid-template-columns: repeat(3, 1fr)
      }
    }
    @media only screen and (max-width: 900px){
      .projects-container{
        grid-template-columns: repeat(2, 1fr)
      }
    }
    @media only screen and (max-width: 650px){
      .projects {
        padding-bottom: 20px;
      }
      .title-container{
        width: 90%;
      }
      .title-container h2 {
        font-size: 30px;
      }
      .title-container p {
        font-weight: 600;
      }
      .projects-container{
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(2, 1fr)
      }
      .img-cont{
        max-width: 100px !important;
      }
      .projects{
        transform: translate(0%, -2%);
      }
    }
`

export default Projects
