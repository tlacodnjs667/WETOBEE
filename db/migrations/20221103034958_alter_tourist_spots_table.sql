-- migrate:up
ALTER TABLE tourist_spots
    MODIFY thumbnail VARCHAR(1000),
    DROP longtitude,
    DROP latitude,
    ADD spot_data JSON NULL;
-- migrate:down

