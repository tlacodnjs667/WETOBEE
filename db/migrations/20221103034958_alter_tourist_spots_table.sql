-- migrate:up
ALTER TABLE tourist_spots
    DROP longtitude,
    DROP latitude,
    ADD spot_data JSON NULL;
-- migrate:down

