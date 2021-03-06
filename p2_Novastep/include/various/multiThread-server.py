
from bluetooth import *

# import thread module
from threading import Thread



# thread function
def client_thread(c):
    while True:

        # data received from client
        data = c.recv(1024)
        if not data:
            print('Bye')

            # lock released on exit
            print_lock.release()
            break


        # send back reversed string to client
        c.send(data)

    # connection closed
    c.close()





def Main():
    server_sock=BluetoothSocket( RFCOMM )
    server_sock.bind(("B8:27:EB:65:1A:5C",PORT_ANY))
    server_sock.listen(10)

    port = server_sock.getsockname()[1]
    print(server_sock)
    print(server_sock.getsockname())


    uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

    advertise_service( server_sock, "SampleServer",
                       service_id = uuid,
                       service_classes = [ uuid, SERIAL_PORT_CLASS ],
                       profiles = [ SERIAL_PORT_PROFILE ],
    #                   protocols = [ OBEX_UUID ]
                        )

    # a forever loop until client wants to exit
    while True:

        # establish connection with client
        print ("Waiting for connection on RFCOMM channel %d" % port)

        client_sock, client_info = server_sock.accept()
        print ("Accepted connection from ", client_info)

        # Start a new thread and return its identifier
        try:
          Thread(target=client_thread, args=(client_sock,)).start()
        except:
          print("Thread did not start.")
          traceback.print_exc()

    s.close()


if __name__ == '__main__':
    Main()
