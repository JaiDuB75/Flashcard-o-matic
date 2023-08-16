import React from "react";
import CardForm from "../CardForm";

function AddCard({ deck }) {
  return (
    <>
      <h1>{deck.name}</h1>
      <h4>Add Card</h4>
      <CardForm deck={deck}/>
    </>
  );
}

export default AddCard; 