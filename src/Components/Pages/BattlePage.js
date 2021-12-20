import { Redirect } from "../Router/Router";
import Phaser from "phaser";
import BattleGame from '../Game/BattleGame';
import UIScore from "../Game/UIScore";
import UIStart from "../Game/UIStart";
import GameOver from "../Game/UIGameOver";

var game;

function BattlePage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a id="battleToHome" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a id="battleToSettings" class="nav-link">Settings</a>
          </li>
          <li class="nav-item">
            <a id="battleToSinglePlayer" class="nav-link">Single Player</a>
          </li>
          <li class="nav-item">
            <a id="battleToTwoPlayer" class="nav-link">Two Players</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <h1 class="m-5">BATTLE</h1>
  <div id="battleGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 736,
    height: 544,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "battleGame",
    scene: [UIStart, BattleGame, UIScore, GameOver]
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
 
  //Go two players
  var submitGoTwoPlayer = document.querySelector("#battleToTwoPlayer");
  submitGoTwoPlayer.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });

   //Go Home
  var submitHome = document.querySelector("#battleToHome");
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });

  //Go to settings
  var submitSettings = document.querySelector("#battleToSettings");
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });

  //Go to Single players
  var submitTwoPlayers = document.querySelector("#battleToSinglePlayer");
  submitTwoPlayers.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/singlePlayer");
  });
}
export default BattlePage;
