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
    with open(filename, 'w') as f:
        f.writelines(config)

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
    with open(filename, 'w') as f:
        f.writelines(config)
    #json_dump(config, filename)