import { graphql,useStaticQuery } from 'gatsby';
import React, { useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby';
import Swal from 'sweetalert2';
import '../assets/css/sweetalert2-custom.css';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import emailjs from 'emailjs-com';


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

    //Variables que se declaran para poder manejar el formulario de contacto
    const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY;
    const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID;

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


  //Funcion para enviar el form usando mailchimp y emailJS
  async function handleSubmit(event) {
    event.preventDefault();

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error("Error: EmailJS variables de entorno no configuradas correctamente.");
    }
    else{
      console.log("bien")
    }

    if (!checkbox) {
      setError(true);
      return;
    }

    const emailJSParams = {
      from_name: name,
      from_email: email,
      message: message,
      timestamp: timestamp,
    };
  
      console.log("simon");
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailJSParams, EMAILJS_PUBLIC_KEY)
      .then(
        async (response) => {
          console.log('success!', response);
  
          const result = await addToMailchimp(email, {
            FNAME: name,
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
              icon: 'success',
              title: 'Success',
              text: 'Your message has been sent successfully',
            });
          } else {
            setError(true);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'There was an error sending your message',
            });
          }
        },
        (error) => {
          console.log('error!', error);
          setError(true);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error sending your message',
          });
        }
      );
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
              I agree to <Link to='/privacy-policy' className="privacy-link-style">Privacy Policy</Link> and <Link className="terms-link-style">Terms of Use</Link>
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
    flex-direction:column;
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
  }

  .message-text-style{
    display:flex;
    flex-direction:column;
    margin-top: 25px;
  }

  //Estilo de los inputs

  .name-input-style{
    width:100%;
    border-radius: 6px;
    height:48px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding-left: 10px;
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
    }
  }

  .email-input-style{
    width:100%;
    border-radius: 6px;
    height:48px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding-left: 10px;
    &:focus {
        outline: none;
        border-color: #339999;
    }
    ::placeholder{
      color:#ACB4C3;
      font-size: 16px;
    }
  }

  .message-input-style{
    resize:none;
    width:100%;
    border-radius: 6px;
    height:105px;
    border: 1px solid #E7EAEE;
    transition: border .7s ;
    padding: 13px 13px;
    &:focus {
        outline: none;
        border-color: #339999;
    }
    ::placeholder{
      color:#ACB4C3;
      font-size: 16px;
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

  //Estilo de los links de politicas y privacidad y terminos de uso

  .privacy-link-style{
    color: #3C4353;
    font-style: bold;
  }

  .terms-link-style{
    color: black;
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
    }

    .message-input-style{
      width: 290px;
    }

    .name-input-style::placeholder{
      font-size: 13px;
    }

    .email-input-style::placeholder{
      font-size: 13px;
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