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
import style from "./YmapAdmin.module.css";
import "antd/dist/antd.css";
import shId from "shortid";
class YmapAdmin extends Component {
  state = {
    defaultMapState: {
      center: [61.26, 73.4],
      zoom: 11,
    },
    selectedMapState: {},
    isModalVisible: false,
    modalValues: {
      name: "",
      latitude: "",
      longtitude: "",
      description: "",
      id: "",
    }
  };

  dotSelect(dot) {
    this.setState({
      selectedMapState: { center: [+dot.latitude, +dot.longtitude], zoom: 16 },
    });
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = async () => {
    const { modalValues } = this.state;
    const { editDot } = this.props;
    if (modalValues.id.length === 0) {
      console.log("add");
      const { createDot } = this.props;
      const latitudeRegexp = /([-+]?(([1-8]?\d(\.\d+))+|90))/g;
      const longtitudeRegexp = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/g;
      const latitude = modalValues.latitude.replace(",", ".");
      const longtitude = modalValues.longtitude.replace(",", ".");

      if (!latitude.match(latitudeRegexp)) {
        return message.error("неправильная широта", 1);
      } else if (!longtitude.match(longtitudeRegexp)) {
        return message.error("неправильная долгота", 1);
      }
      const newDot = {
        latitude: latitude,
        longtitude: longtitude,
        name: modalValues.name,
        description: modalValues.description,
        id: shId.generate(),
      };
      const isDotsUpdate = await createDot(newDot);
      return (
        isDotsUpdate && message.success("Добавлено") && this.handleCancel()
      );
    }
    const isDotsUpdate = await editDot(modalValues);
    return isDotsUpdate && message.success("Обновлено") && this.handleCancel();
  };

  editHandler = (id) => {
    const { dots } = this.props;
    const dotToEdit = dots.find((dot) => dot.id === id);
    this.setState(
      {
        isModalVisible: false,
        modalValues: {
          name: dotToEdit.name,
          latitude: dotToEdit.latitude,
          longtitude: dotToEdit.longtitude,
          description: dotToEdit.description,
          id: dotToEdit.id,
        },
      },
      () => this.showModal()
    );
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      modalValues: {
        name: "",
        latitude: "",
        longtitude: "",
        description: "",
        id: "",
      },
    });
  };

  inputHandler = ({ target }) => {
    this.setState((prevState) => ({
      modalValues: { ...prevState.modalValues, [target.id]: target.value },
    }));
  };

  dragEnd = (e, id) => {
    const { editDot } = this.props;
    const position = e.get("target").geometry.getCoordinates();
    console.log(id);
    const newDot = {
      id: id,
      latitude: position[0],
      longtitude: position[1],
    };
    editDot(newDot);
  };

  deleteHandler = async (id) => {
    const { deleteDot } = this.props;
    const isDotDeleted = await deleteDot(id);
    return !isDotDeleted
      ? message.error("Ошибка удаления", 1)
      : message.success("Успешно удалено");
  };

  render() {
    const { dots } = this.props;
    const {
      defaultMapState,
      selectedMapState,
      isModalVisible,
      modalValues
  
    } = this.state;

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
                        onDragEnd={(e) => this.dragEnd(e, dot.id)}
                        properties={{
                          hintContent: dot.name,
                          balloonContent: dot.description,
                        }}
                        options={{
                          draggable: true,
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
        <Button type="primary" style={{margin:'30px 40px'}} onClick={this.showModal}>
         Додати точку
        </Button>
        {dots.length > 0 ? (
          <ul className={style.list}>
            {dots.map((dot) => {
              return (
                <li key={dot.id} value={dot.name}>
                   <span>{dot.number}</span>
                  <span onClick={() => this.dotSelect(dot)}>{dot.name}</span>
                 
                  <button
                    className={style.deleteBtn}
                    onClick={() => this.deleteHandler(dot.id)}
                  >
                    +
                  </button>
                  <button
                    className={style.editBtn}
                    onClick={() => this.editHandler(dot.id)}
                  ></button>
                </li>
              );
            })}
          </ul>
        ) : null}

        <Modal
          title={modalValues.id.length===0?'Добавить новую точку':'Редактировать точку'}
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ marginBottom: "100px" }}
        >
          <form className={style.formInput}>
            <input
              className={style.modalInput}
              placeholder="Адрес"
              id="name"
              value={modalValues.name}
              onChange={this.inputHandler}
            ></input>
            <input
              className={style.modalInput}
              placeholder="Широта  *"
              id="latitude"
              value={modalValues.latitude}
              onChange={this.inputHandler}
            ></input>
            <input
              className={style.modalInput}
              placeholder="Долгота  *"
              id="longtitude"
              value={modalValues.longtitude}
              onChange={this.inputHandler}
            ></input>
            <textarea
              className={style.modalInput}
              placeholder="Описание"
              id="description"
              value={modalValues.description}
              onChange={this.inputHandler}
            ></textarea>
          </form>
        </Modal>
        <Space> </Space>
      </>
    );
  }
}

export default YmapAdmin;
