import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const FetchConversations = ({ socket, user_id, ...props }) => {
  const [user, setUser] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("fetch_conversations", { user_id:user });
    setUser("")
  };

    function handleChange(e) {
      setUser(e.target.value);
    }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("fetch_conversations_response", (response) => {
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
      <h1>Fetch Conversations</h1>
      <form onSubmit={handleSubmit}>
      <div className="row ">
        <div className="user_id col-4">
          <label className={"form-label"}>user_id</label>
          <input
            type="text"
            name="user"
            className={"form-control"}
            placeholder="enter user_id"
            value={user}
            onChange={handleChange}
          />
        </div>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} >
            Fetch Conversations
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default FetchConversations;
