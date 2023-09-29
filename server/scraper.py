import requests
from bs4 import BeautifulSoup
import json

def findContracts():# URL of the page to scrape
    url = "https://www.spotrac.com/nfl/cleveland-browns/cap/"

    # Send an HTTP GET request to the URL
    response = requests.get(url)

    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Locate the individual cap table on the page
        tables = soup.find_all('table')

        if tables:
            contract_table = tables[0]
            # Extract contract data from the table and organize it
            contract_data = []
            for row in contract_table.find_all('tr')[1:]:  # Skip the header row
                cells = row.find_all('td')
                if len(cells) >= 12:
                    player = cells[0].text.strip()
                    player_name_parts = player.split("\n")
                    player_name = player_name_parts[1] if len(player_name_parts) > 1 else ""
                    position = cells[1].text.strip()
                    base_salary = cells[2].text.strip()
                    signing_bonus = cells[3].text.strip()
                    roster_bonus = cells[4].text.strip()
                    option_bonus = cells[5].text.strip()
                    workout_bonus = cells[6].text.strip()
                    restructuring_bonus = cells[7].text.strip()
                    misc = cells[8].text.strip()
                    dead_cap = cells[9].text.strip()
                    cap_hit = cells[10].text.strip()
                    cap_percent = cells[11].text.strip()

                    contract_data.append({
                        "Player": player_name,
                        "Position": position,
                        "Base Salary": base_salary,
                        "Signing Bonus": signing_bonus,
                        "Roster Bonus": roster_bonus,
                        "Option Bonus": option_bonus,
                        "Workout Bonus": workout_bonus,
                        "Restructuring Bonus": restructuring_bonus,
                        "Misc": misc,
                        "Dead Cap": dead_cap,
                        "Cap Hit": cap_hit,
                        "Cap Percent": cap_percent
                    })

            # Convert the data to JSON
            json_data = json.dumps(contract_data, indent=4)


            # Print or return the JSON data
            # print(json_data)
            with open('browns_contracts.json', 'w') as file:
                file.write(json_data)
            return json_data
        else:
            print("Contracts table not found on the page.")
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")


if __name__ == "__main__":
    findContracts()
