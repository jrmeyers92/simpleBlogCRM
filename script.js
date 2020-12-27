let blogPosts = [];
const addPostForm = document.getElementById("newPost__Form");

//object contructor to create new blog object
function BlogPost(blogTitle, blogSubTitle, blogAuthor, blogContent) {
	this.blogTitle = blogTitle;
	this.blogSubTitle = blogSubTitle;
	this.blogAuthor = blogAuthor;
	this.blogContent = blogContent;
}

//event listener on add post form submit
addPostForm.addEventListener("submit", () => {
	const blogTitle = document.getElementById("postTitle");
	const blogSubTitle = document.getElementById("postSubTitle");
	const blogAuthor = document.getElementById("postAuthor");
	const blogContent = document.getElementById("postText");

    
    
});
