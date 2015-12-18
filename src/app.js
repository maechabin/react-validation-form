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
const ValidStyle = {
  style: {
    invalid: {
      border: "2px solid #b71c1c"
    },
    valid: {
      border: "2px solid #ccc"
    }
  }
};

const FormApp = React.createClass({
  getInitialState() {
    return {
      data: {
        mail: null,
        url: null
      },
      message: {
        mail: null,
        url: null
      },
      status: {
        mail: null,
        url: null
      }
    };
  },
  checkValue(type, value, event) {
    switch(type) {
      case "mail":
        this.state.data.mail = value;
        if (event.target.validationMessage) {
          this.state.message.mail = event.target.validationMessage;
          this.state.status.mail = false;
        } else {
          this.state.message.mail = null;
          this.state.status.mail = true;
        }
        break;
      case "url":
        this.state.data.url = value;
        if (event.target.validationMessage) {
          this.state.message.url = event.target.validationMessage;
          this.state.status.url = false;
        } else {
          this.state.message.url = null;
          this.state.status.url = true;
        }
        break;
    }
    this.setState({});
  },
  sendData() {
    alert(this.state.data.mail + ", " + this.state.data.url);
  },
  render() {
    let mail = {
      mail: this.state.data.mail,
      error: this.state.message.mail,
      checkValue: this.checkValue
    };
    let url = {
      url: this.state.data.url,
      error: this.state.message.url,
      checkValue: this.checkValue
    };
    let button = {
      mail: this.state.status.mail,
      url: this.state.status.url,
      sendData: this.sendData
    };
    return (
      <ul>
        <FormMail {...mail} />
        <FormUrl {...url} />
        <FormButton {...button} />
      </ul>
    );
  }
});

const FormMail = React.createClass({
  mixins: [CheckValue, ValidStyle],
  render() {
    return (
      <li>
        <input type="email" name="mail" ref="mail" placeholder="Email"
          value={this.props.mail}
          onChange={this._checkValue}
          onBlur={this._checkValue}
          required
          style={(this.props.error) ? this.style.invalid : this.style.valid}
        />
        <p>{this.props.error}</p>
      </li>
    );
  }
});

const FormUrl = React.createClass({
  mixins: [CheckValue, ValidStyle],
  render() {
    return (
      <li>
        <input type="url" name="url" ref="url" placeholder="URL"
          value={this.props.url}
          onChange={this._checkValue}
          onBlur={this._checkValue}
          required
          style={(this.props.error) ? this.style.invalid : this.style.valid}
        />
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
        <button className="btn btn-cyan800_rsd" onClick={this._sendData} disabled={!this.props.mail === true || !this.props.url === true}>
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
