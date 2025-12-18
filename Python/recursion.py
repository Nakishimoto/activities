def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)
    
def fibonacci(n):
    
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

def name(n,i = 0):
    if i == len(n):
        print("name printed!")

    else:
        print(n[i])
        return name(n, i + 1)   
    
name("Xiron")



