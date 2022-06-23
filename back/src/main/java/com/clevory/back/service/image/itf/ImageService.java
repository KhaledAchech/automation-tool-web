package com.clevory.back.service.image.itf;

import com.clevory.back.model.image.Image;
import com.clevory.back.model.user.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    Image uploadImage (MultipartFile file) throws IOException;
    Image getImage(String imageName);
    Image getImageByUser();

    void deleteUserImages(User user);
}
