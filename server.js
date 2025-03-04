const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { JSDOM } = require("jsdom");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/test-selector", (req, res) => {
    try {
        const { html, selector } = req.body;

        if (!html || !selector) {
            return res.status(400).json({ error: "Missing HTML or selector input." });
        }

        const dom = new JSDOM(html);
        const document = dom.window.document;
        const elements = Array.from(document.querySelectorAll(selector)).map(el => el.outerHTML);

        res.json({ elements });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));


