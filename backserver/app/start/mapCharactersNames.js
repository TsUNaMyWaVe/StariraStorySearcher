const _ = require("lodash");
const axios = require('axios');

module.exports = async () => {
    let needToFetchName = [];
    let charaData = await axios({
        method: 'get',
        url: `${KARTH_API_URL}chara.json`,
    }).then(function (response) {
        let data = {'000': 'None'};
        _.mapKeys(response.data, (value, key) => {
            const name =  _.get(value, 'basicInfo.name_ruby.ja');
            if (name) {
                data[key] = _.get(value, 'basicInfo.name_ruby.ja');
            } else {
                needToFetchName.push(key);
            }
        });
        return data;
    }).catch(error => {
        console.log(error);
    });
    await Promise.all(needToFetchName.map(async charaId => {
        await axios({
            method: 'get',
            url: `${KARTH_API_URL}chara/${charaId}.json`,
        }).then(response => {
            const name = _.get(response.data, 'info.name.en');
            if (name) {
                charaData[charaId] = name;
            }
        });
    }));
    return charaData;
}
