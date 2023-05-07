import * as React from "react"
import Layout from "../components/Layout"
import styled from "styled-components";
import { graphql } from "gatsby";
import { Link } from "gatsby";


const NotFoundPage = ({data = []}) => {

  //Destructuracion y declaracion de los nodos que se traen con graphql
  const title = data.allNodeError.nodes[0].field_error_title
  const subtitle = data.allNodeError.nodes[0].field_error_subtitle
  const error_button = data.allNodeError.nodes[0].field_error_button

  return (
    <Wrapper>
      <Layout>
        <main>
          {/* Container principal */}
          <div className="container">
            {/* Titulo de la pagina de error */}
            <h1 className="title_style">
              {title}
            </h1>
            {/* Subtitulo de la pagina de error */}
            <h2 className="subtitle_style">
              {subtitle}
            </h2>
            {/* Boton para poder regresar a la pagina de inicio */}
            <Link to="/">
              <button className="button_style">
                {error_button}
              </button>
            </Link>
          </div>
        </main>
      </Layout>
    </Wrapper>
  )
}

const Wrapper = styled.main`

  //Estilo del container principal
  .container{
    text-align:center;
    margin-top: 100px;
    margin-bottom: 230px;
  }

  //Estilo del titulo
  .title_style{
    font-style:normal;
    font-weight:bold;
    font-size:50px;
    margin:0 0 10px;
    color: #323436;
  }

  //Estilo del subtitulo
  .subtitle_style{
    font-style:normal;
    font-weight:normal;
    font-size:20px;
    margin:0 0 40px;
    color: #323436;
  }

  //Estilo del boton
  .button_style{
    background-color: #339999;
    border-radius:88px;
    width:205px;
    height:60px;
    border:none;
    margin-top: 35px;
    cursor:pointer;

    //font button style
    font-style:normal;
    font-weight:bold;
    font-size:15px;
    color:white;
    border:solid 1px #339999;
  }

  //Efecto hover del boton
  .button_style:hover{
    background-color: white;
    /* background-color: white; */
    transition:0.3s;
    color: #339999;
    border:solid 1px #339999;
  }
`

export const query = graphql`
  query {
    allNodeError {
      nodes {
        field_error_title
        field_error_subtitle
        field_error_button
      }
    }
  }
`

export default NotFoundPage


export const Head = () => <title>Not found</title>
