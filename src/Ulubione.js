import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CharacterCard from './CharacterCard'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    width:80%;
    background-color:#FFD5A3;
    margin-top:1rem;
    margin-bottom:1rem;
    padding-top:1rem;
    padding-bottom:1rem;
    border:1px solid black;
    border-radius:20px;


    .Title{
        text-align:center;
        width: 100%;
    }
`
const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
`

const Ulubione = () => {

  const [characters,setCharacters] = useState([])
  const [list, setList] = useState([])

  const URL = "http://localhost:3000/ulubione/"

  const getData = async () => {
    const data = await fetch(URL)
    const characters = await data.json()
    console.log('ulubione',characters)
    setCharacters(characters)
  }

  const renderList = () =>{
    const showList = 
        characters.map((poke,index) => {
        const details = {
            url:poke.url,
            name:poke.name
        }
        return (<Link className='TextDecoration' key={index} to={`/single_pokemon/${details.name}`}>
            <CharacterCard key={index} details={details} />
            </Link>
        )
    })
    setList(showList)
}


  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    renderList()
},[characters])

  return (
    <Container>
      <Wrapper>
        <h1 className='Title'>Ulubione</h1>
        {list}
      </Wrapper>
    </Container>
  )
  }

export default Ulubione
