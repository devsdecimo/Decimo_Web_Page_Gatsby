import React, {useState} from 'react'
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../assets/css/sweetalert2-custom.css';

async function enviarDatos(datos){
    try{
        const response = await fetch("https://dev-decimo-pantheon.pantheonsite.io/webform_rest/submit",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(process.env.GATSBY_DRUPAL_USERNAME + ":" + process.env.GATSBY_DRUPAL_PASSWORD)
                // "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(datos),
        });
        const responseJson = await response.json();
        console.log("Respuesta del server", responseJson);
    } catch (error){
        console.error("Error al enviar los datos", error);
    }
}
const Newsletter = () => {
    const [email, setEmail] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (!email) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter your email address!',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
  
      const datos = {
        "webform_id": "subscription",
        "email": email,
      };
  
      enviarDatos(datos);
    };

const alert = () => {
    const email = document.getElementById('email').value; // Obtén el valor del campo de entrada de correo electrónico
    
    // Expresión regular para verificar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) { // Verifica si el correo electrónico cumple con el formato esperado
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New Subscription',
        text: 'You have successfully subscribed to Decimo Technology',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
        return(
        <Wrapper>
            <div className='subscribe'>
            <form className='subscribe-form' onSubmit={handleSubmit}>
                    <input placeholder='your email here' className='subsField' type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <button onClick={alert} className='subsButton' type="submit"><p className='substext'>Subscribe</p></button>
            </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    .subsField{
        box-sizing: border-box;
        position: absolute;
        width: 400px;
        height: 45px;
        background: rgba(217, 217, 217, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0px;
        border-radius: 10px 0px 0px 10px;
        font-family: 'Cabin';
        font-style: normal;
        font-size: 16px;
        line-height: 24px;
        padding-left: 20px;
        letter-spacing: -0.02em;
    }

    .subsButton{
        width: 108px;
        height: 45px;
        cursor: pointer;
        margin-left: auto;
        background: #000B28;
        border-radius: 10px 0px 0px 10px;
        border: #000B28;
        transform: rotate(-180deg);
        padding-top: 10.5px;
        transition: background-color 200ms ease-out 100ms;
        margin-left: 395px;
    }
    .subsButton:hover{
        background: #339999;
        border: #339999;
        padding-top: 10.5px;
    }
    .subscribe{
        padding-top: 30px;
        margin-bottom: 100px;
    }
    .substext{
        margin: 0;
        transform: rotate(180deg);
        padding-top: 10px;
        font-family: 'Cabin';
        font-style: normal;
        font-size: 16px;
        line-height: 24px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #FFFFFF;
    }
    .subscribe-form {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    @media only screen and (max-width: 1600px){
        .subscribe{
            display: flex;
            justify-content: center;
        }
        .subscribe-form{
            margin: 0 auto;
        }
    }
    @media only screen and (max-width: 428px){
        .subscribe{
            display: flex;
            justify-content: center;
        }
        .subscribe-form{
            margin: 0 auto;
        }
        .subsField{
            width: 255px;
        }
        .subsButton{
            margin-left: 250px;
        }
    }
    @media only screen and (max-width: 360px){
        .subscribe{
            display: flex;
            justify-content: center;
        }
        .subscribe-form{
            margin: 0 auto;
        }
        .subsField{
            width: 225px;
        }
        .subsButton{
            margin-left: 200px;
        }
    }
`
export default Newsletter;