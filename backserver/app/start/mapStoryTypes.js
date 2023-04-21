const _ = require("lodash");
const axios = require('axios');

module.exports = async () => {
    return await axios({
        method: 'get',
        url: `${KARTH_API_URL}adventure.json`,
    }).then(function (response) {
        let data = [];
        _.mapKeys(response.data, (value, key) => {
            switch(key) {
                case 'academy_story':
                    data.push({value: key, text: "Schools Stories"});
                    break;
                case 'bond_dress_story':
                    data.push({value: key, text: "Bond Stories"});
                    break;
                case 'event_story':
                    data.push({value: key, text: "Events Stories"});
                    break;
                case 'main_story':
                    data.push({value: key, text: "Main Story"});
                    break;
                case 'present_dress_story':
                    data.push({value: key, text: "Theater Presents Stories"});
                    break;
                case 'theater_story':
                    data.push({value: key, text: "Theater Stories"});
                    break;
            }
        });
        return data;
    });
}