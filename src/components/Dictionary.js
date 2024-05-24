import { useRef, useState, useEffect } from 'react'
import '../components/Dictionary.css'

import { VscSearch } from "react-icons/vsc"
import Meanings from './Meanings'
import Loader from './Loader'
import WordDetails from './WordDetails'

export default function Dictionary() {
    const [inputValue, setInputValue] = useState('')
    const [wordInfo, setWordInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const audioRef = useRef(null)

    function handleChange(event) {
        setInputValue(event.target.value)
    }

    async function searchWord(e) {
        e.preventDefault()
        if (!inputValue) return

        try {
            setIsLoading(true)
            setErrorMessage('')
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
            if (response.status === 200) {
                const data = await response.json()
                setWordInfo(data)
                setInputValue('')
            }
            else {
                // Handle errors
                const errorData = await response.json()
                setErrorMessage(errorData.message || 'An error occurred. Please try again later.');
            }
        }
        catch (err) {
            setErrorMessage('An error occurred. Please try again later.');
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
                <input type="text" autoComplete="off" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handleChange} />
                <div className='button-and-icon' disabled={isLoading} onClick={searchWord}>
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