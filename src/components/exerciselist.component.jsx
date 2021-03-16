import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise, key }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}>Edit</Link> |{" "}
        <input
          className="btn btn-light"
          type="button"
          value="Delete"
          onClick={() => deleteExercise(exercise._id)}
        />
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercise: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercise: response.data });
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log("Deleted");
    });
    this.setState({
      exercise: this.state.exercise.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercise.map((current) => {
      return (
        <Exercise
          exercise={current}
          deleteExercise={this.deleteExercise}
          key={current._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Exercises Record</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration (in Mins)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
