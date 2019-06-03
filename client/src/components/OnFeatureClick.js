import React, { Component } from "react";
import axios from "axios";
// import PropTypes from "prop-types";

export default class OnFeatureClick extends Component {
  state = {
    key: "js-0IuJGVsF4ansUNtNh6M2igSnPdX2F02ffGuApk9tFhCu4b4FEK1tHi7wksAX5igD",
    cityNames: null,
    error: null
  };

  componentDidMount() {
    axios
      .get(
        `https://www.zipcodeapi.com/rest/${this.state.key}/info.json/${
          this.props.zip
        }/degrees`
      )
      .then(data =>
        this.setState({
          cityNames: data.acceptable_city_names
        })
      )
      .catch(err =>
        this.setState({
          error: err
        })
      );
    // debugger;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.zip !== this.props.zip) {
  //     this.cityName();
  //   }
  // }
  // cityName = () => {
  //   // console.log(this.state.cityNames);
  //   this.state.cityNames.map(name => {
  //     // debugger;
  //     return (
  //       <div>
  //         <h1>{name.city}</h1>
  //       </div>
  //     );
  //   });
  // };
  render() {
    console.log("clicked");
    // debugger;
    return (
      <div>
        {this.state.cityNames !== undefined &&
          this.state.cityNames.map(name => {
            return <h1>{name.city}</h1>;
          })}
      </div>
    );
  }
}
