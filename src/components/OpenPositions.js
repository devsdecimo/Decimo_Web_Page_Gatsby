import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const query = graphql`
    query {
        allNodeOpenPositions {
            nodes {
                field_description_card
                field_job_area
                field_slogan
                relationships {
                    field_image_card {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                            }
                        }
                    }
                }
            }
        }
        allNodeOpenPositionsSection {
            nodes {
                field_description_section {
                    value
                }
                field_button_section
                field_title_section {
                    value
                }
            }
        }
    }
`

const OpenPositions = (props) => {

    //Destructuracion y declaracion de los nodos que se traen con graphql
    const cardData = useStaticQuery(query).allNodeOpenPositions.nodes;
    const sectionData = useStaticQuery(query).allNodeOpenPositionsSection.nodes[0];
    const title_section = { __html: useStaticQuery(query).allNodeOpenPositionsSection.nodes[0].field_title_section.value }
    const descripcion_section = { __html: useStaticQuery(query).allNodeOpenPositionsSection.nodes[0].field_description_section.value }

    return (
        <Wrapper>
            <div className="background-gradient-color">
                {/* Titulo de toda la seccion */}
                <h2 className="props-title-style">{props.title}</h2>
                <div className="openpositions-container">
                    <div className="section-1">
                        {cardData.map((cardData, index) => {
                            return (
                                <div className="card-section" key={index}>
                                    {/* Imagen de las cards */}
                                    <GatsbyImage
                                        image={getImage(cardData.relationships.field_image_card.localFile)}
                                        alt={cardData.title} className="card-img" />
                                    {/* Area de trabajo asi como el slogan */}
                                    <div className="job-slogan-section">
                                        <h3 className="job-area">
                                            {cardData.field_job_area} <span className="text-separation"></span>
                                        </h3>
                                        <span className="slogan">{cardData.field_slogan}</span>
                                    </div>
                                    {/* Descripcion de las cards */}
                                    <hr className="div-separation"></hr>
                                    <div>
                                        <p className="description-section">
                                            {cardData.field_description_card}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="section-2">
                        {/* Titulo de la seccion #2 */}
                        <div className="title-style">
                            <p dangerouslySetInnerHTML={title_section} />
                        </div>
                        {/* Descripcion de la seccion #2 */}
                        <div className="description-section2">
                            <p dangerouslySetInnerHTML={descripcion_section} />
                        </div>
                        {/* Boton que redirecciona a la pagina de Open Positions Page */}
                        <a href='https://decimoempleo.com/'>
                            <button className="button-style">
                                {sectionData.field_button_section}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    //Estilos del titulo se trae por props
    .props-title-style{
        margin-top:138px;
        margin-bottom:60px;
        font-size:47px;
        max-width:1400px;
        align-items:center;
        margin-left:auto;
        margin-right:auto;
        font-weight: 700;
    }

    //Estilo de las palabras con colores gradient
    span{
        background: linear-gradient(89.63deg, rgb(51, 153, 153, 1) 5.4%, rgba(255, 153, 51) 100.53%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        -webkit-text-fill-color:transparent;
    }

    //Estilos del contener principal
    .openpositions-container{
        display:grid;
        grid-template-columns:1fr 1fr;
        max-width:1400px;
        margin:auto;
        border-radius:16px;
        padding:60px;
        background-color:white;
        box-shadow: 0px 0px 40px 0px rgba(57, 59, 106, 0.15);
    }

    //Difuminado de colores en el background
    .background-gradient-color{
        //Color de abajo a la izquierda
        background: radial-gradient(20% 40% at 5% 105%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
        //Color de arriba a la derecha
        radial-gradient(20% 40% at 78% 40%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
        //Color de arriba en el centro
        radial-gradient(15% 30% at 48% 25%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
        //Color abajo a la izquierda pero naranja
        radial-gradient(20% 40% at 20% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 80%);
        padding-bottom:150px;
    }

    //Linea de color de la parte inferior la cual separa este componente del siguiente
    .line-color{
        background: linear-gradient(89.63deg, rgb(51, 153, 153) 10.13%, rgb(255, 153, 51) 90.06%);
        padding: 3px;
        border:none;
        margin: 0px;
        opacity: 200;
    }

    //Estilos de las Cards
    .card-section{
        border-radius:16px;
        border: 1px solid #E7EAEE;
        padding:25px;
        margin:auto;
        height: 100%;
        width: 100%;
    }

    //Efecto hover de las Cards
    .card-section:hover{
        transition: all 0.2s ease-out;
        box-shadow: 0px 48px 140px rgba(57, 59, 106, 0.15);
        top: -4px;
        background-color: white;
        cursor: pointer;
    }
    

    //Estilos de toda la seccion 1 que contiene las 2 Cards
    .section-1{
        /* display:grid;
        grid-template-columns:repeat(2, 1fr);
        grid-gap:30px;
        margin:auto; */
        gap:30px;
        max-width: 750px;
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        /* grid-auto-rows: minmax(360px, auto); */
    }

    //Estilos de la seccion 2 que contiene el titulo, la descripcion asi como el boton
    .section-2{
        text-align:end;
    }

    //Seccion de estilos de los componentes de las Cards

    //Estilos de las imagenes de las Cards
    .card-img{
        margin:auto;
        max-width:600px;
    }

    //Estilos del tipo de trabajo
    .job-slogan-section h3{
        font-size:23px;
        font-style:normal;
        font-weight:600px;
        margin-top: 32px;
        display:inline-block;
        color:#000B28;
    }

    //Estilo para el slogan
    .slogan {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
    }

    //Estilo para el texto de area de trabajo
    .job-area{
        font-size: 24px;
    }

    //Separacion del slogan y del area de trabajo
    .text-separation{
        border: 1px solid #E7EAEE;
        margin:5px;
        font-size: 15px;
    }

    //Estilos de la descripcion de las cards
    .description-section{
        font-size: 15px;
        font-style:normal;
        color: #586174;
    }

    //Estilo de la linea de separacion entre el slogan asi como el job area y la descripcion
    .div-separation{
        color: solid #E7EAEE;
        margin-bottom:30px;
        margin-left:auto;
        margin-right:auto;
    }

    //Section 2 css

    //Estilo del titulo
    .title-style p{
        font-size:47px;
        font-style:normal;
        font-weight:700 !important;
        line-height:8px ;
        margin-top:55px !important;
        margin-bottom: 50px !important;
    }

    //Estilo de la descripcion de la seccion #2
    .description-section2{
        font-size:16px;
        font-style:normal;
        font-weight:500;
        line-height: 25px !important;
        color: #586174;
        max-width: 320px;
        margin-left: 220px;
    }

    .description-section2 p{
        justify-content: end !important;
    }

    //Estilo del boton
    .button-style{
        background-color: #339999;
        border-radius:88px;
        width:153px;
        height:47px;
        border:none;
        margin-top: 35px;
        cursor:pointer;

        //font button style
        font-style:normal;
        font-size:16px;
        color:white;
        border:solid 1px #339999;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    //Efecto hover del boton
    .button-style:hover{
        background-color: white;
        transition:0.3s;
        color: #339999;
        border:solid 1px #339999;
    }

    //Responsive

    //Reajuste del titulo que se trae por props, la seccion #2 asi como la seccion #1 y le container principal
    @media only screen and (max-width: 1400px){
        
        //Pasa a ser solo una columna
        .openpositions-container{
            display:grid;
            grid-template-columns:1fr;
            max-width:1100px;
            margin:auto;
            border-radius:16px;
            border: 1px solid #E7EAEE;
            padding:60px;
        }

        .props-title-style{
            text-align:center;
        }

        .section-2{
            text-align:center;
            order: -1;
        }

        .section-1{
            margin-left:auto;
            margin-right:auto;
            margin-top: 40px;
        }
        
        .description-section2{
            text-align: center;
            margin-left: 0px;
            margin: auto;
        }

        .button-style{
            margin-top: 53px;
        }

        .background-gradient-color{
            //Color de abajo a la izquierda
            background: radial-gradient(20% 25% at 5% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color de arriba a la derecha
            radial-gradient(20% 40% at 78% 40%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
            //Color de arriba en el centro
            radial-gradient(15% 30% at 48% 25%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color abajo a la izquierda pero naranja
            radial-gradient(20% 40% at 20% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 80%);
            padding-bottom:150px;
        }

    }

    @media only screen and (max-width: 1150px) {

        .openpositions-container{
            max-width:1000px;
            display:grid;
            grid-template-columns:1fr;
            margin:auto;
            border-radius:16px;
            border: 1px solid #E7EAEE;
            padding:60px;
        }


        .background-gradient-color{
            //Color de abajo a la izquierda
            background: radial-gradient(20% 25% at 5% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color de arriba a la derecha
            radial-gradient(20% 40% at 80% 40%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
            //Color de arriba en el centro
            radial-gradient(40% 30% at 48% 25%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%)
            //Color abajo a la izquierda pero naranja
            radial-gradient(20% 40% at 23% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 80%);
            padding-bottom:150px;
        }
    }

    @media  only screen and (max-width: 1000px){
        .openpositions-container{
            max-width:850px;
            display:grid;
            grid-template-columns:1fr;
            margin:auto;
            border-radius:16px;
            border: 1px solid #E7EAEE;
            padding:60px;
        }

        .background-gradient-color{
            //Color de abajo a la izquierda
            background: radial-gradient(20% 25% at 5% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color de arriba a la derecha
            radial-gradient(20% 40% at 80% 40%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
            //Color de arriba en el centro
            radial-gradient(40% 30% at 48% 25%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color abajo a la izquierda pero naranja
            radial-gradient(20% 40% at 25% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 80%);
            padding-bottom:150px;
        }
    }

    //Reajuste de la seccion de las cards, el contenedor principal y la imagen de las cards
    @media only screen and (max-width: 905px){

        //Display block para reacomodar las columnas de las cards
        .openpositions-container{
            display:grid;
            grid-template-columns:1fr;
            margin:auto;
            max-width: 750px;
        }

        .card-section{
            margin:auto;
            max-width: 380px;
        }

        .section-1{
            display: grid;
            grid-template-columns: 1fr;
        }

        .card-img{
            margin:auto;
            max-width: 300px;
            display:flex;
        }

        .background-gradient-color{
            //Color de abajo a la izquierda
            background: radial-gradient(50% 40% at 95% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            radial-gradient(50% 20% at 31% 82%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
            padding-bottom:150px;
        }

        .section-1{
            margin-top: 109px;
        }
    }

    @media only screen and (max-width: 750px) {
        .openpositions-container{
            max-width: 500px;
            /* margin: 10px; */
        }

        .background-gradient-color{
            //Color de abajo a la derecha
            background: radial-gradient(50% 40% at 95% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
            //Color de abajo a la izquierda
            radial-gradient(50% 20% at 31% 82%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
            padding-bottom:150px;
        }

        .props-title-style{
            font-size: 25px;
        }
    }

    //Ajuste del tamano de la fuente del titulo de las Cards
    @media only screen and (max-width: 550px){
        .title-style p{
            margin: 0 0 0 0;
            font-size: 35px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 0px;
        }
    }

    //Ajuste del tamano de la card y la imagen
    @media only screen and (max-width: 525px){
        .card-section{
            margin:auto;
            width: 100%;
        }

        .card-img{
            display: none;
        }

        .openpositions-container{
            margin: 10px;
        }

        .job-slogan-section h3{
            margin-top: 8px;
        }
    }

    //Ajuste del tamano de la seccion #1
    @media only screen and (max-width: 486px){

        .section-1{
            margin:auto;
            align-items:center;
            justify-content:center;
        }

        .section-1{
            margin-top: 100px;
        }

        .openpositions-container{
            margin: 10px;
        }
    }

    //Ajuste del tamano de la fuente del titulo de las Cards
    @media only screen and (max-width: 440px){
        .title-style p{
            font-size:35px;
            line-height:0px !important;
        }

        .section-1{
            margin-top: 100px;
            max-width: 280px;
        }

        .openpositions-container{
            padding: 0;
            padding-bottom: 40px;
            margin: 10px;
        }

        .description-section2{
            max-width: 235px;
            margin: auto;
            display: flex;
        }
    }

`

export default OpenPositions