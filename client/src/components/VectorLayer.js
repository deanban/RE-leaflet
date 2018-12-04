import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GeoJSON } from "react-leaflet";

import { getData } from "../actions/geojsonAction";
import gdata from "../neighborhoods.json";

class VectorLayer extends Component {
  componentDidMount() {
    this.props.getData();
  }

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  }
  render() {
    console.log(this.props);
    return (
      <GeoJSON
        data={gdata}
        color="#8090a7"
        fillColor="5a12d0"
        weight={1}
        onEachFeature={this.onEachFeature}
      />
    );
  }
}

VectorLayer.propTypes = {
  getData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data.geojson
});

export default connect(
  mapStateToProps,
  { getData }
)(VectorLayer);
