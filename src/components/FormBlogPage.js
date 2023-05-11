import { graphql,useStaticQuery } from 'gatsby';
import React, { useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import Swal from 'sweetalert2';

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
    const [timestamp, setTimestamp] = useState('');

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

    useEffect(() => {
        setTimestamp(new Date().toISOString());
    }, [name, email, message, checkbox]);


    //Funcion para poder enviar el formulario de contacto con mailchimp 
    async function handleSubmit(event) {
        event.preventDefault();
    
        if (!checkbox) {
        setError(true);
        return;
        }
    
        const result = await addToMailchimp(email, {
        NAME: name,
        MESSAGE: message,
        TIMESTAMP: timestamp,
        }, {
        allow_duplicates: true,
        });
    
        if (result.result === 'success') {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setCheckbox(false);
        setError(false);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Submitted form',
            text: "Your form has been sent successfully, we'll get in touch soon!",
            showConfirmButton: false,
            timer:3000
        });
        window.setTimeout(function(){ 
            window.location.reload();
        } ,3000);
        } else {
        setError(true);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error sending the form. Please try again',
        });
        }
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
                            <input className="name-input-style" type="text" value={name} onChange={handleNameChange} placeholder={nameLabelInput} required/>
                        </div>
                        <div>
                            <p className="email-text-style">{emailSubtitleForm}</p>
                            <input className="email-input-style" type="email" value={email} onChange={handleEmailChange} placeholder={emailLabelInput} required/>
                        </div>
                        <div>
                            <p className="message-text-style">{messageSubtitleForm}</p>
                            <textarea className="message-input-style" type="text" value={message} onChange={handleMessageChange} placeholder={messageLabelInput} required/>
                        </div>
                        <div className="checkbox-container">
                            <input className="checkbox-style" type="checkbox" value={checkbox} onChange={handleCheckboxChange} id="checkbox" required/>
                            <label for="checkbox" className="checkbox-text-style">
                            I agree to <Link to='/privacy-policy' className="privacy-link-style">Privacy Policy</Link> and <Link to='/privacy-policy' className="terms-link-style">Terms of Use</Link>
                            </label>
                        </div>
                        <button type="submit" className="button-style">{buttonText}</button>
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
        padding-left: 14px;
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 400;
            font-style:normal;
            letter-spacing: -0.09px;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='18' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 15.9484C3.78105 15.9484 0.361115 12.5285 0.361115 8.30954C0.361115 4.09058 3.78105 0.670654 8 0.670654C12.219 0.670654 15.6389 4.09058 15.6389 8.30954C15.6389 12.5285 12.219 15.9484 8 15.9484ZM8 14.4207C9.62077 14.4207 11.1752 13.7768 12.3212 12.6308C13.4673 11.4847 14.1111 9.93031 14.1111 8.30954C14.1111 6.68878 13.4673 5.13439 12.3212 3.98834C11.1752 2.84228 9.62077 2.19843 8 2.19843C6.37924 2.19843 4.82485 2.84228 3.6788 3.98834C2.53274 5.13439 1.88889 6.68878 1.88889 8.30954C1.88889 9.93031 2.53274 11.4847 3.6788 12.6308C4.82485 13.7768 6.37924 14.4207 8 14.4207ZM4.18056 8.30954H5.70834C5.70834 8.91733 5.94978 9.50023 6.37955 9.93C6.80932 10.3598 7.39222 10.6012 8 10.6012C8.60779 10.6012 9.19069 10.3598 9.62046 9.93C10.0502 9.50023 10.2917 8.91733 10.2917 8.30954H11.8194C11.8194 9.32252 11.417 10.294 10.7008 11.0103C9.98447 11.7266 9.01298 12.129 8 12.129C6.98702 12.129 6.01553 11.7266 5.29925 11.0103C4.58296 10.294 4.18056 9.32252 4.18056 8.30954Z' fill='white'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            transform: translate(0.5%,0%);
            padding-left: 25px;
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
        padding-left: 14px;
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color:#FFFFFF;
            font-size: 16px;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='20' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.125 0.744141H14.875C15.0776 0.744141 15.2719 0.824622 15.4152 0.967878C15.5584 1.11114 15.6389 1.30543 15.6389 1.50803V13.7303C15.6389 13.9328 15.5584 14.1271 15.4152 14.2704C15.2719 14.4137 15.0776 14.4941 14.875 14.4941H1.125C0.922407 14.4941 0.728109 14.4137 0.584852 14.2704C0.441595 14.1271 0.361115 13.9328 0.361115 13.7303V1.50803C0.361115 1.30543 0.441595 1.11114 0.584852 0.967878C0.728109 0.824622 0.922407 0.744141 1.125 0.744141ZM14.1111 3.9815L8.055 9.40511L1.88889 3.9647V12.9664H14.1111V3.9815ZM2.27924 2.27192L8.0466 7.36095L13.7307 2.27192H2.27924Z' fill='white'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            transform: translate(0.5%,0%);
            padding-left: 25px;
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
        padding: 13px 14px;
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        &:focus {
            outline: none;
            border-color: #FF9933;
        }
        ::placeholder{
            color:#FFFFFF;
            font-size: 16px;
            padding-left: 0.2em;
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
        margin-top: 10px;
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
        margin-top: 50px;
        margin-bottom: 130px;
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