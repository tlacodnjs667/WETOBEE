-- migrate:up
ALTER TABLE spot_savings 
    DROP longtitude,
    DROP latitude,
    ADD spot_data JSON NOT NULL;
-- migrate:down
ALTER TABLE spot_savings 
    ADD longtitude DECIMAL(18, 10) NOT NULL,
    ADD latitude DECIMAL(18, 10) NOT NULL,
    DROP spot_data JSON NOT NULL;