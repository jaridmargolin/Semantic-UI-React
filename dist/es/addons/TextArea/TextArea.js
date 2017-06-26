import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _sum from 'lodash/sum';
import _invoke from 'lodash/invoke';
import _get from 'lodash/get';

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.focus = function () {
      return _this.ref.focus();
    }, _this.handleChange = function (e) {
      var value = _get(e, 'target.value');

      _invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: value }));
      _this.updateHeight();
    }, _this.handleRef = function (c) {
      return _this.ref = c;
    }, _this.removeAutoHeightStyles = function () {
      _this.ref.style.height = null;
      _this.ref.style.resize = null;
    }, _this.updateHeight = function () {
      var autoHeight = _this.props.autoHeight;

      if (!_this.ref || !autoHeight) return;

      var _window$getComputedSt = window.getComputedStyle(_this.ref),
          borderBottomWidth = _window$getComputedSt.borderBottomWidth,
          borderTopWidth = _window$getComputedSt.borderTopWidth,
          lineHeight = _window$getComputedSt.lineHeight,
          minHeight = _window$getComputedSt.minHeight,
          paddingBottom = _window$getComputedSt.paddingBottom,
          paddingTop = _window$getComputedSt.paddingTop;

      var boxModelHeight = _sum([borderBottomWidth, borderTopWidth, paddingBottom, paddingTop].map(function (x) {
        return parseFloat(x);
      }));
      var textRows = Math.max(_this.ref.rows, _this.ref.value.split('\n').length);
      var textHeight = parseFloat(lineHeight) * textRows;

      // respect style.minHeight
      _this.setState(function (prevState, props) {
        return {
          height: Math.max(parseFloat(minHeight), Math.ceil(boxModelHeight + textHeight)) + 'px'
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // removed autoHeight
      if (!this.props.autoHeight && prevProps.autoHeight) {
        this.removeAutoHeightStyles();
      }
      // added autoHeight or value changed
      if (this.props.autoHeight && !prevProps.autoHeight || prevProps.value !== this.props.value) {
        this.updateHeight();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoHeight = _props.autoHeight,
          rows = _props.rows,
          style = _props.style,
          value = _props.value;
      var height = this.state.height;


      var rest = getUnhandledProps(TextArea, this.props);
      var ElementType = getElementType(TextArea, this.props);

      var resize = autoHeight ? 'none' : '';

      return React.createElement(ElementType, _extends({}, rest, {
        onChange: this.handleChange,
        ref: this.handleRef,
        rows: rows,
        style: _extends({ height: height, resize: resize }, style),
        value: value
      }));
    }
  }]);

  return TextArea;
}(Component);

TextArea._meta = {
  name: 'TextArea',
  type: META.TYPES.ADDON
};
TextArea.defaultProps = {
  as: 'textarea',
  rows: 3
};
TextArea.handledProps = ['as', 'autoHeight', 'onChange', 'rows', 'style', 'value'];
process.env.NODE_ENV !== "production" ? TextArea.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Indicates whether height of the textarea fits the content or not. */
  autoHeight: PropTypes.bool,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: PropTypes.func,

  /** Indicates row count for a TextArea. */
  rows: PropTypes.number,

  /** Custom TextArea style. */
  style: PropTypes.object,

  /** The value of the textarea. */
  value: PropTypes.string
} : void 0;


export default TextArea;