import { Redirect } from "../Router/Router";

/**
 * Render the Two Player Page :
 */
function TwoPlayer() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a id="toHome" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a id="toSinglePlayer" class="nav-link">Single Player</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <h1 class="m-5">2 Players</h1>
  <div>
    <button id="btnToCOOP" class="btn p-3 m-5"">COOP</button>
  </div>
  <div>
    <button id="btnToBattle" class="btn p-3 m-5">BATTLE</button>
  </div>`;
  //button to launch game in COOP mode
  const submitCoop = document.querySelector("#btnToCOOP");
  submitCoop.addEventListener("click", () => {
    Redirect("/coop");
  });
  pageDiv.appendChild(submitCoop);
  //button to launch game in BATTLE mode
  const submitBattle = document.querySelector("#btnToBattle");
  submitBattle.addEventListener("click", () => {
    Redirect("/battle");
  });
  pageDiv.appendChild(submitBattle);

  //Go Home
  var submitHome = document.querySelector("#toHome");
  submitHome.addEventListener("click", () => {
    Redirect("/");
  });
  
  //Go to single players
  var submitSinglePlayer = document.querySelector("#toSinglePlayer");
  submitSinglePlayer.addEventListener("click", () => {
    Redirect("/singlePlayer");
  });
}
export default TwoPlayer;
