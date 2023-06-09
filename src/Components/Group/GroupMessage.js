import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../../CommonUtilities";

export const GroupMessage = ({ socket, from_user_id, ...props }) => {
  const [values, setValues] = useState({
    from_user_id: "",
    message_type: "text",
    parent_id: "",
  });
  const [groups, setGroups] = useState("");
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.emit("member_in_groups", { user_id: from_user_id });
      socket.on("member_in_groups_response", (response) => {
        if (response.status) {
          setGroups(response.data.groups);
          setValues((values) => ({
            ...values,
            from_user_id,
            group_id: response.data.groups[0].id,
          }));
          socket.emit("fetch_chat_history", {
            from_user_id: from_user_id,
            group_id: response.data.groups[0].id,
            conversation_type: 2,
          });
        } else {
          console.error(response);
        }
      });

      socket.on("fetch_chat_history_response", (response) => {
        if (response.status) {
          console.log(response);
          setLists(response.data.conversation);
        } else {
          console.error(response.message);
          if (response.code === "NO_DATA") {
            setLists([]);
          }
        }
      });
      socket.on("group_message_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
        }
      });

      socket.on("receive_group_message", (response) => {
        if (response.status) {
          console.log("Receive Message", response);
          setOtherUserTyping(false);
          setLists((list) => [...list, response?.data]);
        } else {
          console.error(response.message);
        }
      });
      socket.on("is_group_chat_screen_response", (response) => {
        if (response.status) {
          console.log(response);
        } else {
          console.error(response.message);
        }
      });

      socket.on("typing_response", (response) => {
        if (response.status) {
          setOtherUserTyping(true);
          console.log(response.message);
        } else {
          console.error(response.message);
          setOtherUserTyping(false);
        }
      });
    }
  }, [socket, from_user_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    socket.emit("group_message", values);
  };

  function handleChange(name, value) {
    if (name === "group_id") {
      if (value === "") return;
      if (values[name] !== undefined) {
        socket.emit("is_group_chat_screen", {
          group_id: values[name],
          status: 0,
        });
      }
      socket.emit("is_group_chat_screen", {
        group_id: value,
        status: 1,
      });
      socket.emit("fetch_chat_history", {
        from_user_id: values?.from_user_id,
        group_id: value,
        conversation_type: 2,
      });
    }

    setValues((values) => ({ ...values, [name]: value }));
  }

  function manageTyping(e) {
    e.preventDefault();
    socket.emit("typing", {
      from_user_id: values?.from_user_id,
      group_id: values?.group_id,
      conversation_type: 2,
    });
  }

  return (
    <div className={"card my-3 mx-5 p-3"}>
      <div className="row">
        <div className="from_user_id col-4">
          <label className={"form-label"}>from_user_id</label>
          <input
            type="text"
            className={"form-control"}
            placeholder="enter from_user_id"
            name={"from_user_id"}
            value={values?.from_user_id}
            disabled
          />
        </div>
        <div className="from_user_id col-8">
          <h1>Send Group Message</h1>
        </div>
        <div className="row">
          <div className="group_id col-4">
            <h2>Group List</h2>
            <ul className="p-0">
              {groups.length > 0 &&
                groups.map((group, idx) => {
                  return (
                    <li
                      key={`group-${idx}`}
                      onClick={() => handleChange("group_id", group.id)}
                      className={
                        "card p-2 my-2" +
                        (parseInt(values.group_id) === parseInt(group.id)
                          ? " bg-secondary text-white"
                          : " ")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {group?.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="messages col-8">
            <div className="messages-list">
              <div className="card my-4 mx-2 p-2 ">
                {lists.length > 0 ? (
                  lists.map((list, idx) => {
                    return (
                      <span
                        key={`list-${idx}`}
                        className={
                          "d-flex py-1 " +
                          (parseInt(list?.sender_id) ===
                          parseInt(values?.from_user_id)
                            ? "justify-content-end text-success"
                            : "justify-content-start")
                        }
                      >
                        {list?.message}{" "}
                      </span>
                    );
                  })
                ) : (
                  <p>No Chat Found</p>
                )}
              </div>
            </div>
            <hr />
            <div className="parent_id col-4">
              <label className={"form-label"}>parent_id</label>
              <input
                type="text"
                className={"form-control"}
                placeholder="enter parent_id"
                name={"parent_id"}
                // value={data?.parent_id}
                onChange={(e) => handleChange("parent_id", e.target.value)}
              />
            </div>
            <div className="message-box">
              <div className="message col-12">
                <label className={"form-label"}>Message</label>
                <textarea
                  rows={3}
                  cols={6}
                  className={"form-control"}
                  placeholder="enter message"
                  name={"message"}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onKeyUp={manageTyping}
                ></textarea>
              </div>
              <div className={"col-6"}>
                <button className={"btn btn-info mt-4"} onClick={handleSubmit}>
                  Send Message
                </button>
              </div>
            </div>
            <span></span>
          </div>
        </div>
      </div>
      {otherUserTyping && <p>User is Typing...</p>}
    </div>
  );
};

// <div className="user_id col-4">
//         <label className={"form-label"}>Groups</label>
//         <select
//           className="form-select"
//           name={"group_id"}
//           onChange={handleChange}
//         >
//           <option value="">Select A Group</option>

//           {groups.length > 0 &&
//             groups.map((group, idx) => {
//               console.log("d", group);
//               return (
//                 <Fragment key={`group-${idx}`}>
//                   <option value={group?.id}>
//                     ID: {group?.id} - {group?.name}
//                   </option>
//                   ;
//                 </Fragment>
//               );
//             })}
//         </select>
//       </div>
