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
    img VARCHAR(255) DEFAULT '/sample_img/user.jpg',
    role_id INT NOT NULL DEFAULT 1,
    canteen_id INT DEFAULT NULL,
    ph_no VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    nrc VARCHAR(255) NOT NULL UNIQUE,
    roll_no VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    current_address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteen(id) ON DELETE SET NULL
);



CREATE TABLE Menu(
    id INT AUTO_INCREMENT PRIMARY KEY,
    canteen_id INT,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL DEFAULT '/sample_img/menu.jpg',
    price INT NOT NULL,
    FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
);

INSERT INTO Canteen (id, name, profile_img) VALUES
(1, 'Delecious Kitchen', '/canteen_img/canteen1.png'),
(2, 'Food Conner', '/canteen_img/canteen2.png'),
(3, 'U Shwe Yoe', '/canteen_img/canteen3.png'),
(4, 'Myanmmar Foodies House', '/canteen_img/canteen4.png'),
(5, 'Aung Thu Ka', '/canteen_img/canteen5.png'),
(6, 'Tharaphu', '/canteen_img/canteen6.png');

INSERT INTO Menu (canteen_id, name, img, price) VALUES
(1, 'Breakfast Combo Set 1', '/menu_img/food1.jpeg', 3200),
(2, 'Rice and Bean', '/menu_img/food2.jpg', 1500),
(3, 'Nan Gyi Toke', '/menu_img/food3.jpg', 1500),
(4, 'Palartar', '/menu_img/food4.jpg', 1500),
(5, 'Mohinga', '/menu_img/food5.jpg', 2500),
(6, 'Mohinga with fried beans', '/menu_img/food6.jpg', 1500);

INSERT INTO Menu (canteen_id, name, price) VALUES
(1, 'Chicken Rice', 45),
(1, 'Veggie Burger', 50),
(1, 'Spaghetti Bolognese', 60),
(2, 'Beef Noodles', 55),
(2, 'Tofu Salad', 40),
(2, 'Fried Rice', 50),
(3, 'Grilled Chicken', 65),
(3, 'Paneer Wrap', 45),
(3, 'Egg Sandwich', 35),
(4, 'Fish Curry', 70),
(4, 'Pasta Alfredo', 60),
(4, 'Club Sandwich', 55),
(5, 'Mutton Biryani', 75),
(5, 'Chow Mein', 50),
(5, 'Caesar Salad', 45),
(6, 'Sushi Set', 80),
(6, 'Katsu Don', 65),
(6, 'Miso Ramen', 70);

INSERT INTO Role (id,name) VALUES 
(1,'student'),
(2,'canteen_owner'),
(3,'master');

INSERT INTO User (role_id,canteen_id, ph_no, name, nrc, roll_no, major, current_address, password) VALUES
(1, NULL, '0911111111', 'Headmaster U Aung', '12/MaKaNa(N)123456', 'HM001', 'Administration', 'Yangon', 'pass123'),
(1, NULL, '0933333331', 'Student Kyaw', '12/MaKaNa(N)123463', 'S001', 'IT', 'Yangon', 'pass123'),
(1, NULL, '0933333332', 'Su', '12/MaKaNa(N)123464', 'S002', 'Engineering', 'Mandalay', 'pass123'),
(1, NULL, '0933333333', 'Htet', '12/MaKaNa(N)123465', 'S003', 'Business', 'Magway', 'pass123'),
(2, 1, '0922222222', 'Daw Mya', '12/MaKaNa(N)123457', 'T001', 'Math', 'Mandalay', 'pass123'),
(2, 2, '0922222223', 'Ko Ko', '12/MaKaNa(N)123458', 'T002', 'Physics', 'Yangon', 'pass123'),
(2, 3, '0922222224', 'Hla Hla', '12/MaKaNa(N)123459', 'T003', 'Chemistry', 'Naypyidaw', 'pass123'),
(2, 4, '0922222225', 'Moe Moe', '12/MaKaNa(N)123460', 'T004', 'Biology', 'Taunggyi', 'pass123'),
(2, 5, '0922222226', 'Aye Aye', '12/MaKaNa(N)123461', 'T005', 'English', 'Bago', 'pass123'),
(2, 6, '0922222227', 'Zaw Zaw', '12/MaKaNa(N)123462', 'T006', 'History', 'Pathein', 'pass123');

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    phone VARCHAR(15),
    major VARCHAR(100),
    current_location VARCHAR(255),
    special_request TEXT,  
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

INSERT INTO Orders (current_location,user_id,name,phone,major,special_request)
VALUES ("CTCIII",1,"mg mg","092343143","CS","No Nan Nan Pin");

INSERT INTO OrderItems (order_id,user_id, canteen_id, menu_id, quantity, price, total_price)
VALUES (1,1,1, 1, 2,3200,6400);
