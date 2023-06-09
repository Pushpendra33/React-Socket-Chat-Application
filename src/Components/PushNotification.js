import React, { useState } from "react";
import axios from "axios";

const PushNotification = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    fcm_token: "",
    title: "",
    message: "",
  });
  const pushNotification = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_LAN}${process.env.REACT_APP_API_VERSION}send_push_notification`,
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
      <h1>Send Push Notification</h1>
      <div className="row">
        <div className="recovery_phrase col-4">
          <label className={"form-label"}>fcm_token</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter fcm_token"
            name={"fcm_token"}
            onChange={handleChange}
          />
        </div>
        <div className="device_type col-6">
          <label className={"form-label"}>title</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter title"
            name={"title"}
            onChange={handleChange}
          />
        </div>
        <div className="device_token col-6">
          <label className={"form-label"}>message</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter message"
            name={"message"}
            onChange={handleChange}
          />
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={pushNotification}>
            Push Notification
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

export default PushNotification;
