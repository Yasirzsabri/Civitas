import { useState, useEffect } from "react"

import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

import './form.css';

import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
                   
const MemberForm2 = ({onMemberFormClick, trigger, setTrigger, homePageFlag}) => {
    // eslint-disable-next-line
    const authContext = useContext(AuthenticationContext)

    let [member, setMember] = useState({})
    let [dateAdded, setdateAdded] = useState(undefined)
    let [lastUpdateDate, setLastUpdateDate]  = useState(undefined)

    let [existingMember, setExistingMember] = useState(false)

    let [memberId, setMemberId] = useState("")
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [address1, setAddress1] = useState("")
    let [address2, setAddress2] = useState("")
    let [city, setCity] = useState("")
    let [province, setProvince] = useState("")
    let [postalCode, setPostalCode] = useState("")
    let [contactNumber, setContactNumber] = useState([])
    let [emailAddress, setEmailAddress] = useState("")
    let [communityDetail, setCommunityDetail] = useState([]);
    let [communityList, setCommunityList] = useState([]);
    let [username, setUsername]= useState("")
    let [usernameList, setUsernameList]= useState([])
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")

    //fetch community list
    const getCommunityList = async () => {
        let response= await fetch('/community');
        let data = await response.json();
        setCommunityList(data);
    }

    //fetch user list 
    const getUsernameList = async () => {
        let response= await fetch('/user');
        let data = await response.json();
        setUsernameList(data);
    }

      //fetch member record, if there is one
    const getMember = async (id) => {
        console.log("59 in getMember id is: ",id)
        console.log("60 in getMember calledFromHomePage is: ", homePageFlag)
        
        if(id && homePageFlag){
            try{
                let response= await fetch(`/member/username/${id}`); 

                if(response.ok){
                    let data = await response.json();
    
                    setMember(data);
            
                    setMemberId(data._id);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setAddress1(data.address1);
                    setAddress2(data.address2);
                    setCity(data.city);
                    setProvince(data.province);
                    setPostalCode(data.postalCode);
                    setContactNumber(data.contactNumber);
                    setEmailAddress(data.emailAddress);
                    let newCommunityDetail = [...data.communityDetail]
                    setCommunityDetail(newCommunityDetail);
                    setUsername(data.username);
                    setActive(data.active);
                    setdateAdded(data.dateAdded);
                    setLastUpdateDate(data.lastUpdateDate);
                    setExistingMember(true)                
                }           
            }
            catch(error) {
               console.log("83 error ",error.message)
            }            
        }
        else {
            console.log("94 MemberForm id is undefined: ",id)
        }

    }
  
    useEffect( () => {
        if (authContext.id){
            getCommunityList();
            getUsernameList();
            getMember(authContext.id);
        }
    }, [authContext]);


    async function onCreateClicked(e) {
        let currentDate = new Date()

        if (existingMember){
            let memberToUpdate = {
                firstName, 
                lastName, 
                address1,
                address2,
                city,
                province,
                postalCode,
                contactNumber,
                emailAddress,
                communityDetail,
                username,
                active,
                dateAdded,
                lastUpdateDate : currentDate
            }
        
            let updateResponse = fetch(`/member/${member._id}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(memberToUpdate)
            })
            .then(response => response.json())
            .then(json => {
                // fetch the updated data
                // getMember();
                console.log("updateResponse = ", updateResponse);
            })    
    
        }
        else {
            let memberToCreate = {
                firstName, 
                lastName, 
                address1,
                address2,
                city,
                province,
                postalCode,
                contactNumber,
                emailAddress,
                communityDetail,
                username,
                active,
                dateAdded : currentDate,
                lastUpdateDate : currentDate
            }
            console.log('Creating Member with', memberToCreate )
            try {
                let createResponse = await fetch('/member', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(memberToCreate)
                })
    
                if (createResponse.status === 200) {
                    onMemberFormClick("Success");
    
                    // setFirstName("");
                    // setLastName("");
                    // setAddress1("");
                    // setAddress2("");
                    // setCity("");
                    // setProvince("");
                    // setPostalCode("");
                    // setContactNumber([]);
                    // setEmailAddress("");
                    // setCommunityDetail([]);
                    // setUsername("");
                    // setActive("true");
                }
                // the server didn't like the data for some reason
                console.log('Create response is', createResponse)
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
                console.error('197 Fetch failed to reach the server.', error)
            }
    
        }
    }

    const onInputChange = (event, setFunction) => {
        console.log('Changing input to be ', event.target.value)
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

    const onCommunityDetailDelete = (index) => {
        let newCommunityDetail = [...communityDetail];
        newCommunityDetail.splice(index, 1);
        setCommunityDetail(newCommunityDetail);
    }

    const onCommunityDetailChange = (e, i) => {
        let newCommunityDetail = [...communityDetail]
        newCommunityDetail[i][e.target.name] = e.target.value 
        setCommunityDetail(newCommunityDetail);
    }  
    // the event passed back by datePicker contains simply a date, nothing else
    const onCommunityDetailChangeDate = (e, i, dt) => {
        let newCommunityDetail = [...communityDetail]
        newCommunityDetail[i][dt] = e
        setCommunityDetail(newCommunityDetail);
    }  

    const onCommunityDetailAdd = () =>{
        let currentDate = new Date()
        let newCommunityDetail = [...communityDetail]
        newCommunityDetail.push({name: "", renewalDate: currentDate, memberShipSince: currentDate})
        setCommunityDetail(newCommunityDetail)
    }

    const onClickAdd = ()=>{
        onCreateClicked();
        setTrigger(false);   
    }

    let createMemberDataInvalid = !emailAddress || (emailAddress.trim().length === 0)

    return (trigger)? (
        <div className='createform'>
            <div className="popup-in">
                <h4>Add a New Member</h4>
                <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>

                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" value={firstName} onChange={(event) => onInputChange(event,setFirstName)}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" value={lastName} onChange={(event) => onInputChange(event,setLastName)}/>
                </div>
                <div>
                    <label htmlFor="address1">Address1:</label>
                    <input id="address1" value={address1} onChange={(event) => onInputChange(event,setAddress1)}/>
                </div>
                <div>
                    <label htmlFor="address2">Address2:</label>
                    <input id="address2" value={address2} onChange={(event) => onInputChange(event,setAddress2)}/>
                </div>
                <div className="row">
                    <div className="col3">
                        <label htmlFor="city">City:</label>
                        <input id="city" value={city} onChange={(event) => onInputChange(event,setCity)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="province">Province:</label>
                        <input id="province" value={province} onChange={(event) => onInputChange(event,setProvince)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input id="postalCode" value={postalCode} onChange={(event) => onInputChange(event,setPostalCode)}/>
                    </div>
                </div>

                <div className="row">
                    <div>
                        <label htmlFor="contactNumber">Contact Number:</label>                
                        <table>                      
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

                                <tr>
                                    <td colSpan="2">
                                        <label htmlFor="communityDetail">Community Detail:</label>
                                            <table width="100%">
                                                <tbody>
                                                    <tr><th>Community</th><th>Renewal Date</th><th>Paid Date</th><th>Membership Since</th><th>Action</th></tr>                                                
                                                    {communityDetail.map( (cd, index) => {

                                                            console.log(cd)
                                                            return (<tr key = {index}>
                                                                        <td width="43%">
                                                                            {
                                                                                 !existingMember ?(
                                                                                    <select name="community" value={cd._id} onChange={(e) => onCommunityDetailChange(e, index)}>
                                                                                    <option>--Select2--</option>
                                                                                        {communityList.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)} 
                                                                                    </select>
                                                                                ):(
                                                                                    <select name="community" value={communityDetail[index].community._id} onChange={(e) => onCommunityDetailChange(e, index)}>
                                                                                        <option>--Select1--</option>
                                                                                            {communityList.map(item => <option key={item.name} value={item._id}>{item.name}</option>)} 
                                                                                    </select>
                                                                               )
                                                                            }
                                                                        </td>
                                                                        <td width="19%">
                                                                            <Datepicker format={"MM/DD/yyyy"} value={moment(cd.renewalDate).format("MM/DD/yyyy") } onChange={ (e) => {onCommunityDetailChangeDate(e, index, "renewalDate")}}/>
                                                                        </td>
                                                                        <td width="19%">
                                                                            <Datepicker format={"MM/DD/yyyy"} value={moment(cd.membershipPaidDate).format("MM/DD/yyyy") } onChange={ (e) => {onCommunityDetailChangeDate(e, index, "membershipPaidDate")}}/>
                                                                        </td>
                                                                        <td width="19%">
                                                                            <Datepicker format={"MM/DD/yyyy"} value={moment(cd.memberSince).format("MM/DD/yyyy") } onChange={ (e) => {onCommunityDetailChangeDate(e, index, "memberSince")}}/>
                                                                        </td>
                                                                        <td>
                                                                            <button className="clear" onClick={ () => onCommunityDetailDelete(index) }><RiIcons.RiDeleteBinFill/></button>
                                                                        </td>
                                                                    </tr> )
                                                     })
                                                    }
                                                    <tr>
                                                        <td>
                                                            <button onClick={ onCommunityDetailAdd }><SiIcons.SiAddthis/></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                    </td>
                                </tr>
                            </tbody>    
                        </table>            
                    </div> 
                </div>            

                <div>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input id="emailAddress" value={emailAddress} onChange={(event) => onInputChange(event,setEmailAddress)}/>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="username">Username:</label> 
                                <select value={username._id} onChange={(event) => onInputChange(event, setUsername)}>
                                    <option>--Select--</option>
                                    {usernameList.map(item=> <option key={item.username} value={item._id}>{item.username}</option>)} 
                                </select>
                            </td>  
                        </tr>
                    </tbody>
                </table>  
                <div>
                    <label htmlFor="active">Active:</label>                
                    <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </select>
                </div>
                <br/>            
                <button disabled={ createMemberDataInvalid } onClick={ onClickAdd }>Add Member</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ):"";
}

export default MemberForm2