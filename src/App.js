import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Register from "./Components/Register";
import Message from "./Components/Message";
import UserDetail from "./Components/UserDetail";
import DeleteMessage from "./Components/DeleteMessage";
import {
  ActivateGroup,
  AddAdmin,
  AddGroupMember,
  CreateGroup,
  DeactivateGroup,
  GetGroupMembersList,
  GroupList,
  GroupMessage,
  MembersInGroup,
  RemoveAdmin,
  RemoveGroup,
  RemoveGroupMembers,
  UpdateGroupName,
  UserGroupList,
} from "./Components/Group";
import BlockUser from "./Components/BlockUser";
import UnblockUser from "./Components/UnblockUser";
import AddContact from "./Components/AddContact";
import RemoveContact from "./Components/RemoveContact";
import ContactList from "./Components/ContactList";
import RecoverAccount from "./Components/RecoverAccount";
import RecoveryPhrase from "./Components/RecoveryPhrase";
import CheckDevice from "./Components/CheckDevice";
import UpdateUserName from "./Components/UpdateUserName";
import UpdateProfileImage from "./Components/UpdateProfileImage";
import FetchConversations from "./Components/FetchConversations";
import FetchChatHistory from "./Components/FetchChatHistory";
import { isEmptyObject } from "./CommonUtilities";
import ReactJson from "react-json-view";
import Like from "./Components/Like";
import Unlike from "./Components/Unlike";
import GetMessageLikedBy from "./Components/GetMessageLikedBy";
import firebaseApp from "./CommonUtilities/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import PushNotification from "./Components/PushNotification";
import BlockedUsers from "./Components/BlockedUsers";
import DeleteAccount from "./Components/DeleteAccount";
import EditMessage from "./Components/EditMessage";
import BlockUnblockUser from "./Components/BlockUnblockUser";
import UpdateMessageRead from "./Components/UpdateMessageRead";

const App = () => {
  const [form, setForm] = useState();
  const [response, setResponse] = useState({});
  const [socket, setSocket] = useState();
  const [buttonType, setButtonType] = useState("recovery_phrase");
  const [connected, setConnected] = useState(false);
  const [fcmToken, setFcmToken] = useState();

  useEffect(() => {
    console.log("response", response);
  }, [response]);

  useEffect(() => {
    var messaging = getMessaging(firebaseApp);
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("permission granted");
      }
    });
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);

  const handleClick = (type) => {
    setButtonType(type);
    // console.log(type);
  };

  // Setting Values into Form
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  // Function to connect Socket
  const connectSocket = () => {
    const newSocket = io(`${process.env.REACT_APP_BASE_URL_LAN}/`, {
      reconnection: true,
      query: {
        device_token: form?.device_token,
        device_type: form?.device_type,
        user_id: form?.user_id,
      },
    });
    console.log("Socket: ", newSocket);

    newSocket.on("connected", (response) => {
      console.log("Socket Connected", newSocket);
      console.log("response", response);
      setSocket(newSocket);
      setConnected(true);
    });
    newSocket.on("connection_error", (response) => {
      console.error("Connection Error is:", response);
      setConnected(false);
    });
    newSocket.on("reconnect", () => {
      console.log("Socket Reconnecting...! Please wait!!");
    });
    newSocket.on("disconnect", () => {
      console.log("Socket Disconnected");
      setConnected(false);
      setSocket();
    });

    // Global events
    processListener(newSocket, "fetch_conversations");
    processListener(newSocket, "update_user_name");
    processListener(newSocket, "update_profile_image");
    processListener(newSocket, "fetch_chat_history");
    processListener(newSocket, "update_message_read");
    processListener(newSocket, "message");
    processListener(newSocket, "edit_message");
    processListener(newSocket, "like_message");
    processListener(newSocket, "unlike_message");
    processListener(newSocket, "get_message_liked_by");
    processListener(newSocket, "get_user_details");
    processListener(newSocket, "create_group");
    processListener(newSocket, "remove_group");
    processListener(newSocket, "get_user_groups_list");
    processListener(newSocket, "get_group_list");
    processListener(newSocket, "add_group_member");
    processListener(newSocket, "remove_group_member");
    processListener(newSocket, "update_group_name");
    processListener(newSocket, "get_group_members_list");
    processListener(newSocket, "member_in_groups");
    processListener(newSocket, "add_admin");
    processListener(newSocket, "remove_admin");
    processListener(newSocket, "activate_group");
    processListener(newSocket, "deactivate_group");
    processListener(newSocket, "group_message");
    processListener(newSocket, "delete_message");
    processListener(newSocket, "block_user");
    processListener(newSocket, "unblock_user");
    processListener(newSocket, "add_contact");
    processListener(newSocket, "remove_contact");
    processListener(newSocket, "contact_list");
    processListener(newSocket, "get_blocked_users");
    processListener(newSocket, "block_unblock_user");
  };

  const generateFirebaseFcmToken = () => {
    var messaging = getMessaging(firebaseApp);
    // console.log("messaging", messaging);

    getToken(messaging, {
      vapidKey:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    }).then((currentToken) => {
      setFcmToken(currentToken);
      console.log("currentToken", currentToken);
    });
  };

  const processListener = (socketObject, listnerName) => {
    socketObject.on(listnerName, (response) => {
      if (response.status) {
        console.log(response);
      } else {
        console.error(response.message);
      }
      setResponse({
        data: response,
        event_name: listnerName,
      });
    });
  };

  // Function to disconnect Socket
  const disconnectSocket = () => {
    socket.emit("disconnect_socket");
    setConnected(false);
  };

  return (
    <div className={"container-fluid"}>
      <button
        className={"btn btn-primary me-2 mt-1"}
        onClick={() => generateFirebaseFcmToken()}
      >
        Generate Firebase FCM Token
      </button>
      <h5 className={"text-center my-3 h5-info"}>SOCKET LOCAL</h5>
      <div className={"card p-4 my-3"}>
        <div className="row socket mt-2">
          <div className="col-6 col-lg-4">
            <label className="form-label">fcm_token</label>
            <input
              className={"form-control"}
              type="text"
              placeholder="enter fcm_token"
              name={"fcm_token"}
              value={fcmToken}
              onChange={handleChange}
              disabled={connected}
            />
          </div>
          <div className="col-6 col-lg-4">
            <label className="form-label">device_type</label>
            <input
              className={"form-control"}
              type="text"
              placeholder="enter device_type"
              name={"device_type"}
              onChange={handleChange}
              disabled={connected}
            />
          </div>
          <div className="col-6 col-lg-4">
            <label className="form-label">user_id</label>
            <input
              className={"form-control"}
              type="text"
              placeholder="enter user_id"
              name={"user_id"}
              onChange={handleChange}
              disabled={connected}
            />
          </div>

          <div className={"col-12 mt-2 text-center"}>
            {connected ? (
              <button className={"btn btn-danger"} onClick={disconnectSocket}>
                Disconnect
              </button>
            ) : (
              <button className={"btn btn-info me-2"} onClick={connectSocket}>
                Connect
              </button>
            )}
          </div>
        </div>
      </div>

      {connected && (
        <div className={"row p-4 my-2"}>
          <hr className={"m-0"} />
          <div className="register my-1 pt-1 pb-2 col-12">
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("recovery_phrase")}
            >
              Recovery Phrase Generator
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("register")}
            >
              Register
            </button>
            <button
              className={"btn btn-dark me-2 mt-1"}
              onClick={() => handleClick("send_push_notification")}
            >
              Push Notification
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("recover_account")}
            >
              Recover Account
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("check_device")}
            >
              Check Device
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("update_user_name")}
            >
              Update User Name
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("update_profile_image")}
            >
              Update Profile Image
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("fetch_conversations")}
            >
              Fetch Conversations
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("fetch_chat_history")}
            >
              Fetch Chat History
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("update_message_read")}
            >
              Update Message Read
            </button>
            <button
              className={"btn btn-secondary me-2 mt-1"}
              onClick={() => handleClick("message")}
            >
              Send Message
            </button>
            <button
              className={"btn btn-secondary me-2 mt-1"}
              onClick={() => handleClick("edit_message")}
            >
              Edit Message
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("like_message")}
            >
              Like Message
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("unlike_message")}
            >
              Unlike Message
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("get_message_liked_by")}
            >
              Get Message Liked By
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("get_user_details")}
            >
              Get User Deatils
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("create_group")}
            >
              Create Group
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("remove_group")}
            >
              Remove Group
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("get_user_groups_list")}
            >
              Get User Group List
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("get_group_list")}
            >
              Get Group List
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("add_group_member")}
            >
              Add Group Member
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("remove_group_member")}
            >
              Remove Group Member
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("update_group_name")}
            >
              Update Group Name
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("get_group_members_list")}
            >
              Get Group Members List
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("member_in_groups")}
            >
              Member In Groups
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("add_admin")}
            >
              Add Admin
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("remove_admin")}
            >
              Remove Admin
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("activate_group")}
            >
              Activate Group
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("deactivate_group")}
            >
              Deactivate Group
            </button>
            <button
              className={"btn btn-secondary me-2 mt-1"}
              onClick={() => handleClick("group_message")}
            >
              Group Message
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("delete_message")}
            >
              Delete Message
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("block_user")}
            >
              Block User
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("unblock_user")}
            >
              Unblock User
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("add_contact")}
            >
              Add Contact
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("remove_contact")}
            >
              Remove Contact
            </button>
            <button
              className={"btn btn-primary me-2 mt-1"}
              onClick={() => handleClick("contact_list")}
            >
              Contact List
            </button>
            <button
              className={"btn btn-danger me-2 mt-1"}
              onClick={() => handleClick("get_blocked_users")}
            >
              Blocked Users List
            </button>
            <button
              className={"btn btn-danger me-2 mt-1"}
              onClick={() => handleClick("delete_account")}
            >
              Delete Account
            </button>
            <button
              className={"btn btn-danger me-2 mt-1"}
              onClick={() => handleClick("block_unblock_user")}
            >
              Block Toggle
            </button>
          </div>
          <hr className={"m-0"} />
          <div>
            {buttonType === "recovery_phrase" && <RecoveryPhrase />}
            {buttonType === "register" && <Register socket={socket} />}
            {buttonType === "send_push_notification" && (
              <PushNotification device_token={fcmToken} />
            )}
            {buttonType === "recover_account" && (
              <RecoverAccount device_token={fcmToken} />
            )}
            {buttonType === "check_device" && <CheckDevice />}
            {buttonType === "update_user_name" && (
              <UpdateUserName socket={socket} />
            )}
            {buttonType === "update_profile_image" && (
              <UpdateProfileImage socket={socket} user_id={form.user_id} />
            )}
            {buttonType === "fetch_conversations" && (
              <FetchConversations socket={socket} user_id={form?.user_id} />
            )}
            {buttonType === "fetch_chat_history" && (
              <FetchChatHistory socket={socket} />
            )}
            {buttonType === "update_message_read" && (
              <UpdateMessageRead socket={socket} />
            )}
            {buttonType === "message" && (
              <Message socket={socket} from_user_id={form.user_id} />
            )}
            {buttonType === "edit_message" && <EditMessage socket={socket} />}
            {buttonType === "like_message" && <Like socket={socket} />}
            {buttonType === "unlike_message" && <Unlike socket={socket} />}
            {buttonType === "get_message_liked_by" && (
              <GetMessageLikedBy socket={socket} />
            )}
            {buttonType === "get_user_details" && (
              <UserDetail socket={socket} from_user_id={form.user_id} />
            )}
            {buttonType === "create_group" && <CreateGroup socket={socket} />}
            {buttonType === "remove_group" && <RemoveGroup socket={socket} />}
            {buttonType === "get_user_groups_list" && (
              <UserGroupList socket={socket} />
            )}
            {buttonType === "get_group_list" && <GroupList socket={socket} />}
            {buttonType === "add_group_member" && (
              <AddGroupMember socket={socket} />
            )}
            {buttonType === "remove_group_member" && (
              <RemoveGroupMembers socket={socket} />
            )}
            {buttonType === "update_group_name" && (
              <UpdateGroupName socket={socket} />
            )}
            {buttonType === "get_group_members_list" && (
              <GetGroupMembersList socket={socket} />
            )}
            {buttonType === "member_in_groups" && (
              <MembersInGroup socket={socket} />
            )}
            {buttonType === "add_admin" && <AddAdmin socket={socket} />}
            {buttonType === "remove_admin" && <RemoveAdmin socket={socket} />}
            {buttonType === "activate_group" && (
              <ActivateGroup socket={socket} />
            )}
            {buttonType === "deactivate_group" && (
              <DeactivateGroup socket={socket} />
            )}
            {buttonType === "group_message" && (
              <GroupMessage socket={socket} from_user_id={form.user_id} />
            )}
            {buttonType === "delete_message" && (
              <DeleteMessage socket={socket} />
            )}
            {buttonType === "block_user" && <BlockUser socket={socket} />}
            {buttonType === "unblock_user" && <UnblockUser socket={socket} />}
            {buttonType === "add_contact" && <AddContact socket={socket} />}
            {buttonType === "remove_contact" && (
              <RemoveContact socket={socket} />
            )}
            {buttonType === "contact_list" && (
              <ContactList socket={socket} user_id={form.user_id} />
            )}
            {buttonType === "get_blocked_users" && (
              <BlockedUsers socket={socket} user_id={form.user_id} />
            )}
            {buttonType === "delete_account" && <DeleteAccount />}
            {buttonType === "block-unblock-user" && (
              <BlockUnblockUser socket={socket} />
            )}
          </div>
        </div>
      )}

      {!isEmptyObject(response) && (
        <>
          <hr />
          <h4>Response</h4>
          <div>
            <h5 className="p-2 border-bottom">
              Event Name: {response?.event_name}
            </h5>
            <p className="p-2">
              Status: {response?.data?.status ? "True" : "False"}
            </p>
            <p className="p-2">Code: {response?.data?.code}</p>
            <div className="card p-2">
              {response?.data?.status ? (
                <ReactJson name={"Data"} src={response?.data?.data} />
              ) : (
                `Error: ${response?.error}`
              )}
            </div>
          </div>
        </>
      )}
      {fcmToken && (
        <div>
          FCM Token: <h5>{fcmToken}</h5>
        </div>
      )}
    </div>
  );
};

export default App;
