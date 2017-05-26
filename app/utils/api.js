import axios from 'axios';

const id = '19ead53b2ee37250f9f7';
const sec = '4287d18416c09cc76f361db3e20fccd2c5fb0228';
const params = `?client_id=${id}&client_secret=&{sec}`;

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then((user) => {
      return user.data;
    })
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

module.exports = {
  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    let encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

      return axios.get(encodeURI)
        .then((response) => {
          return response.data.items;
        });
  }
}
