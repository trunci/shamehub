# shamehub
ShameHub entry for HackGT 2018


We all had moments in our lives when we felt the need to post something more politicized in our Facebook account, and never thought about the consequences that it may bring in our future. As Facebook is a fairly open social media, anyone could read these posts, whether it is your close friends, family, or even your next boss. With that in mind, we decided to build a web app that analyses your Facebook posts and shows you a list of them that contains some keywords or topics and that may be of your interest to delete them.

The website is not currently working, once we need the authorizaztion from Facebook to be able to manage a user's posts from the API. To have it, we would need to file a request - which we are doing - that could take uo to three weeks to be accepted. Therefore, we have used test users and the developer's account to create an extremely similar service.
 
We've used NLP in python (both newspaper3k and tensorflow) to identify the key words of trending controversial topics, which could be in the user's posts. The next step would be to implement a self recurring algorithm to retrain itself with new news and return an updated list of words to be fitered.

