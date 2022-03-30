// Bianca, Santiago

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

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
        .then(data => {
            data.results.forEach(
                result => {
                    console.log(result)
                    createMovieCard(result)
                })
        })
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
    image.src = result.image
    image.className = "image"
    const btnDiv = document.createElement("div")
    btnDiv.className = "btnDivStyle"
    const watchBtn = document.createElement('button')
    watchBtn.innerText = "Add to Watch List!"
    watchBtn.addEventListener("click", () => { addToWatchList(result) })
    const seenBtn = document.createElement('button')
    seenBtn.innerText = "Add to Movies You've Seen!"
    seenBtn.addEventListener("click", () => { addtoSeenList(result) })
    btnDiv.append(watchBtn, seenBtn)
    movieCard.append(title, image, btnDiv)
    resultsContainer.append(movieCard)
}

function appendReview(e, addSeen, reviewForm) {
    e.preventDefault()
    const userReview = document.createElement("p")
    userReview.innerText = e.target[0].value
    e.target[0].value = ""
    reviewForm.className = "hideReview"
    addSeen.insertBefore(userReview, reviewForm)
    postReview()
}

function createReviewForm(addReviewBtn, addSeen) {
    const reviewForm = document.createElement("form")
    // reviewForm.setAttribute("method", "post")
    // reviewForm.setAttribute("action", "submit.php")
    const reviewBox = document.createElement('input')
    reviewBox.setAttribute("type", "text")
    reviewBox.setAttribute("name", "review")
    reviewBox.setAttribute("placeholder", "Enter Review Here")
    const submitReviewBtn = document.createElement("input")
    reviewForm.className = "showReview"
    submitReviewBtn.setAttribute("type", "submit");
    submitReviewBtn.setAttribute("value", "Submit")
    reviewForm.addEventListener("submit", (e) => appendReview(e, addSeen, reviewForm))
    reviewForm.append(reviewBox, submitReviewBtn)
    addSeen.append(reviewForm)
}

function addToWatchList(result) {
    const watchList = document.querySelector(".watch")
    const addWatch = document.createElement("li")
    const br = document.createElement("br")
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "Delete this movie!"
    removeBtn.addEventListener("click", handleWatchRemove)
    addWatch.innerText = result.title
    addWatch.append(br, removeBtn)
    watchList.append(addWatch)
}

function handleWatchRemove(){
    this.parentElement.remove()
    // deleteRequest()

}

function fetchWatch() {
    // function fetchLists(){}
        fetch('http://localhost:8080/toWatch')
        // fetch(`http://localhost:8080/${list}`)
            .then(resp => resp.json())
            .then(movies => {
                movies.forEach(movie => addToWatchList(movie))
            })
    }    

function addtoSeenList(result) {
    const seenList = document.querySelector(".seen")
    const addSeen = document.createElement("li")
    const br = document.createElement("br")
    const editBtnContainer = document.createElement("div")
    const removeBtn = document.createElement("button")
    const addReviewBtn = document.createElement("button")
    addSeen.innerText = result.title
    removeBtn.innerText = "Delete this movie!"
    addReviewBtn.innerText = "Click to add a Review!"
    editBtnContainer.className = "editBtnStyle"
    removeBtn.addEventListener("click", handleSeenRemove)
    addReviewBtn.addEventListener("click", () => createReviewForm(addReviewBtn, addSeen))
    editBtnContainer.append(removeBtn, addReviewBtn)
    addSeen.append(br, editBtnContainer)
    seenList.append(addSeen)
}

function handleSeenRemove() {
    this.parentElement.parentElement.remove()
    // deleteRequest()
}

function fetchSeen() {
    fetch('http://localhost:8080/seen')
        .then(resp => resp.json())
        .then(movies => {
            movies.forEach(movie => {
                addtoSeenList(movie)
                if (movie.review) {
                    console.log(movie.review)
                    // appendReview(e, addSeen, reviewForm, movie.review)
                }
            })
        })
}

const configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: {

    }
}

function postReview() {
    fetch("http://localhost:8080/seen", configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function deleteRequest() {
    fetch(`http://localhost:8080/${list}/${id}`, {
        method: "DELETE"
    })
}

document.addEventListener("DOMContentLoaded", () => {
    selectForm()
    fetchWatch()
    fetchSeen()

})

