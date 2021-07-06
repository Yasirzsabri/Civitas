import React, {useEffect, useState} from 'react';
import UserForm from './UserForm';
import moment from "moment";
import ReactPaginate from 'react-paginate';
import * as  BsIcons from 'react-icons/bs';
import * as  RiIcons from 'react-icons/ri';
import * as  SiIcons from 'react-icons/si';
import './Table.css';


const UserTable = () => {
    const [rows, setRows]= useState([]);
    const [inEditMode, setInEditMode] = useState({status:false, rowKey:null})
    const [pageNumber, setPageNumber]= useState(0)
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [userLevel, setUserLevel] = useState([])
    const [userLevelList, setUserLevelList] = useState([])
    const [active, setActive] = useState("true")
    
    const rowsPerPage = 10;
    const rowsVisited = pageNumber * rowsPerPage;
    const pageCount = Math.ceil(rows.length / rowsPerPage);

  
    const changePage = ({selected}) =>{
        setPageNumber(selected)
    }

    //fetch data and set rows
    const getUsers = async () =>{
        let response= await fetch('/user');
        let data = await response.json();
        console.log("data:", data)
        setRows(data)
    }

    useEffect(()=>{
        getUsers()
    }, [addBtnPopupForm])

    //update a User
    let updateUser = (id, newUserId, newPassword, newUserLevel,  newActive) =>{

        let currentDate = new Date();
        let userToUpdate = {
            userId : newUserId,
            password: newPassword,
            userLevel: newUserLevel,
            active: newActive,
            lastUpdateDate: currentDate
        }
        let updateResponse = fetch(`/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userToUpdate)
        }).then(response => response.json())
        .then(json => {
            onCancel(); //reset inEditMode  values
            getUsers(); //fetch the updated data
            console.log("updateResponse:", updateResponse)
        })
    }

    const onEdit = (id, currentUserId, currentPassword, currentUserLevel, currentActive) =>{
        setInEditMode({status: true, rowKey: id})
        
        setUserId(currentUserId)
        setPassword(currentPassword)
        setUserLevel(currentUserLevel)
        setActive(currentActive)                
        getUserLevelList()
    }

    const onSave = (id, newUserId, newPassword, newUserLevel, newActive) => {
        updateUser(id, newUserId, newPassword, newUserLevel, newActive)
    }
    
    const onCancel =() =>{
        setInEditMode({status:false, rowKey:null});
        getUsers()
    }

    //delete a row
    const handleDeleteClick = async (itemId)=> {
        let deleteResponse = await fetch(`/user/${itemId}`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'}
        })
        if(deleteResponse.status === 200){
            getUsers()
        }
        console.log('deleteResponse:',deleteResponse );
    }

    const handleUserFormClick = (userFormData) => {
        if(userFormData === 'success'){
            getUsers()
        }
    }

     //fetch supplierlist 
     const getUserLevelList = async () =>{
        let response= await fetch('/userLevel');
        let data = await response.json();        
        setUserLevelList(data)  
    }

    const onUserLevelChange = (e, id , index)=> {
        let newUserLevel = [...userLevel]
        newUserLevel[index] = e.target.value
        setUserLevel(newUserLevel)

        let newRows = [...rows]

        for(let i=0; i<newRows.length; i++){
            if(newRows[i]._id ===id){
                newRows[i].userLevel= newUserLevel
                break
            }
        }
        setRows(newRows)
    }

    const onUserLevelAdd = (id)=>{
        let newRows = [...rows]

        for(let i=0; i<newRows.length; i++){
            if(newRows[i]._id ===id){
                newRows[i].userLevel.push("")
                setUserLevel(newRows[i].userLevel)
                break
            }
        }
        setRows(newRows)
    }

    const onUserLevelDelete = (id, index) => {
        let newUserLevel = [...userLevel];
        newUserLevel.splice(index, 1);
        setUserLevel(newUserLevel);
  
        let newRows = [...rows];
  
        for (let i=0; i< newRows.length; i++) {
          if (newRows[i]._id === id) {
            newRows[i].userLevel = newUserLevel;
            break;
          }        
        }
        setRows(newRows);
    }

    const displayRows = rows.slice(rowsVisited, rowsVisited+rowsPerPage).map(row => {
        return(
            <tr key= {row.userId}>
                <td>
                    {
                        inEditMode.status && inEditMode.rowKey === row._id ?(
                        <input value={userId} onChange={(e)=> setUserId(e.target.value)} />
                        ):(
                        row.userId
                        )
                    }
                </td>
                <td>
                    {
                        inEditMode.status && inEditMode.rowKey === row._id ?(
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} />
                        ):(
                        row.password
                        )
                    }
                </td>
                <td>
                    <table className="inner-table">
                        <tbody>
                            {row.userLevel.map((ul, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                {
                                                    inEditMode.status && inEditMode.rowKey === row._id ? (
                                                        <select name="_id" value={ul._id} onChange={(e) => onUserLevelChange(e, row._id, index)}>
                                                        <option >--Select--</option>
                                                        {userLevelList.map(item=><option key={item.name} value={item._id}>{item.name}</option>
                                                        )}
                                                        </select>
                                                    ):(
                                                        ul.name
                                                    )
                                                }
                                            </td>
                                            {
                                                inEditMode.status && inEditMode.rowKey === row._id ? (
                                                <td>    
                                                    <button className="clear" onClick={() => onUserLevelDelete(row._id, index) }><RiIcons.RiDeleteBinFill/></button>  
                                                </td>
                                                ) : null
                                            }                                        
                                        </tr>)
                                })
                            }
                            <tr>
                                {
                                    inEditMode.status && inEditMode.rowKey === row._id ? (
                                    <td>
                                        <button className="clear" onClick={() => onUserLevelAdd(row._id) }><SiIcons.SiAddthis/></button>
                                    </td>
                                    )  : null                
                                }    
                            </tr>
                        </tbody>
                    </table>   
                </td>
                <td>
                    {
                        inEditMode.status && inEditMode.rowKey === row._id ? (
                            <select>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        ) : (
                            String(row.active)
                        )
                    }  
                </td>
                <td>{moment(row.dateAdded).format("MM/DD/yyyy hh:mm A")}</td>
                <td>{moment(row.lastUpdateAdded).format("MM/DD/yyyy hh:mm A")}</td>
                <td>
                    {
                       inEditMode.status && inEditMode.rowKey === row._id ? (
                        <React.Fragment>
                            <button onClick = {() => onSave(row._id, userId, password, userLevel, active)}>Save</button>
                            <button onClick = {() => onCancel()}>Cancel</button>
                        </React.Fragment>
                       ) : (
                           <button value={row.description} onClick={() => onEdit(row._id, row.userId, row.password, row.userLevel, row.active)}><BsIcons.BsPencilSquare /></button>
                       )
                    }
                    <button onClick={() => {handleDeleteClick(row._id)}}><RiIcons.RiDeleteBinFill/></button>
                </td> 
            </tr>
        )
    })


    return (
        <div>
            <div className="list-table">
                <h2>Users</h2>
                <button className="add-u" onClick={()=>setAddBtnPopupForm(true)}>New User</button>
                <UserForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onUserFormClick = {handleUserFormClick} />
                <table>
                    <tbody>
                        <tr><th>User Id</th><th>Password</th><th>User Level</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
                        {displayRows}
                    </tbody>
                </table>
                <ReactPaginate 
                    previousLabel = {"Prev"}
                    NextLabel = {"Next"}
                    pageCount = {pageCount}
                    onPageChange = {changePage}
                    containerClassName = {"paginationBttns"}
                    previousLinkClassName = {"previousBttn"}
                    nextLinkClassName = {"nextBttn"}
                    disabledClassName = {"paginationDisabled"}
                    activeClassName = {"paginationActive"}
                />   
            </div>
        </div>
        
    );
}
 
export default UserTable;