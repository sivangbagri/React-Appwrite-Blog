// import React from 'react';
// import { useForm } from 'react-hook-form';
// import TelesignSDK from 'telesignenterprisesdk';

// const SendOTPForm = () => {
//   const { register, handleSubmit, errors } = useForm();
//   const customerId = process.env.REACT_APP_CUSTOMER_ID;
//   const apiKey = process.env.REACT_APP_API_KEY;

//   const client = new TelesignSDK(customerId, apiKey);

//   const onSubmit = (data) => {
//     const phoneNumber = data.phone;

//     // Generate a random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Params for Telesign API
//     const params = {
//       verify_code: otp
//     };

//     // Send SMS OTP using Telesign SDK
//     client.verify.sms((error, responseBody) => {
//       if (error === null) {
//         console.log("\nResponse body:\n" + JSON.stringify(responseBody));
//         // Handle success, e.g., show message to user
//         alert(`OTP sent to ${phoneNumber}.`);
//       } else {
//         console.error("Unable to send message. " + error);
//         // Handle error, e.g., show error message to user
//         alert('Failed to send OTP. Please try again.');
//       }
//     }, phoneNumber, params);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h2>Send OTP to Phone Number</h2>
//       <label>Phone Number:</label>
//       <input
//         type="text"
//         name="phone"
//         ref={register({ required: true, pattern: /^[0-9]{10}$/ })}
//       />
//       {errors.phone && errors.phone.type === 'required' && <span>This field is required.</span>}
//       {errors.phone && errors.phone.type === 'pattern' && <span>Enter a valid 10-digit phone number.</span>}
//       <br />
//       <button type="submit">Send OTP</button>
//     </form>
//   );
// };

// export default SendOTPForm;
