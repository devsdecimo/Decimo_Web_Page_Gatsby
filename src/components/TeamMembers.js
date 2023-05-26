import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const query = graphql`
    query{
  allNodeTeamMember {
    nodes {
      title
      field_team_member_charge
      field_linkedin_link {
        uri
      }
      relationships {
        field_team_member_icons {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        field_team_member_image {
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

const TeamMembers = (props) => {
  const members = useStaticQuery(query).allNodeTeamMember.nodes;

  return (
    <Wrapper>
      {/* Titulo de la seccion */}
      <h2 className='members-title'>{props.title}</h2>

      {/* contenedor de las cards */}
      <div className='card-container'>
        {members.map((member, index) => {
          return (
            /* cada card */
            <div className='perso-card' key={index}>
              {/* imagen de la card */}
              <GatsbyImage
                image={getImage(member.relationships.field_team_member_image.localFile)}
                alt={member.title}
                className='card-image'
              />
              {/* header de la card (nombre y cargo) */}
              <div className='perso-card-header'>
                {/* nombre del miembro del team */}
                <p className='card-name'>{member.title} <span className='card-sep'></span></p>
              </div>
              <div className='card-line'></div>
              <p className='charge-text'>{member.field_team_member_charge}</p>
              {/* footer de la card */}
              <div className='perso-card-footer'>
                {/* descripcion de la card, queda elimiado por acuerdos */}
                {/* <div className='card-description'>
                  {member.field_team_member_description}
                </div> */}
                {/* icono de la card */}
                <div className='icons-container'>
                  {/* version gatsby image (icono proveniente de Drupal) */}
                  <a href={member.field_linkedin_link.uri} target='_blank'>
                    <GatsbyImage
                      image={getImage(member.relationships.field_team_member_icons.localFile)}
                      alt='Icon'
                      className='card-icon'
                    />
                  </a>
                  {/* version con el icono inline usando un svg */}
                  {/* <a href={member.field_linkedin_link.uri} target='_blank'>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#F6F7F9" />
                      <path d="M16.205 14.75C16.2048 15.1478 16.0465 15.5293 15.7651 15.8104C15.4836 16.0916 15.102 16.2494 14.7042 16.2492C14.3064 16.249 13.9249 16.0908 13.6438 15.8094C13.3626 15.5279 13.2048 15.1463 13.205 14.7485C13.2052 14.3507 13.3634 13.9692 13.6448 13.688C13.9263 13.4069 14.3079 13.249 14.7057 13.2492C15.1035 13.2494 15.485 13.4077 15.7661 13.6891C16.0473 13.9706 16.2052 14.3522 16.205 14.75ZM16.25 17.36H13.25V26.75H16.25V17.36ZM20.99 17.36H18.005V26.75H20.96V21.8225C20.96 19.0775 24.5375 18.8225 24.5375 21.8225V26.75H27.5V20.8025C27.5 16.175 22.205 16.3475 20.96 18.62L20.99 17.36Z" fill="#000B28" />
                    </svg>
                  </a> */}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
.members-title{
  margin: 100px auto 10px auto;
  width: 50%;
  text-align:center;
  font-size: 47px;
  font-weight: 700px !important;
}
.card-container{
    width: 100%;
    display: grid;
    grid-column-gap: 35px;
    grid-template-columns: repeat(3, 1fr);
    margin: 60px auto;
}
.perso-card{
    width: 380px;
    height: auto;
    border-radius: 10px;
    margin: auto;
    border: 1px solid #E7EAEE;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    padding: 32px;
    //background-color: red;
}
.card-image{
    width: 313px;
    height: 280px;
    margin: auto;
}
.card-name{
  display: flex; 
  flex-direction: row;
  align-items: center;
  width: 380px;
  height: 30px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
}
.card-sep{
  border: 1px solid #E7EAEE;
  transform: rotate(90deg);
  width: 12px;
  height: 0px;
  margin-left: 12px;
}
.charge-text{
  background: linear-gradient(89.63deg, #339999 5.4%, #FF9933 49.53%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
}
.card-description{
  width: 80%;
  height: 60px;
  font-weight: 400;
  font-size: 16px;
  margin: auto;
}
.icons-container{
  display: flex; 
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  width: 90px;
  height: 40px;
}
.card-icon{
  max-height: 40px;
  max-width: 40px;
}

.card-line{
  border: none; 
  border-top: 2px solid #E6E6E6;
  width: 300px;
}

@media only screen and (max-width: 1600px){
  .card-container{
    width: 100%;
    grid-column-gap: 15px;
  }
  
}
@media only screen and (max-width: 1350px){
  /* .card-container{
    width: 80%;
    grid-column-gap: 5px;
  }
  .perso-card{
    width: 70%;
    margin: 0px;
  }
  .card-image{
    width: 50%;
  } */
  .card-container, .perso-card{
      width: auto;
      /* margin: auto; */
    }
    .card-image{
      max-width: 250px;
      max-height: 200px;
    }
    .card-line{
      width: 150px;
      margin: auto;
    }
    .card-name{
      width: 250px;
      margin: auto;
      height: 50px;
    }
    .card-description{
      width: 250px;
      margin: auto;
    }
    .icons-container{
      margin-top: 20px;
    }
}
@media only screen and (max-width: 1100px){
  .card-container{
    width: 100%;
    grid-template-columns: repeat(2,1fr);
  }
}
@media only screen and (max-width: 520px){
  .card-container{
    grid-template-columns: repeat(1, 1fr);
  }
  .card-container, .perso-card{
      width: 300px;
    }
    .card-image{
      max-width: 250px;
      max-height: 200px;
    }
    .card-line{
      width: 150px;
      margin: auto;
    }
    .card-name{
      width: 250px;
      margin: auto;
      height: 50px;
    }
    .card-description{
      width: 250px;
      margin: auto;
    }
    .icons-container{
      margin-top: 20px;
    }
}
/* @media only screen and (max-width: 420px){
    .card-container, .perso-card{
      width: 300px;
    }
    .card-image{
      max-width: 250px;
      max-height: 200px;
    }
    .card-line{
      width: 150px;
      margin: auto;
    }
    .card-name{
      width: 250px;
      margin: auto;
      height: 50px;
    }
    .card-description{
      width: 250px;
      margin: auto;
    }
    .icons-container{
      margin-top: 20px;
    }
} */
`
export default TeamMembers;
