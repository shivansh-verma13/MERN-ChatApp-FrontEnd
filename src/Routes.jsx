import { useContext } from "react";
// import { RegisterOrLogin } from "./RegisterOrLogin";
import { UserContext } from "./UserContext";
import { Chat } from "./Chats";
import { LandingPage } from "./LandingPage";

export const Routes = () => {
  const { username, id } = useContext(UserContext);
  if (username && id) {
    return <Chat />;
  }

  return <LandingPage />;
};
