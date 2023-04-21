const _ = require("lodash");
const axios = require('axios');

const getStoriesIds = async (storiesToSearchIn) => {
    let storiesIds = {};
    await axios({
        method: 'get',
        url: `${KARTH_API_URL}adventure.json`,
    }).then(function (response) {
        response = response.data;
        _.keys(response).map(key => {
            if (storiesToSearchIn.includes(key)) {
                storiesIds = {
                    ...storiesIds,
                    ...response[key]
                }
            }
        })
    }).catch(error => {
        console.log(error)
    });
    return storiesIds;
}

const searchInStory = async (storyId, phrase, lang, speakingChar) => {
    const langPath = lang === 'jp' ? 'jp' : 'ww';
    const isLimitChara = speakingChar != "None";
    let count = 0;
    let source = storyId;

    await axios({
        method: 'get',
        url: `${KARTH_API_URL}adventure/${langPath}/${storyId}.json`,
    }).then(function (response) {
        response = response.data.script;
        const storyKeys = _.keys(response);
        storyKeys.forEach(key => {
            const body = lang === 'jp' ? _.get(response[key], 'args.body') :  _.get(response[key], `args.body.${lang}`);
            if (body) {
                if (body.includes(phrase)) {
                    if (isLimitChara) {
                        const charaNameId = _.get(response[key], 'args.nameId');
                        if (CHARAS_NAME_MAP[charaNameId] === speakingChar) {
                            count++;
                        }
                    } else {
                        count++;
                    }
                }
            }
        })
    }).catch(error => {
        console.log(error)
    });

    if (count === 0) {
        source = undefined;
    }

    return {
        count,
        source
    }

}

const getSourcesName = (sources, storiesIdsToSearchIn) => {
    let sourcesNames = [];
    sources.forEach(source => {
        const titleBody = _.get(storiesIdsToSearchIn[source], 'title');
        _.get(titleBody, 'en') ? sourcesNames.push(_.get(titleBody, 'en')) : sourcesNames.push(_.get(titleBody, 'ja'))
    });

    return sourcesNames;
}

module.exports = {
    getStoriesIds,
    searchInStory,
    getSourcesName,
}