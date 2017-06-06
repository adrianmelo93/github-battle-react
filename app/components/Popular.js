import React from 'react';
import propTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

// from class to Stateless Function Component.
function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key = {lang}
          >
            {lang}
          </li>
        );
      })
    }
    </ul>
  );
}

function RepoGrid(props) {
  console.log(props.repos);
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item' >
            <div className='popular-rank'>#{index +1}</div>
            <ul className='space-list-items'>
             <li>
              <img className='avatar'
              src={repo.owner.avatar_url}
              alt={`Avtar for &{repo.owner.login}`}
              />
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.ownerlogin}</li>
            <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })
    }
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: propTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    // Ajax
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(() => {
      console.log('hi');
      return {
      selectedLanguage: lang,
      repos: null
      };
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => {
          return {
            repos: repos
          };
        });
      });
  }
  render () {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
        ? <p>Loading</p>
        : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

export default Popular;

// date flow we set languages to all as a default, it runs in this.state.selectedLanguage ?
// when click we reset the state to the language we pass in which changes the color.

//BINDING ----------------------------------
//
// class SelectLanguage extends React.Component {
//   render() {
//     const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
//     return (
//       <ul className='languages'>
//         {languages.map((lang) => {
//           return (
//             <li
//               style={lang === this.props.selectedLanguage ? { color: '#d0021b'} : null}
//               onClick={this.props.onSelect.bind(null, lang)}
//               key = {lang}
//             >
//               {lang}
//             </li>
//           );
//         })
//       }
//       </ul>
//     );
//   }
// }
