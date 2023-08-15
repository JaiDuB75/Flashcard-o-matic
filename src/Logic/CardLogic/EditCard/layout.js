import React from "react";
import CardForm from "../CardForm";

function EditCard({deck}){
    return (
        <>
            <h1>Edit Card</h1>
            <CardForm deck={deck}/> 
        </>

    );
}

export default EditCard; 