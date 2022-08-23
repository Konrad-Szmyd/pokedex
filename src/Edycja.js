import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import axios from 'axios'

const Wrapper = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    .container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:100%;
    }

    .lists{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;
    }

    .pokemon{
        padding:0.2rem;
        margin:0.2rem;
        cursor:pointer;
        border:1px solid #000000;
        :hover{
            background-color:#FFD5A3;
        }
    }

    .editionPanel{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

    .input{
        padding:0.3rem;
        margin:0.5rem;
        border-radius:5px;
    }
`

const Edycja = () => {

    const [pokemons,setPokemons] = useState([])
    const [choosenPoke, setChoosenPoke] = useState([])
    const [editedPoke,setEditedPoke] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [ability, setAbility] = useState([])
    const [sprite, setSprite] = useState([])
    const [base_experience,setBase_Experience] = useState([])
    const [pokemonName, setPokemonName] = useState([])
    const [height, setHeight] = useState([])
    const [weight, setWeight] = useState([])
    
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=150"

    const getData = async() =>{
        const data = await fetch(URL)
        const res = await data.json()
        setPokemons(res.results)
    }

    const lists = pokemons.map((poke,index) =>{
        return(<div key={index} onClick={()=>{setChoosenPoke(poke)}} className='pokemon'>{poke.name}</div>)
    })

    const getSinglePokemon = async() =>{
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${choosenPoke.name}`)
        const res = await data.json()
        console.log(res)

        setSprite(res.sprites.front_default)
        setBase_Experience(res.base_experience)
        setWeight(res.weight)
        setHeight(res.height)
        setPokemonName(res.name)
        setAbility(res.abilities[0].ability.name)
        setEditedPoke(res)
    }


    const checkIsUpdated = async () =>{
        const data = await fetch(`http://localhost:3000/updated/${editedPoke.id}`)
        const res = await data.json()

        if(res.hasOwnProperty('base_experience')){
            setIsUpdated(true)
            setBase_Experience(res.base_experience)
            setWeight(res.weight)
            setHeight(res.height)
            setPokemonName(res.name)
        }

    }

    const addToUpdate = async() => {
        const URL = "http://localhost:3000/updated/"
            await axios.post(URL,{
                id: editedPoke.id,
                name: formik.values.name,
                weight:formik.values.weight,
                height:formik.values.height,
                ability:formik.values.ability,
                base_experience:formik.values.base_experience,
                url:`https://pokeapi.co/api/v2/pokemon/${editedPoke.id}`
            })
          }
          
          const putInUpdate = async() => {
            const URL = "http://localhost:3000/updated/"
            await axios.put(`${URL}${editedPoke.id}`,{
              id: editedPoke.id,
              name: formik.values.name,
              weight:formik.values.weight,
              height:formik.values.height,
              ability:formik.values.ability,
              base_experience:formik.values.base_experience,
              url:`https://pokeapi.co/api/v2/pokemon/${editedPoke.id}`
            })
            console.log('powinien się wykonać update')
      }



    const editData = () =>{
        isUpdated ? putInUpdate() : addToUpdate()
    }

    const addPokemon = async() => {
        const URL = "http://localhost:3000/new/"
            await axios.post(URL,{
                id: editedPoke.id,
                name: formik.values.name,
                weight:formik.values.weight,
                height:formik.values.height,
                ability:formik.values.ability,
                base_experience:formik.values.base_experience,
                url:`https://pokeapi.co/api/v2/pokemon/${editedPoke.id}`
            })
          }

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        getSinglePokemon()
    },[choosenPoke])

    useEffect(()=>{
        checkIsUpdated()
    },[editedPoke])

    const formik = useFormik({
        initialValues: {
            name: "",
            height: "",
            weight: "",
            ability: "",
            base_experience: "",
        },
        onSubmit: () => {
            editData()
        }
    })


  return (
    <Wrapper>
      <h1>Edycja</h1>
      <div className='container'>
        <h3>Lista pokemonów</h3>
        <div className='lists'>
        {lists}
        </div>
        <div className='editionPanel'>
            <h4>Wybrałeś {choosenPoke.name} do edycji</h4>
            {editedPoke.length != '' &&
             <div className='editionPanel'>
                <div>
                    <p>Name : {pokemonName}</p>
                    <p>Height : {height}</p>
                    <p>Weight : {weight}</p>
                    <p>Ability : {ability}</p>
                    <p>BaseExperience : {base_experience}</p>
                    <p>ID: {editedPoke.id}</p>
                </div>
                <h4>Wprowadź nowe parametry</h4>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' name='name' className='input' type="textfield" placeholder={'name'} />
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='height' name='height' className='input' type="textfield" placeholder='height' />
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='weight' name='weight' className='input' type="textfield" placeholder='weight' />
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='ability' name='ability' className='input' type="textfield" placeholder='ability' />
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='base_experience' name='base_experience' className='input' type="textfield" placeholder='base_experience' />
                    <button type='submit' className='buttonSubmit'>Edytuj</button>
                    <button onClick={addPokemon}>Dodaj pokemona</button>
                </form>
            </div>}
        </div>
      </div>
    </Wrapper>
  )
}

export default Edycja
