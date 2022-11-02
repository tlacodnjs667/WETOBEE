-- migrate:up
CREATE TABLE spot_savings (
    id INT NOT NULL PRIMARY KEY,
    tourist_spot_id INT NULL,
    plan_id INT NOT NULL,
    spot_name VARCHAR(80) NULL,
    longtitude DECIMAL(18, 10) NOT NULL,
    latitude DECIMAL(18, 10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tourist_spot_id) REFERENCES tourist_spots(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE spot_savings;