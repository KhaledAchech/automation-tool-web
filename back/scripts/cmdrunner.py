#!/usr/bin/env python
from __future__ import absolute_import, division, print_function
import os
import sys
from mysqlconnector import connect, fetchData, fetchdevice
from deviceconnector import showCdpNeighbors

from dotenv import load_dotenv

load_dotenv()

MY_LOCALHOST = os.getenv('LOCALHOST')
MY_USER = os.getenv('USER')
MY_PASS = os.getenv('PASSWORD')
MY_DB = os.getenv('DBNAME')

devices = []

######################################################################
# **function_id variable determines what the script will execute  ** #
# ** - function_id == 0 : geting all the devices from the db  ->  ** #
# ** - and running show showCdpNeighbors on them ->               ** #
######################################################################

print ('Number of Arguments:', len(sys.argv), 'arguments.')
print ('Argument List:', str(sys.argv))
function_id = sys.argv[1]
print (function_id)

if (function_id == '0'):
    print ("Connecting to the MySQL Database ... ")
    print(' ')
    myinstance = connect(MY_LOCALHOST,MY_USER, MY_PASS, MY_DB)
    if (myinstance):
        print ("Connected!")
        print(' ')
        print ("################################################################################################")
        print(' ')
        #tablename = input("Enter table name: ")
        tablename = 'device'
        print ("Fetching data ...")
        print(' ')
        devices = fetchData(myinstance, tablename)
    else:
        print("Unable to connect to the database.")

    print(' ')
    print ("################################################################################################")

    print(' ')
    MY_DEVICE_USERNAME = os.getenv("DEVICE_USERNAME")
    MY_DEVICE_PASSWORD = os.getenv("DEVICE_PASSWORD")

    #os = input("Enter device os: ")
    #address = input("Enter the device address: ")
    #cmd = input("Enter your command: ")

    print ("Running the command 'Show cdp neighbors' on all the devices ... " )
    #connection("cisco_xe", "192.168.1.26",  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD, "Show cdp neighbors")
    print(' ')
    for device in devices:
        print("For the device : ", device['hostname'], " with id: ", device['id'])
        print ("and address of : ", device['ip_address'])
        showCdpNeighbors(device,  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD)
        print(' ')
        print ("-------------------------------------------------------------------------------------------")
        print(' ')
    print(' ')
    print ("################################################################################################")

    exit()

if (function_id == '1'):
    print ("Connecting to the MySQL Database ... ")
    print(' ')
    myinstance = connect(MY_LOCALHOST,MY_USER, MY_PASS, MY_DB)
    if (myinstance):
        print ("Connected!")
        print(' ')
        print ("################################################################################################")
        print(' ')
        #tablename = input("Enter table name: ")
        tablename = 'device'
        device_id = input("Enter device id: ")
        print ("Fetching data ...")
        print(' ')
        device = fetchdevice(myinstance, tablename, device_id)
        print(device)
    else:
        print("Unable to connect to the database.")

    print(' ')
    print ("################################################################################################")

    print(' ')
    MY_DEVICE_USERNAME = os.getenv("DEVICE_USERNAME")
    MY_DEVICE_PASSWORD = os.getenv("DEVICE_PASSWORD")

    #os = input("Enter device os: ")
    #address = input("Enter the device address: ")
    #cmd = input("Enter your command: ")

    print ("Running the command 'Show cdp neighbors' on this device: "+ device_id )
    #connection("cisco_xe", "192.168.1.26",  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD, "Show cdp neighbors")
    print(' ')
    print("For the device : ", device['hostname'], " with id: ", device['id'])
    print ("and address of : ", device['ip_address'])
    showCdpNeighbors(device,  MY_DEVICE_USERNAME, MY_DEVICE_PASSWORD)
    print(' ')
    print ("-------------------------------------------------------------------------------------------")
    print(' ')
    print(' ')
    print ("################################################################################################")

    exit()
