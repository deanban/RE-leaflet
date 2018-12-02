import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getData } from "../actions/geojsonAction";

export class MapContainer extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    return (
      <div className="map-container">
        <h1>Map container</h1>
      </div>
    );
  }
}

MapContainer.propTypes = {
  getData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  geo: state.data
});

export default connect(
  mapStateToProps,
  { getData }
)(MapContainer);
