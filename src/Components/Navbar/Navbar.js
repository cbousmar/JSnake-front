// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";



/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let user1 = getSessionObject("user1");
  let user2 = getSessionObject("user2");
  let navbar;

  if (!user1) {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a id="btnToLogin1" class="nav-link active"><u>Login</u></a>
            </li>
            <li class="nav-item">
              <a id="btnToRegister" class="nav-link active"><u>Register</u></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;  
  navbarWrapper.innerHTML = navbar;

  let submitLogin1 = document.querySelector("#btnToLogin1");
  submitLogin1.addEventListener("click", () => {
    Redirect("/login1");
  });
  let submitRegister = document.querySelector("#btnToRegister");
  submitRegister.addEventListener("click", () => {
    Redirect("/register");
  });



  } else if (!user2) {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a id="btnToLogin2" class="nav-link"><u>Login Second Player</u></a>
            </li>
            <li class="nav-item">
              <a id="btnToLogout" class="nav-link"><u>Logout</u></a>
            </li>
            <li class="nav-item">
              <a id="btnToRegister" class="nav-link"><u>Register</u></a>
            </li>
          </ul>
          <div class="d-flex">
            <span class="ms-3">${user1.username1}</span>
          </div>
        </div>
      </div>
    </nav>
    `;  
    navbarWrapper.innerHTML = navbar;

    let submitLogin2 = document.querySelector("#btnToLogin2");
    submitLogin2.addEventListener("click", () => {
      Redirect("/login2");
    });
    let submitLogout = document.querySelector("#btnToLogout");
    submitLogout.addEventListener("click", () => {
      Redirect("/logout");
    });
    let submitRegister = document.querySelector("#btnToRegister");
    submitRegister.addEventListener("click", () => {
        Redirect("/register");
    });

  

  } else {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a id="btnToLogout" class="nav-link"><u>Logout</u></a>
            </li>
          </ul>
          <div class="d-flex">
            <span class="ms-3">${user1.username1}</span>
            <span class="ms-3">${user2.username1}</span>
          </div>
        </div>
      </div>
    </nav>
    `;  
    navbarWrapper.innerHTML = navbar;

    let submitLogout = document.querySelector("#btnToLogout");
    submitLogout.addEventListener("click", () => {
      Redirect("/logout");
    });
  } 
};
export default Navbar;
