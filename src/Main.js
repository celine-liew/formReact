/* Exercise 1
----------

Create a client-side application for keeping track of users' first names,
last names and ages. It should be possible to create, update, delete and list
user records, sorted (according to user preference) by last name or age.

It is fine if the information goes away when the page is refreshed. */

import React, {Component} from "react";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstnames: [],
            lastnames: [],
            ages: []
        };
        this.observers = [];
    }

}