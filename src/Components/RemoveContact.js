import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../CommonUtilities";

const RemoveContact = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
    contact_user_id: "",
    // session_id: "",
    // contact_session_id: "",
  });
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("remove_contact_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    socket.emit("remove_contact", values);
    setValues({ user_id: "", contact_user_id: "" });
  };

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Remove Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="user_id col-4">
            <label className={"form-label"}>user_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter user_id"
              name={"user_id"}
              value={values?.user_id}
              onChange={handleChange}
            />
          </div>
          <div className="contact_user_id col-4">
            <label className={"form-label"}>contact_user_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter contact_user_id"
              name={"contact_user_id"}
              value={values?.contact_user_id}
              onChange={handleChange}
            />
          </div>
          {/* <div className="session_id col-4">
            <label className={"form-label"}>session_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter session_id"
              name={"session_id"}
              value={values?.session_id}
              onChange={handleChange}
            />
          </div>
          <div className="contact_session_id col-4">
            <label className={"form-label"}>contact_session_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter contact_session_id"
              name={"contact_session_id"}
              value={values?.contact_session_id}
              onChange={handleChange}
            />
          </div> */}
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Remove Contact</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveContact;
