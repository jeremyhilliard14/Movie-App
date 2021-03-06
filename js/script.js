$(document).ready(function(){
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
			// console.log(currentPoster);

		}
		$('#poster-grid').html(newHTML);
		//console.log(movieData);
		
	});


	$('#movies').click(function(){
		var nowPlaying = baseUrl + 'movie/now_playing' + apiKey;

		$.getJSON(nowPlaying, function(movieData){
			var newHTML = ' ';
			for(i=0; i<movieData.results.length; i++){
				var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
				// console.log(currentPoster);

			}
			$('#poster-grid').html(newHTML);
		//console.log(movieData);
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
				// console.log(currentPoster);
			}	

			$('#poster-grid').html(newHTML);
		});
		//console.log(movieData);
		// event.preventDefault();
	});

	$('#user-search').submit(function(){
		var input = $('#movie-search').val();
		var searchMovie = baseUrl + 'search/multi' + apiKey + '&query=' + input;
		console.log(searchMovie);

		$.getJSON(searchMovie, function(searchData){
		var newHTML = ' ';
		for(i=0; i<searchData.results.length; i++){
			inputResult = imagePath + 'w300' + searchData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + inputResult + '">';
			newHTML += '</div>';
			console.log(inputResult);
		}
		$('#poster-grid').html(newHTML);
		});
		// console.log(searchMovie);
		event.preventDefault();
	});
	
	$('#user-search').submit(function(){
		var keyword = $('#movie-search').val();
		var searchKeyword = baseUrl + 'search/movie' + apiKey + '&query=' + keyword;
		console.log(searchKeyword);

		$.getJSON(searchKeyword, function(searchData){
		var newHTML = ' ';
		for(i=0; i<searchData.results.length; i++){
			keywordResult = imagePath + 'w300' + searchData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + keywordResult + '">';
			newHTML += '</div>';
			console.log(keywordResult);
		}
		$('#poster-grid').html(newHTML);
		});
		// console.log(searchMovie);
		event.preventDefault();
	});

});