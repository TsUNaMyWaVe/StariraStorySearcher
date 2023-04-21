import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Charactrers from './formData/characters';
import StoryTypes from './formData/stories';
import SearchResults from './formData/searchResults';
import './App.css';

function App() {
  const [phrase, setPhrase] = useState("");
  const [lang, setLang] = useState("en");
  const [limitTo, setLimitTo] = useState("000");
  const [stories, setStories] = useState([]);
  const [options, setOptions] = useState(["count"]);
  const [searchResults, setSearchResults] = useState({});

  const sendStoriesToParent = (stories) => {
    setStories(stories);
  }

  const sendChosenChar = (char) => {
    setLimitTo(char);
  }

  let handleSubmit = async (e) => {
    setSearchResults({isSearching: true});
    e.preventDefault();
    try {
      const body = JSON.stringify({
        phrase,
        lang,
        limitTo,
        stories,
        options
      });
      const postOptions = {
        headers: {"content-type": "application/json"}
      }
      let res = await axios.post("/search", body, postOptions);
      if (res.status === 200) {
        setSearchResults(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='View'>
      <div className='BannerParent'>
      <div className='Banner'>
        <h1>Starira Story Searcher</h1>
      </div></div>
      <div className='AppParent'>
      <div className='App'>
        <form onSubmit={handleSubmit}>
          <label className='mainLabel'>Search for</label>
            <input
              type="text"
              value={phrase}
              placeholder="Phrase"
              onChange={(e) => setPhrase(e.target.value)}
            />
          <br/>
          <label className='mainLabel'>Language</label> 
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="jp">Japanese</option>
            </select>
          <br/>
          <label className='mainLabel'>Limit speaking character to</label> 
          <Charactrers sendChosenChar={sendChosenChar}/>
          <br/>
          <label className='mainLabel'>Search in</label>
          <StoryTypes sendStoriesToParent={sendStoriesToParent}/>
          <label className='mainLabel'>Show results for</label>
          <select value={options} onChange={(e) => setOptions(e.target.value)}>
            <option value={["count"]}>Count</option>
            <option value={["source"]}>Sources</option>
            <option value={["count", "source"]}>Both</option>
          </select>
          <br/>
          <strong>Note:</strong> The more story types you check, the longer the search will take. Please be patient.
          <br/>
          <br/>
          <button className='NavButton' type="submit">Search</button>

          <SearchResults searchResults={searchResults}/>
        </form>
      </div>
      </div>
      <div className='Footer'>
        <h3>Created by <a href="https://twitter.com/TsUNaMy_WaVe" target='_blank'>TsUNaMy WaVe</a>, using <a href="https://karth.top/" target='_blank'>Karth</a>'s API.</h3>
      </div>
    </div>
  );
}

export default App;
