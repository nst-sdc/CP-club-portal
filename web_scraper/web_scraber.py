import requests
from bs4 import BeautifulSoup
import csv
from urllib.parse import urljoin
import os
import time
import json

class CSESScraper:
    def __init__(self):
        self.base_url = 'https://cses.fi'
        self.session = requests.Session()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.session.headers.update(self.headers)

    def login(self, username, password):
        login_url = 'https://cses.fi/login'
        try:
            # First get the login page to get any CSRF token if needed
            login_page = self.session.get(login_url)
            soup = BeautifulSoup(login_page.text, 'html.parser')
            
            # Find the CSRF token if it exists
            csrf_token = soup.find('input', {'name': 'csrf_token'})
            
            login_data = {
                'nick': username,
                'pass': password
            }
            
            # Add CSRF token if found
            if csrf_token:
                login_data['csrf_token'] = csrf_token['value']
            
            # Perform login
            response = self.session.post(login_url, data=login_data)
            
            # Check if login was successful
            if 'Login' not in response.text:
                print(f"Successfully logged in as {username}")
                return True
            else:
                print(f"Failed to login as {username}")
                return False
                
        except Exception as e:
            print(f"Error during login: {e}")
            return False

    def scrape_user_data(self, username):
        try:
            # Scrape user profile
            profile_url = f'{self.base_url}/user/{username}'
            response = self.session.get(profile_url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Create directory for user data
            user_dir = os.path.join('scraped_data', username)
            if not os.path.exists(user_dir):
                os.makedirs(user_dir)
            
            # Get user statistics
            stats = {}
            content_div = soup.find('div', {'class': 'content'})
            if content_div:
                # Extract all text information
                stats['profile_text'] = content_div.get_text(separator='\n', strip=True)
                
                # Get solved problems
                problems_list = []
                for problem_link in soup.find_all('a', href=True):
                    if '/problemset/task/' in problem_link['href']:
                        problems_list.append({
                            'name': problem_link.text.strip(),
                            'url': urljoin(self.base_url, problem_link['href'])
                        })
                stats['solved_problems'] = problems_list
            
            # Save user statistics
            with open(os.path.join(user_dir, 'profile_data.json'), 'w', encoding='utf-8') as f:
                json.dump(stats, f, indent=4)
            
            # Scrape submissions if available
            submissions_url = f'{self.base_url}/user/{username}/submissions'
            response = self.session.get(submissions_url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            submissions = []
            submission_table = soup.find('table')
            if submission_table:
                rows = submission_table.find_all('tr')[1:]  # Skip header row
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) >= 4:
                        submission = {
                            'problem': cols[0].text.strip(),
                            'time': cols[1].text.strip(),
                            'language': cols[2].text.strip(),
                            'result': cols[3].text.strip()
                        }
                        submissions.append(submission)
            
            # Save submissions data
            with open(os.path.join(user_dir, 'submissions.json'), 'w', encoding='utf-8') as f:
                json.dump(submissions, f, indent=4)
            
            print(f"Successfully scraped data for user {username}")
            return True
            
        except Exception as e:
            print(f"Error scraping data for user {username}: {e}")
            return False

    def scrape_multiple_users(self, users_data):
        """
        users_data: list of dictionaries containing username and password
        """
        for user in users_data:
            username = user['username']
            password = user['password']
            
            print(f"\nProcessing user: {username}")
            if self.login(username, password):
                self.scrape_user_data(username)
                # Logout or clear session
                self.session = requests.Session()
                self.session.headers.update(self.headers)
                time.sleep(2)  # Be nice to the server

def main():
    # Load user credentials from config file
    try:
        with open('cses_users.json', 'r') as f:
            config = json.load(f)
            users = config['users']
    except FileNotFoundError:
        print("Error: cses_users.json file not found!")
        return
    except json.JSONDecodeError:
        print("Error: Invalid JSON in cses_users.json!")
        return
    
    scraper = CSESScraper()
    print("Starting CSES.fi data scraping...")
    scraper.scrape_multiple_users(users)
    print("\nScraping completed!")
    print("Data has been saved in the 'scraped_data' directory")

if __name__ == "__main__":
    main()
