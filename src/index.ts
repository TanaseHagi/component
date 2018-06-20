import * as React from 'react';
import { ReactNode } from 'react';

declare namespace StatefulComponent {

    export interface Props<State> {
        initialState?: State;
        UNSAFE_willMount?(comp: StatefulComponent<State>): void;
        willMount?(comp: StatefulComponent<State>): void;
        didMount?(comp: StatefulComponent<State>): void;
        UNSAFE_willReceiveProps?(comp: StatefulComponent<State>, next: { nextProps: Props<State>; nextState: State; }): boolean;
        willReceiveProps?(comp: StatefulComponent<State>, next: { nextProps: Props<State>; nextState: State; }): boolean;
        shouldUpdate?(comp: StatefulComponent<State>, next: { nextProps: Props<State>; nextState: State; }): boolean;
        UNSAFE_willUpdate?(comp: StatefulComponent<State>, next: { nextProps: Props<State>; nextState: State; }): boolean;
        willUpdate?(comp: StatefulComponent<State>, next: { nextProps: Props<State>; nextState: State; }): boolean;
        getSnapshot?(comp: StatefulComponent<State>, prev: { prevProps: Props<State>; prevState: State; }): void;
        didUpdate?(comp: StatefulComponent<State>, prev: { prevProps: Props<State>; prevState: State; }): void;
        willUnmount?(comp: StatefulComponent<State>): void;
        didCatch?(comp: StatefulComponent<State>, catched: { error: Error; errorInfo: React.ErrorInfo; }): void;
        renderError?(comp: StatefulComponent<State>, catched: { error?: Error; errorInfo?: React.ErrorInfo; }): ReactNode;
        children?: ReactNode | ((comp: StatefulComponent<State>) => React.ReactNode);
    }

}

export default class StatefulComponent<State> extends React.Component<StatefulComponent.Props<State>, State> {

    constructor(props: StatefulComponent.Props<State>) {
        super(props);
        this.state = this.props.initialState || {} as any;
    }

    UNSAFE_componentWillMount() {
        typeof this.props.UNSAFE_willMount === "function"
            && this.props.UNSAFE_willMount(this);
    }

    componentWillMount() {
        typeof this.props.willMount === "function"
            && this.props.willMount(this);
    }

    componentDidMount() {
        typeof this.props.didMount === 'function'
            && this.props.didMount(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps: StatefulComponent.Props<State>, nextState: State) {
        typeof this.props.UNSAFE_willReceiveProps === 'function'
            && this.props.UNSAFE_willReceiveProps(this, { nextProps, nextState });
    }

    componentWillReceiveProps(nextProps: StatefulComponent.Props<State>, nextState: State) {
        typeof this.props.willReceiveProps === 'function'
            && this.props.willReceiveProps(this, { nextProps, nextState });
    }

    shouldComponentUpdate(nextProps: StatefulComponent.Props<State>, nextState: State) {
        if (typeof this.props.shouldUpdate === 'function') {
            return this.props.shouldUpdate(this as any, { nextProps, nextState });
        }
        else { return true; }
    }

    UNSAFE_componentWillUpdate(nextProps: StatefulComponent.Props<State>, nextState: State) {
        typeof this.props.UNSAFE_willUpdate === 'function'
            && this.props.UNSAFE_willUpdate(this, { nextProps, nextState });
    }

    componentWillUpdate(nextProps: StatefulComponent.Props<State>, nextState: State) {
        typeof this.props.willUpdate === 'function'
            && this.props.willUpdate(this, { nextProps, nextState });
    }

    getSnapshotBeforeUpdate(prevProps: StatefulComponent.Props<State>, prevState: State) {
        if (typeof this.props.getSnapshot === 'function') {
            return this.props.getSnapshot(this as any, { prevProps, prevState })
        }
        return;
    }

    componentDidUpdate(prevProps: StatefulComponent.Props<State>, prevState: State) {
        typeof this.props.didUpdate === 'function'
            && this.props.didUpdate(this, { prevProps, prevState });
    }

    componentWillUnmount() {
        typeof this.props.willUnmount === "function"
            && this.props.willUnmount(this);
    }

    private error: Error | undefined;
    private errorInfo: React.ErrorInfo | undefined;

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (typeof this.props.renderError === "function") {
            this.error = error;
            this.errorInfo = errorInfo;
            this.forceUpdate();
        }
        typeof this.props.didCatch === "function"
            && this.props.didCatch(this, { error, errorInfo })
    }

    render() {
        const { error, errorInfo } = this;
        const { children } = this.props;
        if ((this.error != null || this.errorInfo != null) && typeof this.props.renderError === "function") {
            return this.props.renderError(this as any, { error , errorInfo });
        }
        return typeof children === 'function' ? children(this as any) : children
    }
}
