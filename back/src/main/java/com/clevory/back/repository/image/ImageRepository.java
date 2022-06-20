package com.clevory.back.repository.image;

import com.clevory.back.model.image.Image;
import com.clevory.back.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
    List<Image> findByUser(User user);
}
