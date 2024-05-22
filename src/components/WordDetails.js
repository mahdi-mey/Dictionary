import Audio from "./Audio";
import './WordDetails.css'

export default function WordDetails({wordInfo}) {
  return (
      <div className='main'>
          <div className='information'>
              <h1 className="selfWord">{wordInfo[0].word}</h1>
              <div className="info">
                  <span className="pronunciation">{wordInfo[0].phonetic || wordInfo[0].phonetics[1].text}</span>
                  <Audio phonetic={wordInfo[0].phonetics} />
              </div>
          </div>
      </div>
  )
}
