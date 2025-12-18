class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


current = head
while current:
    print(current.data)
    current = current.next

new_node = Node(5)
new_node.next = head
head = new_node

new_node = Node(30)
current = head
while current.next:
    current = current.next
current.next = new_node

key = 20
current = head
prev = None     
while current and current.data != key:
    prev = current
    current = current.next  

if prev is None:  
    head = head.next
else:
    prev.next = current.next 
    
