let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function createMovieCard (result){
    const resultsContainer = document.querySelector(".results-container")
    const movieCard = document.createElement('card')
    const title = document.createElement('h3')
    title.innerText = result.title
    const image = document.createElement('img')
    image.src = result.image
    const watchBtn = document.createElement('button')
    watchBtn.innerText = "Add to Watch List!"
    const seenBtn = document.createElement('button')
    seenBtn.innerText = "Add to Movies You've Seen!"
    movieCard.append(title, image, watchBtn, seenBtn)
    resultsContainer.append(movieCard)
}

document.addEventListener("DOMContentLoaded", ()=>{
    fetchSearch()
})

function fetchSearch() {
  fetch('https://imdb-api.com/en/API/SearchMovie/k_fkl6yn80/inception 2010', requestOptions)  
    .then(response => response.json())
    .then(data => {console.log(data.results)
        data.results.forEach(result => {createMovieCard(result)})
    })
    .catch(error => console.log('error', error))
}


// {"searchType":"Movie","expression":"inception 2010","results":[{"id":"tt1375666","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg","title":"Inception","description":"(2010)"},

// {"id":"tt1790736","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_Ratio0.6800_AL_.jpg","title":"Inception: Motion Comics","description":"(2010 Video)"},

// {"id":"tt5295990","resultType":"Title","image":"https://imdb-api.com/images/original/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_Ratio0.6800_AL_.jpg","title":"Inception: Jump Right Into the Action","description":"(2010 Video)"},

// {"id":"tt1686778","resultType":"Title","image":"https://imdb-api.com/images/original/nopicture.jpg","title":"Inception: 4Movie Premiere Special","description":"(2010 TV Movie)"},

// {"id":"tt12960252","resultType":"Title","image":"https://imdb-api.com/images/original/nopicture.jpg","title":"Inception Premiere","description":"(2010)"}

// ],"errorMessage":""}