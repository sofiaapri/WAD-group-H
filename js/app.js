
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

  const defaultAvatar = "res/images/icon.png";
  const likeIcon = "res/images/like.png";

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
      <div class="post-header">
        <img class="user" src="${defaultAvatar}" alt="avatar">
        <span class="author">${post.author?.name ?? "Unknown"}</span>
        ${date ? `<span class="date">${date}</span>` : ""}
      </div>

      <div class="post-content">
        <p>${post.body}</p>
        ${post.imageUrl ? `<img class="post-image" src="${post.imageUrl}" alt="Post image" />` : ""}
      </div>

      <div class="post-footer">
        <img class="like" src="${likeIcon}" alt="Like">
      </div>
    `;

    container.appendChild(div);
  });
}

// Dropdown
const avatarImg   = document.getElementById("avatarImg");
const profileMenu = document.getElementById("profileMenu");

if (avatarImg && profileMenu) {
  avatarImg.setAttribute("aria-haspopup", "menu");
  avatarImg.setAttribute("aria-controls", "profileMenu");
  avatarImg.setAttribute("aria-expanded", "false");

  avatarImg.addEventListener("click", () => {
    const open = profileMenu.classList.toggle("show");
    avatarImg.setAttribute("aria-expanded", open ? "true" : "false");
  });
}