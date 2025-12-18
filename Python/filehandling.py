# Python writing files (.txt, .json, .csv)

# --------- .txt ---------
txt_data = "test"

file_path = "output.txt"

try:
   with open(file_path, 'w') as file:
      file.write(txt_data)
      print(f".txt file '{file_path}' has been created successfully")
except FileExistsError:
   print("That file already exists")