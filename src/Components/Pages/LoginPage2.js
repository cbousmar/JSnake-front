import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * View the Login form :
 * render a login page into the #page div (formerly login function)
 * At this step: this is only a static component...
 */
function LoginPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<h3 class="mt-3"> Please log the second player in !</h3>`;
  // create a login form
  const form = document.createElement("form");
  form.className = "p-5";
    const username = document.createElement("input");
    username.type = "text";
    username.id = "username";
    username.placeholder = "username";
    username.required = true;
    username.className = "form-control mb-3";
    const password = document.createElement("input");
    password.type = "password";
    password.id = "password";
    password.required = true;
    password.placeholder = "password";
    password.className = "form-control mb-3";
    const submit = document.createElement("input");
    submit.value = "Login";
    submit.type = "submit";
    submit.className = "btn";
    submit.id = "btn";
  form.addEventListener("submit", onSubmit);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  pageDiv.appendChild(form);
 
  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    console.log("In the form : ", username.value, password.value);
    try {
      const options = {
        method: "POST", 
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login1", options); // fetch return a promise => we wait for the response
      
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // save the user into the localStorage
      setSessionObject("user2", user);

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      Navbar({ isAuthenticated2: true });

      // call the HomePage via the Router
      Redirect("/");
      
    } catch (error) {
      console.error("LoginPage::error: ", error);
    }
  }


  // create a login form
  const goBack = document.createElement("input");
  goBack.value = "GO BACK";
  // Example on how to use Bootstrap to style a Button
  goBack.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  goBack.addEventListener("click", () => {
   Redirect("/coop");
  });
  pageDiv.appendChild(goBack);
}



export default LoginPage;