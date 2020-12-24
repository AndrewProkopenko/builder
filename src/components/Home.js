import React from 'react'

import LoadingContext from '../context/loadingContext/LoadingContext'

function Home() {

    const { setIsLoading } = React.useContext(LoadingContext)

    React.useEffect( () => {
        setIsLoading(false)
    }, [])

    return (
        <div>
            Home
        </div>
    )
}

export default Home
