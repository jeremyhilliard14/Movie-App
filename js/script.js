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
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currentPoster + '">';
				newHTML += '</div>';
				console.log(currentPoster);

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