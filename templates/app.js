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
                    const articleList = `<div><p>` + article.list + `</p></div` 
                    feedDisplay.insertAdjacentHTML("beforeend", articleItem, articleList)
                })
            })
            .catch(err => console.log(err))
        }
    }
    else {
        x.style.display = "none";
    };
    
}




