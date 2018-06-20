"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var StatefulComponent = /** @class */ (function (_super) {
    __extends(StatefulComponent, _super);
    function StatefulComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.props.initialState || {};
        return _this;
    }
    StatefulComponent.prototype.UNSAFE_componentWillMount = function () {
        typeof this.props.UNSAFE_willMount === "function"
            && this.props.UNSAFE_willMount(this);
    };
    StatefulComponent.prototype.componentWillMount = function () {
        typeof this.props.willMount === "function"
            && this.props.willMount(this);
    };
    StatefulComponent.prototype.componentDidMount = function () {
        typeof this.props.didMount === 'function'
            && this.props.didMount(this);
    };
    StatefulComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextState) {
        typeof this.props.UNSAFE_willReceiveProps === 'function'
            && this.props.UNSAFE_willReceiveProps(this, { nextProps: nextProps, nextState: nextState });
    };
    StatefulComponent.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        typeof this.props.willReceiveProps === 'function'
            && this.props.willReceiveProps(this, { nextProps: nextProps, nextState: nextState });
    };
    StatefulComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (typeof this.props.shouldUpdate === 'function') {
            return this.props.shouldUpdate(this, { nextProps: nextProps, nextState: nextState });
        }
        else {
            return true;
        }
    };
    StatefulComponent.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        typeof this.props.UNSAFE_willUpdate === 'function'
            && this.props.UNSAFE_willUpdate(this, { nextProps: nextProps, nextState: nextState });
    };
    StatefulComponent.prototype.componentWillUpdate = function (nextProps, nextState) {
        typeof this.props.willUpdate === 'function'
            && this.props.willUpdate(this, { nextProps: nextProps, nextState: nextState });
    };
    StatefulComponent.prototype.getSnapshotBeforeUpdate = function (prevProps, prevState) {
        if (typeof this.props.getSnapshot === 'function') {
            return this.props.getSnapshot(this, { prevProps: prevProps, prevState: prevState });
        }
        return;
    };
    StatefulComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        typeof this.props.didUpdate === 'function'
            && this.props.didUpdate(this, { prevProps: prevProps, prevState: prevState });
    };
    StatefulComponent.prototype.componentWillUnmount = function () {
        typeof this.props.willUnmount === "function"
            && this.props.willUnmount(this);
    };
    StatefulComponent.prototype.componentDidCatch = function (error, errorInfo) {
        if (typeof this.props.renderError === "function") {
            this.error = error;
            this.errorInfo = errorInfo;
            this.forceUpdate();
        }
        typeof this.props.didCatch === "function"
            && this.props.didCatch(this, { error: error, errorInfo: errorInfo });
    };
    StatefulComponent.prototype.render = function () {
        var _a = this, error = _a.error, errorInfo = _a.errorInfo;
        var children = this.props.children;
        if ((this.error != null || this.errorInfo != null) && typeof this.props.renderError === "function") {
            return this.props.renderError(this, { error: error, errorInfo: errorInfo });
        }
        return typeof children === 'function' ? children(this) : children;
    };
    return StatefulComponent;
}(React.Component));
exports["default"] = StatefulComponent;
