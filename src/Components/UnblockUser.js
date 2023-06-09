import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const UnblockUser = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
    blocked_user_id: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("unblock_user_response", (response) => {
        if (response.status) {
          //   alert(response.message);
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("unblock_user", values);
    setValues({ user_id: "", blocked_user_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Unblock User</h1>
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
            <button className={"btn btn-info mt-4"}>Unblock User</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UnblockUser;
