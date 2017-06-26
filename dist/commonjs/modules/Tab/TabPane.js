'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _Segment = require('../../elements/Segment/Segment');

var _Segment2 = _interopRequireDefault(_Segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A tab pane holds the content of a tab.
 */
function TabPane(props) {
  var children = props.children,
      className = props.className,
      loading = props.loading;


  var classes = (0, _classnames2.default)((0, _lib.useKeyOnly)(loading, 'loading'), 'active tab', className);
  var rest = (0, _lib.getUnhandledProps)(TabPane, props);
  var ElementType = (0, _lib.getElementType)(TabPane, props);

  var calculatedDefaultProps = {};
  if (ElementType === _Segment2.default) {
    calculatedDefaultProps.attached = 'bottom';
  }

  return _react2.default.createElement(
    ElementType,
    (0, _extends3.default)({}, calculatedDefaultProps, rest, { className: classes, loading: loading }),
    children
  );
}

TabPane.handledProps = ['as', 'children', 'className', 'loading'];
TabPane._meta = {
  name: 'TabPane',
  parent: 'Tab',
  type: _lib.META.TYPES.MODULE
};

TabPane.defaultProps = {
  as: _Segment2.default
};

process.env.NODE_ENV !== "production" ? TabPane.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes2.default.string,

  /** Additional classes. */
  className: _propTypes2.default.string,

  /** A Tab.Pane can display a loading indicator. */
  loading: _propTypes2.default.bool
} : void 0;

TabPane.create = (0, _lib.createShorthandFactory)(TabPane, function (children) {
  return { children: children };
});

exports.default = TabPane;