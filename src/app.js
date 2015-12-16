import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import request from "superagent";

const Dispatcher = require("flux").Dispatcher;
const EventEmitter = require("events").EventEmitter;
const assign = require("object-assign");

const formDispatcher = new Dispatcher();

const CheckValue = {
  _checkValue(event) {
    let type = event.target.name;
    let val = event.target.value;
    this.props.checkValue(type, val, event);
  }
};

const FormApp = React.createClass({
  getInitialState() {
    return {
      data: {
        "mail": null,
        "tel": null
      },
      message: {
        "mail": null,
        "tel": null
      },
      status: false
    };
  },
  checkValue(type, value, event) {
    console.log(type);
    console.log(value);
    console.log(event.target.validity.valueMissing);
    switch(type) {
      case "mail":
        if (event.target.validity.valueMissing) {
          this.setState({message: {mail: "入力してください"}});
        }
        break;
      case "tel":

        break;
      default:

        break;
    }
  },
  sendData() {
    console.log(this.state);
  },
  render() {
    var mail = {
      mail: this.state.data.mail,
      error: this.state.message.mail,
      checkValue: this.checkValue
    };
    var tel = {
      tel: this.state.data.tel,
      error: this.state.message.tel,
      checkValue: this.checkValue
    };
    return (
      <ul>
        <FormMail {...mail} />
        <FormTel {...tel} />
        <FormButton sendData={this.sendData} />
      </ul>
    );
  }
});

const FormMail = React.createClass({
  mixins: [CheckValue],
  render() {
    return (
      <li>
        <input type="mail" name="mail" value={this.props.mail} onChange={this._checkValue} ref="mail" required />
        <p>{this.props.error}</p>
      </li>
    );
  }
});

const FormTel = React.createClass({
  mixins: [CheckValue],
  render() {
    return (
      <li>
        <input type="tel" name="tel" value={this.props.tel} onChange={this._checkValue} ref="tel" required />
        <p>{this.props.error}</p>
      </li>
    );
  }
});

const FormButton = React.createClass({
  _sendData(e) {
    e.preventDefault();
    this.props.sendData();
  },
  render() {
    return (
      <li>
        <button onClick={this._sendData}>
          送信する
        </button>
      </li>
    );
  }
});

// export default FormApp;

ReactDOM.render(
  <FormApp />,
  document.getElementById("content")
);
