const gallery = document.querySelector('.gallery')
const formInput = document.querySelector('.form-input')
const form = document.querySelector('.search-form')
const more = document.querySelector('.more')
const key = '89hg6Fw6r5JW1a1RvBrj4dAdpGR6TBVWVpJIywws9qCv87AciI3wNGKA'
let url = 'https://api.pexels.com/v1/curated?per_page=15&page=1'
let searchValue
let page = 1
let currentSearch

formInput.addEventListener('input', updateInput)
form.addEventListener('submit', (e) => {
  currentSearch = searchValue
  e.preventDefault()
  searchPhotos(searchValue)
})

more.addEventListener('click', morePhoto)

function updateInput(e) {
  searchValue = e.target.value
}

function fetchApi(url) {
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      generatePhoto(data)
    })
}

function searchPhotos(query) {
  clear()
  fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`)
}

function generatePhoto(fetchData) {
  //   console.log(fetchData.photos)
  fetchData.photos.forEach((photo) => {
    const galleyImg = document.createElement('div')
    galleyImg.classList.add('galley-img')
    galleyImg.innerHTML = ` 
    <div class="gallery-info"> 
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
    </div>
    <img src="${photo.src.large}"></img>`
    gallery.appendChild(galleyImg)
  })
}

function clear() {
  gallery.innerHTML = ''
  formInput.value = ''
}

function morePhoto() {
  let fetchLink
  page++
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
  }
  fetchApi(fetchLink)
}

fetchApi(url)
