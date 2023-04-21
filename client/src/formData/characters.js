import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Charactrers = ({sendChosenChar}) => {
    const [characters, setCharacters] = useState([]);
    const [chosenChar, setChosenChar] = useState("None");

    useEffect(() => { fetchCharacterss(); }, []);
    const fetchCharacterss = () => {
        axios.get('/characters').then((res) => {
            console.log(res.data);
            setCharacters(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
            <select value={chosenChar} onChange={(e) => {
                setChosenChar(e.target.value);
                sendChosenChar(e.target.value);
            }}>
            {_.values(characters).map((char, index) => {
                return <option key={index} value={char}>{char}</option>
            })}
            </select>
    );
};
export default Charactrers;