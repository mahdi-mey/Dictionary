import { useState } from 'react'
import './Meanings.css'

export default function Meanings({ meanings }) {
    const [activeTab, setActiveTab] = useState(1)
    console.log(meanings[activeTab].definitions[0].definition)

    function changeTab() {

    }

    return (
        <div className='meanings-container'>
            
            {
                meanings.map((item, index) => {
                    return <div key={index}>
                        {index === activeTab && <div className='tab-content'>
                            {item.definitions[0].definition}
                        </div>}
                    </div>
                })
            }

            {
                meanings.map((item, index) => {
                    return <div key={index}>
                        <div className='button-container'>
                            <button className={`tab-button ${index === 0 ? 'active' : ''}`} onClick={changeTab}>
                                {item.partOfSpeech}
                            </button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}