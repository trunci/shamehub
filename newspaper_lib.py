import json
import numpy as np
import newspaper
from newspaper import Article
import imp
import csv

controversial_urls = ['https://www.cnn.com/2018/01/10/opinions/the-problem-isnt-trumps-brain-but-his-heart-opinion-dantonio/index.html', 
        'https://www.cnn.com/2018/01/09/opinions/donald-trump-college-football-national-anthem-filipovic-opinion/index.html',
        'https://www.cnn.com/2018/01/09/opinions/tps-salvadoran-immigration-opinion-reyes/index.html',
        'https://www.cnn.com/2018/01/03/opinions/how-trump-can-avoid-north-korea-catastrophetim-kaine/index.html']

articles = []
keywords = []
dict_entry = {}
for url in controversial_urls:
    articles.append(Article(url))
    #print(url)

for article in articles:
    article.download()
    article.parse()
    article.nlp()
    for word in article.keywords:
        keywords.append(word)
#//print (keywords)

words = []
counter = 0
with open('Terms-to-Block.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if (counter > 4):
            w = row[1]
            words.append(w[:len(w)-1])
        counter = counter + 1

dict_entry['controversial_words'] = keywords
dict_entry['bad_words'] = words 

ola = np.concatenate((keywords, words))
print ("[")
for i in ola:
    print(("'" + i + "',"), end='', flush=True)
print ("]")
    

with open('keywords.json', 'w') as outfile:
    json.dump(dict_entry, outfile)

