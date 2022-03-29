// Bianca, Santiago

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function selectForm (){
    const form = document.querySelector("#search-movies")
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        const movie = (e.target[0].value)
        e.target[0].value = ""
        fetchSearch(movie)
    })
}

function fetchSearch(movie) {
  fetch(`https://imdb-api.com/en/API/SearchMovie/k_fkl6yn80/${movie}`, requestOptions)  
    .then(response => response.json())
    .then(data => {data.results.forEach(
        result => {createMovieCard(result)
        })
    })
    .catch(error => console.log('error', error))
}

function createMovieCard (result){
    const resultsContainer = document.querySelector(".results-container")
    const movieCard = document.createElement('card')
    const title = document.createElement('h2')
    title.innerText = result.title
    const image = document.createElement('img')
    image.src = result.image
    image.className = "image"
    const watchBtn = document.createElement('button')
    watchBtn.innerText = "Add to Watch List!"
    watchBtn.addEventListener("click", () => {addToWatchList(result)})
    const seenBtn = document.createElement('button')
    seenBtn.innerText = "Add to Movies You've Seen!"
    seenBtn.addEventListener("click", () => {addtoSeenList(result)})
    movieCard.append(title, image, watchBtn, seenBtn)
    resultsContainer.append(movieCard)
}

function handleRemove (){
    removeBtn.previousSibling.remove()
    removeBtn.remove()
}

function addToWatchList (result){
    const watchList = document.querySelector(".watch")
    const addWatch = document.createElement("li")
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    removeBtn.addEventListener("click", handleRemove)
    addWatch.innerText = result.title
    watchList.append(addWatch, removeBtn)
}
function addtoSeenList (result){
    const seenList = document.querySelector(".seen")
    const addSeen = document.createElement("li")
    const removeBtn = document.createElement("button")
    const reviewBtn = document.createElement("button")
    // When button is clicked, add a form with an input and a submit button -- this value should append to the current li as a reivew
    // reviewBtn.innerText = "Add a Reivew!"
    // const review = document.createElement("input")
    // reviewBtn.addEventListener("click", function (e){
    //     console.log(e.target.input[1].value)
    //     addSeen.append(review)
    // })
    // reviewBtn.append(review)
    removeBtn.innerText = "Delete this movie!"
    removeBtn.addEventListener("click", handleRemove)
    addSeen.innerText = result.title
    addSeen.append(reviewBtn)
    seenList.append(addSeen, removeBtn)
}


document.addEventListener("DOMContentLoaded", ()=>{
    selectForm()
})


// {"searchType":"Movie","expression":"inception 2010","results":[{"id":"tt1375666","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg","title":"Inception","description":"(2010)"},

// {"id":"tt1790736","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_Ratio0.6800_AL_.jpg","title":"Inception: Motion Comics","description":"(2010 Video)"},

// {"id":"tt5295990","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_Ratio0.6800_AL_.jpg","title":"Inception: Jump Right Into the Action","description":"(2010 Video)"},

// {"id":"tt1686778","resultType":"Title","image":"https://imdb-api.com/images/original/nopicture.jpg","title":"Inception: 4Movie Premiere Special","description":"(2010 TV Movie)"},

// {"id":"tt12960252","resultType":"Title","image":"https://imdb-api.com/images/original/nopicture.jpg","title":"Inception Premiere","description":"(2010)"}

// ],"errorMessage":""}