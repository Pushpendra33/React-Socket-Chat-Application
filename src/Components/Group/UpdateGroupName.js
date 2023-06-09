import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const UpdateGroupName = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    group_id: "",
    group_name: "",
    updated_by_user: "",
  });
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("update_group_name_response", (response) => {
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
    socket.emit("update_group_name", values);
    setValues({ group_id: "", group_name: "", updated_by_user: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Update Group Name</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="updated_by_user col-4">
            <label className={"form-label"}>updated_by_user</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter updated_by_user"
              name={"updated_by_user"}
              value={values?.updated_by_user}
              onChange={handleChange}
            />
          </div>
          <div className="group_id col-4">
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
          <div className="group_name col-4">
            <label className={"form-label"}>group_name</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter group_name"
              name={"group_name"}
              value={values?.group_name}
              onChange={handleChange}
            />
          </div>
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Update Group Name</button>
          </div>
        </div>
      </form>
    </div>
  );
};
