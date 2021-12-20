import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import SingleGame from "../Game/SingleGame";
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/UIGameOver";
import Start from "../Game/UIStart";

var game;

function SinglePage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a id="singleToHome" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a id="singleToScore" class="nav-link">Scoreboard</a>
          </li>
          <li class="nav-item">
            <a id="singleToSettings" class="nav-link">Settings</a>
          </li>
          <li class="nav-item">
            <a id="singleToTwoPlayers" class="nav-link">Two Players</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <h1 class="m-5">Single Player</h1>
  <div id="playGame" class="container justify-content-center mt-5 my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 544,
    height: 480,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "playGame",
    scene: [Start, SingleGame, UISingleScore, GameOver]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true, false);
  game = new Phaser.Game(config);
  //Buttons ======================================================
  //Go back
  const submitGoBack = document.createElement("input");
  submitGoBack.value = "GO BACK";
  submitGoBack.className = "btn btn-secondary m-3";
  submitGoBack.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });
  pageDiv.appendChild(submitGoBack);

  //Go Home
  var submitHome = document.querySelector("#singleToHome");
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });
  //Go to scoreboard
  var submitScore = document.querySelector("#singleToScore");
  submitScore.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/scoreboardSingle");
  });

  //Go to settings
  var submitSettings = document.querySelector("#singleToSettings");
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });

  //Go to two players
  var submitTwoPlayers = document.querySelector("#singleToTwoPlayers");
  submitTwoPlayers.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
}
export default SinglePage;
