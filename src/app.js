import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import request from "superagent";

const Dispatcher = require("flux").Dispatcher;
const EventEmitter = require("events").EventEmitter;
const assign = require("object-assign");

const formDispatcher = new Dispatcher();

const CheckValue = {
  _checkValue(e) {
    let type = e.target.name;
    let val = e.target.value;
    this.props.checkValue(type, val, e);
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
    console.log(event);
    switch(type) {
      case "mail":

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
    return (
      <ul>
        <FormMail mail={this.state.data.mail} error={this.state.message.mail} checkValue={this.checkValue} />
        <FormTel tel={this.state.data.tel} error={this.state.message.tel} checkValue={this.checkValue} />
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
        <input type="mail" name="mail" value={this.props.mail} onKeyUp={this._checkValue} ref="mail" required />
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
        <input type="tel" name="tel" value={this.props.tel} onKeyUp={this._checkValue} ref="tel" required />
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
