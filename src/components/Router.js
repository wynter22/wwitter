import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default() => {
    const [isLoggedIn, setIsLoggedIn] =useState();
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact path="/">
                    <Home />
                </Route>
                </>  
                ): (
                <Route path="/"><Auth /></Route>
                )}
            </Switch>
        </Router>
    )
}