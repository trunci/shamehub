import nltk #natural language toolkit
import sklearn #python library for classical machine learning 
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# this can also be a local (to the cloud instance) file!
location = 'https://gist.githubusercontent.com/ruyimarone/04d356038138f12df205da9934e797f1/raw/e3bb9212eae46e10f85b765f5a3ab95e0428c3ee/data.csv'
df = pd.read_csv(location)
# this drops any rows that have NaN values or other missing entries - we won't worry about them
df = df.dropna()

df.head()
df[df['tags'].str.contains('python')].head()


#cv = sklearn.feature_extraction.text.CountVectorizer()
#m = cv.fit_transform(['this is a document', 'this is a second document', 'third document document document']).todense()
#print(cv.vocabulary_)
#print(m)

count_vectorizer = sklearn.feature_extraction.text.CountVectorizer()
td_count_matrix = count_vectorizer.fit_transform(df['tags'])

td_count_matrix.shape

list(count_vectorizer.vocabulary_.items())[:10]

from sklearn.decomposition import TruncatedSVD as SVD
svd = SVD(10)
svd.fit(td_count_matrix)

for i in range(len(svd.components_)):
    topk = sorted(zip(svd.components_[i], count_vectorizer.get_feature_names()), reverse=True)[:10]
    print(' + '.join('{:.3f} * {}'.format(v, word) for v, word in topk))

# vectorize the documents
count_vectorizer = sklearn.feature_extraction.text.CountVectorizer()
td_count_matrix = count_vectorizer.fit_transform(df['description'])
svd = SVD(10)
svd.fit(td_count_matrix)
#show just the words, not the scores this time
for i in range(len(svd.components_)):
    topk = sorted(zip(svd.components_[i], count_vectorizer.get_feature_names()), reverse=True)[:10]
    print(' | '.join(w for _, w in topk))
    # uncomment if you want the scores 
    # print(' + '.join('{:.3f} * {}'.format(v, word) for v, word in topk))

stop_words = ['the', 'to', 'we', 'and', 'of', 'it', 'in', 'for', 'with', 'is', 'this', 'my', 'that', 'our', 'what', 'on', 'as', 'you', 'was']
tfidf_vectorizer = sklearn.feature_extraction.text.TfidfVectorizer(stop_words=stop_words) # this has lots of parameters - experiment!
# sklearn.feature_extraction.text.TfidfVectorizer?

# vectorize the documents
tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])
svd = SVD(10)
svd.fit(tfidf_matrix)
#show just the words, not the scores this time
for i in range(len(svd.components_)):
    topk = sorted(zip(svd.components_[i], tfidf_vectorizer.get_feature_names()), reverse=True)[:10]
    print(' | '.join(w for _, w in topk))





