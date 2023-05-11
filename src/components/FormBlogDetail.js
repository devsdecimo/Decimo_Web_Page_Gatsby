import { graphql,useStaticQuery } from 'gatsby';
import React, { useState, useEffect} from 'react'
import { Link } from 'gatsby';
import { StyleForm } from './FormBlogPage';
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

function FormBlogDetail(){

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

export default FormBlogDetail
