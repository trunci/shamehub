import newspaper
from newspaper import Article

op_eds = newspaper.build('https://www.cnn.com')

i = 0
print(len(op_eds.articles))
for art in op_eds.articles:
    print (art.url)
    i += 1

