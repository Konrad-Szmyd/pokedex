import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import axios from 'axios';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  .DetailsWrapper{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width: 100%;
  }

  .Details{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }

  .Name{
    display:flex;
    justify-content:center;
    align-items:center;
    margin: 3rem;
    font-size:1.3rem;
    font-weight:600;
  }

  .DetailsPokemon{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width: 400px;
  }

  .DetailsPokemonWrapper{
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;

    p{
      text-align:center;
    }

    .ColorGrey{
      color:#d5e1df;
    }
    .FontBold{
      font-weight:600;
    }
  }

  .Link{
    width: 75%;
    border:1px solid #c94c4c;
    text-decoration:none;
    text-align:center;
    background-color:#e6e2d3;
    padding: 0.5rem;;
    margin:1rem;
  }

  .SuccessColor{
    color:red;
    margin-left:2rem;
  }
  .NormalColor{
    color:black;
    margin-left:2rem;
  }
`

const SinglePokemon = () => {
  const { id } = useParams()
  const URL = "https://pokeapi.co/api/v2/pokemon/"
  const ADD_URL ="http://localhost:3000/ulubione/"
  const ARENA_URL ="http://localhost:3000/arena/"

  const [character, setCharacter] = useState([])
  const [favorite, setFavorite] = useState()
  const [ability, setAbility] = useState([])
  const [sprite, setSprite] = useState([])
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState('true')
  const [update,setUpdate] = useState([])

  const [base_experience,setBase_Experience] = useState([])
    const [pokemonName, setPokemonName] = useState([])
    const [height, setHeight] = useState([])
    const [weight, setWeight] = useState([])

  const getData = async () => {
    const data = await fetch(`${URL}${id}`)
    const character = await data.json()
    setCharacter(character)
    console.log(character)

    setAbility(character.abilities[0].ability.name)
    setSprite(character.sprites.front_default)
    setBase_Experience(character.base_experience)
    setWeight(character.weight)
    setHeight(character.height)
    setPokemonName(character.name)
  }

  const handlerFavorite = () => {
    favorite? deleteFromFavorite() : addToFavorite()
  }

  const addToFavorite = async() => {
    setFavorite(true)
    await axios.post(ADD_URL,{
      id: character.id,
      name: character.name,
      weight:character.weight,
      height:character.height,
      base_experience:character.base_experience,
      ability:ability,
      url:`https://pokeapi.co/api/v2/pokemon/${character.id}`
    })
  }

  const checkEmptyArena = async() =>{
    const data = await fetch(ARENA_URL)
    const res = await data.json()
    console.log('Na arenie',res.length)

    res.length < 2? setEmpty(true) : setEmpty(false)
  }

  const handleArena = ()=>{
    empty? addToArena() : setEmpty(false)
  }

  const addToArena = async() => {
      await axios.post(ARENA_URL,{
        id: character.id,
        name: character.name,
        weight:character.weight,
        height:character.height,
        base_experience:character.base_experience,
        ability:ability,
        url:`https://pokeapi.co/api/v2/pokemon/${character.id}`
      })
    // }
  }

  const deleteFromFavorite = async() => {
    setFavorite(false)
    await axios.delete(`http://localhost:3000/ulubione/${character.id}`,'')
  }

  const checkIfExist = async() =>{
      const data = await fetch(`${ADD_URL}${character.id}`)
      const object = await data.json()
      const check = object.hasOwnProperty('id')
      check? setFavorite(true) : setFavorite(false)
  }

  const checkIsUpdated = async () =>{
    const data = await fetch(`http://localhost:3000/updated/${character.id}`)
    const res = await data.json()

    if(res.hasOwnProperty('base_experience')){
        setBase_Experience(res.base_experience)
        setWeight(res.weight)
        setHeight(res.height)
        setPokemonName(res.name)
    }

}

  useEffect(() => {
    getData()
  }, [id])

  useEffect(() => {
    checkIfExist()
  },[favorite])

  useEffect(() => {
    checkEmptyArena()
  },[])

  useEffect(() => {
    checkIsUpdated()
},[base_experience])



  return (
    <Wrapper>
      <h1>Pokedex</h1>
      <div className='DetailsWrapper'>
        <div><img src={sprite} alt="Pokemon photo" /></div>
        <div className='Details'>
          <div className='Name'>{pokemonName} <FavoriteIcon className={favorite? 'SuccessColor' : 'NormalColor'} onClick={handlerFavorite}/> <SportsMartialArtsIcon onClick={handleArena}/>
          </div>
          <div>
            <div className='DetailsPokemon'>
              <div className='DetailsPokemonWrapper'>
                <div>
                  <p className='ColorGrey'>{height}</p>
                  <p className='FontBold'>Height</p>
                </div>
                <div>
                  <p className='ColorGrey'>{weight}</p>
                  <p className='FontBold'>Weight</p>
                </div>
              </div>
              <div className='DetailsPokemonWrapper'>
                <div>
                  <p className='ColorGrey'>{ability}</p>
                  <p className='FontBold'>Ability</p>
                </div>
                <div>
                  <p className='ColorGrey'>{base_experience}</p>
                  <p className='FontBold'>Base_experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link className='Link' to='/'>Strona główna</Link>
    </Wrapper>
  )
}

export default SinglePokemon
