import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import axios from 'axios'

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    .formContainer{
        display:flex;
        justify-content:center;
        align-items:center;
        width:600px;
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

const Rejestracja = () => {
    const URL = "http://localhost:3000/users/"

    const register = async() =>{
        await axios.post(URL,{
            name:formik.values.firstName,
            email:formik.values.email,
            password:formik.values.password
        })
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: "",
            rePassword:""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(),
            email: Yup.string().email('Niepoprawny format adresu email'),
            password: Yup.string().required().matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+~|{}:;<>/])[A-Za-z\d$@$!%*?&+~|{}:;<>\.\,/]{8,}/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords does not match')
        }),
        onSubmit: () => {
            console.log(formik.values)
            register()
            alert('udało się')
        }

       

    })


    return (
        <Wrapper>
            <h1>Rejestracja</h1>
            <div className='formContainer'>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='firstName' name='firstName' className='input' type="textfield" placeholder='Name' />
                    {formik.errors.firstName ? <p>Pole wymagane</p> : null}
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' className='input' type="textfield" placeholder='Email' />
                    {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name='password' className='input' type="textfield" placeholder='Password' />
                    {formik.errors.password ? <p>{formik.errors.password}</p> : null}
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='rePassword' name='rePassword' className='input' type="textfield" placeholder='ConfirmPassword' />
                    {formik.errors.rePassword ? <p>{formik.errors.rePassword}</p> : null}
                    <button type='submit' className='buttonSubmit'>Submit</button>
                </form>
            </div>
        </Wrapper>
    )
}

export default Rejestracja
