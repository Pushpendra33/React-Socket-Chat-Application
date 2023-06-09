import React, { useEffect } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const GroupList = ({ socket, ...props }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("get_groups_list");
  };

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("groups_list_response", (response) => {
        if (response.status) {
          //   alert(response.message);
          console.log(response);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [socket]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Group List</h1>
      <div className="row ">
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
            Get Group List
          </button>
        </div>
      </div>
    </div>
  );
};
