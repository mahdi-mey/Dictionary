import { AiTwotoneSound } from "react-icons/ai";
import React, { useRef } from 'react';
import '../components/Audio.css';

export default function Audio({ phonetic }) {
    console.log('Audio component ran');

    const audioRef = useRef(null);

    function playAudio(audioSrc) {
        audioRef.current.src = audioSrc;
        audioRef.current.play();
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
            <audio ref={audioRef}></audio>
        </>
    );
}