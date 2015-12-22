import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import request from "superagent";

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
    let data = {
      mail: this.state.data.mail,
      url: this.state.data.url
    };
    let message = {
      mail: this.state.message.mail,
      url: this.state.message.url
    };
    let status = {
      mail: this.state.status.mail,
      url: this.state.status.url
    };
    switch(type) {
      case "mail":
        data.mail = value;
        if (event.target.validationMessage) {
          message.mail = event.target.validationMessage;
          status.mail = false;
        } else {
          message.mail = null;
          status.mail = true;
        }
        break;
      case "url":
        data.url = value;
        if (event.target.validationMessage) {
          message.url = event.target.validationMessage;
          status.url = false;
        } else {
          message.url = null;
          status.url = true;
        }
        break;
    }
    this.setState({
      data: data,
      message: message,
      status: status
    });
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
  _sendData(event) {
    event.preventDefault();
    this.props.sendData();
  },
  render() {
    return (
      <li>
        <button className="btn btn-cyan800_rsd"
          onClick={this._sendData}
          disabled={this.props.mail === false || this.props.url === false}
        >
          送信する
        </button>
      </li>
    );
  }
});

export default FormApp;

ReactDOM.render(
  <FormApp />,
  document.getElementById("content")
);
