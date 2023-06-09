import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const GetMessageLikedBy = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    message_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("get_message_liked_by", values);
    setValues({message_id:""});
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("message_liked_by_response", (response) => {
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
      <h1>Get Message Liked By</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
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
            <button className={"btn btn-info mt-4"}>Get User Who Liked Message</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetMessageLikedBy;
