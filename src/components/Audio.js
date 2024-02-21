import { AiTwotoneSound } from "react-icons/ai"
import '../components/Audio.css'

export default function Audio({ phonetic }) {
    console.log(phonetic)

    const filteredAudio = phonetic
        .filter(item => item.audio !== "")
        .map(item => item.audio)

    return (
        <>
            {filteredAudio.map(item => {
                return <>
                    <AiTwotoneSound key={item} className='play-audio' />
                    <audio src={item} key={Date.now()}></audio>
                </>
            })}
        </>
    )
}