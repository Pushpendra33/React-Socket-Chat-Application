import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const EditMessage = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    message_id: "",
    message_type: "",
    edited_by: "",
    message: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("edit_message_response", (response) => {
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
    socket.emit("edit_message", values);
    // setValues({ : "", : "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Edit Message</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
          <div className="message_id col-4">
            <label className={"form-label"}>message_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter message_id"
              name={"message_id"}
              value={values?.message_id}
              onChange={handleChange}
            />
          </div>
          <div className="message_type col-4">
            <label className={"form-label"}>message_type</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter message_type"
              name={"message_type"}
              value={values?.message_type}
              onChange={handleChange}
            />
          </div>
          <div className="edited_by col-4">
            <label className={"form-label"}>edited_by</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter edited_by"
              name={"edited_by"}
              value={values?.edited_by}
              onChange={handleChange}
            />
          </div>
          <div className="message col-4">
            <label className={"form-label"}>message</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter message"
              name={"message"}
              value={values?.message}
              onChange={handleChange}
            />
          </div>
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Edit Message</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMessage;
