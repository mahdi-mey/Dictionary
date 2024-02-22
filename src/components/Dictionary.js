import { useRef, useState, useEffect } from 'react'
import '../components/Dictionary.css'

import Audio from './Audio'

import { VscSearch } from "react-icons/vsc"


export default function Dictionary() {
    console.log('dictionary component ran')
    const [inputValue, setInputValue] = useState('')
    const [wordInfo, setWordInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const audioRef = useRef(null)

    function handelChange(event) {
        setInputValue(event.target.value)
    }

    async function searchWord(e) {
        e.preventDefault()
        console.log('inside fetch function')
        if (!inputValue) return

        try {
            setIsLoading(true)
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
            if (response.status === 200) {
                const data = await response.json()
                setWordInfo(data)
                console.log(data)
            }
            else {
                console.warn('weird error', response.err)
            }
        }
        catch (err) {
            console.log('catch block', err)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (wordInfo) {
            audioRef.current = document.getElementById('audio')
        }
    }, [wordInfo])


    return (
        <div className="container">
            <form className="input-container" onSubmit={searchWord}>
                <input type="text" autoComplete="off" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handelChange} />
                <div className='button-and-icon' disabled={isLoading}>
                    <button className="submitBtn" type="submit">Serach</button>
                    <VscSearch className='search-icon' />
                </div>
            </form>

            {
                wordInfo && (
                    <>
                        <div className='main'>
                            <div className='information'>
                                <h1 className="selfWord">{wordInfo[0].word}</h1>
                                <div className="info">
                                    <span className="pronunciation">{wordInfo[0].phonetic || wordInfo[0].phonetics[1].text}</span>
                                    <Audio phonetic={wordInfo[0].phonetics} />
                                </div>
                            </div>
                        </div>
                        <div className="definitions">
                            <h4 className="h4">definitions</h4>
                            <span className="span">{wordInfo[0].meanings[0].definitions[0].definition}</span>
                        </div>
                    </>
                )
            }

        </div>
    )
}
