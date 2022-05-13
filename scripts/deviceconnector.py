#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import paramiko
from netmiko import ConnectHandler


def connection(os, address, username, password, cmd):
    net_connect = {
        'device_type': os,
        'host': address,
        'username': username,
        'password': password,
    }
    ssh = ConnectHandler(**net_connect)
    output = ssh .send_command(cmd)
    print(output)

