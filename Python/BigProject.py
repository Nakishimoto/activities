import random
import string 

chars = string.punctuation + string.digits + string.ascii_letters + " "
chars = list(chars)
key = chars.copy()

random.shuffle(key)

sessionCode = ""
code = "xiron"
for letter in code:
    index = chars.index(letter)
    sessionCode += key[index]

current = f"Session Code[{sessionCode}] \n"

file_path = "output.txt"

while True:
    print("=" * 10,"[MENU]","=" * 10)
    print("[1] Encrypt Message.")
    print("[2] Decrypt Message.")
    print("[3] Show Current Keys.")
    print("[4] Exit.")

    choice = int(input("Enter Choice: ") )

    if choice == 1:
        plain_text = input("Enter message to encrypt: ")
        cipher_text = ""

        for letter in plain_text:
            index = chars.index(letter)
            cipher_text += key[index]

        txt_data = current + "Encrypted Message: " + cipher_text
        
        try:
            with open(file_path, 'w') as file:
                file.write(txt_data)
                print(f".txt file '{file_path}' has been successfully updated")

        except FileExistsError:
            print("That file already exists")

        print(f"Original Message: {plain_text}")
        print(f"Encrypted Message: {cipher_text}")

    elif choice == 2:
        cipher_text = input("Enter message to decrypt: ")
        plain_text = ""

        for letter in cipher_text:
            index = key.index(letter)
            plain_text += chars[index]
        
        txt_data = current + "Decrypted Message: " + plain_text

        try:
            with open(file_path, 'w') as file:
                file.write(txt_data)
                print(f".txt file '{file_path}' has been successfully updated")
                
        except FileExistsError:
            print("That file already exists")

        print(f"Original Message: {cipher_text}")
        print(f"Decrypted Message: {plain_text}")
    
    elif choice == 3:
        print("=" * 57,"[Char]","=" * 57)
        print(chars)
        print("=" * 122)
        print()
        print("=" * 57,"[Key]","=" * 57)
        print(key)
        print("=" * 122)

    elif choice == 4:
        print("Exiting..")
        with open(file_path, 'w') as file:
            file.write("session terminated.")
        break

    else:
        print("invalid choice or input.")


