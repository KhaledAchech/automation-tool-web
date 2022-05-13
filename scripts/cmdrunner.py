#!/usr/bin/env python
from __future__ import absolute_import, division, print_function
import os


from mysqlconnector import connect, fetchData
from deviceconnector import connection

from dotenv import load_dotenv

load_dotenv()

MY_LOCALHOST = os.getenv('LOCALHOST')
MY_USER = os.getenv('USER')
MY_PASS = os.getenv('PASSWORD')
MY_DB = os.getenv('DBNAME')


print ("Connecting to the MySQL Database ... ")
print(' ')
myinstance = connect(MY_LOCALHOST,MY_USER, MY_PASS, MY_DB)
if (myinstance):
    print ("Connected!")
    print(' ')
    print ("################################################################################################")
    print(' ')
    tablename = input("Enter table name: ")
    print ("Fetching data ...")
    print(' ')
    fetchData(myinstance, tablename)
else:
    print("Unable to connect to the database.")

print(' ')
print ("################################################################################################")

print(' ')
MY_DEVICE_USERNAME = os.getenv("DEVICE_USERNAME")
MY_DEVICE_PASSWORD = os.getenv("DEVICE_PASSWORD")

os = input("Enter device os: ")
address = input("Enter the device address: ")
cmd = input("Enter your command: ")

print ("Running the command ... " )
#connection("cisco_xe", "192.168.1.26",  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD, "Show cdp neighbors")
print(' ')
connection(os, address,  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD, cmd)
print(' ')
print ("################################################################################################")