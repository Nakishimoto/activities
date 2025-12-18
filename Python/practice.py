def fibo(n):
    if n == 0:
        return 0
    else:
        return fibo(n - 1) + (n - 2)

print(fibo(11))