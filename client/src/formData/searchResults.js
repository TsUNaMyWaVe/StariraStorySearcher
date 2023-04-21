import React from 'react';
import _ from 'lodash';

const SearchResults = ({searchResults}) => {
    const isSearching = _.get(searchResults, 'isSearching', false);
    const isCount = _.isUndefined(searchResults.count) ? false : true;
    const isSources = _.isUndefined(searchResults.sources) ? false : true;

    const generateSources = (sources) => {
        return sources.map((source, index) => {
            if (index === 0) {
                return <>{source}</>
            }
            return <><br/>{source}</>
        })
    }

    const generateSearchResults = () => {
        if (isSearching) {
            return <div className='innerResults'>
                <strong>Searching...</strong>
            </div>
        }
        if (isCount && isSources) {
            return (
                <div className='innerResults'>
                    <h2>Results</h2>
                    <strong><u>Count:</u> {searchResults.count}</strong><br/>
                    <strong><u>Sources:</u></strong><br/>
                    <strong>{generateSources(searchResults.sources)}</strong>
                </div>
            )
        } else if (isCount) {
            return <div className='innerResults'>
                <h2>Results</h2>
                <strong><u>Count:</u> {searchResults.count}</strong><br/>
            </div>
        } else if (isSources) {
            return <div className='innerResults'>
                <h2>Results</h2>
                <strong><u>Sources:</u></strong><br/>
                <strong>{generateSources(searchResults.sources)}</strong>
                </div>
        } else {
            return <></>
        }
    }

    return (
        <div className='search-result'>
            {generateSearchResults()}
        </div>
    )
}

export default SearchResults;