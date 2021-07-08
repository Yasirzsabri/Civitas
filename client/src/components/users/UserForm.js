import { useState , useEffect} from "react"
import './Form.css';
import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

const UserForm = (props) => {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [userLevel, setUserLevel] = useState([])
    let [userLevelList, setUserLevelList] = useState([])
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")
   
     //fetch userLevel
     const getUserLevelList = async () =>{
        let response= await fetch('/userLevel');
        let data = await response.json();        
        setUserLevelList(data)  
    }

    useEffect(()=>{
        getUserLevelList()
    }, [])
    //userLevel: ["609b044c3fedfb45458a5f7b"]
    //active: "true"
    async function onCreateClicked() {
        let currentDate = new Date();
        let userToCreate = {
            username, 
            password,
            userLevel,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }
        console.log('Creating a User:', userToCreate )
        console.log('line 37 im here ',userLevelList)
        if (props.minimalFlag){
            setActive(true)
            //userLevel.push("")
           // setUserLevel(["609b044c3fedfb45458a5f7b"])
            let newUserLevel = [...userLevel]
            newUserLevel.push("")
            setUserLevel(newUserLevel)
            let newUserLevel2 = [...userLevel]
            newUserLevel2[1]=`609b044c3fedfb45458a5f7b`
            setUserLevel(newUserLevel2)
            //newUserLevel.push("609b044c3fedfb45458a5f7b")
            //newUserLevel[0]= "609b044c3fedfb45458a5f7b"
            console.log ('imhere ',newUserLevel2)

           
            console.log ('im not here ',userLevel)
        }
        try {
            
            let createResponse = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToCreate)
                
            })
            console.log('Creating a user:', userToCreate )

            if (createResponse.status === 200) {
                props.onUserFormClick("Success");

                setUsername("");
                setPassword("")
                setUserLevel([])
                setActive("true");                          
            }

            // the server didn't like the data for some reason
            console.log('Create response is:', createResponse)
            if (createResponse.status !== 200) {
                let errorMessage = await createResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setCreateError(errorMessage)
            }
            else {
                setCreateError(undefined)
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server:', error)
        }
    }

    const onInputChange = (event, setFunction) => {
        console.log('event: ', event)
        console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);   
    };

    const onUserLevelChange = (e, i)=>{
        let newUserLevel = [...userLevel]
        newUserLevel[i]= e.target.value
       // console.log("90 e.target.value:", e.target.value)
       //console.log("91 newUserLevel:", newUserLevel)
        
        setUserLevel(newUserLevel)
    }

    const onUserLevelAdd = () =>{
        let newUserLevel = [...userLevel]
        newUserLevel.push("")
        setUserLevel(newUserLevel)
        console.log('103 userLevel: ', userLevel)
    }

    const onUserLevelDelete = (index) => {
        let newUserLevel = [...userLevel]
        newUserLevel.splice(index, 1)
        setUserLevel(newUserLevel)
    }

    const onClickAdd = ()=>{
        onCreateClicked();
        props.setTrigger(false);   
    }

    let createUserDataInvalid = !username || (username.trim().length === 0)

    return (props.trigger)? (
        <div className="createform">
            <div className="popup-in">
                <h4>Add a New User</h4>
                <button className="closebtn" onClick={()=>props.setTrigger(false)}><AiIcons.AiOutlineClose/></button>
                {props.children}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" value={username} onChange={(event) => onInputChange(event,setUsername)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" value={password} placeholder="Enter Password" onChange={(event)=> onInputChange(event,setPassword)}/>
                </div>

                {props.minimalFlag ? (null) : 
                (<>
                <div>
                    <label htmlFor="userLevel">UserLevel:</label> 
                    <table>
                        <tbody>
                            {
                                userLevel.map((s, index) =>{
                                    return (<tr key={index}>
                                        <td>{
                                                <select  name="_id" value={s._id} onChange={(event) => onUserLevelChange(event, index)}>
                                                <option>--Select--</option>
                                                {userLevelList.map(item=><option key={item.name} value={item._id}>{item.name}</option>
                                                )}
                                                </select>
                                            }
                                        </td>
                                        {
                                            <td>
                                                <button className="clear"
                                                onClick ={()=> onUserLevelDelete(index)} ><RiIcons.RiDeleteBinFill/></button>
                                            </td>
                                        }
                                    </tr>)
                                })
                            }
                            <tr>
                                <td>
                                    <button onClick= {onUserLevelAdd}><SiIcons.SiAddthis/></button>
                                </td>
                            </tr>   
                            
                        </tbody>
                    </table>
                </div>
                
                <div>
                    <label htmlFor="active">Active:</label>                
                    <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
                </>
                )
                }  


                <br/>            
                <button disabled={ createUserDataInvalid } onClick={ onClickAdd } >Add User</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ): "";
}
 
export default UserForm;