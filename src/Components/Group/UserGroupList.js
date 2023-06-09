import React, { Fragment, useEffect, useState } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const UserGroupList = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
  });

  const [groups, setGroups] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("get_user_groups_list", values);
  };

  function handleChange(e) {
    setValues({ [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      // setValues((values)=>({...values,user_id}));
      socket.on("user_groups_list_response", (response) => {
        if (response.status) {
          console.log(response);
          setGroups(response.data.groups);
          // console.log(groups);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket, groups]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Get User Group List</h1>
      <h4>Get Groups List of a user, that user owns: Admin of group</h4>
      <div className="row ">
        <div className="user_id col-4">
          <label className={"form-label"}>user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter user_id"
            name={"user_id"}
            // value={values?.user_id}
            // disabled
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
          </select>
        </div>
        <div className={"col-4"}>
          <label className={"form-label"}></label>
          <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
            Get User Group List
          </button>
        </div>
      </div>
    </div>
  );
};
