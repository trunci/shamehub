import json
import newspaper
from newspaper import Article
import imp

controversial_urls = ['https://www.cnn.com/2018/01/10/opinions/the-problem-isnt-trumps-brain-but-his-heart-opinion-dantonio/index.html', 
        'https://www.cnn.com/2018/01/09/opinions/donald-trump-college-football-national-anthem-filipovic-opinion/index.html',
        'https://www.cnn.com/2018/01/09/opinions/tps-salvadoran-immigration-opinion-reyes/index.html',
        'https://www.cnn.com/2018/01/03/opinions/how-trump-can-avoid-north-korea-catastrophetim-kaine/index.html']

articles = []
keywords = []

for url in controversial_urls:
    articles.append(Article(url))
    #print(url)

for article in articles:
    article.download()
    article.parse()
    article.nlp()
    for word in article.keywords:
        keywords.append(word)
print (keywords)

dict_entry = {'controversial_words' : keywords}

with open('keywords.json', 'w') as outfile:
    json.dump(dict_entry, outfile)

