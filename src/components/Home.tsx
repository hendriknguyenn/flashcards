import React, { Dispatch, SetStateAction, useState } from "react";
import appLogo from '../assets/flashcard.svg';
import UserService from '../services/user_service';
import res from "express/lib/response";
/**
 * 
 * @returns User login screen
 */
function Home({setCurrentUser, setComponent}) {
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
              setCurrentUser(server_data.user_id);
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
          console.log(response.data);
          setCurrentUser(response.data.user_id);
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
        <div>
          <h1>Flashcards</h1>
              <h4>A React-Vite Application by Hendrik Nguyen</h4>
              <div>
                <a href="https://github.com/hendriknguyenn/flashcards" target="_blank">
                  <img src={appLogo} className="logo" alt="Flashcards Logo" />
                </a>
              </div>
              <form id="login">
                <label>Username:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                <br></br>
                <label>Password:</label>
                <input type="text" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br></br>
                <input type="button" value="Login" onClick={handleLogin}></input>
                <input type="button" value="Create User" onClick={createUser}></input>
              </form>
        </div>  
      </>
  )
}

export default Home;