-- migrate:up
DROP TABLE spot_savings;
ALTER TABLE users CHANGE COLUMN kakao_id kakao_id INT NOT NULL ;

ALTER TABLE plans DROP FOREIGN KEY plans_ibfk_2;
ALTER TABLE plans CHANGE COLUMN selling_status_id selling_status_id INT NOT NULL DEFAULT 1 ,
CHANGE COLUMN plan_price plan_price DECIMAL(8,2) NULL DEFAULT 0 ;
ALTER TABLE plans 
ADD CONSTRAINT plans_ibfk_2
  FOREIGN KEY (selling_status_id)
  REFERENCES selling_status (id);

-- migrate:down

