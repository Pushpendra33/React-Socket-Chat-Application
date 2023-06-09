import React, { useState } from "react";
import axios from "axios";

const RecoverAccount = ({ socket, fcmToken }) => {
  const [values, setValues] = useState({
    recovery_phrase: "",
    device_type: "",
    device_token: "",
  });
  const recoverAccount = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_LAN}${process.env.REACT_APP_API_VERSION}recover_account`,
        { ...values }
      )
      .then((response) => {
        if (response.status) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error is: ", error?.response?.data?.message);
      });
  };
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Recover Account</h1>
      <div className="row">
        <div className="recovery_phrase col-4">
          <label className={"form-label"}>recovery_phrase</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter recovery_phrase"
            name={"recovery_phrase"}
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
            placeholder="enter fcm_token"
            name={"device_token"}
            value={fcmToken}
            onChange={handleChange}
          />
        </div>
        <div className="device_token col-6">
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
          <button className={"btn btn-info mt-4"} onClick={recoverAccount}>
            Recover Account
          </button>
        </div>
      </div>
      {/* 
      <div className="mt-2">
        <p>Account Details {data}</p>
      </div> */}
    </div>
  );
};

export default RecoverAccount;
