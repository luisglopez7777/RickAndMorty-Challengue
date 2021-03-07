import { FC, useState, useEffect } from 'react'
import '../styles/Home.css'
import { Link } from "react-router-dom"
import { ImArrowRight } from 'react-icons/im'
import axios from 'axios'

const Home: FC = () => {
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

    interface ICharacters extends Array<ICharacter> { }

    const [characters, setCharacters] = useState<ICharacters>([])
    const [search, setSearch] = useState<string>('')


    useEffect(() => {
        async function getData() {
            //Tengo que corregir tambien esto para ts
            const request = await axios({ url: 'https://rickandmortyapi.com/api/character/?page=1', method: 'get' })
            let infoCharacters: ICharacters = request.data.results
            console.log('infoCharacters', infoCharacters)
            setCharacters(infoCharacters)
        }
        getData()
    }, [characters])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filterCharacters = (array: ICharacters) => {
        return (
            array.filter((item) => {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
            })
        )
    }

    const filteredCharacters: ICharacters = filterCharacters(characters)

    return (
        <>
            <header>
                <h1>Find Rick and <br />Morty characters.</h1>
                <div className="header-search">
                    <input type="text" placeholder="Search" onChange={handleChange} />
                    <span>
                        <button> SEARCH</button>
                    </span>
                </div>
            </header>

            <main>
                <section className="characters">
                    <div className="characters__container">
                        {/* {characters.map((char: ICharacters) => ( */}
                        {filteredCharacters.map((char: ICharacter) => (
                            <div className="characters__container-char" key={char.id}>
                                <Link to={`/${char.id}`}>
                                    <figure>
                                        <img src={char.image} alt="" />
                                    </figure>
                                    <div className="characters__container-char-text">
                                        <p>{char.name}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="characters__container-bottom">
                        <p>Page 1 of 30</p>
                        <span>
                            <Link to="page/2">
                                <ImArrowRight />
                            </Link>
                        </span>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
