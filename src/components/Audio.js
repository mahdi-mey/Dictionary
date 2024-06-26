import { AiTwotoneSound } from "react-icons/ai"
import React, { useRef } from 'react'
import '../components/Audio.css'

export default function Audio({ phonetic }) {
    const audioRef = useRef(null)

    function playAudio(audioSrc) {
        audioRef.current.src = audioSrc
        audioRef.current.play()
    }

    const filteredAudio = phonetic
        .filter(item => item.audio !== "")
        .map(item => item.audio)

    return (
        <>
            {filteredAudio.map((audioSrc, index) => (
                <div key={index}>
                    <button className="play-audio-parent" onClick={() => playAudio(audioSrc)} >
                        <AiTwotoneSound className='play-audio' />
                    </button>
                </div>
            ))}
            <audio ref={audioRef}></audio>
        </>
    )
}