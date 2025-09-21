"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var React = require('react');
var PropTypes = require('prop-types');
var SimpleCurrencyInput = /*#__PURE__*/function (_React$Component) {
  function SimpleCurrencyInput(props) {
    var _this;
    _classCallCheck(this, SimpleCurrencyInput);
    _this = _callSuper(this, SimpleCurrencyInput, [props]);
    _this.onInputType = _this.onInputType.bind(_this);
    _this.formattedRawValue = _this.formattedRawValue.bind(_this);
    _this.getRawValue = _this.getRawValue.bind(_this);
    _this.state = {
      rawValue: _this.props.value,
      tabIndex: _this.props.tabIndex,
      readOnly: _this.props.readOnly
    };
    _this.notifyParentWithRawValue(_this.state.rawValue);
    return _this;
  }
  _inherits(SimpleCurrencyInput, _React$Component);
  return _createClass(SimpleCurrencyInput, [{
    key: "onInputType",
    value: function onInputType(event) {
      var input = event.target.value;
      var rawValue = this.getRawValue(input);
      if (!rawValue) {
        rawValue = 0;
      }
      this.notifyParentWithRawValue(rawValue);
      this.setState({
        rawValue: rawValue
      });
    }
  }, {
    key: "notifyParentWithRawValue",
    value: function notifyParentWithRawValue(rawValue) {
      var display = this.formattedRawValue(rawValue);
      this.props.onInputChange(rawValue, display);
    }
  }, {
    key: "getRawValue",
    value: function getRawValue(displayedValue) {
      var result = displayedValue;
      result = removeOccurrences(result, this.props.delimiter);
      result = removeOccurrences(result, this.props.separator);
      result = removeOccurrences(result, this.props.unit);
      var intValue = parseInt(result);
      return intValue;
    }
  }, {
    key: "formattedRawValue",
    value: function formattedRawValue(rawValue) {
      var minChars = '0'.length + this.props.precision;
      var result = '';
      result = "".concat(rawValue);
      if (result.length < minChars) {
        var leftZeroesToAdd = minChars - result.length;
        result = "".concat(repeatZeroes(leftZeroesToAdd)).concat(result);
      }
      var beforeSeparator = result.slice(0, result.length - this.props.precision);
      var afterSeparator = result.slice(result.length - this.props.precision);
      if (beforeSeparator.length > 3) {
        var chars = beforeSeparator.split('').reverse();
        var withDots = '';
        for (var i = chars.length - 1; i >= 0; i--) {
          var _char = chars[i];
          var dot = i % 3 === 0 ? this.props.delimiter : '';
          withDots = "".concat(withDots).concat(_char).concat(dot);
        }
        withDots = withDots.substring(0, withDots.length - 1);
        beforeSeparator = withDots;
      }
      result = beforeSeparator + this.props.separator + afterSeparator;
      if (this.props.unit) {
        result = "".concat(this.props.unit, " ").concat(result);
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("input", {
        id: this.props.id,
        className: this.props.className,
        onBlur: this.props.onInputBlur,
        onFocus: this.props.onInputFocus,
        onChange: this.onInputType,
        value: this.formattedRawValue(this.state.rawValue),
        disabled: this.props.disabled,
        autoFocus: this.props.autoFocus,
        tabIndex: this.state.tabIndex,
        readOnly: this.state.readOnly,
        autoComplete: this.props.autoComplete,
        autoCorrect: this.props.autoCorrect,
        name: this.props.name,
        placeholder: this.props.placeholder
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.value || nextProps.value === 0) {
        return {
          rawValue: nextProps.value
        };
      }
      return null;
    }
  }]);
}(React.Component);
var repeatZeroes = function repeatZeroes(times) {
  var result = '';
  var i = 0;
  for (i = 0; i < times; i++) {
    result += '0';
  }
  return result;
};
var removeOccurrences = function removeOccurrences(from, toRemove) {
  toRemove = toRemove.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  var re = new RegExp(toRemove, 'g');
  return from.replace(re, '');
};
SimpleCurrencyInput.propTypes = {
  id: PropTypes.string,
  autoFocus: PropTypes.bool,
  delimiter: PropTypes.string,
  disabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onInputBlur: PropTypes.func,
  onInputFocus: PropTypes.func,
  precision: PropTypes.number,
  readOnly: PropTypes.bool,
  separator: PropTypes.string,
  tabIndex: PropTypes.number,
  unit: PropTypes.string,
  value: PropTypes.number.isRequired
};
SimpleCurrencyInput.defaultProps = {
  value: 0,
  precision: 2,
  separator: '.',
  delimiter: ',',
  unit: '',
  disabled: false,
  autoFocus: false,
  onInputChange: function onInputChange() {},
  onInputBlur: function onInputBlur() {},
  onInputFocus: function onInputFocus() {}
};
var _default = exports["default"] = SimpleCurrencyInput;