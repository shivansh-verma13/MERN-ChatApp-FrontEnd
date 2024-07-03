import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Review } from "./Review";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { IoMail } from "react-icons/io5";
// import AOS from "aos";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

export const LandingPage = () => {
  const navigate = useNavigate();
  //   AOS.init();

  const getCurrYear = () => {
    const date = new Date();
    const currYear = date.getFullYear();
    return currYear;
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-800 h-full text-white flex flex-col font-mono">
      <div className="p-2 flex items-center">
        <div className="flex-grow">
          <Logo />
        </div>
        <div>
          <button
            className="font-bold p-4 hover:bg-gray-600 hover:rounded-xl"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center font-mono justify-center flex-col font-black text-7xl w-1/2 text-center pt-20 tracking-tighter">
          Chat with Your Friends and Family Now.
          <br />
          <div className="text-xl text-gray-600 mt-4 tracking-tight">
            With the power of <span className="text-blue-400">MERN</span>, you
            would be able to chat and send attachments catered to your ones.
          </div>
          <button
            className="font-bold p-4 bg-gradient-to-r from-blue-600 to-blue-400 text-lg rounded-lg mt-5"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </button>
        </div>
      </div>
      <div>
        <div className="m-20 mt-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 bg-blue-600 p-2 rounded-full"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-3xl mt-4 tracking-tighter font-black">
            A fully functional <span className="text-blue-600">Chat App</span>.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center m-20 gap-8 -mt-8">
        <div>
          <AnimatedOnScroll animationIn="fadeInLeft">
            <img
              src="chat.png"
              alt="chat-img"
              className="w-full h-full rounded-lg"
            />
          </AnimatedOnScroll>
        </div>
        <AnimatedOnScroll animationIn="zoomIn">
          <div className=" text-left text-2xl tracking-tight font-bold text-gray-400">
            One stop chatting app for you and your ones.
          </div>
        </AnimatedOnScroll>
      </div>
      <div className="flex items-center justify-center m-20 gap-8 -mt-8">
        <AnimatedOnScroll animationIn="zoomIn">
          <div className="text-right text-2xl tracking-tight font-bold text-gray-400">
            Send all your attachments.
          </div>
        </AnimatedOnScroll>
        <div>
          <AnimatedOnScroll animationIn="fadeInRight">
            <img
              src="attachment.png"
              alt="attachment-img"
              className="w-full h-full rounded-lg"
            />
          </AnimatedOnScroll>
        </div>
      </div>
      <div>
        <div className="flex flex-col m-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 bg-red-400 p-2 rounded-full"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-3xl mt-4 tracking-tighter font-black">
            Some of the satisfied customers have something to{" "}
            <span className="text-blue-600">share</span>.
          </div>

          <div className="flex flex-wrap items-center gap-5 justify-center mt-20 flex-row">
            <Review name="Shivansh" designation="Developer" />
            <Review name="Aashima" designation="Gen AI Developer" />
            <Review name="Vineet" designation="Metaverse Developer" />
            <Review name="Vani" designation="Blockchain Developer" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-500 m-4">
        <div className="flex justify-center items-center my-5 gap-2 text-2xl tracking-tighter text-gray-300 font-black">
          Made with <span className="text-red-300">💓LOVE</span> by Shivansh
          Verma &#169;{getCurrYear()}
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="h-12 text-3xl flex justify-center items-center cursor-pointer bg-gradient-to-r from-blue-800 to-blue-500 p-2 rounded-full">
            <a href="https://github.com/shivansh-verma13" target="_blank">
              <FaGithub />
            </a>
          </div>
          <div className="h-12 text-3xl flex justify-center items-center cursor-pointer bg-gradient-to-r from-blue-800 to-blue-500 p-2 rounded-full">
            <a
              href="https://www.linkedin.com/in/shivansh-verma-650a92222/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </div>
          <div className="h-12 text-3xl flex justify-center items-center cursor-pointer bg-gradient-to-r from-blue-800 to-blue-500 p-2 rounded-full">
            <a href="https://twitter.com/VerShivu" target="_blank">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
