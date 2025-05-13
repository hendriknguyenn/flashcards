import React, { Dispatch, SetStateAction, useState } from "react";
import appLogo from '../assets/flashcard.svg';
import UserService from '../services/user_service';
import tailwindcss from "@tailwindcss/vite";
import '../styles/Home.css';
/**
 * 
 * @returns User login screen
 */
function Home({setCurrentUserId, setComponent}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * gets all the users in the database and runs a check against username/password until match found
   * this can be improved
   */
  function handleLogin(){
    UserService.getUser(username)
      .then((response) => {
        // if response is undefined then user doesn't exist
        if(response.data[0]){
          let server_data = response.data[0];
          if (server_data.username == username){
            if(server_data.password == password){
              setCurrentUserId(server_data.user_id);
              console.log("User successfully logged in.");
              //redirect to new page by calling passed prop function
              setComponent("decklist");
            } else {
              console.log("invalid password field");
            }
          } else {
            console.log("invalid username field");
          }
        } else {
          console.log("User does not exist");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Takes a unique username, validates, creates the user and logs in as the created user
   */
  function createUser(){
    //check if username exists\
    if (isValid()){
      UserService.create({username: username, password: password})
        .then((response) => {
          setCurrentUserId(response.data.user_id);
          setComponent("decklist");
        })
        .catch((e) => {
          console.log(e);
      });
    }
  }

  function isValid() : boolean{
    let valid = false;
    UserService.getUser(username)
    .then((response) => {
      console.log("validate field response: " + response.data);
      if(response.data == undefined){
        valid = true;
      }
    })
    .catch((e) => {
      console.log(e);
    });
    return valid;
  }
  return(
    <>
    <div className= "flex min-h-screen min-w-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div id='home-header'>
        <h1 className="text" id='header'>Flashcards</h1>
        <h2>A React Application by Hendrik Nguyen</h2>
        <a href="https://github.com/hendriknguyenn/flashcards" target="_blank">
          <img className="mx-auto h-50 w-auto" src={appLogo} alt="Flashcards Logo" />
        </a>
      </div>
      <div id='home-login' className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label id="home-label">Username</label>
            <div className="mt-2">
              <input id='home-input' type="text" onChange={(e) => setUsername(e.target.value)} value={username}></input>
            </div>
          </div>
          
          <div>
            <label id="home-label">Password:</label>
            <div className="mt-2">
              <input id='home-input' type="text" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </div>
          </div>

          <div id="home-buttons">
            <span>
              <input type="button" value="Login" onClick={handleLogin}></input>
            </span>
            <span>
              <input type="button" value="Create User" onClick={createUser}></input>
            </span>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Home;