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
    created_at DATETIME DEFAULT now(),
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
    img VARCHAR(255) NOT NULL DEFAULT '/sample_img/menu.jpg',
    status ENUM('available','notavailable') DEFAULT 'available',
    price INT NOT NULL,
    FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
);

INSERT INTO Canteen (id, name,profile_img) VALUES
(1, 'ငွေအိုးစည်', '/canteen_img/ngay-owe-si.jpg'),
(2, 'လရိပ်မွန်', '/canteen_img/la-yate-mon.jpg'),
(3, 'လင်းလက်ကြယ်', '/canteen_img/linn-lat-kyal.jpg'),
(4, 'ကြည်ရတနာ', '/canteen_img/kyi-ya-da-nar.jpg'),
(5, 'ကောင်းကောင်း', '/canteen_img/kaung-kaung.jpg'),
(6,'လုံမလေး','/canteen_img/lone-ma-lay.jpg');

INSERT INTO Menu (canteen_id, name, price,img) VALUES
(1, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-1.jpg'),
(1, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-1.jpg'),
(1, 'လက်ဘက်ထမင်း', 2000,'/menu_img/la-phat-hta-min-1.jpg'),
(1, 'ကော်ဖီ', 1500,'/menu_img/coffee-1.jpg'),
(1, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-1.jpg'),
(1, 'လက်ဘက်သုပ်', 2000,'/menu_img/la-phat-thoke-1.jpg'),
(1, 'ပက်ရှူးထမင်း', 3500,'/menu_img/pat-shuu-1.jpg'),

(2, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-2.jpg'),
(2, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-2.jpg'),
(2, 'လက်ဘက်ထမင်း', 1500,'/menu_img/la-phat-hta-min-2.jpg'),
(2, 'ကော်ဖီ', 1500,'/menu_img/coffee-2.jpg'),
(2, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-2.jpg'),
(2, 'လက်ဘက်သုပ်', 1500,'/menu_img/la-phat-thoke-2.jpg'),
(2, 'ပက်ရှူးထမင်း', 3000,'/menu_img/pat-shuu-2.jpg'),

(3, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-3.jpg'),
(3, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-3.jpg'),
(3, 'လက်ဘက်ထမင်း', 1800,'/menu_img/la-phat-hta-min-3.jpg'),
(3, 'ကော်ဖီ', 2000,'/menu_img/coffee-3.jpg'),
(3, 'ရှမ်းခေါက်ဆွဲ', 1500,'/menu_img/shan-3.jpg'),
(3, 'လက်ဘက်သုပ်', 2000,'/menu_img/la-phat-thoke-3.jpg'),
(3, 'ပက်ရှူးထမင်း', 3000,'/menu_img/pat-shuu-3.jpg'),

(4, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-4.jpg'),
(4, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-4.jpg'),
(4, 'လက်ဘက်ထမင်း', 1800,'/menu_img/la-phat-hta-min-4'),
(4, 'ကော်ဖီ', 1500,'/menu_img/coffee-4.jpg'),
(4, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-4.jpg'),
(4, 'လက်ဘက်သုပ်', 2000,'/menu_img/la-phat-thoke-4.jpg'),
(4, 'ပက်ရှူးထမင်း', 2500,'/menu_img/pat-shuu-4.jpg'),

(5, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-5.jpg'),
(5, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-5.jpg'),
(5, 'လက်ဘက်ထမင်း', 1800,'/menu_img/la-phat-hta-min-5.jpg'),
(5, 'ကော်ဖီ', 2000,'/menu_img/coffee-5.jpg'),
(5, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-5.jpg'),
(5, 'လက်ဘက်သုပ်', 1500,'/menu_img/la-phat-thoke-5.jpg'),
(5, 'ပက်ရှူးထမင်း', 3500,'/menu_img/pat-shuu-5.jpg'),

(6, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-6.jpg'),
(6, 'ထမင်းဆီစမ်း', 1000,'/menu_img/hta-min-see-san-6.jpg'),
(6, 'လက်ဘက်ထမင်း', 1800,'/menu_img/la-phat-hta-min-6.jpg'),
(6, 'ကော်ဖီ', 2000,'/menu_img/coffee-6.jpg'),
(6, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-6.jpg'),
(6, 'လက်ဘက်သုပ်', 1600,'/menu_img/la-phat-thoke-6.jpg'),
(6, 'ပက်ရှူးထမင်း', 3600,'/menu_img/pat-shuu-6.jpg');

INSERT INTO Role (id,name) VALUES 
(1,'student'),
(2,'canteen_owner'),
(3,'admin');

INSERT INTO User (role_id,canteen_id, ph_no, name, nrc, current_address, password) VALUES
(3, NULL, '0911111111', 'Headmaster U Aung', '12/MaKaNa(N)123456', 'Yangon', 'pass123'),
(1, NULL, '0933333331', 'Student Kyaw', '12/MaKaNa(N)123463', 'Yangon', 'pass123'),
(1, NULL, '0933333332', 'Su', '12/MaKaNa(N)123464', 'Mandalay', 'pass123'),
(1, NULL, '0933333333', 'Htet', '12/MaKaNa(N)123465', 'Magway', 'pass123'),
(2, 1, '0922222222', 'Daw Mya', '12/MaKaNa(N)123457','Mandalay', 'pass123'),
(2, 2, '0922222223', 'Ko Ko', '12/MaKaNa(N)123458', 'Yangon', 'pass123'),
(2, 3, '0922222224', 'Hla Hla', '12/MaKaNa(N)123459', 'Naypyidaw', 'pass123'),
(2, 4, '0922222225', 'Moe Moe', '12/MaKaNa(N)123460',  'Taunggyi', 'pass123'),
(2, 5, '0922222226', 'Aye Aye', '12/MaKaNa(N)123461', 'Bago', 'pass123');

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    phone VARCHAR(15),
    current_location VARCHAR(255),
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
    status ENUM('pending','delivered') DEFAULT 'pending',      
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteen(id) ON DELETE CASCADE,    
    FOREIGN KEY (menu_id) REFERENCES Menu(id) ON DELETE CASCADE
);

INSERT INTO Orders (current_location,user_id,name,phone)
VALUES ("CTCIII",1,"mg mg","092343143");

INSERT INTO OrderItems (order_id,user_id, canteen_id, menu_id, quantity, price, total_price)
VALUES (1,1,1, 1, 2,3200,6400);
