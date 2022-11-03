-- migrate:up
CREATE TABLE plans (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    selling_status_id INT NOT NULL,
    category_id INT NOT NULL,
    plan_price DECIMAL(8,2) NOT NULL,
    sell_count INT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (selling_status_id) REFERENCES selling_status(id),
    FOREIGN KEY (category_id) REFERENCES categories(id));
-- migrate:down
DROP TABLE plans;