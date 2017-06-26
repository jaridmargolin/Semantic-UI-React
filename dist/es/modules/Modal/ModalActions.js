import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _map from 'lodash/map';
import _invoke from 'lodash/invoke';
import cx from 'classnames';

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';
import Button from '../../elements/Button';

/**
 * A modal can contain a row of actions.
 */

var ModalActions = function (_Component) {
  _inherits(ModalActions, _Component);

  function ModalActions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalActions.__proto__ || Object.getPrototypeOf(ModalActions)).call.apply(_ref, [this].concat(args))), _this), _this.handleButtonOverrides = function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          _invoke(predefinedProps, 'onClick', e, buttonProps);
          _invoke(_this.props, 'onActionClick', e, buttonProps);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModalActions, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          actions = _props.actions,
          children = _props.children,
          className = _props.className;

      var classes = cx('actions', className);
      var rest = getUnhandledProps(ModalActions, this.props);
      var ElementType = getElementType(ModalActions, this.props);

      if (!childrenUtils.isNil(children)) return React.createElement(
        ElementType,
        _extends({}, rest, { className: classes }),
        children
      );

      return React.createElement(
        ElementType,
        _extends({}, rest, { className: classes }),
        _map(actions, function (action) {
          return Button.create(action, { overrideProps: _this2.handleButtonOverrides });
        })
      );
    }
  }]);

  return ModalActions;
}(Component);

ModalActions._meta = {
  name: 'ModalActions',
  type: META.TYPES.MODULE,
  parent: 'Modal'
};
ModalActions.handledProps = ['actions', 'as', 'children', 'className', 'onActionClick'];
export default ModalActions;
process.env.NODE_ENV !== "production" ? ModalActions.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Elements to render as Modal action buttons. */
  actions: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(customPropTypes.itemShorthand)]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * onClick handler for an action. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onActionClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func])
} : void 0;


ModalActions.create = createShorthandFactory(ModalActions, function (actions) {
  return { actions: actions };
});