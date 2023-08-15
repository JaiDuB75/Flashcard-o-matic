//import the necessary packages

import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import View from "./View";
import StudyView from "../Study/layout";
import EditDeck from "../EditDeck/Layout";
import Cards from "../../CardLogic/layout";


function Deck(){
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