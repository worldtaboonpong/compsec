import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const WithoutLoginRoute = ({ component: Component, ...rest }) => {
    let token = localStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={(props) => {
                if (token) {
                    return <Redirect to="/" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};
