// Select profile information
const overview = document.querySelector(".overview");
// Git hub username
const username = "hsmanski";
// Select ul to display repos list
const repoList = document.querySelector(".repo-list");
// Selects repo information container
const reposContainer = document.querySelector(".repos");
// Selects to display each repos information
const repoData = document.querySelector(".repo-data");
// Back to repo button
const backToRepoBtn = document.querySelector(".view-repos");
// Filter input for search
const filterInput = document.querySelector(".filter-repos");

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
  // Displays filter elements input
  filterInput.classList.remove("hide");

  // Calls for Repos on github
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// Event when click each repo
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    fetchRepoInfo(repoName);
  }
});

// Fetch Github Repos information for each repo
const fetchRepoInfo = async function (repoName) {
  // Calls api for repo information
  const repoInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfoData = await repoInfo.json();

  // Fetch languages
  const fetchLanguages = await fetch(repoInfoData.languages_url);
  const languageData = await fetchLanguages.json();

  // Loop languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  // Display repo information when clicked repo
  displayRepoInfo(repoInfoData, languages);
};

// Display repo information when clicked
const displayRepoInfo = function (repoInfoData, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  reposContainer.classList.add("hide");
  backToRepoBtn.classList.remove("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfoData.name}</h3>
    <p>Description: ${repoInfoData.description}</p>
    <p>Default Branch: ${repoInfoData.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfoData.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

// Button to go back to repos list
backToRepoBtn.addEventListener("click", function () {
  repoData.classList.add("hide");
  reposContainer.classList.remove("hide");
  backToRepoBtn.classList.add("hide");
});

// Input event for Search element
filterInput.addEventListener("input", function (e) {
  const searchInput = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerCase = searchInput.toLowerCase();

  for (const repo of repos) {
    const repoLowerCase = repo.innerText.toLowerCase();
    if (repoLowerCase.includes(searchLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
