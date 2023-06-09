import React, { Fragment, useEffect, useState } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const MembersInGroup = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
  });

  const [groups, setGroups] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("member_in_groups", values);
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("member_in_groups_response", (response) => {
        if (response.status) {
          setGroups(response.data.groups);
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Member In Groups</h1>
      <div className="row ">
        <div className="user_id col-4">
          <label className={"form-label"}>user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_id"
            name={"user_id"}
            onChange={handleChange}
          />
        </div>
        <div className="user_id col-4">
          <label className={"form-label"}>Groups</label>
          <select
            className="form-select"
            name={"group_id"}
            onChange={handleChange}
          >
            <option value="">Select A Group</option>

            {groups.length > 0 &&
              groups.map((group, idx) => {
                // console.log("d", group);
                return (
                  <Fragment key={`group-${idx}`}>
                    <option value={group?.id}>{group?.name}</option>;
                  </Fragment>
                );
              })}

            {/* <option value="all">All(Group Message)</option> */}
          </select>
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
            Members In Group
          </button>
        </div>
      </div>
    </div>
  );
};


