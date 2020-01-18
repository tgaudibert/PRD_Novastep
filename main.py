import time

import capteur

print("DEBUT")

Force=5
force=0
while (force<Force):
    force=capteur.capture_poids()
    print (force)



print("Fin")
