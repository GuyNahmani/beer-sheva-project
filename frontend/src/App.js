import React, { useEffect, useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";
import { apiController } from "./Service/Controllers/apiController";

import mapConfig from "./config.json";

import "./App.css";


const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;





function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  const features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });

  return features;
}

const App = () => {

  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(14.1);
  const [features, setFeatures] = useState([]);



  useEffect(() => {
    const fetch = async () => {
      const shelters = await apiController()
      setFeatures(addMarkers(shelters))
    }
    fetch()
  }, [])


  const [showLayer1, setShowLayer1] = useState(false);
  const [showLayer2, setShowLayer2] = useState(false);
  const [showMarker, setShowMarker] = useState(false);

  const zoomInOut = (trueOrfalse) => {
    let zoomer = trueOrfalse;
    if (zoomer) {
      setZoom(zoom+0.3)
    }
    else {
      setZoom(zoom-0.3)
    }
  }



  return (

    <div >
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showMarker && <VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        Show markers!
      </div>
      <div>
        <button onClick={() => zoomInOut(true)}>+</button>
        <button onClick={() => zoomInOut(false)}>-</button>
      </div>
    </div>
  );
};

export default App;
