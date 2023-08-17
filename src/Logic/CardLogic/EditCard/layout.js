import React from "react";
import CardForm from "../CardForm";
import Navbar from "./Navbar";

function EditCard({deck}){
    return (
        <>
            <Navbar deck={deck}/>
            <h1>Edit Card</h1>
            <CardForm deck={deck}/> 
        </>

    );
}

export default EditCard; 