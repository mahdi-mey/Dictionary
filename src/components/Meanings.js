import './Meanings.css'

export default function Meanings({ meanings }) {
    console.log(meanings)

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {
                meanings.map(item => {
                    return <button className='tab-button'>{item.partOfSpeech}</button>
                })
            }
        </div>
    )
}
