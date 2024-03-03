import { useState } from 'react'
import './Meanings.css'

export default function Meanings({ meanings }) {
    const [openTab, setOpenTab] = useState(1)
    console.log(meanings[openTab].definitions[0].definition)

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            {
                meanings.map((item, index) => {
                    return (
                        <div key={index}>
                            <button className={`tab-button ${index === 0 ? 'active' : ''}`}>
                                {item.partOfSpeech}
                            </button>

                            <div className='tab-content'>
                                {/* {item.definitions[0].definition} */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
