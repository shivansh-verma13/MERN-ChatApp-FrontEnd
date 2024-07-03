import { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { UserContext } from "./UserContext";
import _ from "lodash";
import axios from "axios";
import { Contact } from "./Contact";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

export const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessage] = useState([]);
  const [offlinePeople, setOfflinePeople] = useState({});
  const [open, setOpen] = useState(false);
  const { username, id, setId, setUsername } = useContext(UserContext);
  const divUnderMessages = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    connectToWS();
  }, []);

  const connectToWS = () => {
    const ws = new WebSocket("ws://localhost:4000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnect trying to reconnect!");
        connectToWS();
      }, 1000);
    });
  };

  const showOnlinePeople = (peopleArray) => {
    // console.log(people);
    const people = {};
    peopleArray.forEach(({ userID, username }) => {
      people[userID] = username;
    });
    // console.log(people);
    setOnlinePeople(people);
  };

  const handleMessage = async (e) => {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserID) {
        setMessage((prev) => [
          ...prev,
          {
            ...messageData,
          },
        ]);
      }
    }
  };

  const logout = async () => {
    await axios.post("/logout");
    setWs(null);
    setId(null);
    setUsername(null);
    navigate("/auth");
  };

  const sendMessage = (e, file = null) => {
    try {
      if (e) e.preventDefault();
      toast.loading("Sending message...", { id: "sending-message" });
      ws.send(
        JSON.stringify({
          recipient: selectedUserID,
          text: newMessageText,
          file,
        })
      );

      if (file) {
        const getUserMessages = async () => {
          const res = await axios.get(`/messages/${selectedUserID}`);
          const data = await res.data;
          setMessage(data.messages);
        };
        getUserMessages();
        toast.success("Succesfully sent the file!", {
          id: "sending-message",
        });
      } else {
        setMessage((prev) => [
          ...prev,
          {
            text: newMessageText,
            sender: id,
            recipient: selectedUserID,
            _id: Date.now(),
          },
        ]);
        setNewMessageText("");
        toast.success("Succesfully sent the message!", {
          id: "sending-message",
        });
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to send the message", { id: "sending-message" });
    }
  };

  const sendFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: e.target.files[0].name,
        data: reader.result,
      });
    };
  };

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUserID) {
      const getUserMessages = async () => {
        const res = await axios.get(`/messages/${selectedUserID}`);
        const data = await res.data;
        // console.log(data.messages);
        setMessage(data.messages);
      };
      getUserMessages();
    }
  }, [selectedUserID]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("/people");
      const data = await res.data;
      const offlinePeopleArr = data.users
        .filter((u) => u._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
        // console.log(offlinePeople);
      });
      // console.log({ offlinePeople, offlinePeopleArr });
      setOfflinePeople(offlinePeople);
    };
    getAllUsers();
  }, [id, onlinePeople]);

  const emojiSelector = (e) => {
    console.log(e);
    setNewMessageText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const onlinePeopleExcludingOurUser = { ...onlinePeople };
  delete onlinePeopleExcludingOurUser[id];

  const messagesWithoutDupes = _.uniqBy(messages, "_id");

  return (
    <div className="flex h-screen">
      <div className="bg-gradient-to-r to-black from-gray-800 w-1/3 h-dvh flex flex-col">
        <div className="flex-grow">
          <Logo />
          {Object.keys(onlinePeopleExcludingOurUser).map((userID, index) => (
            <Contact
              key={index}
              online={true}
              id={userID}
              username={onlinePeopleExcludingOurUser[userID]}
              onClick={() => setSelectedUserID(userID)}
              selected={userID === selectedUserID}
            />
          ))}
          {Object.keys(offlinePeople).map((userID, index) => (
            <Contact
              key={index}
              online={false}
              id={userID}
              username={offlinePeople[userID].username}
              onClick={() => setSelectedUserID(userID)}
              selected={userID === selectedUserID}
            />
          ))}
        </div>

        <div className="p-2 text-center flex items-center justify-center gap-4">
          <span className="mr-2 text-sm text-gray-600 flex items-center gap-1 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            {username}
          </span>
          <button
            onClick={logout}
            className="text-sm bg-blue-100 text-gray-500 py-1 px-2 border rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-gradient-to-r from-black to-blue-400 w-2/3 h-dvh p-2 border border-transparent border-l-gray-600 ">
        <div className="flex-grow">
          {!selectedUserID && (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-400">
                &larr; Select A Person From The Sidebar
              </div>
            </div>
          )}
          {selectedUserID && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2 scroll">
                {messagesWithoutDupes.map((message, idx) => (
                  <div
                    key={idx}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      // key={idx}
                      className={
                        "text-left relative inline-block p-2 mx-2 my-2 rounded-md text-sm " +
                        (message.sender === id
                          ? "bg-blue-500 text-white "
                          : "bg-white text-gray-500 ")
                      }
                    >
                      {message.sender !== id ? (
                        <div className="border-solid border-r-white border-r-8 border-y-transparent border-y-8 border-l-0 absolute -left-2 top-1 ml-1"></div>
                      ) : (
                        <div className="border-solid border-l-blue-500 border-l-8 border-y-transparent border-y-8 border-r-0 absolute -right-2 top-1 mr-1"></div>
                      )}
                      {message.text}
                      {message.file && (
                        <div className="max-w-fit">
                          <a
                            target="_blank"
                            href={
                              axios.defaults.baseURL +
                              "/uploads/" +
                              message.file
                            }
                            className="border-b flex items-center gap-2 max-w-72"
                          >
                            <img
                              className="m-0 p-0 w-full h-full"
                              src={
                                axios.defaults.baseURL +
                                "/uploads/" +
                                message.file
                              }
                              alt={message.file}
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <div className="relative">
            <EmojiPicker
              open={open}
              onEmojiClick={emojiSelector}
              className="emoji-picker"
              allowExpandReactions={false}
              width={"100%"}
            />
            <div className="border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 absolute bottom-1 left-2"></div>
          </div>
        )}
        {selectedUserID && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <div
              className="bg-gray-200 text-black rounded-sm p-2 cursor-pointer relative"
              onClick={() => setOpen((value) => !value)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </div>
            <input
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              type="text"
              placeholder="Type your message here"
              className="bg-white flex-grow border rounded-sm p-2"
            />
            <label className="bg-gray-200 p-2 text-gray-500 cursor-pointer rounded-sm border border-gray-300">
              <input type="file" className="hidden" onChange={sendFile} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm hover:bg-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
