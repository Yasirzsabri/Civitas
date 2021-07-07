import React from 'react'

const AuthenticationContext = React.createContext({
    username: '',
    level: 3,
    logIn: (username, isAgent) => {},
    logOut: () => {}
})

export default AuthenticationContext