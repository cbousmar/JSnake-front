import Navbar from "../Navbar/Navbar";
import { Redirect } from "../Router/Router";
import { removeSessionObject } from "../../utils/session";

const Logout = () => {
  console.log("Logout");
  // clear the user session data from the localStorage
  removeSessionObject("user1");
  removeSessionObject("user2");

  // re-render the navbar (for a non-authenticated user)
  Navbar();
  Redirect("/login1");
};

export default Logout;