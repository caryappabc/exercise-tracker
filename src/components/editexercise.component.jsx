import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: Number(response.data.duration),
          date: new Date(response.data.date),
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
        });
      }
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  onDurationChange(e) {
    this.setState({ duration: e.target.value });
  }
  onDateChange(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e, id) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((response) => console.log(response.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onUsernameChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label>Duration: (in Minutes)</label>
            <input
              type="number"
              className="form-control"
              required
              value={this.state.duration}
              onChange={this.onDurationChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onDateChange}
              />
            </div>
          </div>
          <div>
            <input
              type="submit"
              value="Update Exercise"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
