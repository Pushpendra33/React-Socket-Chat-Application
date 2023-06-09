import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const UserDetail = ({ socket, ...props }) => {
  const [values, setValues] = useState({
    user_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("get_user_details", values);
    setValues({ user_id: "" });
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("user_details_response", (response) => {
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
      <h1>Get User Deatils</h1>
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
          <div className={"col-6"}>
            <button className={"btn btn-info mt-4"}>Get User Details</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
