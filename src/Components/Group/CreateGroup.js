import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const CreateGroup = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    group_name: "",
    group_owner_id: "",
    members: "",
  });

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("create_group_response", (response) => {
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
    socket.emit("create_group", values);
    setValues({ group_name: "", group_owner_id: "", members: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit}>
        <div className="row ">
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
          <div className="group_owner_id col-4">
            <label className={"form-label"}>group_owner_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter group_owner_id"
              name={"group_owner_id"}
              value={values?.group_owner_id}
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
            <button className={"btn btn-info mt-4"}>Create Group</button>
          </div>
        </div>
      </form>
    </div>
  );
};
