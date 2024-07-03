import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

export const RegisterOrLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const res = await axios.post("/" + url, { username, password });
    const data = await res.data;
    setLoggedInUsername(username);
    setId(data.id);
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-800">
      <div>
        <Logo />
      </div>
      <div className="h-screen flex items-center flex-col ">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="text-white font-black text-5xl mb-5">
            {isLoginOrRegister === "login" ? "Login" : "Register"}
          </div>
          <form className="w-64 mx-auto mb-12" onSubmit={handleSubmission}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="block w-full rounded-sm p-2 mb-2 border"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="block w-full rounded-sm p-2 mb-2 border"
            />
            <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
              {isLoginOrRegister === "register" ? "Register" : "Login"}
            </button>
            <div className="text-center mt-2 text-white">
              {isLoginOrRegister === "register" && (
                <div>
                  Already a Member?{" "}
                  <button
                    className="ml-1 text-blue-400"
                    onClick={() => setIsLoginOrRegister("login")}
                  >
                    Login Here
                  </button>
                </div>
              )}
              {isLoginOrRegister === "login" && (
                <div>
                  Don&apos;t have an Account?{" "}
                  <button
                    className="ml-1 text-blue-400"
                    onClick={() => setIsLoginOrRegister("register")}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
