const _ = require("lodash");
const helpers = require('./helpers');
const generalHelper = require('../general/generalHelper');

module.exports = async (request) => {
    let shouldCount = _.get(request, 'options', []).includes("count");
    let shouldReturnSource = _.get(request, 'options', []).includes("source");

    let count = 0;
    let sources = [];

    let speakingChara = _.get(request, 'limitTo', false);
    const storiesIdsToSearchIn = await helpers.getStoriesIds(_.get(request, 'stories', []));
    const storiesIds = _.keys(storiesIdsToSearchIn);
    for(let i = 0; i < storiesIds.length; i++) {
        console.log(`Searching in ${storiesIds[i]}...`)
        const results = await helpers.searchInStory(storiesIds[i], _.get(request, 'phrase', ''), _.get(request, 'lang', 'en'), speakingChara);
        count = count + results.count
        if (results.source)
            sources.push(results.source);
        await generalHelper.sleep(0.01);
    }

    let response = {};
    if (shouldCount) {
        response = {
            ...response,
            count
        };
    }
    if (shouldReturnSource) {
        sources = helpers.getSourcesName(sources, storiesIdsToSearchIn)
        response = {
            ...response,
            sources
        };
    }
    return response;
}