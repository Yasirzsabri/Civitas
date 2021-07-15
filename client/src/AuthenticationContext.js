import React from 'react'

const AuthenticationContext = React.createContext({
    username: "",
    id: "",
    userLevel: [],
    logIn: (username, password) => {},
    logOut: () => {}
})

export default AuthenticationContext