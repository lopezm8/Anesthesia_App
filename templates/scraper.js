const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.ucsfhealth.org/medical-tests/endotracheal-intubation'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
});

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            const listelem = []

            $('p').each((i,element) => { 
                const title = $(element).text().split("       \n")[0]
                // assign extra elelemts here such as:
                // const url = $(element).find('a').attr('href')
                articles.push({
                    title 
                    // add additional elements, separated by a comma, such as: url
                })
            
            })
            $('ul').each((i,element) => { 
                const title = $(element).find('li').text().split("       \n")[0]
                // assign extra elelemts here such as:
                // const url = $(element).find('a').attr('href')
                articles.push({
                    title
                    // add additional elements, separated by a comma, such as: url
                })
            
            })
            articles[0] = listelem[8]
            console.log(articles[29], articles[34], articles[54])
            answer = [(articles[29]), (articles[34]), articles[54]]
            res.json(answer)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

