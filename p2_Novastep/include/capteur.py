import RPi.GPIO as GPIO
import time
import sys
import math
import numpy as np
from decimal import Decimal
from hx711 import HX711

def cleanAndExit():
    print ("Cleaning...")
    #GPIO.cleanup()
    print ("Bye!")
    sys.exit()


hx = HX711(5,6)
hx.set_reading_format("LSB", "MSB")
hx.set_reference_unit(92)

hx.reset()
hx.tare()

#while True:
def capture_poids():
    try:

        val = hx.read_long()
        poids=round(abs(val-8334639)/115000.0,3)

        hx.power_down()
        hx.power_up()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
        GPIO.setwarnings(False)

    return poids




def demo_poids():
    try:
        poids=2
    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
        GPIO.setwarnings(False)

    return poids
