import React, { useState, useEffect } from "react";
import { isEmptyObject } from "../CommonUtilities";

const Message = ({ socket, from_user_id, ...props }) => {
  const [data, setData] = useState({
    from_user_id: "",
    message_type: "text",
    parent_id: "",
  });

  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [contacts, setContacts] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!isEmptyObject(socket)) {
      socket.emit("contact_list", { user_id: from_user_id });
      socket.on("contact_list_response", (response) => {
        if (response.status) {
          setContacts(response.data.contacts);
          setData((data) => ({
            ...data,
            from_user_id,
            to_user_id: response.data.contacts[0].id,
          }));
          socket.emit("fetch_chat_history", {
            from_user_id: from_user_id,
            to_user_id: parseInt(response.data.contacts[0].id),
            conversation_type: 1,
          });
        } else {
          console.error(response.message);
        }
      });
      socket.on("fetch_chat_history_response", (response) => {
        if (response.status) {
          console.log(response);
          setLists(response.data.conversation);
        } else {
          console.error(response.message);
          console.log(response);
          if (response.code === "NO_DATA") {
            setLists([]);
          }
        }
      });
      socket.on("receive_message", (response) => {
        if (response.status) {
          console.log("Receive Message", response);
          setOtherUserTyping(false);
          setLists((list) => [...list, response?.data]);
        } else {
          console.error(response);
        }
      });
      socket.on("is_chat_screen_response", (response) => {
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
    console.log(data);
    socket.emit("send_message", data);
  };

  function handleChange(name, value) {
    if (name === "to_user_id") {
      if (value === "") return;
      if (data[name] !== undefined) {
        socket.emit("is_chat_screen", {
          user_id: data[name],
          status: 0,
        });
      }
      socket.emit("is_chat_screen", {
        user_id: value,
        status: 1,
      });

      socket.emit("fetch_chat_history", {
        from_user_id: data?.from_user_id,
        to_user_id: value,
        conversation_type: 1,
      });
    }

    setData((data) => ({ ...data, [name]: value }));
  }

  function manageTyping(e) {
    e.preventDefault();
    socket.emit("typing", {
      from_user_id: data?.from_user_id,
      to_user_id: data?.to_user_id,
      conversation_type: 1,
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
            value={data?.from_user_id}
            disabled
          />
        </div>
        <div className="from_user_id col-8">
          <h1>Send Message</h1>
        </div>
        <div className="row">
          <div className="to_user_id col-4">
            <h2>Contact List</h2>
            <ul className="p-0">
              {contacts.length > 0 &&
                contacts.map((contact, idx) => {
                  // console.log("d", contact);
                  return (
                    <li
                      key={`contact-${idx}`}
                      onClick={() => handleChange("to_user_id", contact.id)}
                      className={
                        "card p-2 my-2" +
                        (parseInt(data.to_user_id) === parseInt(contact.id)
                          ? " bg-secondary text-white"
                          : " ")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {contact?.name}
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
                          parseInt(data?.from_user_id)
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

            {/* <div className="is_reply col-4">
              <label className={"form-label"}>is_reply</label>
              <input
                type="text"
                className={"form-control"}
                placeholder="enter is_reply"
                name={"is_reply"}
                onChange={(e) => handleChange("is_reply", e.target.value)}
              />
            </div>  */}
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

export default Message;
