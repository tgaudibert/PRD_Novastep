# Uses Bluez for Linux
#
# sudo apt-get install bluez python-bluez
#
# Taken from: https://people.csail.mit.edu/albert/bluez-intro/x232.html
# Taken from: https://people.csail.mit.edu/albert/bluez-intro/c212.html



import time
import RPi.GPIO as GPIO
import time
import sys
import math
import numpy as np
from decimal import Decimal
import Adafruit_CharLCD as LCD
# Raspberry Pi pin configuration:
lcd_rs        = 25  # Note this might need to be changed to 21 for older revision Pi's.
lcd_en        = 24
lcd_d4        = 23
lcd_d5        = 17
lcd_d6        = 18
lcd_d7        = 22
lcd_backlight = 4
# Define LCD column and row size for 16x2 LCD.
lcd_columns = 16
lcd_rows    = 2
# Initialize the LCD using the pins above.
lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7,lcd_columns, lcd_rows, lcd_backlight)

print("DEBUT")
lcd.clear()
lcd.message('PRET A ETRE\nUTILISE')



def cleanAndExit():
    print ("Cleaning...")
    #GPIO.cleanup()
    lcd.clear()
    print ("Bye!")
    sys.exit()

def displayMessages(message):
    lcd.message('Force mesuree :\n '+ str(message))
