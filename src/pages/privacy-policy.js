import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Seo } from "../components/seo";
const PrivacyPolicy = ({data = []}) => {

  //Destructuracion y declaracion de los nodos que se traen con graphql
  const body ={__html:  data.allNodePrivacyPolicy.nodes[0].field_body.value}
  const img = data.allNodePrivacyPolicy.nodes[0].relationships.field_img_privacy_policy.localFile

  return (
    <PrivacyPolicyStyles>
      <Layout>
        <main className="main-cont">
          {/* Linea de color con gradient */}
          <hr className="lineColor" />
          {/* Contenedor del logo de la empresa */}
          <div className="imageContainer">
            {/* <GatsbyImage image={getImage(img) } className="imagePolicy"/> */}
            <div className="background-gradient">
              <svg className="decLogo" width="147" height="36" viewBox="0 0 147 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_103_483)">
              <path d="M147 0.266846H119.627V36.0001H147V0.266846Z" fill="#FF9933"/>
              <path d="M133.331 8.46655C130.624 8.46655 127.978 9.27396 125.727 10.7867C123.476 12.2994 121.722 14.4494 120.686 16.965C119.65 19.4805 119.379 22.2486 119.907 24.919C120.435 27.5895 121.739 30.0425 123.653 31.9678C125.567 33.8931 128.006 35.2043 130.661 35.7355C133.316 36.2667 136.067 35.9941 138.568 34.9521C141.069 33.9101 143.207 32.1456 144.711 29.8817C146.214 27.6177 147.017 24.9561 147.017 22.2333C147.017 18.5821 145.575 15.0805 143.008 12.4987C140.442 9.91697 136.961 8.46655 133.331 8.46655ZM133.331 29.3318C131.935 29.3318 130.571 28.9154 129.41 28.1354C128.25 27.3555 127.345 26.2468 126.811 24.9497C126.277 23.6527 126.137 22.2254 126.409 20.8484C126.682 19.4715 127.354 18.2066 128.341 17.2139C129.328 16.2212 130.585 15.5451 131.954 15.2712C133.323 14.9973 134.742 15.1379 136.031 15.6751C137.321 16.2124 138.423 17.1223 139.198 18.2896C139.974 19.4569 140.388 20.8293 140.388 22.2333C140.388 24.1159 139.644 25.9214 138.321 27.2527C136.997 28.5839 135.202 29.3318 133.331 29.3318Z" fill="white"/>
              <path d="M20.7436 0V21.7643C20.7436 25.6104 17.6172 28.9962 13.7935 29.0521C12.5923 29.0713 11.406 28.7816 10.3471 28.2105C9.28827 27.6395 8.39188 26.806 7.74288 25.789C7.09388 24.772 6.71376 23.6051 6.63853 22.399C6.5633 21.1929 6.79544 19.9874 7.31298 18.8968C7.83051 17.8061 8.6163 16.8665 9.5959 16.1668C10.5755 15.4671 11.7165 15.0306 12.9107 14.8985C14.105 14.7665 15.313 14.9434 16.4203 15.4123C17.5275 15.8813 18.4975 16.6269 19.2382 17.5784V9.37859C17.3775 8.54823 15.3562 8.14579 13.3214 8.20057C11.2867 8.25535 9.28964 8.76598 7.47586 9.69526C5.66207 10.6245 4.07719 11.9491 2.83667 13.5724C1.59614 15.1957 0.731207 17.0768 0.304863 19.0789C-0.121481 21.081 -0.0984983 23.1534 0.372141 25.1454C0.842781 27.1374 1.74922 28.9987 3.02544 30.5938C4.30166 32.1888 5.91552 33.4775 7.74946 34.3658C9.58341 35.2542 11.5912 35.7199 13.6267 35.729C21.2569 35.7634 27.373 29.3403 27.373 21.6654V0H20.7436Z" fill="#339999"/>
              <path d="M117.403 8.46655H110.774V36H117.403V8.46655Z" fill="#339999"/>
              <path d="M43.467 15.1348H55.6051V8.46655H43.5697C36.1106 8.46655 29.8063 14.3475 29.6053 21.8461C29.5538 23.6863 29.8698 25.5182 30.5345 27.2334C31.1992 28.9486 32.1992 30.5123 33.4753 31.8319C34.7513 33.1516 36.2776 34.2004 37.9637 34.9163C39.6498 35.6322 41.4615 36.0007 43.2917 36H55.6136V29.3318H43.2831C41.4372 29.3276 39.6664 28.5961 38.3503 27.294C37.0343 25.992 36.2779 24.2231 36.2432 22.3666C36.1534 18.3915 39.5108 15.1348 43.467 15.1348Z" fill="#339999"/>
              <path d="M109.264 12.3514L106.711 18.9293V8.46655H100.081L89.389 36H96.0183L100.081 25.5373V36H106.711L109.264 29.4221V12.3514Z" fill="#339999"/>
              <path d="M52.9191 18.8992H43.2831V25.5674H52.9191V18.8992Z" fill="#66CCCC"/>
              <path d="M87.088 36H80.4586L91.1511 8.46655H97.7804L87.088 36Z" fill="#66CCCC"/>
              <path d="M96.0183 36H89.389L100.081 8.46655H106.711L96.0183 36Z" fill="#66CCCC"/>
              <path d="M98.576 6.41885L100.963 0.266846H94.3332L91.9466 6.41885H98.576Z" fill="#FF9933"/>
              <path d="M82.2122 25.5417H77.7684C77.0389 26.9438 75.8642 28.0602 74.4312 28.7135C72.9983 29.3668 71.3893 29.5193 69.8602 29.1469C68.3311 28.7746 66.9697 27.8986 65.9925 26.6584C65.0153 25.4181 64.4784 23.8848 64.4672 22.3023C64.4561 20.7199 64.9713 19.1791 65.9309 17.925C66.8905 16.6709 68.2394 15.7756 69.7631 15.3814C71.2868 14.9873 72.8977 15.1168 74.3398 15.7496C75.7818 16.3823 76.9721 17.4819 77.7214 18.8734L84.7955 18.9036C84.095 16.0696 82.5167 13.5332 80.2888 11.6608C78.0609 9.78851 75.2988 8.67728 72.4018 8.48777C69.5047 8.29826 66.6228 9.04029 64.1726 10.6066C61.7224 12.1729 59.8308 14.4824 58.7713 17.2012C57.7117 19.92 57.5391 22.9072 58.2784 25.7312C59.0177 28.5551 60.6306 31.0694 62.8839 32.9107C65.1373 34.752 67.9143 35.8249 70.8137 35.9742C73.713 36.1235 76.5845 35.3416 79.013 33.7415L82.2122 25.5417Z" fill="#339999"/>
              </g>
              <defs>
              <clipPath id="clip0_103_483">
              <rect width="147" height="36" fill="white"/>
              </clipPath>
              </defs>
              </svg>
            </div>
          </div>
          {/* Container del texto de las politicas de privacidad */}
          <div className="mainClass container">
            <div dangerouslySetInnerHTML={body} />
          </div>
        </main>
      </Layout>
    </PrivacyPolicyStyles>
  );
}

export const Head = ({ data }) => (
  <Seo
    title={`${data.allNodePrivacyPolicy.nodes[0].title} - Decimo Technology Solutions`}
    pathname={`privacy-policy/`}
    description={`${data.allNodePrivacyPolicy.nodes[0].field_body.value}`}
  />
);

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
  .background-gradient{
    margin-left:auto;
    margin-right:auto;
    background: radial-gradient(25% 50% at 20% 110%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
    radial-gradient(35% 50% at 35% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
    radial-gradient(25% 50% at 90% -10%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
    radial-gradient(35% 50% at -10% -10%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);

    width: 100%;
  }

  .decLogo{
    width: 300px;
    height: 450px;
    margin: auto;
    display: flex;
  }

  //Estilo del container del texto de las politicas de privacidad
  .mainClass{
    margin: auto;
  }

  //Estilo para el h2 que viene del ckeditor
  h2{
    font-style:normal;
    font-weight:600;
    font-size:47px;
    margin:0 0 15px;
    color: #323436;
  }

  //Estilo para los paragraph que vienen del ckeditor
  p{
    color: #323436;
    font-style:normal;
    font-size:16px;
  }

  //Estilo para los h3 que vienen del ckeditor
  h3{
    font-style:normal;
    font-weight:500;
    font-size:25px;
    margin:0 0 15px;
    margin-top: 25px;
    color: #323436;
  }

  //Responsive

  @media only screen and (max-width: 1100px){
    .imageContainer{
      height: 300px;
    }
    .background-gradient{
      height: 300px;
    }

    .decLogo{
      max-height: 300px;
      align-items: center;
      margin: auto;
      max-width: 220px;
    }
  }

  @media only screen and (max-width: 1000px){
    .background-gradient{
                  //Color turquesa abajo izquierda
      background: radial-gradient(25% 50% at 20% 120%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color narajan abajo izquierda
      radial-gradient(35% 50% at 40% 130%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
      //Color turquesa arriba derecha
      radial-gradient(25% 50% at 90% -10%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color naranja arriba izquierda
      radial-gradient(35% 50% at -10% -20%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    }
  }

  @media only screen and (max-width: 800px) {
    .background-gradient{
                  //Color turquesa abajo izquierda
      background: radial-gradient(30% 50% at 25% 120%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color narajan abajo izquierda
      radial-gradient(35% 50% at 50% 130%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
      //Color turquesa arriba derecha
      radial-gradient(30% 50% at 90% -20%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color naranja arriba izquierda
      radial-gradient(35% 50% at -10% -20%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    }
  }

  @media only screen and (max-width: 768px) {
    h2{
      font-size: 25px;
    }

    h3{
      font-size: 18px;
    }

    p{
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 587px) {
    .background-gradient{
                  //Color turquesa abajo izquierda
      background: radial-gradient(35% 50% at 20% 120%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color narajan abajo izquierda
      radial-gradient(35% 45% at 60% 130%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
      //Color turquesa arriba derecha
      radial-gradient(30% 50% at 90% -20%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color naranja arriba izquierda
      radial-gradient(35% 50% at -10% -20%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    }
  }

  @media only screen and (max-width: 415px) {
    .background-gradient{
                  //Color turquesa abajo izquierda
      background: radial-gradient(50% 50% at 20% 125%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color narajan abajo izquierda
      radial-gradient(70% 45% at 60% 135%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
      //Color turquesa arriba derecha
      radial-gradient(50% 50% at 90% -30%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
      //Color naranja arriba izquierda
      radial-gradient(35% 50% at -10% -20%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
    }
  }

  @media only screen and (max-width: 380px) {
    .decLogo{
      max-height: 250px;
      align-items: center;
      margin: auto;
      max-width: 180px;
    }

    .imageContainer{
      height: 250px;
    }
    .background-gradient{
      height: 250px;
    }
  }
`

export const query = graphql`
  query {
    allNodePrivacyPolicy {
      nodes {
        title
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

