import PropTypes from "prop-types";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

export const Review = ({ name, designation }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
  ];

  const random = Math.floor(Math.random() * colors.length);
  return (
    <AnimatedOnScroll animationIn="fadeInUp" style={{width: "25%"}}>
      <div className="flex flex-col items-start bg-slate-800 rounded-lg  h-full p-5">
        <div className="flex gap-2">
          <div
            className={
              "w-12 h-12 relative rounded-full  flex items-center " +
              colors[random]
            }
          >
            <div className="text-center w-full opacity-90 text-2xl">
              {name[0]}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-white">{name}</div>
            <div className="text-gray-400">{designation}</div>
          </div>
        </div>

        <div className="text-gray-200 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </div>
      </div>
    </AnimatedOnScroll>
  );
};

Review.propTypes = {
  name: PropTypes.string,
  designation: PropTypes.string,
};
