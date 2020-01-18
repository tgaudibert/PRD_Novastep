import bluetooth
import time

server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )

port = 1
server_sock.bind(("B8:27:EB:65:1A:5C",port))
server_sock.listen(1)

client_sock,address = server_sock.accept()
print "Accepted connection from " + str(address)

data = client_sock.recv(1024)
print "received [%s]" % data

client_sock.close()
server_sock.close()
