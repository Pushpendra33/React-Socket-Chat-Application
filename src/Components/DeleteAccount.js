import React, { useState } from "react";
import axios from "axios";

const DeleteAccount = ({ socket, fcmToken }) => {
  const [values, setValues] = useState({
    id: "",
  });
  const deleteAccount = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_TESTING}${process.env.REACT_APP_API_VERSION}delete_account`,
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
      <h1>Delete Account</h1>
      <div className="row">
        <div className="user_id col-4">
          <label className={"form-label"}>user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_id"
            name={"id"}
            value={values?.id}
            onChange={handleChange}
          />
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
