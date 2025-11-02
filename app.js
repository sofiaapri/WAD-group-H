
/*
const ONLINE_URL = "https://mocki.io/v1/9532f0a8-ea86-4cc1-9986-c10817d38be8";

fetch(ONLINE_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error("Network not ok: " + res.status);
    }
    return res.json();
  })

  .then(data => {
    const posts = Array.isArray(data) ? data : data.posts;
    renderPosts(posts);
  })
  
  .catch(err => {
    console.error("Fetch error:", err);
    document.getElementById("posts").innerHTML =
      `<p style="color:red;">Failed to load posts from online source.</p>`;
  });
*/

fetch('./data/posts.json')
  .then(res => {
    if (!res.ok) {
      throw new Error("Local file not ok: " + res.status);
    }
    return res.json();
  })

  .then(data => {
    const posts = Array.isArray(data) ? data : data.posts;
    renderPosts(posts);
  })
  
  .catch(err => {
    console.error("Fetch error (local):", err);
    document.getElementById("posts").innerHTML =
      `<p style="color:red;">Failed to load local posts.</p>`;
  });

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    const date = post.createdAt
      ? new Date(post.createdAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    div.innerHTML = `
      <div class="meta">
        ${post.author?.name ?? "Unknown"} ${date ? " · " + date : ""}
      </div>
      <p>${post.body}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" />` : ""}
    `;

    container.appendChild(div);
  });
}
