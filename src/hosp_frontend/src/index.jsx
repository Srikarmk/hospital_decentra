import * as React from "react";
import { render } from "react-dom";
import { hosp_backend } from "../../declarations/hosp_backend";

const MyHello = () => {
  const [userName, setUserName] = React.useState('');
  const [newUser, setNewUser] = React.useState('');
  const [newRating, setNewRating] = React.useState(null);
  const [principal, setPrincipal] = React.useState('');
  const [rating,  setRating] = React.useState(null);
  const [review, setReview] = React.useState('');
  const [userAttendence, setUserAttendence] = React.useState(null);

  // Function to add a  new course
  async function addnewUser() {
    try{
    const add = await hosp_backend.addUser(principal, userName);
    setNewUser(add);
    }
    catch(err){
      console.log(err);
    }
  }

  // Function to rate a course
  async function addAttendence() {
    try{
    const rate = await hosp_backend.addAttend(principal);
    console.log(rate);
    }
    catch(err){
      console.log(err);
    }
  }

   // Function to add a  new course
   async function removeUser() {
    try{
    const add = await hosp_backend.removeUser(principal, userName);
    setNewUser(add);
    }
    catch(err){
      console.log(err);
    }
  }
  // Function to get course rating
  async function getUserAttendence() {
    try{
    const add = await hosp_backend.getUserAttendence(principal);
    console.log(add);
    const name = add.name;
    const total = parseInt(add.attend);
    console.log(counter, total);
    if(total !== 0n){
      setUserAttendence(total);
    }
    else
    setUserAttendence(0);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div style={{ "fontSize": "30px" }}>
      <div style={{ "backgroundColor": "yellow" }}>
        <p>Attendence in a decentralized manner</p>
      </div>
      <div style={{ margin: "30px" }}>
        <p>Enter the name of user, you wanna add</p>
        <input
          id="name"
          placeholder="Name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        ></input>
        <input
          id="principal"
          value={principal}
          placeholder="Principal"
          onChange={(ev) => setPrincipal(ev.target.value)}
        ></input>
        <button onClick={addnewUser}>Add Course</button>
      </div>

      <div style={{ margin: "30px" }}>
        <p>Enter the Principal to add attendence</p>
        <input
          id="principal"
          placeholder = "Enter the name of the course"
          value={principal}
          onChange={(ev) => setPrincipal(ev.target.value)}
        ></input>
        <button onClick={addAttendence}>Add attende</button>
      </div>

      <div style={{ margin: "30px" }}>
        <p>Enter the Principal, you want to enquire about</p>
        <input
          id="principal"
          value={principal}
          placeholder="Principal"
          onChange={(ev) => setPrincipal(ev.target.value)}
        ></input>
        <button onClick={getUserAttendence}>Get Attendence</button>
      </div>

      { newUser !== '' &&
      <div>
        "
        <span style={{ color: "blue" }}>{newUser}</span>" is added!
      </div>
}
{ userName !== '' &&
      <div>
        "
        <span style={{ color: "blue" }}>{userName}</span>" is the user name
      </div>
}
{ userAttendence !== null &&
      <div>
        "
        <span style={{ color: "blue" }}>{userAttendence}</span>" is the userAttendence
      </div>
}
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));