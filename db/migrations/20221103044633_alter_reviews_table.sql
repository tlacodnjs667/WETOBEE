-- migrate:up
ALTER TABLE reviews
    MODIFY thumbnail VARCHAR(1000);
-- migrate:down

