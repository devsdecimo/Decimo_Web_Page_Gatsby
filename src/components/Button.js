import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Button = (props) => {
    return (
        <Wrapper>
            <Link to={props.route}>
                <button className='main-btn'>
                    {props.text}
                </button>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.main-btn{
    width:auto;
    height:auto;
    border-radius:88px;
    background-color:#339999;
    border:none;
    color: white;
    padding: 10px 20px 10px 20px;
}
`
export default Button
