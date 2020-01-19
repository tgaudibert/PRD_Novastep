from bluetooth import *
from capteur import *
import time
import re, uuid



macadress = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
print(macadress)

server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(( "" , PORT_ANY ))
server_sock.listen(10)
port = server_sock.getsockname()[1]




uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

advertise_service( server_sock, "SampleServer",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ],)

print ("Waiting for connection on RFCOMM channel %d" % port)
while True:
    client_sock, client_info = server_sock.accept()
    print ("Accepted connection from ", client_info)

    try:
        while True:
            time.sleep(0.2)
            Force = demo_poids()
            client_sock.send(Force)
    except IOError:
        pass

    print ("disconnected")

client_sock.close()
server_sock.close()
