const PORT = process.env.PORT || 8000;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Initialize using express

const newspapers = [
    // Your newspapers array
];

let articles = [];

// Function to scrape articles
async function scrapeArticles() {
    // Combine scraping logic here
}

// Routes...

app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId;
    const newspaper = newspapers.find(newspaper => newspaper.name == newspaperId);

    if (!newspaper) {
        return res.status(404).json({ error: "Newspaper not found" });
    }

    const { address: newspaperAddress, base: newspaperBase } = newspaper;

    try {
        const response = await axios.get(newspaperAddress);
        const html = response.data;
        const $ = cheerio.load(html);
        const specificArticles = [];

        $('a:contains("filmmaking"),a:contains("film")', html).each(function () {
            const title = $(this).text();
            let url = $(this).attr('href');
            url = url.startsWith('http') ? url : `${newspaperBase}${url}`;
            specificArticles.push({ title, url, source: newspaperId });
        });

        res.json(specificArticles);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
