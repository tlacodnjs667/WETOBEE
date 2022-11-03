-- migrate:up
ALTER TABLE plans
    MODIFY column start_date DATETIME DEFAULT NOW(),
    MODIFY column end_date DATETIME DEFAULT NOW();
-- migrate:down

