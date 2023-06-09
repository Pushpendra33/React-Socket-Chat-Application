// import React, { useEffect, useState } from "react";
// import { isEmptyObject } from "../CommonUtilities";

// const Login = ({ socket, ...props }) => {
//   const [recoveryPhrase, setRecoveryPhrase] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // console.log(session_id);
//     socket.emit("login", recoveryPhrase);
//   };

//   const handleChange = (e) => {
//     setRecoveryPhrase({ [e.target.name]: e.target.value });
//   };
//   useEffect(() => {
//     if (!isEmptyObject(socket)) {
//       socket.on("login_response", (response) => {
//         if (response.status) {
//           alert(response.message);
//           console.log(response);
//         } else {
//           console.error(response.message);
//         }
//       });
//       socket.on("device_mismatch", (response) => {
//         if (response.status) {
//           // alert(response.message);
//           console.log(response);
//         } else {
//           console.error(response.message);
//         }
//       });
//     }
//   }, [socket]);

//   return (
//     <div className={"card my-3 mx-5 p-3"}>
//       <h1>Login</h1>
//       <div className="row">
//         <div className="recovery_phrase col-4">
//           <label className={"form-label"}>recovery_phrase</label>
//           <input
//             type="text"
//             className={"form-control"}
//             placeholder="enter recovery_phrase"
//             name={"recovery_phrase"}
//             onChange={handleChange}
//           />
//         </div>
//         <div className={"col-6"}>
//           <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
