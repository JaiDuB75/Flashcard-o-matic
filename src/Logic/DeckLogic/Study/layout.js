//import the necessary packages

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import DisplayCard from "./DisplayCard";
import Navbar from "./Navbar";

function StudyView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  if (!deck) return null;

  return (
    <>
      <Navbar deck={deck}/>
      <h1 style={{ textAlign: "center" }}>{deck.name}</h1>
      <DisplayCard deck={deck} />
    </>
  );
}

export default StudyView;
