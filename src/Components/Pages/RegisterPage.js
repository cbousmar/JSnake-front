import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )

/**
 * View the Register form :
 * render a register page into the #page div
 * At this step: this is only a static component...
 */
function RegisterPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<h3 class="mt-3"> Nice to meet you !</h3>`;
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
  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn";
  submit.id = "btn";


  // create the notification
  var notification = document.createElement("p");
  pageDiv.appendChild(notification);

  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  pageDiv.appendChild(form);
  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);


  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      let user1 = getSessionObject("user1");
      console.log(user1);
      var response = null;
      if(!user1){
        response = await fetch("/api/auths/register1", options); // fetch return a promise => we wait for the response
      } else {
        response = await fetch("/api/auths/register2", options); // fetch return a promise => we wait for the response
      }

      if (!response.ok) {
        notification.className = "alert alert-danger";
        notification.innerText = "This pseudo already exist, please choose another one."
      }
      else{
        console.log("test");
        const user = await response.json(); // json() returns a promise => we wait for the data
        console.log("user",user);
        // call the HomePage via the Router
        Redirect("/");  
      }
    } catch (error) {
      console.error("RegisterPage::error: ", error);
    }
  }


  //Go back
  const submitGoBack = document.createElement("input");
  submitGoBack.value = "GO BACK";
  submitGoBack.className = "btn btn-secondary m-3";
  submitGoBack.addEventListener("click", () => {
    Redirect("/");
  });
  pageDiv.appendChild(submitGoBack);
}

export default RegisterPage;
