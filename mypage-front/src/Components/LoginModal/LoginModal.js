import React, { Component } from "react";
import { Modal,  message, Space } from "antd";
import style from "./LoginModal.module.css";


class LoginModal extends Component {
  state = {
    login: "",
    password: "",
  };

  handleOk = () => {
    const { logInFunc, modalClose, checkSession } = this.props;
    const {login, password}=this.state

    logInFunc({ login: login, password: password }).then((res) => {
     if(res.status === "succes"){
         checkSession();
          modalClose()
        return true
        }
        message.error(res, 1)
    });
  };
  handleSubmit =(e)=>{
      e.preventDefault()
      this.handleOk()
  }

  handleChange =({target})=>{
    this.setState((prevState)=>({
   [target.id]: prevState.[target.id], [target.id]: target.value 
})
)
  }
  render() {
    const { login, password } = this.state;
    const { modalClose } = this.props;
    return (
        <>
      <Modal
        title={"Авторизація"}
        visible
        onOk={this.handleOk}
        onCancel={modalClose}
        style={{ marginBottom: "100px" }}
      >
        <form className={style.form} onSubmit={this.handleSubmit}>
            
          <input type='text' placeholder='Login' id='login' onChange={this.handleChange} value={login} className={style.formInput}></input>
          <input type='password' placeholder='Password' id='password' onChange={this.handleChange} value={password} className={style.formInput}></input>
            <input type='submit' onSubmit={this.handleSubmit} style={{display:'none'}}></input>
        </form>
      </Modal>
      <Space></Space>
      </>
    );
  }
}

export default LoginModal;
