//This project was built from a class on pluralsight
import React from "react";
import axios from "axios";

import "./App.scss";

class Title extends React.Component {
  render(props) {
    return <div className="header">{this.props.title}</div>;
  }
}

const CardList = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => (
        <Card {...profile} />
      ))}
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="github-profile">
      <img src={props.avatar_url} alt="" />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  );
};

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="GitHub username"
          value={this.state.userName}
          onChange={(e) => this.setState({ userName: e.target.value })}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  //
  //SHORTER WAY TO WRITE STATE WITHOUT CONSTRUCTOR
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {
    return (
      <>
        <Title title="The Github Cards App" />
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </>
    );
  }
}

export default App;
