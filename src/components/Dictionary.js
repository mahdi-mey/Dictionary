import { useRef, useState, useEffect } from 'react'
import '../components/Dictionary.css'

import { VscSearch } from "react-icons/vsc"
import Meanings from './Meanings'
import Loader from './Loader'
import WordDetails from './WordDetails'

import searchWord from '../services/fetchWord'

export default function Dictionary() {
    const [inputValue, setInputValue] = useState('')
    const [wordInfo, setWordInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const audioRef = useRef(null)

    function handleChange(event) {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        if (wordInfo) {
            audioRef.current = document.getElementById('audio')
        }
    }, [wordInfo])

    return (
        <div className="container">
            <form className="input-container" onSubmit={(e) => searchWord(e, inputValue, setWordInfo, setIsLoading, setErrorMessage, setInputValue)}>
                <input type="text" autoComplete="off" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handleChange} />
                <div className='button-and-icon' disabled={isLoading} onClick={(e) => searchWord(e, inputValue, setWordInfo, setIsLoading, setErrorMessage, setInputValue)}>
                    <button className="submitBtn" type="submit">Search</button>
                    <VscSearch className='search-icon' />
                </div>
            </form>

            {isLoading && <Loader />}
            {errorMessage && <h2 className='error'>{errorMessage}</h2>}

            {
                wordInfo && !isLoading && !errorMessage && <>
                    <WordDetails wordInfo={wordInfo} />
                    <Meanings meanings={wordInfo[0].meanings} />
                </>
            }
        </div>
    )
}