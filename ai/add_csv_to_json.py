import json
import csv

bad_words = {}
words = []
counter = 0
with open('Terms-to-Block.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if (counter > 4):    
            w = row[1]
            words.append(w[:len(w)-1])
        counter += 1
bad_words["bad_words"] = words

with open('keywords.json') as json_file:  
    data = json.load(json_file)
    for p in data['people']:
        print('Name: ' + p['name'])
        print('Website: ' + p['website'])
        print('From: ' + p['from'])
        print('')

print bad_words
