import React from 'react'
import styled from 'styled-components'
import CharacterCard from './CharacterCard'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    max-width:85%;
    background-color:#FFD5A3;
    margin-top:1rem;
    padding-top:1rem;
    border:1px solid black;
    border-radius:20px;


    .Title{
        text-align:center;
        width: 100%;
    }

    .Pagination{
        display:flex;
        justify-content:center;
        align-items:center;
        width: 100%;
        margin:1rem;
    }

    .None{
        display:none;
    }

    .CurrentPage{
        margin: 1rem;
    }

`
const Card = styled.div`
    display:flex;
    flex-direction:column;
    width:300px;
    justify-content:space-around;
    padding:0.5rem;
    margin:1rem;
    border:1px solid #000000;
    border-radius:1rem;
    transition: all .5s;

    :hover{
        transform: scale(1.1)
    }

    .Photo{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
    }

    .Detail{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;

        
    }

    .DetailWrapper{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:center;
        width:100%;
    }

    .DetailPokemon{
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
`

const PokemonList = () => {
    // const URL = "https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0"
    const DEFAULT_SPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"

    const [characters, setCharacters] = useState([])
    const [prevPage, setPrevPage] = useState([])
    const [nextPage, setNextPage] = useState([])
    const [list, setList] = useState([])
    const [cur, setCur] = useState(1)
    const [search,setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const getData = async (URL = "https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0") => {
        const data = await fetch(URL)
        const characters = await data.json()
        // console.log(characters)
        setCharacters(characters.results)
        setPrevPage(characters.previous)
        setNextPage(characters.next)
    }

        
        const renderList = () =>{
            const showList = 
                characters.map((poke,index) => {
                const details = {
                    url:poke.url,
                    name:poke.name
                }
                return (<Link className='TextDecoration' key={index} to={`single_pokemon/${details.name}`}>
                    <CharacterCard key={index} details={details} />
                    </Link>
                )
            })
            setList(showList)
        }

    const handleChange = (e) =>{
        e.target.value != '' ? setIsSearch(true) : setIsSearch(false)
        setSearch(e.target.value)
        
    }


    const findData = () => {
        if(search == '')getData()
        const filtered = characters.filter( (pokemon) => {
            if(pokemon.name.includes(search)){
                return pokemon
            }
        }
        )
        setCharacters(filtered)
    }
            
        

    useEffect(() => {
        getData()
    },[])
    
    useEffect(() => {
        renderList()
    },[characters])
    
    useEffect(() =>{
        findData()
    },[search])
    
    const getNewPoke = async () =>{
        const data = await fetch("http://localhost:3000/new/")
        const res = await data.json()

        const newPokemons = res.map(poke =>{
            return(<Card>
                <div className="Photo">
                <img src={DEFAULT_SPRITE} width='150px' alt="Character photo" />
                
                </div>
                <div className="Detail">
                    <p>Name : {poke.name}</p>
                    <div className="DetailWrapper">
                        <div className="DetailPokemon">
                            <p>Height : {poke.height}</p>
                            <p>Weight : {poke.weight}</p>
                        </div>
                        <div className="DetailPokemon">
                            <p>Base_experience :{poke.base_experience}</p>
                            <p>Ability : {poke.ability}</p>
                        </div>
                    </div>
                </div>
            </Card>
            )
        })
        setList(newPokemons)
    }

  return (
    <Wrapper>
    <TextField onChange={handleChange} id="outlined-basic" label="Search" variant="outlined" />
      <h1 className='Title'>All Pokemons</h1>
      {list}
      
      <div  className={isSearch? 'None' : 'Pagination'}>
        <button disabled={prevPage? false : true } onClick={()=>{
            getData(prevPage)
            setCur(cur-1)
        }}>Wstecz</button>
        <div className='CurrentPage'>Strona: {cur}</div>
        
        <button disabled={cur === 11 ? true : false } onClick={()=>{
            if(cur == 10){
                getNewPoke()
            }
            if(cur <= 10 ) {
                getData(nextPage)
                setCur(cur+1)
            } 
        }}>Dalej</button>
      </div>
    </Wrapper>
  )
}

export default PokemonList
