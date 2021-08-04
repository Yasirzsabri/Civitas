import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [id,setId] = useState()
    let [navbarAccess, setNavbarAccess] = useState()
    let [member, setMember] = useState()

    const logIn = (username, password) => {
        async function logintoserver() {
            let loginOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
            let response = await fetch('/api/auth/login', loginOptions)
            let loggedInUser = await response.json()
            
            let newNavbarAccess=false
            let memberRecord={}

            if (loggedInUser._id){
                response= await fetch(`/api/auth/member/${loggedInUser._id}`)
                memberRecord= await response.json()

                if(memberRecord.username){
                  let j=0
                  for(j=0;j<memberRecord.communityDetail.length;j++){                    
                      if (memberRecord.communityDetail[j].userLevel.level===1) newNavbarAccess=true
                  }                      
              }
            }

            setUsername(loggedInUser.username)
            setId(loggedInUser._id)
            setNavbarAccess(newNavbarAccess)
            setMember(memberRecord)
        }
        logintoserver()
    }

    const logOut = () => {
        setUsername(undefined)
        setId(undefined)
        setNavbarAccess(undefined)
        setMember(undefined)
    }

    let contextValue = {
        username,
        id,
        navbarAccess,
        member,
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
