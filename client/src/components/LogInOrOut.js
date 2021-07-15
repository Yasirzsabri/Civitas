import { useContext } from "react"
import AuthenticationContext from "../AuthenticationContext"
// import { useState , useEffect} from "react"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import UserForm from './users/UserForm';
import MemberForm from './screens/MemberForm';


const LogInOrOut = () => {
    const authContext = useContext(AuthenticationContext)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    const isLoggedIn = !!authContext.username
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    
    const handleMemberFormClick = (memberFormData) => {
    }
    const handleUserFormClick = (userFormData) => {
        // if(userFormData === 'success'){
        //     getUsers()
        // }
    }
    return (isLoggedIn) ? 
            <>
                <div>
                    <span>Hello {authContext.username}</span>
                        <br></br>
                    <button className="btn btn-secondary" type="button"  onClick={() => authContext.logOut()}>Logout</button>  
                    <button className="btn btn-secondary" type="button" onClick={()=>setAddBtnPopupForm(true)}>Member Form</button>
                    <MemberForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onMemberFormClick = {handleMemberFormClick} homePageFlag = {true}/>

                </div> 
            </>
            : 
            <div className="container">
                 <div className="col-20 offset-15">
                     <div className="card">
                         <div className="card-body" >
                         <h4 className="card-title text-center">Login</h4>
                            <div className="card-text">
                             
                                 <div>
                                     <label htmlFor="username" className="form-label">Username</label>
                                         <input type="username"
                                         name="username"
                                         id="username"
                                         value={username}
                                         placeholder="username"
                                         required
                                         onChange={(e) => setUsername(e.target.value)}
                                         className="form-control" />
                                 </div>
                                     <div>
                                         <label htmlFor="password" className="form-label">Password</label>
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
                                    <div className ="buttons" >
                                        <div className="row-fluid text-center" >
                                            <button className="btn btn-secondary" type="button" onClick={() => authContext.logIn(username, password)}>Login</button>
                                            
                                            <button className="btn btn-secondary" type="button" onClick={()=>setAddBtnPopupForm(true)}>New User</button>

                                            <UserForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm}  minimalFlag ={true} onUserFormClick = {handleUserFormClick} />
                                        </div>
                                    </div>
                                    
                            </div>
                         </div>
                     </div>
                 </div>
            </div>

}

export default LogInOrOut