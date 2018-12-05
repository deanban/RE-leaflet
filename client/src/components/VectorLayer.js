import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GeoJSON, Tooltip } from "react-leaflet";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
// import { fromJS } from "immutable";

import { getData } from "../actions/geojsonAction";
import GJson from "../neighborhoods.json";

import OnFeatureClick from "./OnFeatureClick";

class VectorLayer extends Component {
  state = {
    name: "",
    clicked: false,
    collapsed: false,
    selected: "home"
  };

  componentDidMount() {
    this.props.getData();
  }

  onclick = e => {
    //debugger
    this.setState({
      name: e.target.feature.properties.name,
      clicked: true
    });
  };

  onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
    layer.on("click", this.onclick);
  };

  onClose = () => {
    this.setState({ collapsed: true });
  };

  onOpen = id => {
    this.setState({
      collapsed: false,
      selected: id
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <Sidebar
          id="sidebar"
          collapsed={this.state.collapsed}
          selected={this.state.selected}
          onOpen={this.onOpen}
          onClose={this.onClose}
        >
          {this.state.clicked ? <OnFeatureClick /> : null}
        </Sidebar>
        <GeoJSON
          data={GJson}
          color="#ff6700"
          fillColor="#a50b5e"
          weight={1}
          onEachFeature={this.onEachFeature}
        />
      </div>
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
