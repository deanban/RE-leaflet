import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GeoJSON } from "react-leaflet";

import { getData } from "../actions/geojsonAction";
import gdata from "../neighborhoods.json";

class VectorLayer extends Component {
  state = {
    name: ""
  };
  componentDidMount() {
    this.props.getData();
  }

  onclick = e => {
    //debugger
    this.setState({ name: e.target.feature.properties.name });
  };

  onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
    layer.on({
      click: this.onclick
    });
  };

  render() {
    console.log(this.props);
    return (
      <GeoJSON
        data={gdata}
        color="#ff6700"
        fillColor="#a50b5e"
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
