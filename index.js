const PORT = 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
// initalizing using express
// we save it as app (variable) so we can use it further on, use as we please
// we use crud with it app.

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
//this is what we need to write to get a message telling us everything is running fine

