-- migrate:up
ALTER TABLE users
DROP FOREIGN KEY users_ibfk_1;
ALTER TABLE users
CHANGE COLUMN gender_id gender INT NULL DEFAULT NULL ;
DROP TABLE genders;
ALTER TABLE users
CHANGE COLUMN gender gender VARCHAR(100) NULL DEFAULT NULL ;
ALTER TABLE users 
DROP COLUMN birthday;
ALTER TABLE users 
modify COLUMN kakao_id BIGINT NOT NULL;

-- migrate:down

