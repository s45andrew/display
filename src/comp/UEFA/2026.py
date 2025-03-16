from bs4 import BeautifulSoup
from tabulate import tabulate

# Specify the path to your HTML file
file_path = 'tab.html'

# Open and read the file
with open(file_path, 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parse the HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Find the table by class
table = soup.find('table', {'class': 'datagrid el-table-striped center country-ranking'})

# Extract all rows from the table
all_rows = [
    [cell.get_text(strip=True) for cell in row.find_all(['th', 'td'])]
    for row in table.find_all('tr')
]

# Extract headings (first row) and data rows
headings = all_rows[0]
data_rows = all_rows[1:]

# Sort data rows by the "Coefficient 2026/27" column (index -1 for the last column)
sorted_data = sorted(data_rows, key=lambda x: float(x[-1]), reverse=True)

# Add special styling for Scotland's row
highlighted_html_rows = []
for row in sorted_data:
    if row[1] == 'Scotland':  # Match the country name
        highlighted_html_rows.append(
            f"<tr style='background-color: #ffff99;'>"
            + "".join(f"<td>{cell}</td>" for cell in row)
            + "</tr>"
        )
    else:
        highlighted_html_rows.append(
            "<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>"
        )

# Generate an HTML table manually, including the highlighted row
html_table = (
    "<table>"
    + "<tr>" + "".join(f"<th>{heading}</th>" for heading in headings) + "</tr>"
    + "".join(highlighted_html_rows)
    + "</table>"
)

# Add CSS for styling and save to an HTML file
html_content_with_style = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorted Table by Coefficient 2026/27 with Highlight</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f9;
            color: #333;
        }}
        h1 {{
            text-align: center;
            color: #4CAF50;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }}
        th, td {{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }}
        th {{
            background-color: #4CAF50;
            color: white;
        }}
        tr:nth-child(even) {{
            background-color: #f9f9f9;
        }}
        tr:hover {{
            background-color: #f1f1f1;
        }}
    </style>
</head>
<body>
    <h1>Table Sorted by Coefficient 2026/27</h1>
    {html_table}
</body>
</html>
"""

# Save the highlighted and sorted HTML table to a file
output_file = 'sorted_highlighted_table.html'
with open(output_file, 'w', encoding='utf-8') as file:
    file.write(html_content_with_style)

print(f"HTML file created successfully: {output_file}")
