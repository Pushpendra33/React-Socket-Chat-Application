import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const Like = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    liked_by: "",
    message_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("like_message", values);
    setValues({liked_by:"",message_id:""});
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("like_message_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Like Message</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
          <div className="user_id col-4">
            <label className={"form-label"}>liked_by</label>
            <input
              type="text"
              name="liked_by"
              className={"form-control"}
              placeholder="enter liked_by"
              value={values?.liked_by}
              onChange={handleChange}
            />
          </div>
          <div className="message_id col-4">
            <label className={"form-label"}>message_id</label>
            <input
              type="text"
              name="message_id"
              className={"form-control"}
              placeholder="enter message_id"
              value={values?.message_id}
              onChange={handleChange}
            />
          </div>
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Like Message</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Like;
