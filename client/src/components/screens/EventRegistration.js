import { useState, useEffect } from "react"
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

import './EventRegistration.css';

import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
                   
const EventRegistration = ({onEventFormClick, trigger, setTrigger, homePageFlag, eventData,idx}) => {
    // eslint-disable-next-line
    const authContext = useContext(AuthenticationContext)

    let [event, setEvent] = useState({})
    let [dateAdded, setdateAdded] = useState(undefined)

    let [name, setName] = useState("")
    let [address1, setAddress1] = useState("")
    let [address2, setAddress2] = useState("")
    let [city, setCity] = useState("")
    let [province, setProvince] = useState("")
    let [start, setStart] = useState("")
    let [end, setEnd] = useState("")
    let [community, setCommunity]= useState("")
    let [communityList, setCommunityList]= useState([])
    let [fee, setFee] = useState("")
    let [contactNumber, setContactNumber] = useState([])
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")

    //fetch community list
    const getCommunityList = async () => {
        let response= await fetch('/api/community');
        let data = await response.json();
        setCommunityList(data);
    }
    console.log("line42 " ,)
    console.log("line 25552119",idx)
    console.log("line 44 ER" ,eventData[idx])
    // console.log("line 43",index)
    useEffect( () => {
      getCommunityList(); 
    }, []);

    async function onCreateClicked(e) {
        let currentDate = new Date()

        let eventToCreate = {
            name,  
            address1,
            address2,
            city,
            province,
            start,
            end,
            community,
            fee,
            contactNumber,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }
        try {
            let createResponse = await fetch('/api/eventRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventToCreate)
            })

            if (createResponse.status === 200) {
                onEventFormClick("Success");

                
            }
            
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
            console.error('197 Fetch failed to reach the server.', error)
        }
    }

    const onInputChange = (event, setFunction) => {
        setFunction(event.target.value);
    };

    const onContactNumberChange = (e, i) => {
        let newContactNumber = [...contactNumber]
        newContactNumber[i][e.target.name] = e.target.value 
        setContactNumber(newContactNumber); 
      }  
  
    const onContactNumberAdd = () =>  {      
        let newContactNumber = [...contactNumber]
        newContactNumber.push({name: "",  phoneNumber: ""})
        setContactNumber(newContactNumber);
    }

    const onContactNumberDelete = (index) => {
        let newContactNumber = [...contactNumber];  
        newContactNumber.splice(index, 1);
        setContactNumber(newContactNumber);
    }

    const onClickAdd = ()=>{
        onCreateClicked();
        setTrigger(false);  
    }

    let createEventDataInvalid = !name || (name.trim().length === 0)

    return (trigger)? (
        <div className="row"> 
            <div className='createform'>
                <div className="popup-in">
                    <><h4 >Event Registration</h4></>
                    <><h4> Event Details</h4></>
                    <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>
                    <div >
                        <label htmlFor="name">Event Name:</label>
                        <span className="form-control">{eventData[idx].name}</span>
                        {/* <input id="name" value={name} onChange={(event) => onInputChange(event,setName)}/> */}
                    </div>
                    <div>
                        <label htmlFor="address1">Address1:</label>
                        <span className="form-control">{eventData[idx].address1}</span>
                        {/* <input id="address1" value={address1} onChange={(event) => onInputChange(event,setAddress1)}/> */}
                    </div>
                    <div  className = "row">
                        <div className="col-sm-4">
                            <label htmlFor="address2">Address2:</label>
                            <span className="form-control">{eventData[idx].address2}</span>
                            {/* <input id="address2" value={address2} onChange={(event) => onInputChange(event,setAddress2)}/> */}
                        </div>
                        
                            <div className="col-sm-4">
                                <label htmlFor="city">City:</label>
                                <span className="form-control" >{eventData[idx].city}</span>
                                {/* <input id="city" value={city} onChange={(event) => onInputChange(event,setCity)}/> */}
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="province">Province:</label>
                                <span className="form-control">{eventData[idx].province}</span>
                                {/* <input id="province" value={province} onChange={(event) => onInputChange(event,setProvince)}/> */}
                            </div>
                            
                            <div className="col-sm-4">
                            <label htmlFor="active">Active:</label>
                            <span className="form-control">{eventData[idx].active} True</span>
                            {/* <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>    */}
                        
                            <div className="col-sm-12">
                                <label htmlFor="fee">Fee:</label>
                                <span className="form-control">${eventData[idx].fee}</span>
                                {/* <input id="fee" value={fee} onChange={(event) => onInputChange(event,setFee)}/> */}
                            </div>
                        
                            
                            <div className="col-sm-12">
                                <label htmlFor="contactNumber">Contact Number:</label>
                                <span className="form-control">{[0].phoneNumber}4035081155</span>
                              
                                {/* <table> //eventData[idx].contactNumber.length
                                    <tbody>
                                        {contactNumber.map( (cn, index) => {
                                                return (<tr key={index}>
                                                            <td>
                                                                <input name="name" value={cn.name} placeholder="Type" onChange={(e) => onContactNumberChange(e, index)}/>
                                                            </td>
                                                            <td>
                                                                <input name="phoneNumber" value={cn.phoneNumber} placeholder="Phone #" onChange={(e) => onContactNumberChange(e, index)}/>
                                                            </td>
                                                            <td>
                                                                <button className="clear" onClick={ () => onContactNumberDelete(index) }><RiIcons.RiDeleteBinFill/></button>
                                                            </td>
                                                        </tr> )
                                            })
                                        }
                                        <tr>
                                            <td>
                                                <button onClick={ onContactNumberAdd }><SiIcons.SiAddthis/></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                  */}
                            </div>
                            <div className="col-sm-12">
                                <label htmlFor="community">Community:</label>
                                <span className="form-control">{eventData[idx].community.name}</span>
                                {/* <select value={community._id} onChange={(event) => onInputChange(event, setCommunity)}> */}
                                    {/* <option>--Select--</option>
                                    {communityList.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)}  */}
                                {/* </select> */}
                            </div>
                    </div>
                    <div className="col-sm-4">
                                <label htmlFor="start">start:</label>
                                <span className="form-control">{eventData[idx].start}</span>
                                {/* <Datepicker format={"MM/DD/yyyy"} value={moment(start).format("MM/DD/yyyy")} onChange={ (event) => {setStart(event)}}/> */}
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="end">end:</label>
                                <span className="form-control">{eventData[idx].end}</span>
                                {/* <Datepicker format={"MM/DD/yyyy"} value={moment(end).format("MM/DD/yyyy")} onChange={ (event) => {setEnd(event)}}/> */}
                            </div>
                    
            
            
            
                    <br></br>
                    {/* <div className="col3">
                            <label htmlFor="Frist Name">Frist Name:</label>
                            <input id="Frist Name" value={fee} onChange={(event) => onInputChange(event,setFee)}/>
                            <label htmlFor="Last Name">Last Name:</label>
                            <input id="Last Name" value={fee} onChange={(event) => onInputChange(event,setFee)}/>
                        </div> */}
                    <br></br>
                    <br/>
                    <button type="button" className="btn btn-danger"  disabled={ createEventDataInvalid } onClick={ onClickAdd }> Register</button>
                    { createError && <div>{createError}</div> }
                </div>
            </div>
        </div>
    </div>
    ):"";
}

export default EventRegistration