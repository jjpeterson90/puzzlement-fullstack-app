import requests, json, re
from bs4 import BeautifulSoup
from unidecode import unidecode
from difflib import SequenceMatcher
from time import time

""" 
Summary:
  This script was my first attempt at web-scraping. The website
  allowed users to upload riddle/answer combinations and served
  as a free repository.
Purpose:
  Need a lot of short riddles that had one-word answers.
Preparation:
  Approximately 1-2 hours to research appropriate libararies
  Approximately 2 hours to review results and refine filters
Result:
  400+ unique riddles with one-word answers within 3-4 hours.
"""

count = 0
the_list = [] # Final list of chosen riddles for JSON conversion

# Starting URL
URL = "https://riddles-with-answers.com/best-riddles/"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

# Create list of URLs from the category links in the side-bar
categories = soup.find('div', 'sidebar_part').find_all('a')
# List of category titles to exclude
exclude = ['Adults', 'Bible', 'Easter', 'Long', 'Kids']

# Loop through list of URLs for each category
# Extract all the riddles on the page

for index, cat in enumerate(categories):
  
  if not any(word in cat.text for word in exclude):
    cat_url = cat.get('href')
    cat_page = requests.get(cat_url)
    soup = BeautifulSoup(cat_page.content, "html.parser")
    list = soup.find_all('div', 'blog_post_single list-element')
    
    # Loop through each riddle, filter, and add keepers to the_list.
    for index, item in enumerate(list):
      
      q = item.find_all('p')

      # Consolidate multi-tag questions into one string
      q_str = ''
      for line in q:
        this_line = line.text
        q_str += this_line
        if len(q) > 1:
          q_str += '\n'
        q = q_str
      
      a = item.find('div', 'well').text.replace('\n', '').strip()
      a = unidecode(a)
      que = unidecode(q)
      ans = re.sub(r'[^\w\s]', '', a).casefold().capitalize()
      
      # Filters to ignore undesirables
      if ans.find(' ') < 0 and not ans.isnumeric() and len(ans) <= 10:
        if len(que) < 100 and que.find('\n') < 0:
          duplicate = False
        
          # Remove duplicates or similarities to pre-chosen riddles
          # (Many users uploading the same riddle written differently)
          for prev_item in the_list:
            if ans == prev_item['answer']:
              if SequenceMatcher(a=que, b=prev_item['question']).ratio() > 0.5:
                duplicate = True
          
          # Append keepers to the list
          if not duplicate:
            the_list.append({
              'id': count,
              'question': que,
              'answer': ans
            })
            count += 1

# convert list to JSON and save to file.
json_object = json.dumps(the_list, indent=2)

with open('new_riddles.json', 'w') as file:
  file.write(json_object)
