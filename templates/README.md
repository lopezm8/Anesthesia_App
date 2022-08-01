# Anesthesia_App
Application website that offers multiple options for healthcare providers in the field of anesthesia


## Web Scraping Microservice 
The microservice utilized in this project incorporates the Axios and Cheerio modules to extract specific components from any given website. Below I will describe the code utilized and how you too may implement your own web scraping capabilities. 


### Web Scraping UML Sequence Diagram
<img width="872" alt="ML UML Diagram Anesthesia App" src="https://user-images.githubusercontent.com/86086710/180669308-7086c610-b6a8-4eaf-a275-f3933cb8cd5b.PNG">
Before getting into the code, I will utilize a UML Sequence Diagram to best explain how this microservice works. The user initiates the call to the website, AnesthesiaApp by clicking on a "Detailed Description" button displayed in the endotracheal tube page. The website will then make a call to the "myfunction" function to call on the Axios module. Axios will have the hyperlink to the specific page we'd like to scrape saved in its code as provided by the developer, and gather all the HTML. We will then use Cheerio, another NPM module, to parse out the specific attribute and text we want to return to the website. This data is returned and the user will have received the detailed description of the endotracheal tube from the Oxford Medical Education website without having to navigate to that website on their own - all with the help of a microservice. 

### Web Scraping Code and how you can implement Web Scraping utilizing Axios and Cheerio

#### Requesting Data
This is my web scraper file: `scraper.js`
You will specify the webpage you will be scraping with the url constant on line passing it as a string, here my link is: https://oxfordmedicaleducation.com/clinical-skills/procedures/endotracheal-tube/ 
Next, under the second app.get command, you will specify the class or id where the text you want scraped is located. 
In this file, the class I'm searching for is called pf-content (note that to signify class, we prefix a dot, and for id we prefix with a pound sign, #) it's read as: <br> 
$('.pf-content')
You're then going to go into the url constant: <br>
const title = $(element).find('li').text() <br>
Here you'll specify where the text is located, within which attribute (e.g. ul, li, p) and include it as an argument within the find function. All of your text will be saved in an artciles array and then returned to the website as a json-like response. 

```
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


```

You'll then include the function call to be called through your html page by clicking on a button or link using the following code (note: we are mainly focusing on the onclick="myfunction()" call which will call the app.js file described shortly: 

```
<a id="detailButton" class="btn btn-theme" onclick="myfunction()"> Detailed Description </a> 
```

#### Receiving Data: 
The app.js file will then call the function to request our data:

```
const feedDisplay = document.querySelector('#feed')
var x = document.getElementById("feed");
x.style.display = "none"
n = 0

function myfunction() {
    if (x.style.display === "none") {
        x.style.display = "block";
        if (n == 0) {
            n += 1
            fetch('http://localhost:8000/results')
            .then(response => {return response.json()})
            .then(data => {
                data.forEach(article => {
                    const articleItem = `<div><p>` + article.title + `</p></div>`
                    feedDisplay.insertAdjacentHTML("beforeend", articleItem)
                })
            })
            .catch(err => console.log(err))
        }
    }
    else {
        x.style.display = "none";
    };
    
}
```
This app.js file also has the functionality of showing and hiding our scraped data with clicking of the details button. 

#### Web Scraping Visualized
Here is what it looks like in the end: 

Before clicking on the "Detailed Description" button: 
![Screen Shot 2022-07-24 at 4 19 49 PM](https://user-images.githubusercontent.com/86086710/180669909-a7267e5a-2aaf-4593-b541-bf3b87da19a7.png)

After clicking on the "Detailed Description" button: 
![Screen Shot 2022-07-24 at 4 20 03 PM](https://user-images.githubusercontent.com/86086710/180669929-73321b1a-3196-469b-a662-a6be54618f47.png)




