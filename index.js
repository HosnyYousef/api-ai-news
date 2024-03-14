const PORT = process.env.PORT || 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
// initalizing using express
// we save it as app (variable) so we can use it further on, use as we please
// we use crud with it app.

const newspapers = [
    {
        name: 'techcrunch',
        address: 'https://search.techcrunch.com/search;_ylt=AwrFNIURU.9lZ.kBfhWnBWVH;_ylc=X1MDMTE5NzgwMjkxOQRfcgMyBGZyA3RlY2hjcnVuY2gtcwRncHJpZAN3M3JWWnVLOVJuMnJXM0RmbWtJUW9BBG5fcnNsdAMwBG5fc3VnZwM5BG9yaWdpbgNzZWFyY2gudGVjaGNydW5jaC5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMwBHFzdHJsAzEwBHF1ZXJ5A2ZpbG1tYWtpbmcEdF9zdG1wAzE3MTAxODMxOTM-?p=filmmaking&fr2=sb-top&fr=techcrunch-s',
        base: ''
    },
    {
        name: 'theverge',
        address: 'https://www.theverge.com/search?q=filmmaking',
        base: ''
    },
    {
        name: 'nofilmschool',
        address: 'https://nofilmschool.com/search/?q=filmmaking',
        base: ''
    },
    {
        name: 'cnet',
        address: 'https://www.cnet.com/tech/',
        base: ''
    }
]


const articles = []


newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("film")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })

        })
})

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("filmmaking")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })

        })
})

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("ai+filmmaking")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })

        })
})


app.get('/', (req, res) => {
    res.json('Welcome to my AI Filmmaking news API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("filmmaking")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            $('a:contains("film")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
//this is what we need to write to get a message telling us everything is running fine

