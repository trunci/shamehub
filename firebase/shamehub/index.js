// Initialize the Facebook API, using the App's unique Id
// Basically interval given FB stuff



window.fbAsyncInit = function() {
	FB.init({
	  appId      : '299447580655569',
	  cookie     : true,
	  xfbml      : true,
	  version    : 'v3.1'
	});
	FB.AppEvents.logPageView();   
};


(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




// Initialize Firebase Database

var config = {
	apiKey: "AIzaSyBr4MdONYacDGIdh5z-Xm3Qr9gBDRLFmkc",
	authDomain: "shamehub-101010.firebaseapp.com",
	databaseURL: "https://shamehub-101010.firebaseio.com",
	projectId: "shamehub-101010",
	storageBucket: "shamehub-101010.appspot.com",
	messagingSenderId: "955219006464",
};

firebase.initializeApp(config);
var database = firebase.database();

// Get the lsit of words from the database
database.ref('words/').on('value', function(snapshot) {
		list = snapshot.val();
		list = list.split(",");
	});

// Check to see the info on the user or create a new user
function checkUser(name, userId){
	// Check if user has already used the website
	let a;
	database.ref('users/' + userId).on('value', function(snapshot) {
		a = snapshot.val(); 
	});

	if (a == undefined) {
		// Create new User
		createNewUser(name, userId);
		paid = false;
	} else {

		if (a.paid == "no"){
			paid = false;
		} else {
			paid = true;
		}

	}
}


// Function to create a new user
function createNewUser(name, userId){
	  firebase.database().ref('users/' + userId).set({
	    username: name,
	    paid: "no"
  });
}


// Declare this function to make statusChangeCallBack work

function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log('Successful login for: ' + response.name);
                    document.getElementById('status').innerHTML =
                      'Thanks for logging in, ' + response.name + '!';
                });
            } else {
                // The person is not logged into your app or we are unable to tell.
                document.getElementById('status').innerHTML = 'Please log ' +
                  'into this app.';
            }
        }


// Function to see if the user has logged in. Is called after the person's login has been completed
// When it ends, it calls a new function, to start the first outputs to the website
function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
      document.getElementById("start").style = "display: none;";
      document.getElementById("introduction").style = "display: none;";

      startWithName();
}

// Function that gets the name of the user and creates a welcome message, as well as the user's name on the top left
function startWithName() {
	// Will handle the HTTP response for the name of the person and their id
	FB.api('/me', function(response) {
		console.log(response);
	  	var welcome = document.createElement("p");
		welcome.id = "welcome";
		welcome.class = "welcome";
		welcome.innerHTML = "Hi, " + response.name + "!"
		console.log(response.id);
		if (response.name != undefined) {
			checkUser(response.name, response.id);
		} else {
			location.reload();
		}
		document.getElementById("perfil").appendChild(welcome);
	});
	// Calls the next function
	getPosts();
}


// Uses the FB API to get the user's posts, giving them in a response object
function getPosts() {
	FB.api('/me/posts', function(response) {
	    console.log(response);
	    // Calls the functions that start generating the boxes with the posts filtered.
	    generateBoxes(response);
	})
}


// Helper function to create a box. It has as inputs the id of the post, the time it was posted and its contents
// It is used so that it can be iterated through

// Basically creates many DOM objects and adds them to the HTML page
function generateBox(id, time, contents){

	var div = document.createElement("div");
	div.id = id;
	div.classList = "main";
	var date = document.createElement("div");
	date.classList = "date";
	time = time.slice(5, 7) + "/" + time.slice(8, 10) + "/" + time.slice(0, 4);
	date.innerHTML = time;
	var content = document.createElement("div");
	content.classList = "content";
	
	if (contents.lenght < 120){
		content.innerHTML = contents;
	}
	else{
		content.innerHTML = contents.slice(0, 100) + "...";
	}

	var deleteBttn = document.createElement("input");
	deleteBttn.type = "image";
	deleteBttn.src = "edit.png";
	deleteBttn.style = "height: 30px; width: 30px;"
	deleteBttn.classList = "delete";
	deleteBttn.onclick = function(){viewPost(id)};


	div.appendChild(date);
	div.appendChild(content);
	div.appendChild(deleteBttn);

	document.getElementById("posts").appendChild(div);
}


function generateBoxes(response) {
	// Iterate through the words and see which have the kwy words. If it does have any, create the element in HTML
	found = 0;
	analyzed = 0;
	score = 0;
	for (i=0; i<response.data.length; i++){
		time = response.data[i].created_time;
		message = response.data[i].message;
		id = response.data[i].id;
		if (message != null){
			message_lower = message.toLowerCase();
		}

		for (x=0; x<700; x++){
			if (message != null && document.getElementById(id) == null && message_lower.search([x]) != -1){
				generateBox(id, time, message);
				found = found + 1;
				break;
			}
		}
		analyzed = analyzed + 1;
		}

		if (found==0){
			document.getElementById("descr").innerHTML = "You are clean! Nothing controversial to show! Congratulations!";
		}
		else{
			document.getElementById("descr").innerHTML = "Here are the posts we found. Good luck looking at all of them!";
		}

		// Create the counter with the number of sketchy posts found, one with the number of posts analyzed and one with the score
		postsFound = document.createElement("h3");
		postsFound.classList = "counts";
		postsFound.id = "postsFound";
		if (document.getElementById("postsFound") == null){
			postsFound.innerHTML = "Posts Found: " + found;//str(analyzed);
			document.getElementById("counters").appendChild(postsFound);
		}
		else{
			document.getElementById("postsFound").innerHTML = "Posts Found: " + found;
		}

		postsAnalyzed = document.createElement("h3");
		postsAnalyzed.id = "postsAnalyzed";
		postsAnalyzed.classList = "counts";


		if (document.getElementById("postsAnalyzed") == null){
			postsAnalyzed.innerHTML = "Posts Analyzed: " + analyzed;//str(analyzed);
			document.getElementById("counters").appendChild(postsAnalyzed);
		}
		else{
			document.getElementById("postsAnalyzed").innerHTML = "Posts Flagged: " + analyzed;
		}

		score = Math.round((1 - (found/analyzed))*100);
		myScore = document.createElement("h3");
		myScore.classList = "score";
		myScore.id = "score";

		if (document.getElementById("score") == null){
			myScore.innerHTML = "Score: " + score;
			document.getElementById("counters").appendChild(myScore);
		}
		else{
			document.getElementById("score").innerHTML = "Score: " + score;
		}


	
}


function viewPost(id){

	console.log(id);
	window.open("https://facebook.com/" + id);
	document.getElementById(id).classList.add("opened");

}
