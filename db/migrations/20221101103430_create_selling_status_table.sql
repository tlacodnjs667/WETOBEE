-- migrate:up
CREATE TABLE selling_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(300) NOT NULL
);
-- migrate:down
DROP TABLE selling_status;