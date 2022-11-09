-- migrate:up
ALTER TABLE reviews
    DROP title;
-- migrate:down

