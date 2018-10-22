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


list = ['trumps','brain','man','trying','emotional','isnt','love','oprah','trump','heart','donald','president','warmth','problem','shouldnt','harped','anthem','political','song','racism','players','president','trump','game','football','national','fumbled','salvadorans','salvador','administrations','tps','cruel','status','trump','united','decision','el','states','shortsighted','salvadoran','program','immigration','avoid','risk','state','war','diplomacy','north','secretary','prospect','kaine','trump','president','south','stumbling','tim','senate','korea','catastrophe','a55hole','aeolus','ahole','anal','analprobe','anilingus','anus','areola','areole','arian','aryan','ass','assbang','assbanged','assbangs','asses','assfuck','assfucker','assh0le','asshat','assho1e','ass hole','assholes','assmaster','assmunch','asswipe','asswipes','azazel','azz','b1tch','babe','babes','ballsack','bang','banger','barf','bastard','bastards','bawdy','beaner','beardedclam','beastiality','beatch','beater','beaver','beer','beeyotch','beotch','biatch','bigtits','big tits','bimbo','bitch','bitched','bitches','bitchy','blow job','blow','blowjob','blowjobs','bod','bodily','boink','bollock','bollocks','bollok','bone','boned','boner','boners','bong','boob','boobies','boobs','booby','booger','bookie','bootee','bootie','booty','booze','boozer','boozy','bosom','bosomy','bowel','bowels','bra','brassiere','breast','breasts','bugger','bukkake','bullshit','bull shit','bullshits','bullshitted','bullturds','bung','busty','butt','butt fuck','buttfuck','buttfucker','buttfucker','buttplug','c.0.c.k','c.o.c.k.','c.u.n.t','c0ck','c-0-c-k','caca','cahone','cameltoe','carpetmuncher','cawk','cervix','chinc','chincs','chink','chink','chode','chodes','cl1t','climax','clit','clitoris','clitorus','clits','clitty','cocain','cocaine','cock','c-o-c-k','cockblock','cockholster','cockknocker','cocks','cocksmoker','cocksucker','cock sucker','coital','commie','condom','coon','coons','corksucker','crabs','crack','cracker','crackwhore','crap','crappy','cum','cummin','cumming','cumshot','cumshots','cumslut','cumstain','cunilingus','cunnilingus','cunny','cunt','cunt','c-u-n-t','cuntface','cunthunter','cuntlick','cuntlicker','cunts','d0ng','d0uch3','d0uche','d1ck','d1ld0','d1ldo','dago','dagos','dammit','damn','damned','damnit','dawgie-style','dick','dickbag','dickdipper','dickface','dickflipper','dickhead','dickheads','dickish','dick-ish','dickripper','dicksipper','dickweed','dickwhipper','dickzipper','diddle','dike','dildo','dildos','diligaf','dillweed','dimwit','dingle','dipship','doggie-style','doggy-style','dong','doofus','doosh','dopey','douch3','douche','douchebag','douchebags','douchey','drunk','dumass','dumbass','dumbasses','dummy','dyke','dykes','ejaculate','enlargement','erect','erection','erotic','essohbee','extacy','extasy','f.u.c.k','fack','fag','fagg','fagged','faggit','faggot','fagot','fags','faig','faigt','fannybandit','fart','fartknocker','fat','felch','felcher','felching','fellate','fellatio','feltch','feltcher','fisted','fisting','fisty','floozy','foad','fondle','foobar','foreskin','freex','frigg','frigga','fubar','fuck','f-u-c-k','fuckass','fucked','fucked','fucker','fuckface','fuckin','fucking','fucknugget','fucknut','fuckoff','fucks','fucktard','fuck-tard','fuckup','fuckwad','fuckwit','fudgepacker','fuk','fvck','fxck','gae','gai','ganja','gay','gays','gey','gfy','ghay','ghey','gigolo','glans','goatse','godamn','godamnit','goddam','goddammit','goddamn','goldenshower','gonad','gonads','gook','gooks','gringo','gspot','g-spot','gtfo','guido','h0m0','h0mo','handjob','hard on','he11','hebe','heeb','hell','hemp','heroin','herp','herpes','herpy','hitler','hiv','hobag','hom0','homey','homo','homoey','honky','hooch','hookah','hooker','hoor','hootch','hooter','hooters','horny','hump','humped','humping','hussy','hymen','inbred','incest','injun','j3rk0ff','jackass','jackhole','jackoff','jap','japs','jerk','jerk0ff','jerked','jerkoff','jism','jiz','jizm','jizz','jizzed','junkie','junky','kike','kikes','kill','kinky','kkk','klan','knobend','kooch','kooches','kootch','kraut','kyke','labia','lech','leper','lesbians','lesbo','lesbos','lez','lezbian','lezbians','lezbo','lezbos','lezzie','lezzies','lezzy','lmao','lmfao','loin','loins','lube','lusty','mams','massa','masterbate','masterbating','masterbation','masturbate','masturbating','masturbation','maxi','menses','menstruate','menstruation','meth','m-fucking','mofo','molest','moolie','moron','motherfucka','motherfucker','motherfucking','mtherfucker','mthrfucker','mthrfucking','muff','muffdiver','murder','muthafuckaz','muthafucker','mutherfucker','mutherfucking','muthrfucking','nad','nads','naked','napalm','nappy','nazi','nazism','negro','nigga','niggah','niggas','niggaz','nigger','nigger','niggers','niggle','niglet','nimrod','ninny','nipple','nooky','nympho','opiate','opium','oral','orally','organ','orgasm','orgasmic','orgies','orgy','ovary','ovum','ovums','p.u.s.s.y.','paddy','paki','pantie','panties','panty','pastie','pasty','pcp','pecker','pedo','pedophile','pedophilia','pedophiliac','pee','peepee','penetrate','penetration','penial','penile','penis','perversion','peyote','phalli','phallic','phuck','pillowbiter','pimp','pinko','piss','pissed','pissoff','piss-off','pms','polack','pollock','poon','poontang','porn','porno','pornography','pot','potty','prick','prig','prostitute','prude','pube','pubic','pubis','punkass','punky','puss','pussies','pussy','pussypounder','puto','queaf','queef','queef','queer','queero','queers','quicky','quim','racy','rape','raped','raper','rapist','raunch','rectal','rectum','rectus','reefer','reetard','reich','retard','retarded','revue','rimjob','ritard','rtard','r-tard','rum','rump','rumprammer','ruski','s.h.i.t.','s.o.b.','s0b','sadism','sadist','scag','scantily','schizo','schlong','screw','screwed','scrog','scrot','scrote','scrotum','scrud','scum','seaman','seamen','seduce','semen','sex','sexual','sh1t','s-h-1-t','shamedame','shit','s-h-i-t','shite','shiteater','shitface','shithead','shithole','shithouse','shits','shitt','shitted','shitter','shitty','shiz','sissy','skag','skank','slave','sleaze','sleazy','slut','slutdumper','slutkiss','sluts','smegma','smut','smutty','snatch','sniper','snuff','s-o-b','sodom','souse','soused','sperm','spic','spick','spik','spiks','spooge','spunk','steamy','stfu','stiffy','stoned','strip','stroke','stupid','suck','sucked','sucking','sumofabiatch','t1t','tampon','tard','tawdry','teabagging','teat','terd','teste','testee','testes','testicle','testis','thrust','thug','tinkle','tit','titfuck','titi','tits','tittiefucker','titties','titty','tittyfuck','tittyfucker','toke','toots','tramp','transsexual','trashy','tubgirl','turd','tush','twat','twats','ugly','undies','unwed','urinal','urine','uterus','uzi','vag','vagina','valium','viagra','virgin','vixen','vodka','vomit','voyeur','vulgar','vulva','wad','wang','wank','wanker','wazoo','wedgie','weed','weenie','weewee','weiner','weirdo','wench','wetback','wh0re','wh0reface','whitey','whiz','whoralicious','whore','whorealicious','whored','whoreface','whorehopper','whorehouse','whores','whoring','wigger','womb','woody','wop','wtf','x-rated','xxx','yeasty','yobbo','zoophil'];


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
			message = message.toLowerCase();
		}

		for (x=0; x<700; x++){
			console.log(message);
			console.log(x);
			console.log(list);
			if (message != null && message.search(list[x]) != -1 && document.getElementById(id) == null){
				generateBox(id, time, message);
				found = found + 1;
			}
			else{
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
