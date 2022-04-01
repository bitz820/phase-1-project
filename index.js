// API Key Req
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// On DOMContentLoaded Fetch Watched List
function fetchWatch() {
    fetch("http://localhost:3000/toWatch")
        .then(resp => resp.json())
        .then(movie => renderWatchList(movie))
}

// On DOMContentLoaded Fetch Seen List
function fetchSeen() {
    fetch("http://localhost:3000/seen")
        .then(resp => resp.json())
        .then(movie => renderSeenList(movie))
}

// Fetch Searched Title
function fetchSearch(movie) {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_fkl6yn80/${movie}`, requestOptions)
        .then(response => response.json())
        .then(data => { data.results.forEach(result => createMovieCard(result)) })
        .catch(error => console.log('error', error))
}

// Select Search Form
function selectForm() {
    const form = document.querySelector("#search-movies")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const movie = (e.target[0].value)
        e.target[0].value = ""
        fetchSearch(movie)
    })
}

// Clear Seach Results
function clearSearchResults() {
    const button = document.querySelector('.reset')
    button.addEventListener("click", () => {
        const resultsContainer = document.querySelector(".results-container")
        resultsContainer.innerText = ""
        const title = document.createElement("h1")
        title.innerText = "Results Returned:"
        resultsContainer.append(title)
    })
}

// Create Movie Card
function createMovieCard(result) {
    const resultsContainer = document.querySelector(".results-container")
    // resultsContainer.innerText = ""
    const movieCard = document.createElement('card')
    movieCard.className = "movieCard"
    const title = document.createElement('h1')
    title.innerText = `Title: ${result.title}`
    const image = document.createElement('img')
    if (result.image === 'https://imdb-api.com/images/original/nopicture.jpg') {
        image.src = 'https://c.tenor.com/ysAaYYul2DUAAAAM/waiting-skeleton.gif'
    } else { image.src = result.image }
    image.className = "image"
    const btnDiv = document.createElement("div")
    btnDiv.className = "btnDivStyle"
    const watchBtn = document.createElement('button')
    watchBtn.innerText = "Add to Watch List!"
    watchBtn.addEventListener("click", () => postToWatchList(result))
    const seenBtn = document.createElement('button')
    seenBtn.innerText = "Add to Movies You've Seen!"
    seenBtn.addEventListener("click", () => postToSeenList(result))
    btnDiv.append(watchBtn, seenBtn)
    movieCard.append(title, image, btnDiv)
    resultsContainer.append(movieCard)
}

// FETCH Watch Movies
function renderWatchList(result) {
    fetch("http://localhost:3000/toWatch")
        .then(resp => resp.json())
        .then(movies => movies.forEach(movie => {
            console.log(movie)
            const watchList = document.querySelector(".watch")
            const addWatch = document.createElement("li")
            addWatch.innerText = movie.title
            const removeBtn = document.createElement("button")
            removeBtn.innerText = "Delete this movie!"
            const br = document.createElement("br")
            removeBtn.addEventListener("click", () => handleWatchRemove(addWatch, movie, removeBtn))
            addWatch.append(br, removeBtn)
            watchList.append(addWatch)
        })
        )
}

// Fetch Seen Movies
function renderSeenList(result) {
    fetch("http://localhost:3000/seen")
        .then(resp => resp.json())
        .then(movies => movies.forEach(movie => {
            console.log(movie)
            const seenList = document.querySelector(".seen")
            const addSeen = document.createElement("li")
            addSeen.innerText = movie.title
            const editBtnContainer = document.createElement("div")
            editBtnContainer.className = "editBtnStyle"
            const removeBtn = document.createElement("button")
            removeBtn.innerText = "Delete this movie!"
            const addReviewBtn = document.createElement("button")
            addReviewBtn.innerText = "Click to add a Review!"
            const br = document.createElement("br")
            removeBtn.addEventListener("click", () => handleSeenRemove(addSeen, movie, removeBtn))
            addReviewBtn.addEventListener("click", () => createReviewForm(addReviewBtn, addSeen))
            editBtnContainer.append(removeBtn, addReviewBtn)
            addSeen.append(br, editBtnContainer)
            seenList.append(addSeen)
                })
        )
}

// Show New Watch Movie on DOM
function appendNewWatch(newMovie) {
    const watchList = document.querySelector(".watch")
    const addWatch = document.createElement("li")
    addWatch.innerText = newMovie.title
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    const br = document.createElement("br")
    removeBtn.addEventListener("click", () => handleWatchRemove(addWatch, newMovie, removeBtn))
    addWatch.append(br, removeBtn)
    watchList.append(addWatch)
}

// Show New Seen Movie on DOM
function appendNewSeen(newMovie) {
    const seenList = document.querySelector(".seen")
    const addSeen = document.createElement("li")
    addSeen.innerText = newMovie.title
    const editBtnContainer = document.createElement("div")
    editBtnContainer.className = "editBtnStyle"
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    const addReviewBtn = document.createElement("button")
    addReviewBtn.innerText = "Click to add a Review!"
    const br = document.createElement("br")
    removeBtn.addEventListener("click", () => handleSeenRemove(addSeen, newMovie, removeBtn))
    addReviewBtn.addEventListener("click", () => createReviewForm(addReviewBtn, addSeen))
    editBtnContainer.append(removeBtn, addReviewBtn)
    addSeen.append(br, editBtnContainer)
    seenList.append(addSeen)
}

// Watch POST Persistence
function postToWatchList(addWatch) {
    // this is called on the click of add to movie
    console.log(addWatch)
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "title": addWatch.title
        })
    }
    fetch(`http://localhost:3000/toWatch`, configObj)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            appendNewWatch(data)
        })

}

// Seen POST Persistence
function postToSeenList(addSeen) {
    // this is called on the click of add to movie
    console.log(addSeen)
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "title": addSeen.title
        })
    }
    fetch(`http://localhost:3000/seen`, configObj)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            appendNewSeen(data)
        })

}

// Watch DELETE Persistence
function deleteRequestWatch(addWatch, result) {
    console.log(addWatch)
    console.log(result)
    fetch(`http://localhost:3000/toWatch/${result.id}`, { method: "DELETE" })
        .then(resp => resp.json())
        .then(data => (data))
}

function handleWatchRemove(addWatch, result, removeBtn) {
    addWatch.remove()
    removeBtn.remove()
    deleteRequestWatch(addWatch, result)
}

// Seen DELETE Persistence
function deleteRequestSeen(addSeen, result) {
    console.log(addSeen)
    console.log(result)
    fetch(`http://localhost:3000/seen/${result.id}`, { method: "DELETE" })
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function handleSeenRemove(addSeen, result, removeBtn) {
    addSeen.remove()
    removeBtn.remove()
    deleteRequestSeen(addSeen, result)
}

function createReviewForm(addReviewBtn, addSeen) {
    const reviewForm = document.createElement("form")
    reviewForm.className = "showReview"
    const reviewBox = document.createElement('input')
    reviewBox.setAttribute("type", "text")
    reviewBox.setAttribute("name", "review")
    reviewBox.setAttribute("placeholder", "Enter Review Here")
    const submitReviewBtn = document.createElement("input")
    submitReviewBtn.setAttribute("type", "submit");
    submitReviewBtn.setAttribute("value", "Submit")
    reviewForm.addEventListener("submit", (e) => appendReview(e, addSeen, reviewForm))
    reviewForm.append(reviewBox, submitReviewBtn)
    addSeen.append(reviewForm)
}

function appendReview(e, addSeen, reviewForm) {
    e.preventDefault()
    const userReview = document.createElement("p")
    userReview.innerText = e.target[0].value
    e.target[0].value = ""
    reviewForm.className = "hideReview"
    addSeen.insertBefore(userReview, reviewForm)
}

document.addEventListener("DOMContentLoaded", () => {
    selectForm()
    clearSearchResults()
    fetchWatch()
    fetchSeen()
})
