import "./FavoriteView.css";
import React, {useState, useEffect} from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebase";

const FavoriteView = () => {

    return (
        <div>
            <h1>Favorite View</h1>
        </div>
    );
};

export default FavoriteView;