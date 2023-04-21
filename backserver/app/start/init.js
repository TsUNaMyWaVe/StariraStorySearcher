const mapCharactersNames = require('./mapCharactersNames');
const mapStoryTypes = require('./mapStoryTypes');

module.exports = async () => {
    global.KARTH_API_URL = 'https://karth.top/api/';
    global.CHARAS_NAME_MAP = await mapCharactersNames();
    global.STORY_TYPES = await mapStoryTypes();
};