CREATE DATABASE shop_db;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC CHECK (price>=0),
    stock INTEGER
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (name, price, stock) VALUES ('Яблоко', 4.5, 10);
INSERT INTO products (name, price, stock) VALUES ('Картошка', 1.5, 15);
INSERT INTO products (name, price, stock) VALUES ('Гранат', 5.5, 20);

INSERT INTO orders (product_id, quantity) VALUES (1, 5);
INSERT INTO orders (product_id, quantity) VALUES (2, 4);
INSERT INTO orders (product_id, quantity) VALUES (2, 5);
INSERT INTO orders (product_id, quantity) VALUES (3, 1);
INSERT INTO orders (product_id, quantity) VALUES (2, 10);


SELECT * FROM products;
SELECT * FROM products WHERE name = 'Яблоко';


SELECT product_id, SUM(quantity) as total_quantity
FROM orders
GROUP BY product_id
ORDER BY product_id;

SELECT p.name, COUNT(o.id) as order_count
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY p.name
ORDER BY p.name;





SELECT 
    COUNT(*) as product_count,
    SUM(price) as total_sum,
    AVG(price) as average_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM products;




SELECT 
    DATE(created_at) as sale_date,
    SUM(price) as daily_revenue
FROM orders 
GROUP BY sale_date
ORDER BY sale_date;




SELECT 
    DATE_TRUNC('month', created_at) as sale_month,
    SUM(price) as monthly_revenue
FROM orders 
GROUP BY sale_month
ORDER BY sale_month;


SELECT 
    EXTRACT(YEAR FROM created_at) as sale_year,
    SUM(price) as yearly_revenue
FROM orders 
GROUP BY sale_year
ORDER BY sale_year;


