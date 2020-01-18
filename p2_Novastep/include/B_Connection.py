import bluetooth
import time

def receiveMessages():
  server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )

  port = 1
  server_sock.bind(("",port))
  server_sock.listen(1)

  client_sock,address = server_sock.accept()
  print "Accepted connection from " + str(address)

  data = client_sock.recv(1024)
  print "received [%s]" % data

  client_sock.close()
  server_sock.close()
  return data


def CalculForce(Force):
    port = 1
    sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
    sock.connect(("B8:27:EB:65:1A:5C", port))
    force = 0
    while (force<Force):
        print (force)
        force+=1
        time.sleep(1)
    print (force)
    print("Début envoi")
    sock.send("OK")
    sock.close()

Force=int(receiveMessages())
CalculForce(Force)
