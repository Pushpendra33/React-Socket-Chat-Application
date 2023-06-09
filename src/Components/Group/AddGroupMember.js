import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const AddGroupMember = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    group_id: "",
    members: "",
  });
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("add_group_member_response", (response) => {
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
    socket.emit("add_group_member", values);
    setValues({ group_id: "", members: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Add Group Members</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
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
          <div className="members col-4">
            <label className={"form-label"}>members</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter members"
              name={"members"}
              value={values?.members}
              onChange={handleChange}
            />
          </div>
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Add Group Member</button>
          </div>
        </div>
      </form>
    </div>
  );
};
