import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const UpdateUserName = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
    user_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("update_user_name", values);
    setValues({ user_id: "", user_name: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("update_user_name_response", (response) => {
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
      <h1>Update User Name</h1>
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
        <div className="user_name col-4">
          <label className={"form-label"}>user_name</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_name"
            name={"user_name"}
            value={values?.user_name}
            onChange={handleChange}
          />
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} >
            Update User Name
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default UpdateUserName;
