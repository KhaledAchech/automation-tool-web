package com.clevory.back.commun.managers;

import org.springframework.stereotype.Component;

@Component
public class ScriptManager {

    public boolean runDevicesNeighbors ()
    {
        try
        {
            System.out.println("Waiting for the script to finish gathering data ...");

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
}
