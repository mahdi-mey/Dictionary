import { useRef, useState, useEffect } from 'react';
import './App.css';

import { AiTwotoneSound } from "react-icons/ai";
import { VscSearch } from "react-icons/vsc";

function App() {
  const [inputValue, setInputValue] = useState('')
  const [wordInfo, setWordInfo] = useState(null)
  const audioRef = useRef(null)

  function handelChange(event) {
    setInputValue(event.target.value)
  }

  async function searchWord() {
    if (!inputValue) return
    console.log('inside fetch function')
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

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" name="" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handelChange} />
        <div className='button-and-icon'>
          <button className="submitBtn" type="button" onClick={searchWord} >Serach</button>
          <VscSearch className='search-icon' />
        </div>
      </div>

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
  );
}

export default App;
