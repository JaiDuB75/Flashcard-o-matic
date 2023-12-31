import React, {useState, useEffect} from "react";
import {Switch, Route, useRouteMatch, useParams} from "react-router-dom";
import AddCard from "./AddCard/layout";
import EditCard from "./EditCard/layout";
import { readDeck } from "../../utils/api"; //Provided for me

function Cards() {
  const {path} = useRouteMatch();
  const {deckId} = useParams();

  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck(); 
  }, [deckId])

  if (!deck) return null;
  return (
    <>
      <Switch>
        <Route exact path={`${path}/new`}>
          <AddCard deck={deck} />
        </Route>
        <Route path={`${path}/:cardId/edit`}>
          <EditCard deck={deck} />
        </Route>
      </Switch>
    </>
  )
}

export default Cards;