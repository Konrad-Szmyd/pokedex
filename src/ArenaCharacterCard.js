import styled from "styled-components";
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
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

const ArenaCharacterCard = ({ details }) => {
    const {url,name} = details
    const [update,setUpdate] = useState([])
    const [character, setCharacter] = useState([])
    //dlaczego gdy użyje hooka useState to działa dla ability i sprite ??. Gdy próbuję dostać się poprzez character.sprites to wywala błąd
    const [ability, setAbility] = useState([])
    const [sprite, setSprite] = useState([])
    const [deleted, setDeleted] = useState(false)

    const [base_experience,setBase_Experience] = useState([])
    const [pokemonName, setPokemonName] = useState([])
    const [height, setHeight] = useState([])
    const [weight, setWeight] = useState([])

    const getData = async () => {
        const data = await fetch(url)
        const character = await data.json()
        setCharacter(character)

        setAbility(character.abilities[0].ability.name)
        setSprite(character.sprites.front_default)
        setBase_Experience(character.base_experience)
        setWeight(character.weight)
        setHeight(character.height)
        setPokemonName(character.name)
    }

    const deleteFromArena = async() =>{
        await axios.delete(`http://localhost:3000/arena/${character.id}`,'')
        setDeleted(true)
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
    },[])

    useEffect(() => {
        checkIsUpdated()
    },[character])

    return (
        <Card>
            <DeleteForeverIcon onClick={deleteFromArena} />
            <div className="Photo">
                <img src={sprite} width='150px' alt="Character photo" />
            </div>
            <div className="Detail">
                <p>Name : {pokemonName}</p>
                <div className="DetailWrapper">
                    <div className="DetailPokemon">
                        <p>Height : {height}</p>
                        <p>Weight : {weight}</p>
                    </div>
                    <div className="DetailPokemon">
                        <p>Base_experience : {base_experience}</p>
                        <p>Ability : {ability}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ArenaCharacterCard