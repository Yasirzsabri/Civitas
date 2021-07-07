import { useContext } from "react"
import AuthenticationContext from "../AuthenticationContext"

const LogInOrOut = () => {
    const authContext = useContext(AuthenticationContext)

    const isLoggedIn = authContext.username !== undefined

    return (isLoggedIn) ? 
            <div>
                <span>Hello {authContext.username}</span>
                <button onClick={() => authContext.logOut()}>Logout</button>
            </div> 
            : 
            <div>
                <button onClick={() => authContext.logIn('Yasir', 'password')}>Login</button> 
            </div>

}

export default LogInOrOut