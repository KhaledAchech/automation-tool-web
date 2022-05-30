#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

from netmiko import ConnectHandler
from outputhandler import writeNeighbors


def showCdpNeighbors(device, username, password):
    net_connect = {
        'device_type': device['os'],
        'host':  device['ip_address'],
        'username': username,
        'password': password,
    }
    try:
        ssh = ConnectHandler(**net_connect)
        ####################### For Debug ########################
        #output = ssh.send_command("show cdp neighbors")        #
        #print(output)                                          #
        ##########################################################
        neighbors = ssh.send_command("show cdp neighbors", use_textfsm=True)
        writeNeighbors(device, neighbors)
    except ConnectionRefusedError as err:
        print(f"Connection Refused: {err}")
    except TimeoutError as err:
        print(f"Connection Refused: {err}")
    except Exception as err:
        print(f"Oops! {err}")
        pass

