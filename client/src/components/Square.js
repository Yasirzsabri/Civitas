import React from 'react';
import config from './paymentForm';


const Square = ({ paymentForm,fee,community }) => {
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
           //alert(`The generated nonce is:\n${nonce}`);
           fetch('http://localhost:3000/process-payment', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nonce: nonce,
                fee:fee,
                community:community,
                
              })
            })
            .catch(err => {
              alert('Network error: ' + err);
            })
            .then(response => {
              if (!response.ok) {
                return response.text().then(errorInfo => Promise.reject(errorInfo));
              }
              return response.text();
            })
            .then(data => {
              console.log(JSON.stringify(data));
              alert('Payment complete successfully!\nCheck browser developer console form more details');
            })
            .catch(err => {
              console.error(err);
              alert('Payment failed to complete!\nCheck browser developer console form more details');
            });
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