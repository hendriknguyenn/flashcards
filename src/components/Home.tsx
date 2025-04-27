import React, { Dispatch, SetStateAction, useState } from "react";
import appLogo from '../assets/flashcard.svg';
import UserService from '../services/user_service';
import res from "express/lib/response";

interface Props{
  currentUserId: number;
  //setCurrentUserId: 
}
/**
 * 
 * @returns User login screen
 */
function Home(prop: Props){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValidLogin] = useState(false);
  /**
   * gets all the users in the database and runs a check against username/password until match found
   * this can be improved
   */
  const handleLogin = () => {
    UserService.getUser(username)
      .then((response) => {
        let server_data = response.data[0];
        if (server_data.username == username){
          if(server_data.password == password){
            console.log("User successfully logged in");
            //prop.setCurrentUserId(server_data.user_id);
          } else {
            console.log("Invalid Login Info");
          }
        } else {
          console.log("Invalid Login Info");
        }
      })
      .catch((e) => {
        console.log(e);
      })
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
                <input type="submit" value="Login" formAction={handleLogin}></input>
                <input type="submit" value="Create User"></input>
              </form>
        </div>  
      </>
  )
}

export default Home;