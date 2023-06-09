import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const RemoveGroup = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    group_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("remove_group", values);
    setValues({ group_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("remove_group_response", (response) => {
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
      <h1>Remove Group</h1>
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
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Remove Group</button>
          </div>
        </div>
      </form>
    </div>
  );
};
