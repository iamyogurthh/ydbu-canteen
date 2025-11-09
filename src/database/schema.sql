DROP DATABASE IF EXISTS canteen;
CREATE DATABASE canteen CHARACTER SET utf8mb4;
USE canteen;

CREATE TABLE Role(
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Canteen(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    cover_img VARCHAR(255) DEFAULT '/sample_img/background.jpg',
    profile_img VARCHAR(255) DEFAULT '/sample_img/canteen.jpg'
);

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL DEFAULT 1,
    canteen_id INT DEFAULT NULL,
    ph_no VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    nrc VARCHAR(255) NOT NULL UNIQUE,
    current_address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteen(id) ON DELETE SET NULL
);



CREATE TABLE Menu(
    id INT AUTO_INCREMENT PRIMARY KEY,
    canteen_id INT,
    name VARCHAR(255) NOT NULL,
    quantity INT,
    img VARCHAR(255) NOT NULL DEFAULT '/sample_img/menu.jpg',
    status ENUM('available','notavailable') DEFAULT 'available',
    price INT NOT NULL,
    FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
);

INSERT INTO Canteen (id, name,profile_img) VALUES
(1, 'Delecious Kitchen', '/canteen_img/canteen1.png'),
(2, 'Food Conner', '/canteen_img/canteen2.png'),
(3, 'U Shwe Yoe', '/canteen_img/canteen3.png'),
(4, 'Myanmmar Foodies House', '/canteen_img/canteen4.png'),
(5, 'Aung Thu Ka', '/canteen_img/canteen5.png'),
(6, 'Tharaphu', '/canteen_img/canteen6.png');

INSERT INTO Menu (canteen_id, name, quantity, img, price) VALUES
(1, 'Breakfast Combo Set 1',5, '/menu_img/food1.jpeg', 3200),
(2, 'Rice and Bean',5, '/menu_img/food2.jpg', 1500),
(3, 'Nan Gyi Toke',5, '/menu_img/food3.jpg', 1500),
(4, 'Palartar',5, '/menu_img/food4.jpg', 1500),
(5, 'Mohinga', 5,'/menu_img/food5.jpg', 2500),
(6, 'Mohinga with fried beans', 5,'/menu_img/food6.jpg', 1500);

INSERT INTO Menu (canteen_id, name,quantity, price) VALUES
(1, 'Chicken Rice',5, 45),
(1, 'Veggie Burger', 5,50),
(1, 'Spaghetti Bolognese',5, 60),
(2, 'Beef Noodles', 5,55),
(2, 'Tofu Salad',5, 40),
(2, 'Fried Rice',5, 50),
(3, 'Grilled Chicken',5, 65),
(3, 'Paneer Wrap',5, 45),
(3, 'Egg Sandwich',5, 35),
(4, 'Fish Curry',5, 70),
(4, 'Pasta Alfredo',5, 60),
(4, 'Club Sandwich',5, 55),
(5, 'Mutton Biryani', 5,75),
(5, 'Chow Mein', 5,50),
(5, 'Caesar Salad',5, 45),
(6, 'Sushi Set', 5,80),
(6, 'Katsu Don', 5,65),
(6, 'Miso Ramen',5, 70);

INSERT INTO Role (id,name) VALUES 
(1,'student'),
(2,'canteen_owner'),
(3,'master');

INSERT INTO User (role_id,canteen_id, ph_no, name, nrc, current_address, password) VALUES
(1, NULL, '0911111111', 'Headmaster U Aung', '12/MaKaNa(N)123456', 'Yangon', 'pass123'),
(1, NULL, '0933333331', 'Student Kyaw', '12/MaKaNa(N)123463', 'Yangon', 'pass123'),
(1, NULL, '0933333332', 'Su', '12/MaKaNa(N)123464', 'Mandalay', 'pass123'),
(1, NULL, '0933333333', 'Htet', '12/MaKaNa(N)123465', 'Magway', 'pass123'),
(2, 1, '0922222222', 'Daw Mya', '12/MaKaNa(N)123457','Mandalay', 'pass123'),
(2, 2, '0922222223', 'Ko Ko', '12/MaKaNa(N)123458', 'Yangon', 'pass123'),
(2, 3, '0922222224', 'Hla Hla', '12/MaKaNa(N)123459', 'Naypyidaw', 'pass123'),
(2, 4, '0922222225', 'Moe Moe', '12/MaKaNa(N)123460',  'Taunggyi', 'pass123'),
(2, 5, '0922222226', 'Aye Aye', '12/MaKaNa(N)123461', 'Bago', 'pass123'),
(2, 6, '0922222227', 'Zaw Zaw', '12/MaKaNa(N)123462', 'Pathein', 'pass123');

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    phone VARCHAR(15),
    current_location VARCHAR(255),
    status ENUM('pending','delivered') DEFAULT 'pending',     
    order_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    user_id INT,
    canteen_id INT,
    menu_id INT,
    quantity INT,
    price DECIMAL(10,2),       
    total_price DECIMAL(10,2), 
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteen(id) ON DELETE CASCADE,    
    FOREIGN KEY (menu_id) REFERENCES Menu(id) ON DELETE CASCADE
);

INSERT INTO Orders (current_location,user_id,name,phone)
VALUES ("CTCIII",1,"mg mg","092343143");

INSERT INTO OrderItems (order_id,user_id, canteen_id, menu_id, quantity, price, total_price)
VALUES (1,1,1, 1, 2,3200,6400);
