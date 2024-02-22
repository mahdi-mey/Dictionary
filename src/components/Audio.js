import { AiTwotoneSound } from "react-icons/ai";
import React from 'react';
import '../components/Audio.css';

export default function Audio({ phonetic }) {
    console.log('Audio component ran')

    function playAudio(audioSrc) {
        const audioElement = document.createElement('audio')
        audioElement.setAttribute('src', audioSrc)
        audioElement.play()
    }

    const filteredAudio = phonetic
        .filter(item => item.audio !== "")
        .map(item => item.audio)

    return (
        <>
            {filteredAudio.map((audioSrc, index) => (
                <div key={index}>
                    <AiTwotoneSound className='play-audio' onClick={() => playAudio(audioSrc)} />
                </div>
            ))}
        </>
    )
}