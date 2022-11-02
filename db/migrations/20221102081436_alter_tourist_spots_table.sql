-- migrate:up
ALTER TABLE tourist_spots 
    ADD longtitude DECIMAL(18, 10) NOT NULL,
    ADD latitude DECIMAL(18, 6) NOT NULL;
-- migrate:down
ALTER TABLE tourist_spots 
    DROP longtitude, 
    DROP latitude;