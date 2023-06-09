import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const UpdateProfileImage = ({ socket, user_id, ...props }) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values);
    socket.emit("update_profile_image", values);
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      setValues((values) => ({ ...values, user_id }));
      socket.on("update_profile_image_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket, user_id]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Update Profile Image</h1>
      <div className="row ">
        <div className="update_type col-4">
          <label className={"form-label"}>image_type</label>
          <select
            className="form-select"
            name={"image_type"}
            onChange={handleChange}
          >
            <option value="">Select A Type</option>
            <option value="1">Update User profile image</option>
            <option value="2">Update Group profile image</option>
          </select>
        </div>
        {values.image_type === "1" && (
          <div className="user_id col-4">
            <label className={"form-label"}>user_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter user_id"
              name={"user_id"}
              // onChange={handleChange}
              value={values?.user_id}
              disabled
            />
          </div>
        )}
        {values.image_type === "2" && (
          <div className="group_id col-4">
            <label className={"form-label"}>group_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter group_id"
              name={"group_id"}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="update_type col-4">
          <label className={"form-label"}>update_type</label>
          <select
            className="form-select"
            name={"update_type"}
            onChange={handleChange}
          >
            <option value="">Select A Type</option>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </div>

        {values.update_type === "add" && (
          <div className="image_url col-4">
            <label className={"form-label"}>image_url</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter image_url"
              name={"image_url"}
              onChange={handleChange}
            />
          </div>
        )}

        <div className={"row-6"}>
          <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
            Update Profile Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileImage;
