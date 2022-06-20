package com.clevory.back.service.image.impl;

import com.clevory.back.model.image.Image;
import com.clevory.back.model.user.User;
import com.clevory.back.repository.image.ImageRepository;
import com.clevory.back.repository.user.UserRepository;
import com.clevory.back.service.image.itf.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private ImageRepository imageRepository;
    private UserRepository userRepository;

    @Override
    public Image uploadImage(MultipartFile file) throws IOException {

        //Getting the connected user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername((String) auth.getPrincipal());

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Image img = new Image(file.getOriginalFilename(), file.getContentType(),
                                file.getBytes());

        img.setUser(user);

        //System.out.println(img.getPicByte());
        imageRepository.save(img);

        return img;
    }

    @Override
    public Image getImage(String imageName) {
        final Optional<Image> retrievedImage = imageRepository.findByName(imageName);
        Image img = new Image(retrievedImage.get().getName(),
                                retrievedImage.get().getType(),
                                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }

    @Override
    public Image getImageByUser() {

        //Getting the connected user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername((String) auth.getPrincipal());

        List<Image> retrievedImages = imageRepository.findByUser(user);

        if (retrievedImages.isEmpty())
            return null;

        //last added image
        Image retrievedImage = retrievedImages.get(retrievedImages.size()-1);

        Image img = new Image(retrievedImage.getName(),
                retrievedImage.getType(),
                retrievedImage.getPicByte());
        return img;
    }

    @Override
    public void deleteUserImages(User user) {
        List<Image> retrievedImages = imageRepository.findByUser(user);
        if (!retrievedImages.isEmpty())
            imageRepository.deleteAll(retrievedImages);
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}
