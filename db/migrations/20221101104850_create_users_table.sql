-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    social_name VARCHAR(500) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    email VARCHAR(200) NULL,
    birthday INT NULL,
    gender_id INT NULL, --FK 설정
    point DECIMAL(10,2) DEFAULT 100000.00, --데시말  
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gender_id) REFERENCES genders(id)
)
-- migrate:down
DROP TABLE users;