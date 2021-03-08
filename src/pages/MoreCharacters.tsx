import { FC, useState, useEffect } from 'react'
import '../styles/Home.css'
import { Link, useLocation } from "react-router-dom"
import { ImArrowRight, ImArrowLeft } from 'react-icons/im'
import axios from 'axios'

const MoreCharacters: FC = () => {

    const location = useLocation();
    const currentPath: string = location.pathname

    let page: number = parseInt(currentPath.replace('/page', '')[1])
    console.log('page', page)

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


    useEffect(() => {
        async function getData() {
            const request = await axios({ url: `https://rickandmortyapi.com/api/character/?page=${page}`, method: 'get' })
            let infoCharacters = request.data.results
            console.log('infoCharacters', infoCharacters)
            setCharacters(infoCharacters)
        }
        getData()
    }, [page])
    return (
        <>
            <main>
                <section className="characters">
                    <div className="characters__container">
                        {characters.map((char: ICharacter) => (
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
                        <span>
                            <Link to={`/page/${page - 1}`}>
                                <ImArrowLeft />
                            </Link>
                        </span>
                        <p>Page {page} of 30</p>
                        <span>
                            <Link to={`/page/${page + 1}`}>
                                <ImArrowRight />
                            </Link>
                        </span>
                    </div>
                </section>
            </main>
        </>
    )
}

export default MoreCharacters