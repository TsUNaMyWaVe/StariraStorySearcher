const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const searcher = require("../searcher/search");
const port = 3000;
const routePath = "app/route";

app.use(express.static(path.join((__dirname).substring(0, __dirname.length-routePath.length) + 'public')))

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