-- migrate:up
CREATE TABLE spot_images (
    id INT NOT NULL PRIMARY KEY,
    tourist_spot_id INT NOT NULL,
    image VARCHAR(1000),
    longtitude DECIMAL(18, 10) NOT NULL,
    latitude DECIMAL(18, 10) NOT NULL,
    FOREIGN KEY (tourist_spot_id) REFERENCES tourist_spots(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE spot_images;