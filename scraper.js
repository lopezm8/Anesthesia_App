const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://oxfordmedicaleducation.com/clinical-skills/procedures/endotracheal-tube/'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
});

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.pf-content').each((i,element) => { 
                const title = $(element).find('li').text()
                // assign extra elelemts here such as:
                // const url = $(element).find('a').attr('href')
                articles.push({
                    title 
                    // add additional elements, separated by a comma, such as: url
                })
                console.log(title)
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

