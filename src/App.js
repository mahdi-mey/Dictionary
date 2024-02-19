import { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [wordInfo, setWordInfo] = useState(null)
  function handelChange(event) {
    setInputValue(event.target.value)
  }

  async function searchWord() {
    if (!inputValue) return
    console.log('inside fetch function')
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
    const data = await response.json()
    console.log(data)
    setWordInfo(data)
  }

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" name="" id="wordInp" placeholder="Enter A Word" spellCheck="false" autoFocus onChange={handelChange} />
        <button className="submitBtn" type="button" onClick={searchWord} >Serach</button>
      </div>

      {wordInfo && <div className='main'>
        <div className='information'>
          <h1 className="selfWord">{wordInfo[0].word}</h1>
          <div className="info">
            <span className="span pron phonetic">{wordInfo[0].phonetics[1].text }</span>
            <ion-icon name="volume-high-outline" className="audio pointer audio-icon"></ion-icon>
            <audio src={wordInfo[0].phonetics[0].audio} id="audio"></audio>
          </div>
        </div>
      </div>}

    </div>
  );
}

export default App;
