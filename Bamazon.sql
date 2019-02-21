DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT(11), NOT NULL AUTO_INCREMENT
product_name VARCHAR (100),
department_name VARCHAR (50),
price DECIMAL (50,2) NOT NULL,
stock_quantity INT(30) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM bamazon_db.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("garden hose", "garden", 10.50, 4); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shovel", "garden", 12.75, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rake", "garden", 7.25, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spatula", "kitchen", 6.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen", 15.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("frying pan", "kicthen", 7.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dvd player", "electronics", 35.75, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 45.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drill", "tools", 15.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hammer", "tools", 15.00, 6);