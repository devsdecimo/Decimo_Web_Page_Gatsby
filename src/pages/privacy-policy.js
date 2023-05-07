import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const PrivacyPolicy = ({data = []}) => {

  //Destructuracion y declaracion de los nodos que se traen con graphql
  const body ={__html:  data.allNodePrivacyPolicy.nodes[0].field_body.value}
  const img = data.allNodePrivacyPolicy.nodes[0].relationships.field_img_privacy_policy.localFile

  return (
    <PrivacyPolicyStyles>
      <Layout>
        <main className='main-cont'>
          {/* Linea de color con gradient */}
          <hr className="lineColor"/>
          {/* Contenedor del logo de la empresa */}
          <div className="imageContainer">
            <GatsbyImage image={getImage(img) } className="imagePolicy"/>
          </div>
          {/* Container del texto de las politicas de privacidad */}
          <div className="mainClass container">
            <div dangerouslySetInnerHTML={body}/>
          </div>
        </main>
      </Layout>
    </PrivacyPolicyStyles>
  )
}

const PrivacyPolicyStyles = styled.main`

.main-cont{
  margin-bottom: 100px;
}
  //Estilo del contenedor del logo
  .imageContainer{
    background-color:#000B28;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  //Estilo de la linea de color con gradient
  .lineColor{
    background: linear-gradient(89.63deg, #339999 10.13%, #FF9933 90.06%);
    padding: 3px;
    border:none;
    margin: 0px;
    opacity: 200;
  }

  //Estilo del logo
  .imagePolicy{
    max-width: 500px;
    margin-top: 150px;
    margin-bottom: 150px;
    margin-left:auto;
    margin-right:auto;
  }

  //Estilo del container del texto de las politicas de privacidad
  .mainClass{
    width:60%;
  }

  //Estilo para el h1 que viene del ckeditor
  h1{
    font-style:normal;
    font-weight:normal;
    font-size:30px;
    margin:0 0 15px;
    color: #323436;
  }

  //Estilo para los paragraph que vienen del ckeditor
  p{
    color: #323436;
    font-style:normal;
    font-size:14px;
  }

  //Estilo para los h2 que vienen del ckeditor
  h2{
    font-style:normal;
    font-weight:normal;
    font-size:23px;
    margin:0 0 15px;
    margin-top: 25px;
    color: #323436;
  }

  //Responsive

  @media only screen and (max-width: 540px){
    .imagePolicy{
      max-width: 300px;
    }
  }
`

export const query = graphql`
  query {
    allNodePrivacyPolicy {
      nodes {
        field_body {
          value
        }
        relationships {
          field_img_privacy_policy {
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


export default PrivacyPolicy

