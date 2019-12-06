'use strict'

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
    console.log(responseJson);
    
    // clear old results out and previous error messages
    $('#results-list').empty();
    $('#js-error-message').empty();

    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <a href=${responseJson[i].html_url} target="blank">${responseJson[i].html_url}</a>
            </li>`            
    )};
    $('#results').removeClass('hidden')
}

function getNews(query) {
    const url = searchURL + query + '/repos';

    fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
  }

function watchForm() {
    $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
    });
}

$(watchForm);