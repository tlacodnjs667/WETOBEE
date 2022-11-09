-- migrate:up
CREATE TABLE markers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    plan_id INT NOT NULL,
    city_id INT NOT NULL,
    longtitude DECIMAL(18, 10) NOT NULL,
    latitude DECIMAL(18, 10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)

)

-- migrate:down
DROP TABLE makers;

