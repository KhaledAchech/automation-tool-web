#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import mysql.connector
from numpy import result_type

def connect(host, user, password, database):
    return (mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    ))


def fetchData(instance, tablename):
    mycursor = instance.cursor()

    mycursor.execute("SELECT * FROM "+tablename)
    res = mycursor.fetchall()

    result = []

    for data in res:
      print("Device : ", data[6], " with id: ", data[0])
      print("Device os: ", data[4])
      print("Device ip address: ", data[10])
      result.append( 
          {
              'id': data[0],
              'hostname': data[6],
              'os': data[4],
              'ip_address': data[10]
           })
      print ("-----------------------------------------------------------------")

    return result
