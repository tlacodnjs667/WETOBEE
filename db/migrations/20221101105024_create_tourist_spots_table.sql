-- migrate:up
CREATE TABLE tourist_spots (
    id INT NOT NULL PRIMARY KEY,
    city_id  INT NOT NULL,
    name VARCHAR(100),
    description VARCHAR(500),
    thumbnail VARCHAR(500),
    FOREIGN KEY (city_id) REFERENCES cities(id)
)
-- migrate:down
DROP TABLE tourist_spots;