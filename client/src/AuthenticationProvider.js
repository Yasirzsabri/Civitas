
import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [userLevel, setUserLevel] = useState()

    const logIn = (username, password) => {
        async function logintoserver() {
            let loginOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
            let response = await fetch('/auth/login', loginOptions)
            let loggedInUser = await response.json()
            console.log('The call the auth returned: ', loggedInUser)
            setUsername(loggedInUser.username)
            setUserLevel(loggedInUser.userLevel)    
        }
        logintoserver()
    }

    const logOut = () => {
        setUsername(undefined)
        setUserLevel(undefined)
    }

    let contextValue = {
        username, 
        userLevel,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
