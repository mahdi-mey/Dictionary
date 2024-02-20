import { useRef, useState, useEffect } from 'react'
import './App.css'

import { AiTwotoneSound } from "react-icons/ai"
import { VscSearch } from "react-icons/vsc"


export default function Dictionary() {
    const [inputValue, setInputValue] = useState('')
    const [wordInfo, setWordInfo] = useState(null)
    const audioRef = useRef(null)

    function handelChange(event) {
        setInputValue(event.target.value)
    }

    async function searchWord(e) {
        // console.log(e)
        e.preventDefault()
        console.log('inside fetch function')
        if (!inputValue) return
        setWordInfo(null)
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        const data = await response.json()
        console.log(data)
        setWordInfo(data)
    }

    function playAudio() {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    useEffect(() => {
        console.log('useEffect executed')
        if (wordInfo) {
            audioRef.current = document.getElementById('audio')
        }
    }, [wordInfo])


    return (
        <div className="container">
            <form className="input-container" onSubmit={searchWord}>
                <input type="text" autoComplete="off" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handelChange} />
                <div className='button-and-icon'>
                    <button className="submitBtn" type="submit">Serach</button>
                    <VscSearch className='search-icon' />
                </div>
            </form>

            {wordInfo && <div className='main'>
                <div className='information'>
                    <h1 className="selfWord">{wordInfo[0].word}</h1>
                    <div className="info">
                        <span className="pronunciation">{wordInfo[0].phonetics[1].text}</span>
                        <AiTwotoneSound className='play-audio' onClick={playAudio} />
                        <audio src={wordInfo[0].phonetics[0].audio} id="audio" onClick={playAudio} ref={audioRef}></audio>
                    </div>
                </div>
            </div>}

        </div>
    )
}
