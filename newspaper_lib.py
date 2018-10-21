import newspaper
from newspaper import Article

op_eds = newspaper.build('https://www.cnn.com/specials/opinion/opinion-politics')

i = 0
for art in op_eds.articles:
    if (i == 100):
        break
    print (art.url)
    art.download
    i += 1


    
