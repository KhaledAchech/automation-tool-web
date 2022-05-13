#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import mysql.connector


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

    for data in res:
      print(data)
