const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const searcher = require("../searcher/search");
const port = 5432;

app.use(bodyParser.json());

app.get("/characters", (req, res) => {
    res.json(CHARAS_NAME_MAP);
});

app.get("/stories", (req, res) => {
    res.json(STORY_TYPES);
});

app.post("/search", async (req, res) => {
    res.json(await searcher(req.body));
})

app.listen(port, () => {console.log(`Server is listening on port ${port}`)});