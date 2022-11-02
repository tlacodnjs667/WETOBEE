-- migrate:up
ALTER TABLE orders
    MODIFY column order_status_id INT NOT NULL DEFAULT 1;
-- migrate:down

