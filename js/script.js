// Select profile information
const overview = document.querySelector(".overview");
// Git hub username
const username = "hsmanski";
// Select ul to display repos list
const reposList = document.querySelector(".repo-list");

// Fetch API Github profile
const githubUserInfo = async function () {
  const gitusername = await fetch(`https://api.github.com/users/${username}`);
  const data = await gitusername.json();
  console.log(data);
  showUserInfo(data);
};
githubUserInfo();

// Display User Information
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
  fetchRepos();
};

// Fetch Github Repos
const fetchRepos = async function () {
  const gitRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=update&per_page=100`
  );
  const repoData = await gitRepos.json();
  console.log(repoData);
  displayRepos(repoData);
};

// Display Github Repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
  }
};
