import random

# --------------------------------------------------
# Check if placing num at (row, col) is valid
# --------------------------------------------------
def is_valid(grid, row, col, num):
    # Check row
    if num in grid[row]:
        return False

    # Check column
    for r in range(9):
        if grid[r][col] == num:
            return False

    # Check 3×3 box
    start_row = row - row % 3
    start_col = col - col % 3
    for r in range(start_row, start_row + 3):
        for c in range(start_col, start_col + 3):
            if grid[r][c] == num:
                return False

    return True


# --------------------------------------------------
# Fill the Sudoku grid completely (valid solution)
# --------------------------------------------------
def fill_grid(grid):
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:  # find empty spot
                numbers = list(range(1, 10))
                random.shuffle(numbers)

                for num in numbers:
                    if is_valid(grid, row, col, num):
                        grid[row][col] = num
                        if fill_grid(grid):
                            return True
                        grid[row][col] = 0  # backtrack

                return False
    return True


# --------------------------------------------------
# Remove cells to form the puzzle
# --------------------------------------------------
def remove_cells(grid, difficulty="medium"):
    attempts = {"easy": 35, "medium": 45, "hard": 55}
    remove_count = attempts.get(difficulty, 45)

    while remove_count > 0:
        row = random.randint(0, 8)
        col = random.randint(0, 8)

        if grid[row][col] != 0:
            grid[row][col] = 0
            remove_count -= 1
    return grid


# --------------------------------------------------
# Generate Sudoku Puzzle
# --------------------------------------------------
def generate_sudoku(difficulty="medium"):
    grid = [[0 for _ in range(9)] for _ in range(9)]
    fill_grid(grid)
    puzzle = remove_cells(grid, difficulty)
    return puzzle


# --------------------------------------------------
# Pretty print
# --------------------------------------------------
def print_sudoku(grid):
    for r in range(9):
        print(" ".join(str(x) if x != 0 else "." for x in grid[r]))


# --------------------------------------------------
# MAIN
# --------------------------------------------------
if __name__ == "__main__":
    puzzle = generate_sudoku("medium")
    print_sudoku(puzzle)
