-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kakao_id VARCHAR(500) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    nickname VARCHAR(50) NULL,
    email VARCHAR(200) NULL,
    birthday DATE NULL,
    gender_id INT NULL, 
    point DECIMAL(10,2) DEFAULT 100000.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gender_id) REFERENCES genders(id)
)
-- migrate:down
DROP TABLE users;