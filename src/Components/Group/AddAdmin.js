import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const AddAdmin = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    group_id: "",
    user_id: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("add_admin_response", (response) => {
        if (response.status) {
          alert(response.message);
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("add_admin", values);
    setValues({ group_id: "", user_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
      <div className="row ">
        <div className="group_name col-4">
          <label className={"form-label"}>group_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter group_id"
            name={"group_id"}
            value={values?.group_id}
            onChange={handleChange}
          />
        </div>
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
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} >
            Add Admin
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};
