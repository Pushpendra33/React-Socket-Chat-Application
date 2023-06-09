import axios from "axios";
import React, { useState } from "react";
import RecoveryPhrase from "./RecoveryPhrase";

const Register = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_name: "",
    session_id: "",
    device_type: "",
    device_token: "",
    recovery_phrase: "",
    public_key: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_TESTING}${process.env.REACT_APP_API_VERSION}register_user`,
        { ...values }
      )
      .then((response) => {
        console.log("Response: ", response);
        if (response.status) {
          console.log("Response: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error is: ", error?.response?.data?.message);
      });
    // socket.emit("register_user", values);
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Registration</h1>
      <RecoveryPhrase />
      <div className="row">
        <div className="username col-6">
          <label className={"form-label"}>user_name</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_name"
            name={"user_name"}
            onChange={handleChange}
          />
        </div>
        <div className="session_id col-6">
          <label className={"form-label"}>session_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter session_id"
            name={"session_id"}
            onChange={handleChange}
          />
        </div>
        <div className="device_type col-6">
          <label className={"form-label"}>device_type</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter device_type"
            name={"device_type"}
            onChange={handleChange}
          />
        </div>
        <div className="device_token col-6">
          <label className={"form-label"}>device_token</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter device_token"
            name={"device_token"}
            onChange={handleChange}
          />
        </div>
        <div className="recovery_phrase col-6">
          <label className={"form-label"}>recovery_phrase</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter recovery_phrase"
            name={"recovery_phrase"}
            onChange={handleChange}
          />
        </div>
        <div className="public_key col-6">
          <label className={"form-label"}>public_key</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter public_key"
            name={"public_key"}
            onChange={handleChange}
          />
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
