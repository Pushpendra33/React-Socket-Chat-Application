// FetchChatHistory
import React, { useEffect, useState } from "react";
import { isEmptyObject } from "../CommonUtilities";

const FetchChatHistory = ({ socket, ...props }) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    if (values.delete_type === "1") {
      delete values.group_id;
    } else if (values.delete_type === "2") {
      delete values.to_user_id;
    }
    socket.emit("fetch_chat_history", values);
  };

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.on("fetch_chat_history_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
          console.log("response", response);
        }
      });
    }
  }, [socket]);

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <h1>Fetch Chat History</h1>
      <div className="row ">
        <div className="from_user_id col-4">
          <label className={"form-label"}>from_user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter from_user_id"
            name={"from_user_id"}
            onChange={handleChange}
          />
        </div>

        <div className="conversation_type col-4">
          <label className={"form-label"}>conversation_type</label>
          <select
            className="form-select"
            name={"conversation_type"}
            onChange={handleChange}
          >
            <option defaultValue value="">
              Select An Option
            </option>
            <option value="1">1(One 2 One)</option>
            <option value="2">2(Group Messages)</option>
          </select>
        </div>

        {values.conversation_type === "1" && (
          <div className="to_user_id col-4">
            <label className={"form-label"}>to_user_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter to_user_id"
              name={"to_user_id"}
              onChange={handleChange}
            />
            <div className={"col-8"}>
              <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
                Fetch Chat History
              </button>
            </div>
          </div>
        )}

        {values.conversation_type === "2" && (
          <div className="group_id col-4">
            <label className={"form-label"}>group_id</label>
            <input
              type="text"
              className={"form-control"}
              placeholder="enter group_id"
              name={"group_id"}
              onChange={handleChange}
            />
            <div className={"col-8"}>
              <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
                Fetch Chat History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchChatHistory;
