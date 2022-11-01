-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content VARCHAR(3000) NOT NULL,
    thumbnail VARCHAR(3000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)
-- migrate:down
DROP TABLE reviews;