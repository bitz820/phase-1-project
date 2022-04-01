let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function removeMovieList() {
    const button = document.querySelector('.reset')
    button.addEventListener("click", () => {    
        const resultsContainer = document.querySelector(".results-container")
        resultsContainer.innerText = ""
        const title = document.createElement("h1")
        title.innerText = "Results Returned:"
        resultsContainer.append(title)
    })
}

function fetchWatch(){
    fetch("http://localhost:3000/toWatch")
    .then(resp => resp.json())
    .then(data => {data.forEach(movie => addToWatchList(movie))})
}
function fetchSeen(){
    fetch("http://localhost:3000/seen")
    .then(resp => resp.json())
    .then(data => {data.forEach(movie => addToSeenList(movie))})
}

function selectForm() {
    const form = document.querySelector("#search-movies")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const movie = (e.target[0].value)
        e.target[0].value = ""
        fetchSearch(movie)
    })
}

function fetchSearch(movie) {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_fkl6yn80/${movie}`, requestOptions)
        .then(response => response.json())
        .then(data => {data.results.forEach(result => createMovieCard(result))})
        .catch(error => console.log('error', error))
}

function createMovieCard(result) {
    const resultsContainer = document.querySelector(".results-container")
    // resultsContainer.innerText = ""
    const movieCard = document.createElement('card')
    movieCard.className = "movieCard"
    const title = document.createElement('h1')
    title.innerText = `Title: ${result.title}`
    const image = document.createElement('img')
    if (result.image === 'https://imdb-api.com/images/original/nopicture.jpg'){
        image.src = 'https://c.tenor.com/ysAaYYul2DUAAAAM/waiting-skeleton.gif'
    } else {image.src = result.image}
    image.className = "image"
    const btnDiv = document.createElement("div")
    btnDiv.className = "btnDivStyle"
    const watchBtn = document.createElement('button')
    watchBtn.innerText = "Add to Watch List!"
    watchBtn.addEventListener("click", () => addToWatchList(result))
    const seenBtn = document.createElement('button')
    seenBtn.innerText = "Add to Movies You've Seen!"
    seenBtn.addEventListener("click", () => addToSeenList(result))
    btnDiv.append(watchBtn, seenBtn)
    movieCard.append(title, image, btnDiv)
    resultsContainer.append(movieCard)
}

function addToWatchList(result) {
    const watchList = document.querySelector(".watch")
    const addWatch = document.createElement("li")
    addWatch.innerText = result.title
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    const br = document.createElement("br")
    removeBtn.addEventListener("click", () => handleWatchRemove(addWatch, result, removeBtn))
    postToWatch(addWatch)
    addWatch.append(br, removeBtn)
    watchList.append(addWatch)
}

function addToSeenList(result) {
    const seenList = document.querySelector(".seen")
    const addSeen = document.createElement("li")
    addSeen.innerText = result.title
    const editBtnContainer = document.createElement("div")
    editBtnContainer.className = "editBtnStyle"
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    const addReviewBtn = document.createElement("button")
    addReviewBtn.innerText = "Click to add a Review!"
    const br = document.createElement("br")
    removeBtn.addEventListener("click", () => handleSeenRemove(addSeen, result, removeBtn))
    addReviewBtn.addEventListener("click", () => createReviewForm(addReviewBtn, addSeen))
    postToSeen(addSeen)
    editBtnContainer.append(removeBtn, addReviewBtn)
     addSeen.append(br, editBtnContainer)
    seenList.append(addSeen)
   

}

function handleWatchRemove(addWatch, result, removeBtn){
    addWatch.remove()
    removeBtn.remove()
    deleteRequestWatch(addWatch, result)
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

function postToSeen(addSeen) {
    console.log(addSeen)

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "title" : addSeen.innerText,
            // "review" : 
        })
    }
    fetch(`http://localhost:3000/seen`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function postToWatch(addWatch) {
    console.log(addWatch)

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "title" : addWatch.innerText
        })
    }
    fetch(`http://localhost:3000/toWatch`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function deleteRequestWatch(addWatch, result) {
    console.log(addWatch)
    console.log(result)
    fetch(`http://localhost:3000/toWatch/${result.id}`, {method: "DELETE"})
    .then(resp => resp.json())
    .then(data => console.log(data))
}

function deleteRequestSeen(addSeen, result) {
    console.log(addSeen)
    console.log(result)
    fetch(`http://localhost:3000/seen/${result.id}`, {method: "DELETE"})
    .then(resp => resp.json())
    .then(data => console.log(data))
}


document.addEventListener("DOMContentLoaded", () => {
    selectForm()
    removeMovieList()
    fetchWatch()
    fetchSeen()
})
