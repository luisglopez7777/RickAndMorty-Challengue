import { FC, useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { ImArrowLeft } from 'react-icons/im'
import '../styles/Character.css'
import axios from 'axios'

const Character: FC = () => {
    const location = useLocation();
    const currentPath = location.pathname

    interface ICharacter {
        created: string,
        episode: Array<string>,
        gender: string,
        id: number,
        image: string,
        location: object,
        name: string,
        origin: object,
        species: string,
        status: string,
        type: string,
        url: string
    }

    const [character, setCharacter] = useState<ICharacter>()

    useEffect(() => {
        async function getData() {
            const request = await axios({ url: `https://rickandmortyapi.com/api/character/${currentPath}`, method: 'get' })
            let infoCharacter = request.data
            console.log('infoCharacter', infoCharacter)
            setCharacter(infoCharacter)
        }
        getData()
    }, [])

    return (
        <div>
            {character &&
                <div className="character__container">
                    <div className="character__container-info">
                        {/* <div className="exit"> */}
                        <Link to="/" className="exit">
                            <ImArrowLeft />
                            <span>
                                <p>Exit</p>
                            </span>
                        </Link>
                        {/* </div> */}
                        <h2>{character.name}</h2>
                        <h3>{character.gender}</h3>
                        <h3>{character.species}</h3>
                        <h3>{character.status}</h3>
                    </div>
                    <div className="character__container-image">
                        <img src={character.image} alt="" />
                    </div>
                </div>
            }

        </div>
    )
}

export default Character
