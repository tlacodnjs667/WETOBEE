-- migrate:up
ALTER TABLE plans
    MODIFY column sell_count INT NOT NULL DEFAULT 0;
-- migrate:down

