import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../CommonUtilities";

const DeleteMessage = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    delete_type: "",
    message_id: "",
    conversation_id: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("delete_message_response", (response) => {
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
    if (values.delete_type === "single") {
      delete values.conversation_id;
    } else if (values.delete_type === "all") {
      delete values.message_id;
    }
    socket.emit("delete_message", values);
  };
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  // console.log("values after:", values);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Delete Message</h1>
      <div className="row">
        <div className="delete_type col-4">
          <label className={"form-label"}>delete_type</label>
          <select
            className="form-select"
            name={"delete_type"}
            onChange={handleChange}
          >
            <option selected value="">
              Select An Option
            </option>
            <option value="single">Single(One 2 One)</option>
            <option value="all">All(Group Message)</option>
          </select>
        </div>
        {values.delete_type === "single" && (
          <div className="message_id col-4">
            <label className={"form-label"}>message_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter message_id"
              name={"message_id"}
              onChange={handleChange}
            />
            <div className={"col-6"}>
              <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
                Delete Message
              </button>
            </div>
          </div>
        )}

        {values.delete_type === "all" && (
          <div className="conversation_id col-4">
            <label className={"form-label"}>conversation_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter conversation_id"
              name={"conversation_id"}
              onChange={handleChange}
            />
            <div className={"col-6"}>
              <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
                Delete Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteMessage;
