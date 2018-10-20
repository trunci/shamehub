import nltk #natural language toolkit
import sklearn #python library for classical machine learning 


cv = sklearn.feature_extraction.text.CountVectorizer()
m = cv.fit_transform(['this is a document', 'this is a second document', 'third document document document']).todense()
print(cv.vocabulary_)
print(m)

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





