import React, { useState } from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;

    .formContainer{
        display:flex;
        justify-content:center;
        align-items:center;
        width:300px;
    }

    .form{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

    .input , .buttonSubmit{
        padding:0.5rem;
        margin:0.5rem;
        border:none;
        border-radius:5px;
        }

    
`

const Logowanie = () => {
    const URL = "http://localhost:3000/users/"

    const navigate = useNavigate()

    const {isLogged,setIsLogged} = useContext(UserContext)

    const { enqueueSnackbar } = useSnackbar();
    
    const checkIfRegister = async() =>{
        const data = await fetch(URL)
        const res = await data.json()

        const user = res.find(user => user.email == formik.values.email)
        if(typeof user == 'undefined'){
            enqueueSnackbar('Niepoprawne login/hasło')
        }
        if(user.password == formik.values.password ){
            enqueueSnackbar('Użytkownik został zalogowany')
                    setIsLogged(true)
                    navigate("/edycja", { replace: true })
        } else{
            enqueueSnackbar('Niepoprawne login/hasło')
        }

    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: () => {
            console.log(formik.values)
            checkIfRegister()
        }
    })


    return (
        <Wrapper>
            <h1>Logowanie</h1>
            <div className='formContainer'>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' className='input' type="textfield" placeholder='Email' />
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name='password' className='input' type="textfield" placeholder='Password' />
                    <button type='submit' className='buttonSubmit'>Submit</button>
                </form>
            </div>
        </Wrapper>
    )
}

export default Logowanie

