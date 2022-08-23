import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import ArenaCharacterCard from './ArenaCharacterCard'
import Button from '@mui/material/Button';
import axios from 'axios'


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

    .List{
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      width:100%;
    }

    .Arena{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width: 90%;
      height:500px;
      margin:1rem;
      border: 1px solid black;
      border-radius:20px;

      .Looser{
      background-color:black;
      color:white;
  }
      .Winner{
      background-color:grey;
  }

    .Modal{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width:100%;
      padding-bottom:5rem;
    }

    .FighterList{
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      align-items:center;
      width:100%;
    }
    }
`
const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
`

const Fighter = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100px;
  height:100px;
  background-color:grey;
`

const Arena = () => {

  const [characters, setCharacters] = useState([])
  const [list, setList] = useState([])
  const [fight, setFight] = useState(false)
  const [winner, setWinner] = useState()
  const [updatePokemon, setUpdatePokemon] = useState()
  // const [ability, setAbility] = useState([])
  // const [sprite, setSprite] = useState([])
  const [present,setPresent] = useState(false)
  const [currentValue, setCurrentValue] = useState([])

  const URL = "http://localhost:3000/arena/"

  const getData = async () => {
    const data = await fetch(URL)
    const characters = await data.json()
    setCharacters(characters)
  }

  const whoWin = () => {
    characters[0].weight * characters[0].base_experience > characters[1].weight * characters[1].base_experience ? setUpdatePokemon(characters[0]) : setUpdatePokemon(characters[1])
    characters[0].weight * characters[0].base_experience > characters[1].weight * characters[1].base_experience ? setWinner(characters[0].name) : setWinner(characters[1].name)
    if (characters[0].weight * characters[0].base_experience == characters[1].weight * characters[1].base_experience) setWinner('Draw')
  }

  const existInUpdateData = async () =>{
    const URL = "http://localhost:3000/updated/"
    const data = await fetch(`${URL}${updatePokemon.id}`)
    const res = await data.json()
    res.hasOwnProperty('id') ? setPresent(true) : setPresent(false)
    console.log('obecny w update : ',res)
  }

  const getCurrentValue = async() => {
    const data = await fetch(`http://localhost:3000/updated/${updatePokemon.id}`)
    const res = await data.json()
    setCurrentValue(res)
  }

  const addToUpdate = async() => {
    const URL = "http://localhost:3000/updated/"
        await axios.post(URL,{
          id: updatePokemon.id,
          name: updatePokemon.name,
          weight:updatePokemon.weight,
          height:updatePokemon.height,
          base_experience:(updatePokemon.base_experience + 10),
          ability:updatePokemon.ability,
          url:`https://pokeapi.co/api/v2/pokemon/${updatePokemon.id}`
        })
      }
      
      const putInUpdate = async() => {
        const URL = "http://localhost:3000/updated/"
        console.log(updatePokemon.base_experience)
        console.log(currentValue.base_experience)
        await axios.put(`${URL}${updatePokemon.id}`,{
          id: updatePokemon.id,
          name: updatePokemon.name,
          weight:updatePokemon.weight,
          height:updatePokemon.height,
          ability:updatePokemon.ability,
          base_experience:(currentValue.base_experience + 10),
          url:`https://pokeapi.co/api/v2/pokemon/${updatePokemon.id}`
        })
        console.log('powinien się wykonać update')
  }



  const renderList = () => {
    const showList =
      characters.map((poke, index) => {
        const details = {
          url: poke.url,
          name: poke.name
        }
        return (
          <ArenaCharacterCard key={index} details={details} />
        )
      })
    setList(showList)
  }

  const deleteFromArena = async(character) =>{
    await axios.delete(`http://localhost:3000/arena/${character.id}`,'')
}

  const handleFight = () => {
    setFight(true)
    whoWin()
  }

  const handleCloseFight = () =>{
    setFight(false)
    present ? putInUpdate() : addToUpdate()
    characters.forEach(character=>{
      deleteFromArena(character)
    })

  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    renderList()
  }, [characters])

  useEffect(()=>{
    existInUpdateData()
    getCurrentValue()
  },[winner])

  return (
    <Container>
      <Wrapper>
        <h1 className='Title'>Arena</h1>
        {characters.length < 1 && <h3>Nie wybrano pokemonów</h3>}
        <div className='List'>
          {list}
        </div>
        <Button onClick={handleFight} variant="contained" disabled={characters.length < 2 ? true : false}>Walcz !</Button>
        <div className='Arena'>
          {fight && <div className='Modal'>
            <p>Zwyciężył pokemon {winner}</p>
            <Button onClick={handleCloseFight} variant="contained">Zamknij</Button>
          </div>}
          <div className='FighterList'>
          {characters.map((poke, index) => {
            return <Fighter className={winner == poke.name ? null : 'Looser'} key={index}>{poke.name}{winner == poke.name ? <p>Winner</p> : null}</Fighter>
          })}
          </div>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Arena
