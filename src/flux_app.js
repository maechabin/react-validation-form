import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import request from "superagent";
import { Dispatcher } from "flux";
import { EventEmitter } from "events";
import assign from "object-assign";

const formDispatcher = new Dispatcher();

var _value = {
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

// store
const FormStore = assign({}, EventEmitter.prototype, {

  getAll() {
    return _value;
  },
  // イベントを発生させるメソッドの定義
  emitChange() {
    this.emit("change");
  },
  // イベントの監視（購読）とコールバックの定義
  addChangeListener(callback) {
  // "change"イベントの発生を取得したら、引数にセットされたコールバック関数を実行
    this.on("change", callback);
  },
  dispatcherIndex: formDispatcher.register((payload) => {
    if (payload.actionType === "chackValue") {
      switch(payload.data.type) {
        case "mail":
          _value.data.mail = payload.data.value;
          if (payload.data.event.target.validationMessage) {
            _value.message.mail = payload.data.event.target.validationMessage;
            _value.status.mail = false;
          } else {
            _value.message.mail = null;
            _value.status.mail = true;
          }
          break;
        case "url":
          _value.data.url = payload.data.value;
          if (payload.data.event.target.validationMessage) {
            _value.message.url = payload.data.event.target.validationMessage;
            _value.status.url = false;
          } else {
            _value.message.url = null;
            _value.status.url = true;
          }
          break;
      }
      // emitChange()メソッドを実行（イベント発生）
      FormStore.emitChange();
    }
  })
});


//action
const FormAction = {

  checkValue(type, value, event) {
    formDispatcher.dispatch({
      actionType: "chackValue",
      data: {
        type: type,
        value: value,
        event: event
      }
    });
  },

  sendData() {
    alert(_value.data.mail + ", " + _value.data.url);
  }

};


// View
const CheckValue = {
  _checkValue(event) {
    let type = event.target.name;
    let val = event.target.value;
    FormAction.checkValue(type, val, event);
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
    return FormStore.getAll();
  },
  componentDidMount() {
    let self = this;
    FormStore.addChangeListener(() => {
      self.setState(FormStore.getAll());
    });
  },
  render() {
    let mail = {
      mail: this.state.data.mail,
      error: this.state.message.mail
    };
    let url = {
      url: this.state.data.url,
      error: this.state.message.url
    };
    let button = {
      mail: this.state.status.mail,
      url: this.state.status.url
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
    FormAction.sendData();
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
