import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const BlockUnblockUser = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
    blocked_user_id: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("block_unblock_user_response", (response) => {
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
    socket.emit("block_unblock_user", values);
    setValues({ user_id: "", blocked_user_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Block Unblock Toggle</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
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
          <div className="blocked_user_id col-4">
            <label className={"form-label"}>blocked_user_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter blocked_user_id"
              name={"blocked_user_id"}
              value={values?.blocked_user_id}
              onChange={handleChange}
            />
          </div>
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Block User</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlockUnblockUser;
