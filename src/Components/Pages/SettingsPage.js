import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";

import arrowUp from "../../img/upArrowKey.png";
import arrowRight from "../../img/rightArrowKey.png";
import arrowDown from "../../img/downArrowKey.png";
import arrowLeft from "../../img/leftArrowKey.png";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function SettingsPage() {
  let upKey1;
  let rightKey1;
  let downKey1;
  let leftKey1;  
  let upKey2;
  let rightKey2;
  let downKey2;
  let leftKey2;  

  let user = getSessionObject("user1");

  
  const pageDiv = document.querySelector("#page");
  updatePage();

  function updatePage(){
    
    if(!user){
      upKey1 = "Z";
      rightKey1 = "D";
      downKey1 = "S";
      leftKey1 = "Q";
      upKey2 = "O";
      rightKey2 = "M";
      downKey2 = "L";
      leftKey2 = "K";  

    }else{
      upKey1 = user.keyUp1;
      rightKey1 = user.keyRight1;
      downKey1 = user.keyDown1;
      leftKey1 = user.keyLeft1;
      upKey2 = user.keyUp2;
      rightKey2 = user.keyRight2;
      downKey2 = user.keyDown2;
      leftKey2 = user.keyLeft2;  

    }


    pageDiv.innerHTML =  `
    <h1 class="m-5">Settings</h1>
    <div class="wrapper">
      <div class="row"> 
        <div class="col-md-6"> 
          <p>Player 1</p>
          <span id="up1"><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey1}</span></br>
          <span id="left1"><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey1}</span>
          <span id="down1"><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey1}</span>
          <span id="right1"><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey1}</span>            
        </div>

        <div class="col-md-6"> 
          <p>Player 2</p>
          <span id="up2"><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey2}</span></br>
          <span id="left2"><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey2}</span>
          <span id="down2"><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey2}</span>
          <span id="right2"><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey2}</span>            
        </div>

      </div>
      <button id="goBack" onclick="history.back()" type="button" class="btn btn-secondary text-center active mt-5">GO BACK</button>
    </div>
   `;  

    let up1Button = document.querySelector("#up1");
    let right1Button = document.querySelector("#right1");
    let down1Button = document.querySelector("#down1");
    let left1Button = document.querySelector("#left1");
    let up2Button = document.querySelector("#up2");
    let right2Button = document.querySelector("#right2");
    let down2Button = document.querySelector("#down2");
    let left2Button = document.querySelector("#left2");

    up1Button.addEventListener("click", listenKeyUp1)
    right1Button.addEventListener("click", listenKeyRight1)
    down1Button.addEventListener("click", listenKeyDown1)
    left1Button.addEventListener("click", listenKeyLeft1)
    up2Button.addEventListener("click", listenKeyUp2)
    right2Button.addEventListener("click", listenKeyRight2)
    down2Button.addEventListener("click", listenKeyDown2)
    left2Button.addEventListener("click", listenKeyLeft2)
  }


  ////////////////////////////////////////////////////////////////////////////CHANGE KEYS/////////////////////////////////////////////////////////////////////
  //keyUp1
  function listenKeyUp1(){
    document.addEventListener("keydown", changeKeyUp1);
    upKey1 = "Press any key";
    updatePage();
  }
  async function changeKeyUp1(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyUp1: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyUp1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyUp1);
  }

  //keyRight1
  function listenKeyRight1(){
    document.addEventListener("keydown", changeKeyRight1);
    upKey1 = "Press any key";
    updatePage();
  }
  async function changeKeyRight1(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyRight1: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyRight1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyRight1);
  }

  //keyDown1
  function listenKeyDown1(){
    document.addEventListener("keydown", changeKeyDown1);
    upKey1 = "Press any key";
    updatePage();
  }
  async function changeKeyDown1(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyDown1: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyDown1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyDown1);
  }


  //keyLeft1
  function listenKeyLeft1(){
    document.addEventListener("keydown", changeKeyLeft1);
    upKey1 = "Press any key";
    updatePage();
  }
  async function changeKeyLeft1(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyLeft1: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyLeft1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyLeft1);
  }


  //keyUp2
  function listenKeyUp2(){
    document.addEventListener("keydown", changeKeyUp2);
    upKey2 = "Press any key";
    updatePage();
  }
  async function changeKeyUp2(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyUp2: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyUp2 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyUp2);
  }

  //keyRight2
  function listenKeyRight2(){
    document.addEventListener("keydown", changeKeyRight2);
    upKey2 = "Press any key";
    updatePage();
  }
  async function changeKeyRight2(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyRight2: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyRight2 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyRight2);
  }

  //keyDown2
  function listenKeyDown2(){
    document.addEventListener("keydown", changeKeyDown2);
    upKey2 = "Press any key";
    updatePage();
  }
  async function changeKeyDown2(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyDown2: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyDown2 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyDown2);
  }


  //keyLeft2
  function listenKeyLeft2(){
    document.addEventListener("keydown", changeKeyLeft2);
    upKey2 = "Press any key";
    updatePage();
  }
  async function changeKeyLeft2(e){

    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyLeft2: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyLeft2 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyLeft2);
  }
  

}

export default SettingsPage;