import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getData } from "../actions/geojsonAction";

import VectorGrid from "react-leaflet-vectorgrid";

class VectorLayer extends Component {
  state = {
    feature: null,
    data: null
  };

  componentWillMount() {
    this.props.getData();
    // fetch("api/v1/data")
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({
    //       data: result
    //     });
    //   });
  }

  //   onClick = e => {
  //     const feature = e.target.feature;
  //     console.log("clicked", feature.properties);
  //   };

  render() {
    const options = {
      data: this.props.data,
      //   type: "slicer",
      //   idField: "name",
      //   tooltip: "name",
      popup: feature => `<div>${feature.properties.f2}</div>`,
      style: {
        weight: 0.5,
        opacity: 1,
        color: "#ccc",
        fillColor: "#390870",
        fillOpacity: 0.6,
        fill: true,
        stroke: true
      },
      hoverStyle: {
        fillColor: "#390870",
        fillOpacity: 1
      },
      activeStyle: {
        fillColor: "#390870",
        fillOpacity: 1
      },
      zIndex: 401
    };
    // debugger;
    return <VectorGrid {...options} />;
  }
}

VectorLayer.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data.geojson
});

export default connect(
  mapStateToProps,
  { getData }
)(VectorLayer);
