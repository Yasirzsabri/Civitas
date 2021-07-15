import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [id,setId] = useState()
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

            setUsername(loggedInUser.username)
            setId(loggedInUser._id)
            setUserLevel(loggedInUser.userLevel)
        }
        logintoserver()
    }

    const logOut = () => {
        setUsername(undefined)
        setId(undefined)
        setUserLevel(undefined)
    }

    let contextValue = {
        username,
        id,
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
