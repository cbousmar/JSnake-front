import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";


function ScoreboardSinglePage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div class="container">
                          <div class="row">
                              <div class="col" id="col1"> <h6 class="display-6 m-4"> Single Player </h6> </div>
                          </div>
                          <div class="row">
                              <div class="col" id="col2"> </div>
                          </div>
                          <div class="row">
                          <div class="col" id="submit"> </div>
                      </div>
                      </div>`;
  score();
  UserScore();
  // create a login form
  const submit = document.createElement("input");
  submit.value = "GO BACK";
  // Example on how to use Bootstrap to style a Button
  submit.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  submit.addEventListener("click", () => {
   Redirect("/singlePlayer");
  });
  pageDiv.appendChild(submit);
}

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function score() {
  // Deal with your NewPage content here
  const col = document.querySelector("#col1");
  fetch("api/single/bestscoressingle") // fetch return a promise => we wait for the response
  .then((response) => {
    if (!response.ok)
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    return response.json(); // json() return a promise => we wait for the response
  })
  .then((scores) => {
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Score";
    header1.scope="col";
    const header2 = document.createElement("th");
    header2.innerText = "Player";
    header1.scope="col";
    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(thead);
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    scores.forEach((score) => {
      const line = document.createElement("tr");
      line.scope="row";
      const scoreCell = document.createElement("td");
      scoreCell.innerText = score.score;
      line.appendChild(scoreCell);
      const playerCell = document.createElement("td");
      playerCell.innerText = score.username;
      line.appendChild(playerCell);
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
      // add the HTMLTableElement to the main, within the #page div
      col.appendChild(tableWrapper);
    })
    .catch((err) => {
      console.error("ScoreBoardSinglePlayerpage::error: ", err);
    });
};

function UserScore() {
  const user = getSessionObject("user1");
  const col = document.querySelector("#col2");
  if(user){
    col.innerHTML = `<h6 class="display-6 m-4"> My scores </h6>`;
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Best Score Single";
    header1.scope="col";
    const header2 = document.createElement("th");
    header2.innerText = "Best Score Coop";
    header2.scope="col";

    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(thead);

    // deal with data rows for tbody
    const tbody = document.createElement("tbody");

    const line = document.createElement("tr");
    line.scope="row";
    const singleScoreCell = document.createElement("td");
    singleScoreCell.innerText = user.bestScoreSingle;
    line.appendChild(singleScoreCell);
    const coopScoreCell = document.createElement("td");
    coopScoreCell.innerText = user.bestScoreCoop;
    line.appendChild(coopScoreCell);
    tbody.appendChild(line);

    table.appendChild(tbody);
      // add the HTMLTableElement to the main, within the #page div
    col.appendChild(tableWrapper);
  }
    
}


export default ScoreboardSinglePage;