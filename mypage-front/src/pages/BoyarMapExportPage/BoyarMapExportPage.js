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
import style from "./BoyarMapExportPage.module.css";
import "antd/dist/antd.css";
import * as API from '../../api/api';

class Ymap extends Component {
  state = {
    defaultMapState: {
      center: [61.26, 73.4],
      zoom: 11,
    },
    dots:[],
    selectedMapState: {},
  };
componentDidMount(){
    this.getDots()
}
componentWillMount() {
  document.body.style.overflow = "hidden";
}

componentWillUnmount() {
  document.body.style.overflow = "visible"; // or restore the original value
}


  getDots = () => {
    const { dots } = this.state;
    API.getDots().then((res) => {
      if (
        dots.length < res.data.length ||
        JSON.stringify(dots) !== JSON.stringify(res.data)
      ) {
        this.setState({ dots: res.data });
        return true;
      }
      return false;
    });
  };

  render() {
    const { defaultMapState, selectedMapState,dots } = this.state;

    return (
      <>
     
        <div className={style.mapContainer}>
          <YMaps
            query={{
              apikey: `fe9877ac-206a-418c-9d9a-ee1b44acfe8a`,
            }}
          >
            <Map
           className={style.map}
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
