import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import CoopGame from '../Game/CoopGame';
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/UIGameOver";
import Start from "../Game/UIStart";

var game;

function CoopPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a id="coopToHome" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a id="coopToScore" class="nav-link">Scoreboard</a>
          </li>
          <li class="nav-item">
            <a id="coopToSettings" class="nav-link">Settings</a>
          </li>
          <li class="nav-item">
            <a id="coopToSinglePlayer" class="nav-link">Single Player</a>
          </li>
          <li class="nav-item">
            <a id="coopToTwoPlayer" class="nav-link">Two Players</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <h1 class="m-5">COOP</h1>
  <div id="coopGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 736,
    height: 544,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "coopGame",
    scene: [Start, CoopGame, UISingleScore, GameOver]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
  //button==================================================
  //Go back to 2 players
  const submitGoBack = document.createElement("input");
  submitGoBack.value = "GO BACK";
  submitGoBack.className = "btn btn-secondary m-3";
  submitGoBack.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
  pageDiv.appendChild(submitGoBack);

  //Go twoPlayers
  var submitGoTwoPlayer = document.querySelector("#coopToTwoPlayer");
  submitGoTwoPlayer.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
 
  //Go Home
  var submitHome = document.querySelector("#coopToHome");
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });

  //Go to scoreboard
  var submitScore = document.querySelector("#coopToScore");
  submitScore.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/scoreboardCoop");
  });

  //Go to settings
  var submitSettings = document.querySelector("#coopToSettings");
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });

  //Go to two players
  var submitTwoPlayers = document.querySelector("#coopToSinglePlayer");
  submitTwoPlayers.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/singlePlayer");
  });
}

export default CoopPage;