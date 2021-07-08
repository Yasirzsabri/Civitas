import { useContext } from "react"
import AuthenticationContext from "../AuthenticationContext"
import { useState , useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import UserForm from './users/UserForm';


const LogInOrOut = () => {
    const authContext = useContext(AuthenticationContext)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    const isLoggedIn = authContext.username !== undefined
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    
    const handleUserFormClick = (userFormData) => {
        // if(userFormData === 'success'){
        //     getUsers()
        // }
    }
    return (isLoggedIn) ? 
            <div>
                <span>Hello {authContext.username}</span>
                <button onClick={() => authContext.logOut()}>Logout</button>
            </div> 
            : 
            <div className="container">
                 <div className="col-20 offset-15">
                     <div className="card">
                         <div className="card-body" >
                         <h4 className="card-title text-center">Login</h4>
                            <div className="card-text">
                             
                                 <div>
                                     <label for="username" className="form-label">Username</label>
                                         <input type="username"
                                         name="username"
                                         id="username"
                                         value={username}
                                         placeholder="username"
                                         required
                                         onChange={(e) => setUsername(e.target.value)}
                                         type="username"
                                         className="form-control" />
                                 </div>
                                     <div>
                                         <label for="password" className="form-label">Password</label>
                                         <input
                                             type="password"
                                             name="password"
                                             id="password"
                                             value={password}
                                             className="form-control"
                                             placeholder="password"
                                             required
                                             onChange={(e) => setPassword(e.target.value)}
                                           />
                                     </div>
                                     <br></br>
                                    <div>
                                        <div className="row-fluid text-center" >
                                            <button className="btn btn-secondary" type="button" onClick={() => authContext.logIn(username, password)}>Login</button>
                                            
                                            <button className="btn btn-secondary" type="button" onClick={()=>setAddBtnPopupForm(true)}>New User</button>
                                            {/* <button className="add-u" onClick={()=>setAddBtnPopupForm(true)}>New User</button> */}
                                            <UserForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onUserFormClick = {handleUserFormClick} />
                                            </div>
                                    </div>
                                    
                            </div>
                         </div>
                     </div>
                 </div>
            </div>

}

export default LogInOrOut