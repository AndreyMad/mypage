import React, { Component } from "react";
import {
  YMaps,
  Map,
  Placemark,
  RouteButton,
  TrafficControl,
  GeolocationControl,
  SearchControl,
} from "react-yandex-maps";
import BoyarImg from "../../img/logomap.png";
import { Modal, Button, message, Space } from "antd";
import style from "./Ymap.module.css";
import "antd/dist/antd.css";
import shId from "shortid";

class Ymap extends Component {
  state = {
    defaultMapState: {
      center: [61.26, 73.4],
      zoom: 11,
    },
    selectedMapState: {},
  };

  dotSelect(dot) {
    this.setState({
      selectedMapState: { center: [+dot.latitude, +dot.longtitude], zoom: 16 },
    });
  }

  render() {
    const { dots } = this.props;
    const { defaultMapState, selectedMapState } = this.state;

    return (
      <>
        <div className={style.mapContainer}>
          <YMaps
            query={{
              apikey: `fe9877ac-206a-418c-9d9a-ee1b44acfe8a`,
            }}
          >
            <Map
              width={`100%`}
              height={"400px"}
              defaultState={defaultMapState}
              state={
                selectedMapState.center ? selectedMapState : defaultMapState
              }
            >
              <TrafficControl />
              <RouteButton options={{ float: "right" }} />
              <SearchControl />
              <GeolocationControl options={{ float: "left" }} />
              {dots.length > 0
                ? dots.map((dot) => {
                    return (
                      <Placemark
                        key={dot.id}
                        geometry={[+dot.latitude, +dot.longtitude]}
                        properties={{
                          hintContent: dot.name,
                          balloonContent: dot.description,
                        }}
                        options={{
                          hideIconOnBalloonOpen: false,
                          iconLayout: "default#image",
                          iconImageHref: BoyarImg,
                          iconImageSize: [42, 42],
                          iconImageOffset: [-21, -42],
                          iconContentOffset: [-42, -42],
                        }}
                        modules={[
                          "geoObject.addon.balloon",
                          "geoObject.addon.hint",
                        ]}
                      />
                    );
                  })
                : null}
            </Map>
          </YMaps>
        </div>
      </>
    );
  }
}

export default Ymap;
