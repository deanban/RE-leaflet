import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
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
    selected: "home",
    geodata: null,
    error: {}
  };

  componentDidMount() {
    // this.props.getData();
    axios
      .get(
        "https://raw.githubusercontent.com/OpenDataDE/State-zip-code-GeoJSON/master/ny_new_york_zip_codes_geo.min.json"
      )
      .then(geojson => {
        geojson && this.setState({ geodata: geojson.data });
      })
      .catch(err => this.setState({ error: err.response }));
  }

  onclick = e => {
    //debugger
    this.setState({
      name: e.target.feature.properties.ZCTA5CE10,
      clicked: true
    });
  };

  onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.ZCTA5CE10) {
      layer.bindPopup(feature.properties.ZCTA5CE10);
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
    // const { data } = this.props;
    return (
      <div>
        {this.state.geodata !== null ? (
          <div>
            <GeoJSON
              data={this.state.geodata}
              color="#ff6700"
              fillColor="#a50b5e"
              weight={1}
              onEachFeature={this.onEachFeature}
            />
            <Sidebar
              id="sidebar"
              collapsed={this.state.collapsed}
              selected={this.state.selected}
              onOpen={this.onOpen}
              onClose={this.onClose}
            >
              {this.state.clicked ? (
                <OnFeatureClick zip={this.state.name} />
              ) : null}
            </Sidebar>
          </div>
        ) : null}
        {/* <div>{this.state.clicked ? <OnFeatureClick /> : ""}</div> */}
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
