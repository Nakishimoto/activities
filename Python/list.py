table = [
    ["Name", "Grade"],
    ["Alice", 90],
    ["Bob", 85]
]

#print(table[1] [0])  

for row in table:
    for item in row:
        print(item, end=" ")
    print()

# Sum of each row
for i, row in enumerate(table):
    print(f"Sum of row {i}: {sum(row[1:]) if i != 0 else 'N/A (header)'}")

# Sum of each column (excluding header)
for col in range(1, len(table[0])):
    col_sum = sum(row[col] for row in table[1:])
    print(f"Sum of column {col} ({table[0][col]}): {col_sum}")

# Max and min in each row (excluding header)
for i, row in enumerate(table[1:], 1):
    print(f"Row {i} max: {max(row[1:])}, min: {min(row[1:])}")

# Max and min in each column (excluding header)
for col in range(1, len(table[0])):
    col_values = [row[col] for row in table[1:]]
    print(f"Column {col} ({table[0][col]}) max: {max(col_values)}, min: {min(col_values)}")