import React from 'react';
import config from './paymentForm';
import { useContext } from "react";
import AuthenticationContext from "../AuthenticationContext"


const Square = ({ paymentForm,fee,community }) => {
    const authContext = useContext(AuthenticationContext)

    let memberData={}
    let stupidfidx=undefined
    let BobsYourUncle=false

    console.log("10 authContext.username: ", authContext.username)
    console.log("11 authContext.id: ", authContext.id)
    console.log("12 community: ",community)
    config.callbacks={
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
        if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error) {
                console.error('  ' + error.message);
            });
            alert('Encountered errors, check browser developer console for more details');
            return;
        }

// smart shit

        const getMember = async (id) => {
          // console.log("59 in getMember id is: ",id)
          // console.log("60 in getMember calledFromHomePage is: ", homePageFlag)
          
          try{
              let response= await fetch(`/member/username/${authContext.id}`); 

              if(response.ok){
                  let data = await response.json();
                  memberData=data
                  console.log("40 data: ", data)
                  console.log("41 data: ", data.communityDetail[0])
                  console.log("42 data: ", data.communityDetail[0]._id)
                  console.log("43 data: ", data.communityDetail[0].community)
                  console.log("44 data: ", data.communityDetail[0].membershipPaidDate)
              }           
          }
          catch(error) {
              console.log("45 error ",error.message)
          } 

          try{
            let response = await fetch('http://localhost:3000/process-payment', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nonce: nonce,
                fee:fee
              })
            })

            if(response.ok){
              let data2 = await response.json();
              console.log("68 data: ", data2)
            }           

          }
          catch{
            console.log("73 square error")
          }

          try{  console.log("76 our data: ",memberData)

            let currentDate = new Date();
            let firstName = memberData.firstName
            let lastName = memberData.lastName
            let address1 =  memberData.address1
            let address2 =memberData.address2
            let city = memberData.city
            let province = memberData.province
            let postalCode = memberData.postalCode
            let contactNumber = memberData.contactNumber
            let emailAddress =  memberData.emailAddress
            let communityDetail = memberData.communityDetail
            let username = memberData.username
            let active = memberData.active
            let dateAdded = memberData.dateAdded

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
    
console.log("98 memberToUpdate: ",memberToUpdate)
            let updateResponse = await fetch(`/member/${memberData._id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberToUpdate)
            })
            if(updateResponse.ok){
              let data = await updateResponse.json();
              console.log("86 update data: ",data)             
            }           
          }
          catch(error){
            console.log("82 our update failed, error: ",error)
          }
    

        }
        getMember();

        // determined that user belongs to community in dropdown



           //alert(`The generated nonce is:\n${nonce}`);
          //  fetch('http://localhost:3000/process-payment', {
          //     method: 'POST',
          //     headers: {
          //       'Accept': 'application/json',
          //       'Content-Type': 'application/json'
          //     },
          //     body: JSON.stringify({
          //       nonce: nonce,
          //       fee:fee
          //     })
          //   })
          //   .catch(err => {
          //     alert('Network error: ' + err);
          //   })
          //   .then(response => {
          //     if (!response.ok) {
          //       return response.text().then(errorInfo => Promise.reject(errorInfo));
          //     }
          //     return response.text();
          //   })
          //   .then(data => {
          //     console.log("51 our data: ", JSON.stringify(data));
          //     alert('Payment complete successfully!\nCheck browser developer console form more details');
          //   })
          //   .catch(err => {
          //     console.error(err);
          //     alert('Payment failed to complete!\nCheck browser developer console form more details');
          //   });
        }
      }
console.log(config.applicationId)
    paymentForm = new paymentForm(config);
    paymentForm.build();
    const requestCardNonce = () =>{
        paymentForm.requestCardNonce();
    }

    return (
        <div id="form-container">
            <div id="sq-card-number"></div>
            <div className="third" id="sq-expiration-date"></div>
            <div className="third" id="sq-cvv"></div>
            <div className="third" id="sq-postal-code"></div>
            <button id="sq-creditcard" className="button-credit-card" onClick={requestCardNonce}> Pay ${fee} </button>
        </div>
      
    )
}

export default Square;