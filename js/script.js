$(document).ready(function(){
	var genreArray = [];

	$('#searchFilter').change(function(){
		console.log($(this).val());
	});



	var imagePath;
	//The URL of all of our API calls
	var baseUrl = 'https://api.themoviedb.org/3/';
	//The query string including apiKey anytime they ask for it
	var apiKey = '?api_key=a388a38b1930f99ab66f903d71c7d5c5';
	//The configURL so that we can get basic config data
	var configUrl = baseUrl + 'configuration' + apiKey;
	// var input = $('#movie-search').val();
	// var searchMovie = baseUrl + 'search/movie' + apiKey + '&query=' + input;
	
	//Make an AJAX call to the config URL
	$.getJSON(configUrl, function(configData){
		//Set our gloabal variable = to the result of our AJAX call
		imagePath = configData.images.base_url;
		// console.log(configData);
	});

	var genreURL = baseUrl + 'genre/movie/list' + apiKey;
	//Make an AJAX call to the genre URL.
	$.getJSON(genreURL, function(genreData){
		// console.log(genreData);
		
		for(i=0; i<genreData.genres.length; i++){
			var genreID = genreData.genres[i].id;
			var genreName = genreData.genres[i].name;
			genreArray[genreID]= genreName;
		}

		var genreHTML = '';
		for(i=0; i<genreArray.length; i++){
			if(genreArray[i] != undefined){
				genreHTML += '<input type="button" id="'+genreArray[i]+'" class="genre-button btn-default" value="'+genreArray[i]+'">'
			}
		}

		$('#genre-buttons').html(genreHTML);
		addGenreClicks();

		console.dir(genreArray);
	});

	var nowPlaying = baseUrl + 'movie/now_playing' + apiKey;
	//console.log(nowPlaying);
	var popularMovies = baseUrl + 'movie/popular' + apiKey;

	$.getJSON(popularMovies, function(movieData){
		var newHTML = ' ';
		for(i=0; i<movieData.results.length; i++){
			var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + currentPoster + '">';
			newHTML += '</div>';
			//console.log(movieData.results[i].genre_ids);

		}
		$('#poster-grid').html(newHTML);
		//console.log(movieData);
		
	});
	$('#home-button').click(function(){
		var popularMovies = baseUrl + 'movie/popular' + apiKey;

		$.getJSON(popularMovies, function(movieData){
			var newHTML = ' ';
			for(i=0; i<movieData.results.length; i++){
				var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
				console.log(currentPoster);

			}
			$('#poster-grid').html(newHTML);
		//console.log(movieData);
		});
	});

	$('#movie-button').click(function(){
		var nowPlaying = baseUrl + 'movie/now_playing' + apiKey;

		$.getJSON(nowPlaying, function(movieData){
			var newHTML = ' ';
			for(i=0; i<movieData.results.length; i++){
				var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
				var firstGenreID = movieData.results[i].genre_ids[0];
				var genreName = '';
				for(j=0; j<movieData.results[i].genre_ids.length; j++){
					var safeGenreName = genreArray[movieData.results[i].genre_ids[j]].replace(/ /g, "");
					genreName += safeGenreName + ' ';
				}
				newHTML += '<div class="col-sm-3 now_playing ' + encodeURI(genreName) + '">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
				console.log(currentPoster);

			}
			$('#poster-grid').html(newHTML);
			getIsotope();

		console.log(movieData);
		});
		
	});

	$('#tv').click(function(){
		var airingToday = baseUrl + 'tv/airing_today' + apiKey;
	
		$.getJSON(airingToday, function(tvData){
			var newHTML = ' ';
			for(i=0; i<tvData.results.length; i++){
				var currentPoster = imagePath + 'w300' + tvData.results[i].poster_path;
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
			 //console.log(currentPoster);
			}	

			$('#poster-grid').html(newHTML);
		});
		// console.log(movieData);
		 event.preventDefault();

	});

	$('#movie-form').submit(function(event){
		var userSearch = $('#search').val(); 
		var searchFilter = $('#search-filter').val();
		console.log(userSearch);

		var searchURL = baseUrl + 'search/' + searchFilter + apiKey + '&query=' + encodeURI(userSearch);
		// var searchMovie = baseUrl + 'search/movie' + apiKey + '&query=' + input;
		

		$.getJSON(searchURL, function(movieData){
			console.log(movieData);
			var newHTML = ' ';
			for(i=0; i<movieData.results.length; i++){
				if((searchFilter == 'person') || ((searchFilter == 'multi') && (movieData.results[i].media_type == 'person'))){
					var currentPoster = imagePath + 'w300' + movieData.results[i].profile_path;
				}else{
					var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
				}
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
			//console.log(currentPoster);
			}
			$('#poster-grid').html(newHTML);
		});
		// console.log(searchMovie);
		event.preventDefault();
	});

	// $('user-search').submit(function(){
	// 	var keyword = $('#movie-search').val();
	// 	// var movie = $('#movies').select();
	// 	// var tv = $('#tv').select();
	// 	// var actor = $('#actor').select();
	// 	// var director = $('#director');
	// 	var movieSearch = baseUrl + 'search/movie' + apiKey + '&query=' + keyword;
	// 	var tvSearch = baseUrl + 'search/tv' + apiKey + '&query=' + keyword 
	// 	if($('#movies').select() == true){
	// 		$.getJSON(searchKeyword, function(searchData){
	// 			var newHTML = ' ';
	// 			for(i=0; i<searchData.results.length; i++){
	// 				keywordResult = imagePath + 'w300' + searchData.results[i].poster_path;
	// 				newHTML += '<div class="col-sm-3">';
	// 				newHTML += '<img src="' + keywordResult + '">';
	// 				newHTML += '</div>';
	// 				console.log(keywordResult);
	// 			}
	// 		$('#poster-grid').html(newHTML);
	// 		});
	// 		event.preventDefault();
	// 	}else if($('#tv').select() == true){
	// 		$.getJSON(searchKeyword, function(searchData){
	// 			var newHTML = ' ';
	// 			for(i=0; i<searchData.results.length; i++){
	// 				keywordResult = imagePath + 'w300' + searchData.results[i].poster_path;
	// 				newHTML += '<div class="col-sm-3">';
	// 				newHTML += '<img src="' + keywordResult + '">';
	// 				newHTML += '</div>';
	// 				console.log(keywordResult);
	// 			}
	// 		$('#poster-grid').html(newHTML);
	// 		});

	// 	}
	// 	event.preventDefault();
	// })
	
	// $('#user-search').submit(function(){
	// 	var keyword = $('#movie-search').val();
	// 	var searchKeyword = baseUrl + 'search/movie' + apiKey + '&query=' + keyword;
	// 	console.log(searchKeyword);

	// 	$.getJSON(searchKeyword, function(searchData){
	// 	var newHTML = ' ';
	// 	for(i=0; i<searchData.results.length; i++){
	// 		keywordResult = imagePath + 'w300' + searchData.results[i].poster_path;
	// 		newHTML += '<div class="col-sm-3">';
	// 		newHTML += '<img src="' + keywordResult + '">';
	// 		newHTML += '</div>';
	// 		console.log(keywordResult);
	// 	}
	// 	$('#poster-grid').html(newHTML);
	// 	});
	// 	 //console.log(searchMovie);
	// 	event.preventDefault();
	// });

});

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


// var arrayToSearch = [];
// for (i=1; i <= 6; i++) {
// 	var popularMovies = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a388a38b1930f99ab66f903d71c7d5c5' + i;
// 	console.log(popularMovies);
// 	$.getJSON(popularMovies, function(popularM){
// 		for(j=0; j<popularM.results.length; j++){
// 			arrayToSearch.push(popularM.results[j].original_title);
// 		}
// 		//console.log(arrayToSearch);
// 	});
// }

var actors = [
	'Brad Pitt',
	'Michael Douglas',
	'Al Pacino'
];

$('#movie-form .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'actors',
  source: substringMatcher(actors)
});

function getIsotope(){
	var theGrid = $('#poster-grid').isotope({
  // options
  		itemSelector: '.now_playing',
	});

	theGrid.imagesLoaded().progress( function() {
  		theGrid.isotope('layout');
	});

// 	// isotope({
//  //  			// main isotope options
//  //  itemSelector: '.grid-item',
//  //  // set layoutMode
//  //  layoutMode: 'cellsByRow',
//  //  // options for cellsByRow layout mode
//  //  cellsByRow: {
//  //    columnWidth: 200,
//  //    rowHeight: 150
//  //  },
//  //  // options for masonry layout mode
//  //  masonry: {
//  //    columnWidth: '.grid-sizer'
//  //  }
// })
}

 
function addGenreClicks(){
	$('.genre-button').click(function(){
		$('#poster-grid').isotope({ filter: '.'+ $(this).attr('id') });
	});
}