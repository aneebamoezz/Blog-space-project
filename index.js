/**
 Challenge:

GET a list of blog posts from the JSON Placeholder API.

BaseURL: https://apis.scrimba.com/jsonplaceholder/
Endpoint: /posts

Since there's so many posts, let's limit the array to just 5 items.
You can use the `.slice()` array method to just grab the first 5 objects
from the data array that comes back from the API
*/

/**
 Challenge:

With the 5 blog post objects, display the `title` and `body`
properties of the first 5 posts on the browser page.

Hints: 
* Create a `div` in the HTML file to store these items
* Loop over the items creating a string of HTML elements you 
can then put into the div with `innerHTML`
*/

/**
 Challenge:

Style it up!

* Add a short (~30px height) fixed navbar at the top with the text "BlogSpace". Remember to pad the top of your content so it doesn't get hidden behind the navbar.
* Add a font from Google Fonts.
* Any other styling you want to make it look nice!

*/

let postsArray = [] // GLOBAL VERIABLE

const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")

function renderPosts(){
    let html = ""
        for (let post of postsArray) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

    form.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
            titleInput.value = ""
            bodyInput.value = ""
            //form.reset()
        })
})
