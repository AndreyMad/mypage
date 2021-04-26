import React, { Component } from "react";
import { io } from "socket.io-client";
import Navigation from "../../Components/Navigation/Navigation";
const socket = io('http://localhost:80/payments')

socket.on('getmessage', (data)=>{
  console.log(data);
})
socket.on('broadcast', (description)=>{
  console.log(description);
})


class PaymentsPage extends Component {
  state = {
    clientNumber: "",
    clientLastName: "",
    payment: "",
    data:{}
  };
 

  messageSend = (e) => {
      e.preventDefault()
    const { clientNumber, clientLastName, payment } = this.state;
      socket.emit("sendmessage", {clientNumber, clientLastName, payment})
  };

  inputHandler = ({ target }) => {
    this.setState(() => ({
      [target.id]: target.value,
    }));
  };
  render() {
   
    const { clientNumber, clientLastName, payment } = this.state;
    return (
      <>
        <Navigation />
        <form>
          <input
            type="text"
            placeholder="Код клиента"
            id="clientNumber"
            value={clientNumber}
            onChange={this.inputHandler}
          ></input>
          <input
            type="text"
            placeholder="Фамилия"
            id="clientLastName"
            value={clientLastName}
            onChange={this.inputHandler}
          ></input>
          <input
            type="text"
            placeholder="Оплата"
            id="payment"
            value={payment}
            onChange={this.inputHandler}
          ></input>
          <input type='submit'onClick={this.messageSend } value='Отправить'></input>
        </form>

      </>
    );
  }
}

export default PaymentsPage;
