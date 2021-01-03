let blogPosts = [];
let BlogPostsStore;
let BlogPostsParsed = JSON.parse(localStorage.getItem(BlogPostsStore));
const addPostForm = document.getElementById("newPost__form");
const addPostSection = document.getElementById("newPost");
const addPostButton = document.getElementById("addPostButton");
const newPostModalExitButton = document.getElementById("addPostClose");

let siteMetaData = {};
let siteMetaDataStore;
let metaData = JSON.parse(localStorage.getItem(siteMetaDataStore));
let changeSiteMetaDataForm = document.getElementById("globalSettings__form");

//iniatalize blog post when site loads.
document.addEventListener("DOMContentLoaded", () => {
	//if there is anything save to local storage retrieve it and use it to display blog posts.
	if (localStorage.getItem(BlogPostsStore)) {
		displayBlogPosts(BlogPostsParsed);
		blogPosts = BlogPostsParsed;
	}
});

// function to save info to local storage

const saveToLocalStorage = (
	localStorageVariable,
	variableWithDataBeingSaved
) => {
	localStorage.setItem(
		localStorageVariable,
		JSON.stringify(variableWithDataBeingSaved)
	);
};

//object contructor to create new blog post object
function BlogPost(blogTitle, blogSubTitle, blogAuthor, blogContent) {
	this.blogTitle = blogTitle;
	this.blogSubTitle = blogSubTitle;
	this.blogAuthor = blogAuthor;
	this.blogContent = blogContent;
}

//function to create object for new blog post
const createNewBlogPost = () => {
	// these variables are defined here since the elements are hidden when page initially loaded.
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
	array.unshift(object);
};

// function to map blog post array into html
const displayBlogPosts = (posts) => {
	document.getElementById("blogPostsDiv").innerHTML = posts.map((post) => {
		return `<div class="blogPost">
                <h2 class="div blogPost__header">${post.blogTitle}</h2>
                <h3 class="div blogPost__subHeader">${post.blogSubTitle}</h3>
                <p class="div blogPost__para">${post.blogContent}</p>
                <address class="div blogPost__author">${post.blogAuthor}</address>
                <div class='modal__buttons'>
                    <i class="fas fa-trash-alt delete deleteBlogPostBtn blogPost__btn"></i>
                    <i class="fas fa-edit blogPost__btn editBlogPostBtn"></i>
                </div>
            </div>`;
	});
};

//clear contents of form
clearFormContents = () => {
	const blogTitle = document.getElementById("postTitle");
	const blogSubTitle = document.getElementById("postSubTitle");
	const blogAuthor = document.getElementById("postAuthor");
	const blogContent = document.getElementById("postContent");

	blogTitle.value = "";
	blogSubTitle.value = "";
	blogAuthor.value = "";
	blogContent.value = "";
};

//event listener for add post form submit
if (addPostForm) {
	addPostForm.addEventListener("submit", (e) => {
		e.preventDefault();
		//creates an object from form field components and pushes to array that holds post objects
		pushArray(createNewBlogPost(), blogPosts);
		//saves the new object to local storage
		localStorage.setItem(BlogPostsStore, JSON.stringify(blogPosts));
		//displays the new blog posts in the UI
		displayBlogPosts(blogPosts);
		clearFormContents();
		//closes add post modal
		addPostSection.classList.add("hide");
	});
}

//event listener to unhide and hide add post form
addPostButton.addEventListener("click", (e) => {
	if (addPostSection.classList.contains("hide")) {
		addPostSection.classList.remove("hide");
	}
});

newPostModalExitButton.addEventListener("click", () => {
	if (!addPostSection.classList.contains("hide")) {
		addPostSection.classList.add("hide");
	}
});

// function that deletes an object from an array -- NOT BEING USED
const deleteObjectOutOfArray = (array, key) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].blogTitle == key) {
			console.log(blogTitle);
		}
	}
};

//event listener to delete blog post
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("deleteBlogPostBtn")) {
		const blogTitle =
			e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;

		let index = blogPosts.findIndex((x) => x.blogTitle == blogTitle);
		blogPosts.splice(index, 1);
		displayBlogPosts(blogPosts);
		saveToLocalStorage(BlogPostsStore, blogPosts);
	}
});
