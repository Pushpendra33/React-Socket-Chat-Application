import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const Unlike = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    unliked_by: "",
    message_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("unlike_message", values);
    setValues({ unliked_by: "", message_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("unlike_message_response", (response) => {
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
      <h1>Unlike Message</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
          <div className="unliked_by col-4">
            <label className={"form-label"}>unliked_by</label>
            <input
              type="text"
              name="unliked_by"
              className={"form-control"}
              placeholder="enter unliked_by"
              value={values?.unliked_by}
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
            <button className={"btn btn-info mt-4"}>Unlike Message</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Unlike;
