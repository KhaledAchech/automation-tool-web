package com.clevory.back.controller.script;

import com.clevory.back.commun.managers.ScriptManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/dcAutomation")
public class DeviceConnectionAutomationController {

    private ScriptManager scriptManager;

    public DeviceConnectionAutomationController(ScriptManager scriptManager){
        this.scriptManager = scriptManager;
    }
    @GetMapping
    public List<JSONObject> getAllDevicesNeighbors() throws IOException {

        ArrayList<JSONObject> res = new ArrayList<>();

        JSONParser jsonParser = new JSONParser();

        if(this.scriptManager.runDevicesNeighbors())
        {
            String outputDir = getDir();

            File folder = new File(outputDir);
            File[] listOfFiles = folder.listFiles();

            for (int i = 0; i < listOfFiles.length; i++)
            {
                if (listOfFiles[i].isFile())
                {
                    String clsPath =  new ClassPathResource(outputDir+"/" +listOfFiles[i].getName()).getPath();

                    try (FileReader reader = new FileReader(clsPath))
                    {
                        //Read JSON file
                        Object obj = jsonParser.parse(reader);

                        JSONArray neighborsList = (JSONArray) obj;
                        res = neighborsList;

                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                }
            }

            //String clsPath =  new ClassPathResource(outputDir+"/38_G10_17-05-2022.json").getPath();

            //System.out.println(new String(Files.readAllBytes(Path.of(clsPath))));

        }

        return res;
    }

    private String getDir()
    {
        LocalDate date = LocalDate.now();

        String day = "";
        if (date.getDayOfMonth() < 10)
            day = "0" + date.getDayOfMonth();
        else
            day = String.valueOf(date.getDayOfMonth());

        String month = "";
        if (date.getMonthValue() < 10)
            month = "0" + date.getMonthValue() ;
        else
            month = String.valueOf(date.getMonthValue());

        String year =String.valueOf(date.getYear());


        String outputDir = "Outputs/show-cdp-neighbors-CMD_Output_" +
               day + "-" + month + "-" + year;

        return outputDir;
    }

    /*
    private static JSONObject parseNeighborObject(JSONObject neighbor)
    {
        JSONObject neighborDetails = new JSONObject();

        neighborDetails.put("neighbor", (String) neighbor.get("neighbor"));
        neighborDetails.put("capability", (String) neighbor.get("capability"));
        neighborDetails.put("local_interface", (String) neighbor.get("local_interface"));
        neighborDetails.put("platform", (String) neighbor.get("platform"));
        neighborDetails.put("neighbor_interface", (String) neighbor.get("neighbor_interface"));

        JSONObject neighborObject = new JSONObject();
        neighborObject.put("neighbor", neighborDetails);

        return neighborObject;
    }
    */
}
