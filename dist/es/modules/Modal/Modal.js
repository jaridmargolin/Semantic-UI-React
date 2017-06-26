import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _invoke from 'lodash/invoke';
import cx from 'classnames';

import PropTypes from 'prop-types';
import React from 'react';

import { AutoControlledComponent as Component, childrenUtils, customPropTypes, getElementType, getUnhandledProps, isBrowser, makeDebugger, META, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
import Portal from '../../addons/Portal';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import ModalDescription from './ModalDescription';

var debug = makeDebugger('modal');

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.getMountNode = function () {
      return isBrowser ? _this.props.mountNode || document.body : null;
    }, _this.handleActionsOverrides = function (predefinedProps) {
      return {
        onActionClick: function onActionClick(e, actionProps) {
          var triggerClose = actionProps.triggerClose;


          _invoke(predefinedProps, 'onActionClick', e, actionProps);
          if (triggerClose) _this.handleClose(e);
        }
      };
    }, _this.handleClose = function (e) {
      debug('close()');

      var onClose = _this.props.onClose;

      if (onClose) onClose(e, _this.props);

      _this.trySetState({ open: false });
    }, _this.handleIconOverrides = function (predefinedProps) {
      return {
        onClick: function onClick(e) {
          _invoke(predefinedProps, 'onClick', e);
          _this.handleClose(e);
        }
      };
    }, _this.handleOpen = function (e) {
      debug('open()');

      var onOpen = _this.props.onOpen;

      if (onOpen) onOpen(e, _this.props);

      _this.trySetState({ open: true });
    }, _this.handlePortalMount = function (e) {
      debug('handlePortalMount()');
      var dimmer = _this.props.dimmer;

      var mountNode = _this.getMountNode();

      if (dimmer) {
        debug('adding dimmer');
        mountNode.classList.add('dimmable', 'dimmed');

        if (dimmer === 'blurring') {
          debug('adding blurred dimmer');
          mountNode.classList.add('blurring');
        }
      }

      _this.setPosition();

      var onMount = _this.props.onMount;

      if (onMount) onMount(e, _this.props);
    }, _this.handlePortalUnmount = function (e) {
      debug('handlePortalUnmount()');

      // Always remove all dimmer classes.
      // If the dimmer value changes while the modal is open, then removing its
      // current value could leave cruft classes previously added.
      var mountNode = _this.getMountNode();
      mountNode.classList.remove('blurring', 'dimmable', 'dimmed', 'scrollable');

      cancelAnimationFrame(_this.animationRequestId);

      var onUnmount = _this.props.onUnmount;

      if (onUnmount) onUnmount(e, _this.props);
    }, _this.handleRef = function (c) {
      return _this.ref = c;
    }, _this.setPosition = function () {
      if (_this.ref) {
        var mountNode = _this.getMountNode();

        var _this$ref$getBounding = _this.ref.getBoundingClientRect(),
            height = _this$ref$getBounding.height;

        var marginTop = -Math.round(height / 2);
        var scrolling = height >= window.innerHeight;

        var newState = {};

        if (_this.state.marginTop !== marginTop) {
          newState.marginTop = marginTop;
        }

        if (_this.state.scrolling !== scrolling) {
          newState.scrolling = scrolling;

          if (scrolling) {
            mountNode.classList.add('scrolling');
          } else {
            mountNode.classList.remove('scrolling');
          }
        }

        if (Object.keys(newState).length > 0) _this.setState(newState);
      }

      _this.animationRequestId = requestAnimationFrame(_this.setPosition);
    }, _this.renderContent = function (rest) {
      var _this$props = _this.props,
          actions = _this$props.actions,
          basic = _this$props.basic,
          children = _this$props.children,
          className = _this$props.className,
          closeIcon = _this$props.closeIcon,
          content = _this$props.content,
          header = _this$props.header,
          size = _this$props.size,
          style = _this$props.style;
      var _this$state = _this.state,
          marginTop = _this$state.marginTop,
          scrolling = _this$state.scrolling;


      var classes = cx('ui', size, useKeyOnly(basic, 'basic'), useKeyOnly(scrolling, 'scrolling'), 'modal transition visible active', className);
      var ElementType = getElementType(Modal, _this.props);

      var closeIconName = closeIcon === true ? 'close' : closeIcon;
      var closeIconJSX = Icon.create(closeIconName, { overrideProps: _this.handleIconOverrides });

      if (!childrenUtils.isNil(children)) {
        return React.createElement(
          ElementType,
          _extends({}, rest, { className: classes, style: _extends({ marginTop: marginTop }, style), ref: _this.handleRef }),
          closeIconJSX,
          children
        );
      }

      return React.createElement(
        ElementType,
        _extends({}, rest, { className: classes, style: _extends({ marginTop: marginTop }, style), ref: _this.handleRef }),
        closeIconJSX,
        ModalHeader.create(header),
        ModalContent.create(content),
        ModalActions.create(actions, { overrideProps: _this.handleActionsOverrides })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      debug('componentWillUnmount()');
      this.handlePortalUnmount();
    }

    // Do not access document when server side rendering

  }, {
    key: 'render',
    value: function render() {
      var open = this.state.open;
      var _props = this.props,
          closeOnDimmerClick = _props.closeOnDimmerClick,
          closeOnDocumentClick = _props.closeOnDocumentClick,
          dimmer = _props.dimmer;

      var mountNode = this.getMountNode();

      // Short circuit when server side rendering
      if (!isBrowser) return null;

      var unhandled = getUnhandledProps(Modal, this.props);
      var portalPropNames = Portal.handledProps;

      var rest = _omit(unhandled, portalPropNames);
      var portalProps = _pick(unhandled, portalPropNames);

      // wrap dimmer modals
      var dimmerClasses = !dimmer ? null : cx('ui', dimmer === 'inverted' && 'inverted', 'page modals dimmer transition visible active');

      // Heads up!
      //
      // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
      // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
      //
      // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
      // We need the immediate child to be the dimmer to :not() blur the modal itself!
      // Otherwise, the portal div is also blurred, blurring the modal.
      //
      // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

      return React.createElement(
        Portal,
        _extends({
          closeOnDocumentClick: closeOnDocumentClick,
          closeOnRootNodeClick: closeOnDimmerClick
        }, portalProps, {
          className: dimmerClasses,
          mountNode: mountNode,
          open: open,
          onClose: this.handleClose,
          onMount: this.handlePortalMount,
          onOpen: this.handleOpen,
          onUnmount: this.handlePortalUnmount
        }),
        this.renderContent(rest)
      );
    }
  }]);

  return Modal;
}(Component);

Modal.defaultProps = {
  dimmer: true,
  closeOnDimmerClick: true,
  closeOnDocumentClick: false
};
Modal.autoControlledProps = ['open'];
Modal._meta = {
  name: 'Modal',
  type: META.TYPES.MODULE
};
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Actions = ModalActions;
Modal.handledProps = ['actions', 'as', 'basic', 'children', 'className', 'closeIcon', 'closeOnDimmerClick', 'closeOnDocumentClick', 'content', 'defaultOpen', 'dimmer', 'header', 'mountNode', 'onClose', 'onMount', 'onOpen', 'onUnmount', 'open', 'size', 'style'];
process.env.NODE_ENV !== "production" ? Modal.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Elements to render as Modal action buttons. */
  actions: PropTypes.arrayOf(customPropTypes.itemShorthand),

  /** A modal can reduce its complexity */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Icon. */
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: PropTypes.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Simple text content for the Modal. */
  content: customPropTypes.itemShorthand,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['inverted', 'blurring'])]),

  /** Modal displayed above the content in bold. */
  header: customPropTypes.itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: PropTypes.any,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Controls whether or not the Modal is displayed. */
  open: PropTypes.bool,

  /** A modal can vary in size */
  size: PropTypes.oneOf(['fullscreen', 'large', 'small']),

  /** Custom styles. */
  style: PropTypes.object

} : void 0;


export default Modal;