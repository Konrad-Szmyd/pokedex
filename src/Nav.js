import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#ffffff;
    background-color:#3e4444;

.logo{
    margin:1rem;
}

.links{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-right:1rem;
}

.link{
    color:#ffffff;
    text-decoration:none;
    margin-right:1rem;
}

p{
    cursor: pointer;
}
`

const Nav = () => {

    const {isLogged,setIsLogged} = useContext(UserContext)

    const logOut = () =>{
        setIsLogged(false)
    }

    return (
        <Wrapper>
            <div className='logo'><Link className='link' to='/'>Pokedex</Link></div>
            <div className='links'>
                <Link className='link' to='ulubione'>Ulubione</Link>
                <Link className='link' to='arena'>Arena</Link>
                <Link className='link' to='logowanie'>Logowanie</Link>
                <Link className='link' to='rejestracja'>Rejestracja</Link>
                {isLogged && <Link className='link' to='edycja'>Edycja</Link>}
                {isLogged && <p onClick={logOut}>Wyloguj</p>}
            </div>
        </Wrapper>
    )
}

export default Nav
