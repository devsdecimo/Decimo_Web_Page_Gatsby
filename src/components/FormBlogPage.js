import { graphql,useStaticQuery } from 'gatsby';
import React, { useState} from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby';

//Query del nodo sobre el formulario de contacto
export const query = graphql`
    query {
        allNodeContactForm {
        nodes {
            field_title_form
            field_name_form
            field_name_label
            field_email_form
            field_email_label
            field_message_form
            field_message_label
            field_button_form
        }
        }
    }
`

function FormBlogPage(){

    //Constantes que contienen titulos y subtitulos del formulario de contacto
    const titleForm = useStaticQuery(query).allNodeContactForm.nodes[0].field_title_form;
    const nameSubtitleForm = useStaticQuery(query).allNodeContactForm.nodes[0].field_name_form;
    const nameLabelInput = useStaticQuery(query).allNodeContactForm.nodes[0].field_name_label;
    const emailSubtitleForm = useStaticQuery(query).allNodeContactForm.nodes[0].field_email_form;
    const emailLabelInput = useStaticQuery(query).allNodeContactForm.nodes[0].field_email_label;
    const messageSubtitleForm = useStaticQuery(query).allNodeContactForm.nodes[0].field_message_form;
    const messageLabelInput = useStaticQuery(query).allNodeContactForm.nodes[0].field_message_label;
    const buttonText = useStaticQuery(query).allNodeContactForm.nodes[0].field_button_form;

    //Variables o atributos que se declaran para poder manejar el formulario de contacto
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [checkbox,setCheckbox] = useState(false);
    const [success,setSuccess] = useState(false);
    const [error, setError] = useState(false);

    function handleNameChange(event){
        setName(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handleMessageChange(event){
        setMessage(event.target.value);
    }

    function handleCheckboxChange(event){
        setCheckbox(event.target.value);
    }

    function handleSubmit(event){

        event.preventDefault();

        const formData = {
            "webform_id": "contact",
            "name": name,
            "email": email,
            "message": message,
            "checkbox": checkbox
        };
        fetch('https://dev-decimo-pantheon.pantheonsite.io/webform_rest/submit', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Basic " + btoa(process.env.GATSBY_DRUPAL_USERNAME + ":" + process.env.GATSBY_DRUPAL_PASSWORD)
        },
        body: JSON.stringify(formData),
        })
        .then((response)=>{
            if(response.ok) {
                setSuccess(true);
            } else {
                setError(true);
            }
        })
        .catch((error) => {
            setError(true);
        });
    }

    return (
        <StyleForm>
            <hr className="line-color"/>
            <div className="main-container">
                <div className="second-container">
                    <h2 className="main-title">{titleForm}</h2>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div>
                            <p className="name-text-style">{nameSubtitleForm}</p>
                            <input className="name-input-style" type="text" value={name} onChange={handleNameChange} placeholder={nameLabelInput}/>
                        </div>
                        <div>
                            <p className="email-text-style">{emailSubtitleForm}</p>
                            <input className="email-input-style" type="email" value={email} onChange={handleEmailChange} placeholder={emailLabelInput}/>
                        </div>
                        <div>
                            <p className="message-text-style">{messageSubtitleForm}</p>
                            <textarea className="message-input-style" type="text" value={message} onChange={handleMessageChange} placeholder={messageLabelInput}/>
                        </div>
                        <div className="checkbox-container">
                            <input className="checkbox-style" type="checkbox" value={checkbox} onChange={handleCheckboxChange} id="checkbox" />
                            <label for="checkbox" className="checkbox-text-style">
                            I agree to <Link to='/privacy-policy' className="privacy-link-style">Privacy Policy</Link> and <Link className="terms-link-style">Terms of Use</Link>
                            </label>
                        </div>
                        <button type="submit" className="button-style">{buttonText}</button>
                        {success && <p>Form submitted susccessfully!</p>}
                        {error && <p>Error</p>}
                    </form>
                </div>
            </div>
        </StyleForm>
    )
}

export const StyleForm = styled.div`

    .background-gradient-color{
        //Color de abajo a la izquierda
        background: radial-gradient(20% 40% at 5% 100%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%),
        //Color de arriba a la derecha
        radial-gradient(20% 40% at 78% 40%, rgba(255, 153, 51, 0.35) 0%, rgba(255, 204, 153, 0) 100%),
        //Color de arriba en el centro
        radial-gradient(15% 30% at 48% 25%, rgba(51, 153, 153, 0.35) 0%, rgba(128, 202, 203, 0) 80%);
        padding-bottom:150px;
    }

    .main-container{
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
        background-color: #000B28;
    }

    .line-color{
        background: linear-gradient(89.63deg, #339999 10.13%, #FF9933 90.06%);
        padding: 3px;
        border:none;
        margin: 0px;
        opacity: 200;
        margin-top: 150px;
        margin-bottom: 0px;
    }

    .form-container{
        display: flex;
        flex-direction: column;
        margin:auto;
    }

    .main-title{
        margin-top: 100px;
        font-size: 43px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #FFFFFF;
    }

    //Estilos de los titulos de los inputs//

    //Estilo del titulo name
    .name-text-style{
        flex-direction:column;
        gap:4px;
        font-style:normal;
        font-size:16px;
        font-weight: 500;
        color: #FFFFFF;
        margin-top: 20px;
    }
    
    //Estilo del titulo email
    .email-text-style{
        display:flex;
        flex-direction:column;
        margin-top: 25px;
        color: #FFFFFF;
        font-style:normal;
        font-size:16px;
        font-weight: 500;
    }
    
    //Estilo del titulo message
    .message-text-style{
        display:flex;
        flex-direction:column;
        margin-top: 25px;
        color: #FFFFFF;
        font-style:normal;
        font-size:16px;
        font-weight: 500;
    }

    //Estilos de los inputs //

    //Estilos del input name
    .name-input-style{
        width: 671px;
        border-radius: 6px;
        height:48px;
        border: 1px solid #FFFFFF;
        transition: border .7s ;
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color:#ACB4C3;
            font-size: 16px;
            font-weight: 400;
            font-style:normal;
            letter-spacing: -0.09px;
        }
    }

    //Estilos del input email
    .email-input-style{
        margin:auto;
        width: 671px;
        border-radius: 6px;
        height:48px;
        border: 1px solid #FFFFFF;
        transition: border .7s ;
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color:#ACB4C3;
            font-size: 16px;
        }
    }

    //Estilo del input message
    .message-input-style{
        resize:none;
        width: 671px;
        border-radius: 6px;
        height:105px;
        border: 1px solid #E7EAEE;
        transition: border .7s ;
        padding: 13px 13px;
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color:#ACB4C3;
            font-size: 16px;
        }
    }

    //Estilo de los links de politicas y privacidad y terminos de uso

    .privacy-link-style{
        color: #339999;
        font-style: bold;
    }

    .terms-link-style{
        color: #339999;
    }

    //Estilo del checkbox

    .checkbox-container{
        margin-top: 24px;
    }

    .checkbox-text-style{
        color: #FFFFFF;
        font-style: normal;
        font-size: 16px;
    }

    .checkbox-style{
        display:none;
    }

    //Estilo del checkbox para hacerlo desde 0
    .checkbox-container input + label:before{
        content:'';
        cursor: pointer;
        width: 16px;
        height: 16px;
        border: 1px solid #C3C9D5;
        border-radius: 3px;
        display: inline-block;
        background: #FFFFFF;
        margin-right: 16px;
        vertical-align: middle;
        margin-bottom: 3px;
        transition-property: background-color;
        transition-duration: .2s;
        
    }

    .checkbox-container input:checked + label:before{
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='white' height='13' viewBox='0 60 885 960' width='13'%3e%3cpath d='M395 803 194 601l83-83 118 117 288-287 83 84-371 371Z'/%3e%3c/svg%3e");
        background-color: #339999;
        border-color: #339999;
    }

    .checkbox-container:hover input + ::before{
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='gray' height='13' viewBox='0 60 885 960' width='13'%3e%3cpath d='M395 803 194 601l83-83 118 117 288-287 83 84-371 371Z'/%3e%3c/svg%3e");
    }

    .checkbox-container:hover input:checked + label:before{
        background-color: #2a7979;
        border-color: #2a7979;
    }


    //Estilo del boton
    .button-style{
        margin-left:auto;
        margin-right:auto;
        width: 380px;
        background-color: #339999;
        border-radius:88px;
        height:50px;
        border:none;
        margin-top: 24px;
        margin-bottom: 100px;
        cursor:pointer;

        //font button style
        font-style:normal;
        font-weight:bold;
        font-size:15px;
        color:white;
        border:solid 1px #339999;
    }

    //Efecto hover del boton
    .button-style:hover{
        background-color: white;
        transition:0.3s;
        color: #339999;
        border:solid 1px #339999;
    }

    //Responsive del formulario de contacto

    @media only screen and (max-width: 685px){

        //Responsive de los titulos

        //Se ajusta el tamaño del titulo principal
        .main-title{
            margin-left: auto;
            margin-right: auto;
            margin-top: 70px;
            text-align:center;
        }

        //Se ajusta el tamaño de los titulos de los inputs
        .name-text-style, .email-text-style, .message-text-style{
            margin-left: auto;
            margin-right: auto;
            /* text-align: center; */
            text-align: start;
        }

        //Responsive de los inputs 
        .name-input-style, .email-input-style, .message-input-style{
            width: 490px;
            display:flex;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
        }
    }

    @media only screen and (max-width: 510px){

        //Responsive de los inputs 
        .name-input-style, .email-input-style, .message-input-style{
            width: 400px;
            display:flex;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
        }

        //Se ajusta el tamaño de la checkbox
        .checkbox-container{
            margin-left: auto;
            margin-right: auto;
            text-align:center;
        }

        //Se ajusta el tamaño del boton
        .button-style{
            width: 295px;
        }
    }

    @media only screen and (max-width: 420px){

        //Se ajusta el tamaño de los inputs
        .name-input-style, .email-input-style, .message-input-style{
            width: 340px;
            display:flex;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
        }

        //Se ajusta el tamaño del boton
        .button-style{
            width: 240px;
        }

        //Se ajusta el tamaño de la checkbox
        .checkbox-container{
            width: 300px;
        }
    }
`

export default FormBlogPage