import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stories = ({sendStoriesToParent}) => {
    const [storyTypes, setStoryTypes] = useState([]);
    const [stories, setStories] = useState([]);
    useEffect(() => { fetchStories(); }, []);
    const fetchStories = () => {
        axios.get('/stories').then((res) => {
            console.log(res.data);
            setStoryTypes(res.data);
            setStories(new Array(res.data.length).fill(false));
        }).catch((err) => {
            console.log(err);
        });
    };

    const [storiesToSend, setStoriesToSend] = useState ([]);

    const handleStoriesSelect = function(position) {
        const updatedCheckedState = stories.map((item, index) =>
          (index === position) ? !item : item
        );
        setStories(updatedCheckedState);

        let storiesToSendUpdated = [];
        updatedCheckedState.forEach((currentState, index) => {
            if (currentState) {
                storiesToSendUpdated.push(storyTypes[index].value);
            }
        })
        setStoriesToSend(storiesToSendUpdated);
        sendStoriesToParent(storiesToSendUpdated);
    }
    
    return (
        <div className='storyTypes'>
        {storyTypes.map(({ text, value }, index) => {
            return (
                <li key={index}>
                    <input
                        type="checkbox"
                        name={text}
                        value={value}
                        checked={stories[index]}
                        onChange={() => handleStoriesSelect(index)}
                    />
                    <label for={text}>{text}</label>
                </li>
            );
        })}
        </div>
    );
};
export default Stories;