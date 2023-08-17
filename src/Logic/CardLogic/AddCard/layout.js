import React from "react";
import CardForm from "../CardForm";
import Navbar from "./Navbar";

function AddCard({ deck }) {
  return (
    <>
      <Navbar deck={deck}/>
      <h1>{deck.name}</h1>
      <h4>Add Card</h4>
      <CardForm deck={deck}/>
    </>
  );
}

export default AddCard; 