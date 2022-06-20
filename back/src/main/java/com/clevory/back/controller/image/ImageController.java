package com.clevory.back.controller.image;

import com.clevory.back.model.image.Image;
import com.clevory.back.service.image.itf.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService)
    {
        super();
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public Image uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        return imageService.uploadImage(file);
    }

    @GetMapping(path = { "/get/{imageName}" })
    public Image getImage(@PathVariable("imageName") String imageName) throws IOException {

        return imageService.getImage(imageName);
    }

    @GetMapping(path = { "/profile/picture" })
    public Image getImage() throws IOException {

        return imageService.getImageByUser();
    }
}
