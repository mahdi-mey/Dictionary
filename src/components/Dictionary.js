import { useRef, useState, useEffect } from 'react'
import '../components/Dictionary.css'

import { VscSearch } from "react-icons/vsc"
import Meanings from './Meanings'
import WordDetails from './WordDetails'

export default function Dictionary() {
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
                setInputValue('')
                console.log(data)
            }
            else {
                console.warn('some error happened', response.err)
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
                wordInfo && <>
                    <WordDetails wordInfo={wordInfo} />
                    <Meanings meanings={wordInfo[0].meanings} />
                </>
            }
        </div>
    )
}
