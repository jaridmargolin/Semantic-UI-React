'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _invoke2 = require('lodash/invoke');

var _invoke3 = _interopRequireDefault(_invoke2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Visibility provides a set of callbacks for when a content appears in the viewport.
 */
var Visibility = function (_Component) {
  (0, _inherits3.default)(Visibility, _Component);

  function Visibility() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Visibility);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Visibility.__proto__ || Object.getPrototypeOf(Visibility)).call.apply(_ref, [this].concat(args))), _this), _this.calculations = {
      topPassed: false,
      bottomPassed: false,
      topVisible: false,
      bottomVisible: false,
      fits: false,
      passing: false,
      onScreen: false,
      offScreen: false
    }, _this.firedCallbacks = [], _this.execute = function (callback, name) {
      var _this$props = _this.props,
          continuous = _this$props.continuous,
          once = _this$props.once;


      if (!callback) return;
      // Reverse callbacks aren't fired continuously
      if (_this.calculations[name] === false) return;

      // Always fire callback if continuous = true
      if (continuous) {
        callback(null, (0, _extends3.default)({}, _this.props, { calculations: _this.calculations }));
        return;
      }

      // If once = true, fire callback only if it wasn't fired before
      if (once) {
        if (!(0, _includes3.default)(_this.firedCallbacks, name)) {
          _this.firedCallbacks.push(name);
          callback(null, (0, _extends3.default)({}, _this.props, { calculations: _this.calculations }));
        }

        return;
      }

      // Fire callback only if the value changed
      if (_this.calculations[name] !== _this.oldCalculations[name]) {
        callback(null, (0, _extends3.default)({}, _this.props, { calculations: _this.calculations }));
      }
    }, _this.fireOnPassed = function () {
      var _this$calculations = _this.calculations,
          percentagePassed = _this$calculations.percentagePassed,
          pixelsPassed = _this$calculations.pixelsPassed;
      var onPassed = _this.props.onPassed;


      (0, _forEach3.default)(onPassed, function (callback, passed) {
        var pixelsValue = Number(passed);

        if (pixelsValue && pixelsPassed >= pixelsValue) {
          _this.execute(callback, passed);
          return;
        }

        var matchPercentage = ('' + passed).match(/^(\d+)%$/);
        if (!matchPercentage) return;

        var percentageValue = Number(matchPercentage[1]) / 100;
        if (percentagePassed >= percentageValue) _this.execute(callback, passed);
      });
    }, _this.handleRef = function (c) {
      return _this.ref = c;
    }, _this.handleScroll = function () {
      var _this$ref$getBounding = _this.ref.getBoundingClientRect(),
          bottom = _this$ref$getBounding.bottom,
          height = _this$ref$getBounding.height,
          top = _this$ref$getBounding.top,
          width = _this$ref$getBounding.width;

      var topPassed = top < 0;
      var bottomPassed = bottom < 0;

      var pixelsPassed = bottomPassed ? 0 : Math.max(top * -1, 0);
      var percentagePassed = pixelsPassed / height;

      var bottomVisible = bottom >= 0 && bottom <= window.innerHeight;
      var topVisible = top >= 0 && top <= window.innerHeight;

      var fits = topVisible && bottomVisible;
      var passing = topPassed && !bottomPassed;

      var onScreen = (topVisible || topPassed) && !bottomPassed;
      var offScreen = !onScreen;

      _this.oldCalculations = _this.calculations;
      _this.calculations = {
        bottomPassed: bottomPassed,
        bottomVisible: bottomVisible,
        fits: fits,
        height: height,
        passing: passing,
        percentagePassed: percentagePassed,
        pixelsPassed: pixelsPassed,
        offScreen: offScreen,
        onScreen: onScreen,
        topPassed: topPassed,
        topVisible: topVisible,
        width: width
      };

      _this.fireCallbacks();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Visibility, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var continuous = _ref2.continuous,
          once = _ref2.once;

      var cleanOut = continuous !== this.props.continuous || once !== this.props.once;
      if (cleanOut) this.firedCallbacks = [];
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'fireCallbacks',
    value: function fireCallbacks() {
      var _this2 = this;

      var _props = this.props,
          onBottomPassed = _props.onBottomPassed,
          onBottomPassedReverse = _props.onBottomPassedReverse,
          onBottomVisible = _props.onBottomVisible,
          onBottomVisibleReverse = _props.onBottomVisibleReverse,
          onPassing = _props.onPassing,
          onPassingReverse = _props.onPassingReverse,
          onTopPassed = _props.onTopPassed,
          onTopPassedReverse = _props.onTopPassedReverse,
          onTopVisible = _props.onTopVisible,
          onTopVisibleReverse = _props.onTopVisibleReverse,
          onOffScreen = _props.onOffScreen,
          onOnScreen = _props.onOnScreen;

      var callbacks = {
        bottomPassed: onBottomPassed,
        bottomVisible: onBottomVisible,
        passing: onPassing,
        offScreen: onOffScreen,
        onScreen: onOnScreen,
        topPassed: onTopPassed,
        topVisible: onTopVisible
      };
      var reverse = {
        bottomPassed: onBottomPassedReverse,
        bottomVisible: onBottomVisibleReverse,
        passing: onPassingReverse,
        topPassed: onTopPassedReverse,
        topVisible: onTopVisibleReverse
      };

      (0, _invoke3.default)(this.props, 'onUpdate', null, (0, _extends3.default)({}, this.props, { calculations: this.calculations }));
      this.fireOnPassed();

      (0, _forEach3.default)(callbacks, function (callback, name) {
        return _this2.execute(callback, name);
      });
      (0, _forEach3.default)(reverse, function (callback, name) {
        return _this2.execute(callback, name);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      var ElementType = (0, _lib.getElementType)(Visibility, this.props);
      var rest = (0, _lib.getUnhandledProps)(Visibility, this.props);

      return _react2.default.createElement(
        ElementType,
        (0, _extends3.default)({}, rest, { ref: this.handleRef }),
        children
      );
    }
  }]);
  return Visibility;
}(_react.Component);

Visibility.defaultProps = {
  continuous: false,
  once: true
};
Visibility._meta = {
  name: 'Visibility',
  type: _lib.META.TYPES.BEHAVIOR
};
Visibility.handledProps = ['as', 'children', 'continuous', 'onBottomPassed', 'onBottomPassedReverse', 'onBottomVisible', 'onBottomVisibleReverse', 'onOffScreen', 'onOnScreen', 'onPassed', 'onPassing', 'onPassingReverse', 'onTopPassed', 'onTopPassedReverse', 'onTopVisible', 'onTopVisibleReverse', 'onUpdate', 'once'];
exports.default = Visibility;
process.env.NODE_ENV !== "production" ? Visibility.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes2.default.node,

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous: _propTypes2.default.bool,

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed: _propTypes2.default.func,

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse: _propTypes2.default.func,

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible: _propTypes2.default.func,

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse: _propTypes2.default.func,

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once: _propTypes2.default.bool,

  /** Element is not visible on the screen. */
  onPassed: _propTypes2.default.object,

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing: _propTypes2.default.func,

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse: _propTypes2.default.func,

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen: _propTypes2.default.func,

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen: _propTypes2.default.func,

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed: _propTypes2.default.func,

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse: _propTypes2.default.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible: _propTypes2.default.func,

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse: _propTypes2.default.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate: _propTypes2.default.func
} : void 0;