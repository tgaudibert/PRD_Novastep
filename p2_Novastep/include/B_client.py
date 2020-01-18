import bluetooth
import time

port = 10000
sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
sock.connect(('B8:27:EB:65:1A:5C', port))

print("Debut envoi")
sock.send("OK")
sock.close()
