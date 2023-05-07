import { graphql,useStaticQuery } from 'gatsby';
import React, { useState} from 'react'
import { Link } from 'gatsby';
import { StyleForm } from './FormBlogPage';

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

function FormHomePage (){

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
            console.log(error);
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

export default FormHomePage
