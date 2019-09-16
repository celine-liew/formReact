/* Exercise 1
----------

Create a client-side application for keeping track of users' first names,
last names and ages. It should be possible to create, update, delete and list
user records, sorted (according to user preference) by last name or age.

It is fine if the information goes away when the page is refreshed. */

import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      users:[
        {firstname: "Dorothy", lastname: "Zouk", age: "32"},
        {firstname: "Grave", lastname: "MAY", age: "24"},
        {firstname: "John", lastname: "Goh", age: "44"}
      ],
      tempfn: '',
      templn: '',
      tempAge: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
      let userA = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        age: this.state.age
      };
      this.setState({
        users: this.state.users.concat(userA), 
        firstname: '',
        lastname: '',
        age: '',
        rowtoChange: -1,
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="firstname">First name</label>
        <input id="firstname" value={this.state.firstname} onChange={this.handlefnChange} name="firstname" type="text" required />

        <label htmlFor="lastname">Last name</label>
        <input id="lastname" value={this.state.lastname} onChange={this.handlelnChange}  name="lastname" type="text" required />

        <label htmlFor="age">Age</label>
        <input id="age"value={this.state.age} onChange={this.handleAgeChange}  name="age" type="number" required />

        <button>Submit</button>
        <p></p>
      </form>
        <table>
          <thead><tr><td> First name </td><td>last name</td><td>Age</td>
          <td> <button onClick={this.sortByLast}> sortBy Last Name </button></td>
          <td> <button onClick={this.sortByAge}> sortBy Age </button></td>
          </tr></thead>
          <tbody>{this.makeTablerows(this.state.users, this.state.rowtoChange)}</tbody>
        </table>
      </div>
    );
  }

  makeTablerows = (users, rowtoChange) => {
    return users.map((user, index) => {
      if (index === rowtoChange) {
        return (
          <tr>
            <td><input id="Newfirstname" placeholder={user.firstname} onChange={this.handlefnUpdate} name="Newfirstname" type="text" /></td>
            <td><input id="Newlastname" placeholder={user.lastname} onChange={this.handlelnUpdate}  name="Newlastname" type="text" /></td>
            <td><input id="Newage" placeholder={user.age} onChange={this.handleAgeUpdate}  name="Newage" type="number"  /></td>
            <td> <button onClick={() => this.handleUpdateSubmit(index)}> confirm </button></td>
          </tr>
        )
      }
      return (
        <tr key={user.lastname}>
          <td> {user.firstname} </td>
          <td> {user.lastname} </td>
          <td> {user.age} </td>
          <td> <button onClick={() => this.handleDelete(index)}> delete </button></td>
          <td> <button onClick={() => this.handleChange(index)}>update </button></td>
        </tr>
      )
    });
  }

  sortByAge = () => {
    let usersSorted = this.state.users;
    usersSorted.sort((a,b) => {
      return a.age - b.age;
    });
    this.setState({
      users: usersSorted
    })
  }

  sortByLast = () => {
    let usersSorted = this.state.users;
    usersSorted.sort((a,b) => {
      if(a.lastname < b.lastname) { return -1; }
      if(a.lastname > b.lastname) { return 1; }
    return 0;
    });
    this.setState({
      users: usersSorted
    })
  }

  handleUpdateSubmit = (index) => {
      let userA = {
        firstname: this.state.tempfn,
        lastname: this.state.templn,
        age: this.state.tempAge
      };

      let usersList = this.state.users;
      usersList.splice(index, 1, userA)
      this.setState({
        users: usersList, 
        firstname: '',
        lastname: '',
        age: '',
        rowtoChange: -1,
        tempfn: '',
        templn: '',
        tempAge: '',
      });
  }

  handleAgeUpdate = (event) => {
    this.setState({tempAge: event.target.value});
  }
  handlelnUpdate = (event) => {
    this.setState({templn: event.target.value});
  }

  handlefnUpdate = (event) => {
    this.setState({tempfn: event.target.value});
  }

  handleChange = (index) => {
    this.setState({rowtoChange: index});
  }

  handleDelete = (index) => {
    let userlist = this.state.users;
    userlist.splice(index,1);
    this.setState({users: userlist})
  }

  handlefnChange = (event) => {
    this.setState({firstname: event.target.value});
  }

  handleAgeChange = (event) => {
    this.setState({age: event.target.value});
  }

  handlelnChange = (event) => {
    this.setState({lastname: event.target.value});
  }
}

// What i will change: refactor the functions and handlers such that they are not duplicate similar functions.