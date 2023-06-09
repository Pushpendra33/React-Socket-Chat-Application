import React, { useState } from "react";
import axios from "axios";

const CheckDevice = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
    device_token: "",
  });
  const checkDevice = () => {
    let url = `${process.env.REACT_APP_BASE_URL_LAN}${process.env.REACT_APP_API_VERSION}check_device`;
    let params = {
      ...values,
    };
    axios
      .get(
        url,
        {
          params,
        }
        // { Headers: { "Content-Type": "application/json" } }
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
        <div className="user_id col-4">
          <label className={"form-label"}>user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_id"
            name={"user_id"}
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
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={checkDevice}>
            Check Device
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckDevice;
