#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

from matplotlib.font_manager import json_dump
from datetime import datetime
import os


def writeNeighbors(device, neighbors):
    date = datetime.today().strftime('%d-%m-%Y')
    current_directory = os.getcwd()
    print(current_directory)
    save_directory = current_directory + '/Outputs' 
    path = os.path.join(save_directory, r'show-cdp-neighbors-CMD_Output_' + date + '/')
    # Check whether the specified path exists or not
    isExist = os.path.exists(path)

    if not isExist:
    # Create a new directory because it does not exist 
        os.makedirs(path)

    filename = path + str(device['id']) + '_' + device['hostname'] +'_' + date + '.json'
    json_dump(neighbors, filename)

def writeStartUpConfig(device, config):
    date = datetime.today().strftime('%d-%m-%Y')
    current_directory = os.getcwd()
    print(current_directory)
    save_directory = current_directory + '/Outputs' 
    path = os.path.join(save_directory, r'show-startUp-config-CMD_Output_' + date + '/')
    # Check whether the specified path exists or not
    isExist = os.path.exists(path)

    if not isExist:
    # Create a new directory because it does not exist 
        os.makedirs(path)

    filename = path + str(device['id']) + '_' + device['hostname'] +'_' + date + '.txt'
    writeConfig(filename,config)

def writeRunningConfig(device, config):
    date = datetime.today().strftime('%d-%m-%Y')
    current_directory = os.getcwd()
    print(current_directory)
    save_directory = current_directory + '/Outputs' 
    path = os.path.join(save_directory, r'show-running-config-CMD_Output_' + date + '/')
    # Check whether the specified path exists or not
    isExist = os.path.exists(path)

    if not isExist:
    # Create a new directory because it does not exist 
        os.makedirs(path)

    filename = path + str(device['id']) + '_' + device['hostname'] +'_' + date + '.txt'
    writeConfig(filename,config)

def writeConfig(filename, config):
    print (config)
    with open(filename, 'w') as f:
        f.writelines(config)

    with open(filename, 'r') as file:
        fileread = file.readlines()

    exclude = ["!"] #the lines that contains these words or characters will be excluded to clean up the output.

    #Overwrite the content of the file with the organised well structured data after excluding the lines we don't want to have in the client side.
    with open(filename, 'w') as f:
        for string in fileread:
            if not any(exclude[j] in string for j in range(len(exclude))):
                    f.write(string)
