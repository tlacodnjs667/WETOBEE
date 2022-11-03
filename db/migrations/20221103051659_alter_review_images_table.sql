-- migrate:up
ALTER TABLE review_images
    MODIFY image VARCHAR(1000);
-- migrate:down

