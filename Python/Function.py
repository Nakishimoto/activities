def factorial(n):
    while n > 1:
        fac = n * (n - 1)
        return fac

def reverse_word(name):
    stack = []
    reversed_str = ""

    for x in name:
        stack.append(x)

    while stack:
        reversed_str += stack.pop()
    return reversed_str

print(reverse_word("Xiron"))