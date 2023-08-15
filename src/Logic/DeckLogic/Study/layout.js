//import the necessary packages

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import DisplayCard from "./DisplayCard";

function StudyView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

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
      <h1 style={{ textAlign: "center" }}>{`Studying: ${deck.name}`}</h1>
      <DisplayCard deck={deck} />
    </>
  );
}

export default StudyView;
