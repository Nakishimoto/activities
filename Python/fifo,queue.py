word = "Nigga"
stack = []

for n in word:
    stack.append(n)
print(stack)

reversed = ""

while stack:
    reversed += stack.pop()
print(reversed)


