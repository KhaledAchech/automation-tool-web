#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import paramiko
from netmiko import ConnectHandler
import json


def connection(os, address, username, password, cmd):
    net_connect = {
        'device_type': os,
        'host': address,
        'username': username,
        'password': password,
    }
    try:
        ssh = ConnectHandler(**net_connect)
        output = ssh.send_command(cmd, use_textfsm=True)
        print(output)
    except ConnectionRefusedError as err:
        print(f"Connection Refused: {err}")
    except TimeoutError as err:
        print(f"Connection Refused: {err}")
    except Exception as err:
        print(f"Oops! {err}")
        pass

