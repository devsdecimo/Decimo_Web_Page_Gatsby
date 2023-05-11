import { graphql,useStaticQuery } from 'gatsby';
import React, { useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby';
import Swal from 'sweetalert2';
import '../assets/css/sweetalert2-custom.css';
import addToMailchimp from 'gatsby-plugin-mailchimp';


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
function ContactForm () {

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
    <Wrapper>
      <div className="main-container">
        <h2 className="main-title">{titleForm}</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="name-container">
            <p className="name-text-style">{nameSubtitleForm}</p>
            <input className="name-input-style" name="user_name" type="text" value={name} onChange={handleNameChange}   placeholder={nameLabelInput}/>
          </div>
          <div className="email-container">
            <p className="email-text-style">{emailSubtitleForm}</p>
            <input className="email-input-style" name="user_email" type="email" value={email} onChange={handleEmailChange} placeholder={emailLabelInput}/>
          </div>
          <div className="message-container">
            <p className="message-text-style">{messageSubtitleForm}</p>
            <textarea className="message-input-style" name="message" type="message" value={message} onChange={handleMessageChange} placeholder={messageLabelInput}/>
          </div>
          <div className="checkbox-container">
            <input className="checkbox-style" id="checkbox" value={checkbox} type="checkbox"  onChange={handleCheckboxChange}  required></input>
            <label for="checkbox" className="checkbox-text-style">
              I agree to <Link to='/privacy-policy' className="privacy-link-style">Privacy Policy</Link> and <Link to='/privacy-policy' className="terms-link-style">Terms of Use</Link>
            </label>
          </div>
          <button type="submit" value="Send" className="button-style">{buttonText}</button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  .main-container{
    transform: translate(25%, 25%)
  }
  

  .form-container{
    display:flex;
    flex-direction:column;
  }

  .main-title{
    margin-top: 50px;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #000000;
  }

  //Estilo de los titulos de los inputs
  .name-text-style{
    display:flex;
    gap:4px;
    font-style:normal;
    font-size:16px;
    font-weight: 500;
    color: #07090D;
    margin-top: 20px;
  }

  .email-text-style{
    display:flex;
    flex-direction:column;
    margin-top: 25px;
    font-weight: 500;
  }

  .message-text-style{
    display:flex;
    flex-direction:column;
    margin-top: 25px;
    font-weight: 500;
  }

  //Estilo de los inputs

  .name-input-style{
    width:100%;
    border-radius: 6px;
    height:48px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding-left:14px;
    &:focus {
        outline: none;
        border-color: #339999;
    }
    ::placeholder{
      color:#ACB4C3;
      font-size: 16px;
      font-weight: 400;
      font-style:normal;
      letter-spacing: -0.09px;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='18' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.00022 15.6389C3.78126 15.6389 0.361328 12.2189 0.361328 7.99997C0.361328 3.78101 3.78126 0.361084 8.00022 0.361084C12.2192 0.361084 15.6391 3.78101 15.6391 7.99997C15.6391 12.2189 12.2192 15.6389 8.00022 15.6389ZM8.00022 14.1111C9.62099 14.1111 11.1754 13.4672 12.3214 12.3212C13.4675 11.1751 14.1113 9.62074 14.1113 7.99997C14.1113 6.37921 13.4675 4.82482 12.3214 3.67876C11.1754 2.53271 9.62099 1.88886 8.00022 1.88886C6.37945 1.88886 4.82506 2.53271 3.67901 3.67876C2.53295 4.82482 1.88911 6.37921 1.88911 7.99997C1.88911 9.62074 2.53295 11.1751 3.67901 12.3212C4.82506 13.4672 6.37945 14.1111 8.00022 14.1111ZM4.18077 7.99997H5.70855C5.70855 8.60776 5.94999 9.19066 6.37976 9.62043C6.80953 10.0502 7.39243 10.2916 8.00022 10.2916C8.608 10.2916 9.1909 10.0502 9.62067 9.62043C10.0504 9.19066 10.2919 8.60776 10.2919 7.99997H11.8197C11.8197 9.01295 11.4173 9.98444 10.701 10.7007C9.98469 11.417 9.0132 11.8194 8.00022 11.8194C6.98724 11.8194 6.01575 11.417 5.29946 10.7007C4.58318 9.98444 4.18077 9.01295 4.18077 7.99997Z' fill='%23ACB4C3'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      transform: translate(0.5%,0%);
      padding-left: 25px;
    }
  }

  .email-input-style{
    width:100%;
    border-radius: 6px;
    height:48px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding-left: 14px;
    &:focus {
        outline: none;
        border-color: #339999;
    }
    ::placeholder{
      color:#ACB4C3;
      font-size: 16px;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='20' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.12522 0.125H14.8752C15.0778 0.125 15.2721 0.205481 15.4154 0.348738C15.5586 0.491995 15.6391 0.686293 15.6391 0.888889V13.1111C15.6391 13.3137 15.5586 13.508 15.4154 13.6513C15.2721 13.7945 15.0778 13.875 14.8752 13.875H1.12522C0.922621 13.875 0.728323 13.7945 0.585066 13.6513C0.441809 13.508 0.361328 13.3137 0.361328 13.1111V0.888889C0.361328 0.686293 0.441809 0.491995 0.585066 0.348738C0.728323 0.205481 0.922621 0.125 1.12522 0.125ZM14.1113 3.36236L8.05522 8.78597L1.88911 3.34556V12.3472H14.1113V3.36236ZM2.27945 1.65278L8.04681 6.74181L13.7309 1.65278H2.27945Z' fill='%23ACB4C3'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      transform: translate(0.5%,0%);
      padding-left: 25px;
    }
  }

  .message-input-style{
    resize:none;
    width:100%;
    border-radius: 6px;
    height:105px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding: 14px 14px;
    &:focus {
        outline: none;
        border-color: #339999;
    }
    ::placeholder{
      color:#ACB4C3;
      font-size: 16px;
      padding-left: 0.2em;
      padding-top: 2px;
      transform: translate(0%, -6%);
    }
  }

  //Estilo del checkbox

  .checkbox-container{
    margin-top: 24px;
  }

  .checkbox-text-style{
    color: #586174;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
  }

  .checkbox-style{
    display:none;
  }

  .checkbox-container input + label:before{
    content: '';
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
    background-repeat: no-repeat;
    background-color: #339999;
    border-color: #339999;
  }

  .checkbox-container:hover input + ::before{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='gray' height='13' viewBox='0 60 885 960' width='13'%3e%3cpath d='M395 803 194 601l83-83 118 117 288-287 83 84-371 371Z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
  }

  .checkbox-container:hover input:checked + label:before{
    background-color: #2a7979;
    border-color: #2a7979;
  }

  //Estilo de los links de politicas y privacidad y terminos de uso

  .privacy-link-style{
    color: #3C4353;
    font-style: bold;
    font-weight: 600;
  }

  .terms-link-style{
    color: #3C4353;
    font-style: bold;
    font-weight: 600;
  }

  //Estilo del boton

  .button-style{
    background-color: #339999;
    border-radius:88px;
    height:55px;
    border:none;
    margin-top: 24px;
    cursor:pointer;

    //font button style
    font-style:normal;
    font-weight:bold;
    font-size:15px;
    color:white;
    border:solid 1px #339999;
  }

  .button-style:hover{
    background-color: white;
    transition:0.3s;
    color: #339999;
    border:solid 1px #339999;
  }

  @media only screen and (max-width: 850px){

    .main-container{
      transform: none;
    }

    .main-title{
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 80px;
    }

    .name-text-style, .email-input-style, .message-input-style{
      margin-left: auto;
      margin-right: auto;
      text-align: start;
    }

    .name-input-style, .email-input-style, .message-input-style{
      width: 410px;
      display: flex;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }

    .name-container{
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 15px;
    }

    .email-container{
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }

    .message-container{
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }

    .checkbox-container{
      text-align: center;
    }

    .button-style{
      width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media only screen and (max-width: 602px){

    .main-title{
      font-size: 38px;
    }

    .name-input-style, .email-input-style, .message-input-style{
      width: 350px;
    }

    .form-container{
      padding-left: 40px;
      padding-right: 40px;
    }
    
    .button-style{
      width: 250px;
    }
  }

  @media only screen and (max-width: 495px){

    .main-title{
      font-size: 35px;
    }

    .name-text-style, .email-text-style, .message-text-style{
      font-size: 14px;
    }

    .name-input-style, .email-input-style{
      width: 330px;
      height: 40px;
      font-size: 14px;
    }

    .message-input-style{
      width: 330px;
      font-size: 14px;
    }

    .name-input-style::placeholder{
      font-size: 14px;
    }

    .email-input-style::placeholder{
      font-size: 14px;
    }

    .message-input-style::placeholder{
      font-size: 14px;
    }

    .form-container{
      padding-left: 30px;
      padding-right: 30px;
    }

    .button-style{
      width: 235px;
    }
  }

  @media only screen and (max-width: 420px){

    .main-title{
      font-size: 32px;
    }

    .name-input-style, .email-input-style{
      height: 35px;
      width: 290px;
      padding-left: 10px;
    }

    .message-input-style{
      width: 290px;
    }

    .name-input-style::placeholder{
      font-size: 13px;
      background-image: url("data:image/svg+xml,%3Csvg width='15' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.00022 15.6389C3.78126 15.6389 0.361328 12.2189 0.361328 7.99997C0.361328 3.78101 3.78126 0.361084 8.00022 0.361084C12.2192 0.361084 15.6391 3.78101 15.6391 7.99997C15.6391 12.2189 12.2192 15.6389 8.00022 15.6389ZM8.00022 14.1111C9.62099 14.1111 11.1754 13.4672 12.3214 12.3212C13.4675 11.1751 14.1113 9.62074 14.1113 7.99997C14.1113 6.37921 13.4675 4.82482 12.3214 3.67876C11.1754 2.53271 9.62099 1.88886 8.00022 1.88886C6.37945 1.88886 4.82506 2.53271 3.67901 3.67876C2.53295 4.82482 1.88911 6.37921 1.88911 7.99997C1.88911 9.62074 2.53295 11.1751 3.67901 12.3212C4.82506 13.4672 6.37945 14.1111 8.00022 14.1111ZM4.18077 7.99997H5.70855C5.70855 8.60776 5.94999 9.19066 6.37976 9.62043C6.80953 10.0502 7.39243 10.2916 8.00022 10.2916C8.608 10.2916 9.1909 10.0502 9.62067 9.62043C10.0504 9.19066 10.2919 8.60776 10.2919 7.99997H11.8197C11.8197 9.01295 11.4173 9.98444 10.701 10.7007C9.98469 11.417 9.0132 11.8194 8.00022 11.8194C6.98724 11.8194 6.01575 11.417 5.29946 10.7007C4.58318 9.98444 4.18077 9.01295 4.18077 7.99997Z' fill='%23ACB4C3'/%3E%3C/svg%3E");
      padding-left: 24px;
      transform: translate(1%,-1%);
    }

    .email-input-style::placeholder{
      font-size: 13px;
      background-image: url("data:image/svg+xml,%3Csvg width='14' height='17' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.12522 0.125H14.8752C15.0778 0.125 15.2721 0.205481 15.4154 0.348738C15.5586 0.491995 15.6391 0.686293 15.6391 0.888889V13.1111C15.6391 13.3137 15.5586 13.508 15.4154 13.6513C15.2721 13.7945 15.0778 13.875 14.8752 13.875H1.12522C0.922621 13.875 0.728323 13.7945 0.585066 13.6513C0.441809 13.508 0.361328 13.3137 0.361328 13.1111V0.888889C0.361328 0.686293 0.441809 0.491995 0.585066 0.348738C0.728323 0.205481 0.922621 0.125 1.12522 0.125ZM14.1113 3.36236L8.05522 8.78597L1.88911 3.34556V12.3472H14.1113V3.36236ZM2.27945 1.65278L8.04681 6.74181L13.7309 1.65278H2.27945Z' fill='%23ACB4C3'/%3E%3C/svg%3E");
      transform: translate(1%,-1%);
    }

    .message-input-style::placeholder{
      font-size: 13px;
    }

    .name-text-style, .email-text-style, .message-text-style{
      font-size: 13px;
    }


    .button-style{
      font-size: 14px;
      width: 215px;
      height: 50px;
    }

    .checkbox-container{
      width: 300px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    .checkbox-text-style{
      font-size: 14px;
    }

  }

`

export default ContactForm