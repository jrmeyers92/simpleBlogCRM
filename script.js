let blogPosts = [];
let BlogPostsStore;
let posts = JSON.parse(localStorage.getItem(BlogPostsStore));
const addPostForm = document.getElementById("newPost__form");
const addPostSection = document.getElementById("newPost");
const addPostButton = document.getElementById("addPostButton");

let siteMetaData = {};
let siteMetaDataStore;
let metaData = JSON.parse(localStorage.getItem(siteMetaDataStore));
let changeSiteMetaDataForm = document.getElementById("globalSettings__form");

//iniatalize blog post when site loads.
document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem(BlogPostsStore)) {
		displayBlogPosts(posts);
		blogPosts = posts;
		console.log(blogPosts);
	}
});

//object contructor to create new blog object
function BlogPost(blogTitle, blogSubTitle, blogAuthor, blogContent) {
	this.blogTitle = blogTitle;
	this.blogSubTitle = blogSubTitle;
	this.blogAuthor = blogAuthor;
	this.blogContent = blogContent;
}

//function to create object for new blog post
const createNewBlogPost = () => {
	const blogTitle = document.getElementById("postTitle");
	const blogSubTitle = document.getElementById("postSubTitle");
	const blogAuthor = document.getElementById("postAuthor");
	const blogContent = document.getElementById("postContent");

	let post = new BlogPost(
		blogTitle.value,
		blogSubTitle.value,
		blogAuthor.value,
		blogContent.value
	);
	return post;
};

// function to push object to array
const pushArray = (object, array) => {
	array.push(object);
};

// function to map blog post array into html
const displayBlogPosts = (postss) => {
	document.getElementById("blogPostsDiv").innerHTML = postss.map((post) => {
		return `<div class="blogPost">
                <h2 class="div blogPost__header">${post.blogTitle}</h2>
                <h3 class="div blogPost__subHeader">${post.blogSubTitle}</h3>
                <p class="div blogPost__para">${post.blogContent}</p>
                <address class="div blogPost__author">${post.blogAuthor}</address>
            </div>`;
	});
};

//event listener on add post form submit
if (addPostForm) {
	addPostForm.addEventListener("submit", (e) => {
		e.preventDefault();
		pushArray(createNewBlogPost(), blogPosts);
		localStorage.setItem(BlogPostsStore, JSON.stringify(blogPosts));
		console.log(localStorage.getItem(BlogPostsStore));
		displayBlogPosts(blogPosts);
	});
}

//event listener to unhide add post form
addPostButton.addEventListener("click", (e) => {
	console.log("hi");
	if (addPostSection.classList.contains("hide")) {
		addPostSection.classList.remove("hide");
	}
});
