// Select profile information
const overview = document.querySelector(".overview");
// Git hub username
const username = "hsmanski";

// Fetch API Github profile
const githubUserInfo = async function () {
  const gitusername = await fetch(`https://api.github.com/users/${username}`);
  const data = await gitusername.json();
  console.log(data);
  showUserInfo(data);
};
githubUserInfo();

const showUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overview.append(div);
};
