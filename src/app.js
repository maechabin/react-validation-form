import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import request from "superagent";

const CheckValue = {
  _checkValue(e) {
    let val = e.target.value;
    this.props.checkValue(val);
  }
};

const FormApp = React.createClass({
  getInitialState() {
    return {
      "mail": null,
      "tel": null
    };
  },
  checkValue(value) {
    console.log(value);
  },
  sendData() {
    console.log(this.state);
  },
  render() {
    return (
      <div>
        <FormMail mail={this.state.mail} checkValue={this.checkValue} />
        <FormTel tel={this.state.tel} checkValue={this.checkValue} />
        <FormButton sendData={this.sendData} />
      </div>
    );
  }
});

const FormMail = React.createClass({
  mixins: [CheckValue],
  render() {
    return (
      <input type="mail" value={this.props.mail} onKeyUp={this._checkValue} required />
    );
  }
});

const FormTel = React.createClass({
  mixins: [CheckValue],
  render() {
    return (
      <input type="tel" value={this.props.tel} onKeyUp={this._checkValue} required />
    );
  }
});

const FormButton = React.createClass({
  _sendData() {
    this.props.sendData();
  },
  render() {
    return (
      <button onClick={this._sendData}>
        送信する
      </button>
    );
  }
});

// export default FormApp;

ReactDOM.render(
  <FormApp />,
  document.getElementById("content")
);
