let blogPosts = [];
let BlogPostsStore;
let posts = JSON.parse(localStorage.getItem(BlogPostsStore));
const addPostForm = document.getElementById("newPost__Form");

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
		return `<div>
                <h2>${post.blogTitle}</h2>
                <h3>${post.blogSubTitle}</h3>
                <p>${post.blogContent}</p>
                <address>${post.blogAuthor}</address>
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
