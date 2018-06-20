import * as React from 'react';
import Component from "./index";

const Test2 = () => (
    <>
        <Component
            initialState={{
                a: "",
                b: (a: string) => a.split(""),
            }}
            UNSAFE_willMount={(comp) => console.log("will mount", comp)}
            didMount={(comp) => comp.setState({ a: "3" })}
            shouldUpdate={(comp, { nextProps, nextState }) => true}
        >
            {comp => comp.state.a}
        </Component>
        <Component
            didCatch={(comp, { error, errorInfo }) => {
                // this.setState({ error, errorInfo })
            }}
            renderError={(comp, { error, errorInfo }) => <div>{error}</div>}
        >
            did not error
        </Component>
    </>
);
