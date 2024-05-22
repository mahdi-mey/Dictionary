import { useState } from 'react'
import './Meanings.css'

export default function Meanings({ meanings }) {
    const [activeTab, setActiveTab] = useState(0)

    function changeTab(i) {
        setActiveTab(i)
    }

    return (
        <div className='meanings-container'>

            <div className='button-container'>
                {meanings.map((item, index) => {
                    return <button key={index} className={`tab-button ${index === activeTab ? 'active' : ''}`} onClick={() => changeTab(index)}>
                        {item.partOfSpeech}
                    </button>
                })}
            </div>

            <div className='meanings-container'>
                {meanings.map((item, index) => {
                    if (index === activeTab) {
                        return <div className='tab-content' key={index}>
                            {item.definitions[0].definition}
                        </div>
                    }
                })}
            </div>

        </div>
    )
}