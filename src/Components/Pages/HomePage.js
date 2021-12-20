import oneSnake from "../../img/oneSnake.png";
import twoSnakes from "../../img/twoSnakes.png";
import { Redirect } from "../Router/Router";

/**
 * Render the HomePage
 */
const HomePage = () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">JSnake</h1>
  <div class="wrapper">
    <div class="row">
      <div class="col-md-6 "> 
        <img src="${oneSnake}" class="rounded" alt="Blue Snake" style="width:80% ;heigth:auto" >
        <button id="btnToSingle" type="button" class="btn p-3 m-5 text-center active">Single Player</button>
      </div>

      <div class="col-md-6"> 
        <img src="${twoSnakes}" class="rounded" alt="Two Snakes" style="width:80% ;heigth:auto"> 
        <button id="btnToDual" type="button" class="btn p-3 m-5 text-center active">Two Players</button>
      </div>
    </div>
    <button id="btnToScoreBoard" type="button" class="btn btn-secondary p-3 m-5 text-center active">GLOBAL SCOREBOARD</button>
  </div>
  `;
  let submitSingle = document.querySelector("#btnToSingle");
  submitSingle.addEventListener("click", () => {
    Redirect("/singlePlayer");
  });
  let submitDual = document.querySelector("#btnToDual");
  submitDual.addEventListener("click", () => {
    Redirect("/twoPlayers");
  });
  let submitScoreBoard = document.querySelector("#btnToScoreBoard");
  submitScoreBoard.addEventListener("click", () => {Redirect("/scoreboard");});
};
export default HomePage;
