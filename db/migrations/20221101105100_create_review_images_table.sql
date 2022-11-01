-- migrate:up
CREATE TABLE review_images (
    id INT NOT NULL PRIMARY KEY,
    review_id INT NOT NULL,
    image VARCHAR(3000),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);
-- migrate:down
DROP TABLE review_images;