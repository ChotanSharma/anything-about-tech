async function newPostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector("input[name='post-title']").value;
    const contents = document.querySelector("input[name='post-content']").value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  async function newBlogPostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector("#blog-post-title").value;
    const contents = document.querySelector("#blog-contents").value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector("#add-new-blog-post")
    .addEventListener("click", newBlogPostHandler);
  
  document.querySelector("#add-blog-post").addEventListener("click", () => {
    document.querySelector(".add-blog-post-form").classList.remove("hidden");
    document.querySelector("#add-blog-post").classList.add("hidden");
  });
  
  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newPostHandler);