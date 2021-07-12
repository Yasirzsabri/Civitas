import React from 'react'

const AuthenticationContext = React.createContext({
    username: '',
    userLevel: 3,
    logIn: (username, userLevel) => {},
    logOut: () => {}
})

export default AuthenticationContext