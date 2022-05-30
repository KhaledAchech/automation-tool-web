package com.clevory.back.commun.managers;

import org.springframework.stereotype.Component;

@Component
public class ScriptManager {

    public boolean runDevicesNeighbors ()
    {
        try
        {
            System.out.println("Waiting for the show cdp neighbors on all devices result ...");

            String command = "cmd.exe /c start /wait python scripts/cmdrunner.py 0";
            Process proc = Runtime.getRuntime().exec(command);

            System.out.println(proc);
            proc.waitFor();
            System.out.println("Done!");
            return true;
        }
        catch (Exception e)
        {
            System.out.println("Something went wrong ...");
            e.printStackTrace();
            return false;
        }
    }

    public boolean runDeviceNeighbor (String device_id)
    {
        try
        {
            System.out.println("Waiting for the show cdp neighbors on one device result ...");

            String command = "cmd.exe /c start /wait python scripts/cmdrunner.py 1 " + device_id;
            Process proc = Runtime.getRuntime().exec(command);

            System.out.println(proc);
            proc.waitFor();
            System.out.println("Done!");
            return true;
        }
        catch (Exception e)
        {
            System.out.println("Something went wrong ...");
            e.printStackTrace();
            return false;
        }
    }
}
