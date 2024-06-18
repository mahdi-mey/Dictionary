async function searchWord(e, inputValue, setWordInfo, setIsLoading, setErrorMessage, setInputValue) {
    e.preventDefault()
    if (!inputValue) return

    try {
        setIsLoading(true)
        setErrorMessage('')
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        if (response.status === 200) {
            const data = await response.json()
            setWordInfo(data)
            setInputValue('')
        }
        else {
            // Handle errors
            const errorData = await response.json()
            setErrorMessage(errorData.message || 'An error occurred. Please try again later.');
        }
    }
    catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
    }
    finally {
        setIsLoading(false)
    }
}

export default searchWord