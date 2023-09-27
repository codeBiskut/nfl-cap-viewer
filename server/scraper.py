import requests
from bs4 import BeautifulSoup
import json

# URL of the page to scrape
url = "https://www.spotrac.com/nfl/cleveland-browns/contracts/"

# Send an HTTP GET request to the URL
response = requests.get(url)

if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Locate the contracts table on the page
    contracts_table = soup.find('table', class_='salaryTable')

    if contracts_table:
        # Extract contract data from the table and organize it
        contract_data = []
        for row in contracts_table.find_all('tr')[1:]:  # Skip the header row
            cells = row.find_all('td')
            if len(cells) >= 4:
                player_name = cells[0].text.strip()
                contract_value = cells[1].text.strip()
                cap_hit = cells[2].text.strip()
                signing_bonus = cells[3].text.strip()

                contract_data.append({
                    "Player": player_name,
                    "Contract Value": contract_value,
                    "Cap Hit": cap_hit,
                    "Signing Bonus": signing_bonus
                })

        # Convert the data to JSON
        json_data = json.dumps(contract_data, indent=2)

        # Print or return the JSON data
        print(json_data)
    else:
        print("Contracts table not found on the page.")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
