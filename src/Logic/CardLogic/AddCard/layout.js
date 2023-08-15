import CardForm from "../CardForm";

function AddCard({ deck }) {
  return (
    <>
      <h1>{`Deck ${deck.name}: Add Card`}</h1>
      <CardForm deck={deck}/>
    </>
  );
}

export default AddCard; 