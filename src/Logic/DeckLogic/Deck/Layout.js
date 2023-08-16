//import the necessary packages

import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import View from "./View";
import StudyView from "../Study/layout";
import EditDeck from "../EditDeck/Layout";
import Cards from "../../CardLogic/layout";


function Deck(){
     //useRouteMatch returns a match object that contains all the information like how the current URL matched with the Route path.
    const {path} = useRouteMatch();

    return(
        <>
            <Switch>
                <Route exact path={`${path}`}>
                    <div className="row">
                        <View />
                    </div>
                </Route>
                <Route path={`${path}/study`}>
                    <StudyView/>
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck/>
                </Route>
                <Route path={`${path}/cards`}>
                    <Cards/>
                </Route>
            </Switch>
        </>
    );
}

export default Deck; 