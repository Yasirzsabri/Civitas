import './Pay.css';
//import Navbar from './navbar/Navbar';
import Square from '../src/components/Square';
import React, { useState, useEffect } from 'react';
import moment from "moment";
import existingMember from './components/screens/MemberForm';
import index from './components/screens/MemberForm';
import cd from './components/screens/MemberForm';
import setCommunityList from './components/screens/MemberForm';
import memberToUpdate from './components/screens/MemberForm';
import member from './components/screens/MemberTable';



const Pay = () => {
    let [communityList, setCommunityList] = useState([]);
    let [community, setCommunity] = useState("");
  const [isLoad, setLoad] = useState(false);
  useEffect(() => {
    let sqPaymentScript = document.createElement("script");
    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform
    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoad(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  });

  const squarePayment = isLoad ? (
        <Square paymentForm={ window.SqPaymentForm }/>
    ) : (
       null
    )
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
      const getCommunityList = async () => {
        let response= await fetch('/community');
        let data = await response.json();
        setCommunityList(data);
    }
    
  
  return (
    <>
    
      <div>
      <select name="community" value={community} onChange={(e) => setCommunity(e.target.value)}>
         <option>--Select--</option>
            {communityList.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)} 
       </select> 
        </div>
      <div className="Pay">
        <h1>Pay For A Membership</h1>
       {squarePayment}
        </div>
        
    </>
  );
};

export default Pay;