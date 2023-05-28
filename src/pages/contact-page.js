import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ContactForm from '../components/ContactForm'

const ContactPage = ({data = []}) => {

    //Destructuracion y declaracion de los nodos que se traen con graphql
    const   headerTitle = data.allNodeContact.nodes[0].field_contact_header_title
    const   bodyTitle = { __html: data.allNodeContact.nodes[0].field_body_title.value}
    const   footerTitle = data.allNodeContact.nodes[0].field_contact_footer_title

    return (
        <Wrapper>
            <Layout>
                <main className="contact-container">
                    <div className="contact-section">
                        {/* Seccion #1 que contiene los titulos y descripcion de la pagina de contactos */}
                        <div className="section-1">
                            {/* Titulo de la seccion #1 */}
                            <h1 className="header-title-style">
                                {headerTitle}
                            </h1>
                            {/* Subtitulo de la seccion #1 */}
                            <div className="body-title-style">
                                <h2 dangerouslySetInnerHTML={bodyTitle}/>
                            </div>
                            {/* Descripcion de la seccion #1 */}
                            <h3 className="footer-title-style">
                                {footerTitle}
                            </h3>
                        </div>
                        {/* Section #2 que contiene el formulario de contacto */}
                        <div className="section-2">
                            <ContactForm/>
                        </div>
                    </div>
                </main>
            </Layout>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    //Estilo del contenedor principal
    .contact-container{
        max-width: 100%;
        display:flex;
        justify-content:center;
        margin-bottom: 100px;
        background: radial-gradient(18% 27% at 23% 110%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 100%),
        radial-gradient(15% 33% at 40% 120%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%);
        margin-top: 75px;
    }

    .contact-section{
        display:grid;
        grid-template-columns: auto 500px;
        gap: 120px;
    }

    .section-1{
        margin-top: 150px;
    }

    .section-2{
        background: linear-gradient(180deg, #80CACB 0%, rgba(255, 204, 153, 0.47) 45.12%, rgba(246, 247, 249, 0) 100%, #F6F7F9 100%);
        border-radius: 250px 250px 0px 0px;
        position:relative;
        overflow:visible;
        height:772px;
    }

    .header-title-style{
        font-size: 17px;
        font-style: normal;
        color:#000B28;
        line-height: 16px;
        font-weight:700;
        margin-bottom: 20px;
        height: 16px;
        letter-spacing:0.04em;
    }

    .body-title-style p{
        font-family: 'Cabin';
        font-style: normal;
        font-size:60px;
        letter-spacing: 108%;
        color:#000B28;
        line-height:65px;
        font-weight: 700;
    }
    

    .footer-title-style{
        font-style:normal;
        font-size:16px;
        max-width: 350px;
        margin-top: 30px;
        height: 72px;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 24px;
        color: #586174;
    }

    span{
        background: linear-gradient(89.63deg, rgb(51, 153, 153, 1) 5.4%, rgba(255, 153, 51) 100.53%);
        /* background: linear-gradient(rgba(51, 153, 153, 0.9) 31.87%, rgba(255, 153, 51, 0.702) 48.3%); */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        -webkit-text-fill-color:transparent;
    }

    //Responsive del ContactPage

    @media only screen and (max-width: 1200px){
        .contact-section{
            grid-template-columns: 1fr;
            margin: auto;
            width: 500px;
        }

        .contact-container{
            background-image: none;
            margin-top: 0px;
        }
    }

    @media only screen and (max-width: 600px){

        .body-title-style p{
            font-size: 40px;
            line-height:45px;
        }

        .body-title-style{
            text-align:center;
        }

        .header-title-style{
            text-align:center;
        }

        .footer-title-style{
            text-align:center;
            /* width:230px; */
            margin: auto;
        }
    }

    @media only screen and (max-width: 412px){

        .contact-section{
            grid-template-columns: 1fr;
        }

        .body-title-style{
            text-align:center;
        }

        .header-title-style{
            text-align:center;
        }

        .footer-title-style{
            text-align:center;
            /* width:230px; */
            margin: auto;
        }

        /* .section-2{
            width: 450px;
        } */
    }

    @media only screen and (max-width: 325px){
        .footer-title-style{
            width: 280px;
        }
    }
`

export const query = graphql`
    query {
        allNodeContact {
            nodes {
                field_contact_footer_title
                field_contact_header_title
                field_body_title {
                    value
                }
            }
        }
    }
`

export default ContactPage
