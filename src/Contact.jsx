import { Avatar } from "./Avatar";
import PropTypes from "prop-types";

export const Contact = ({ id, username, onClick, selected, online }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={
        "border-b border-gray-600  flex items-center gap-2 cursor-pointer " +
        (selected ? "bg-blue-700" : "")
      }
    >
      {selected && <div className="w-1 bg-blue-200 h-12 rounded-r-md"></div>}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userID={id} />
        <span className="text-white">{username}</span>
      </div>
    </div>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  online: PropTypes.bool,
};
