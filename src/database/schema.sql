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
(6,'လုံမလေး','/canteen_img/lone-ma-lay.jpg'),
(7,'အလင်္ကာ','/canteen_img/a-lin-kar.jpg'),
(8,'together','/canteen_img/together.jpg');


INSERT INTO Menu (canteen_id, name, price,img) VALUES
(1, 'ထမင်းဆီစမ်း', 1000,'/menu_img/see-san-1.jpg'),
(1, 'ဖက်ထုပ်ကြော်', 2000,'/menu_img/phat-kyaw-1.jpg'),
(1, 'လက်ဘက်ထမင်း', 2000,'/menu_img/laphat-1.jpg'),
(1, 'ဆန်ပြား', 2000,'/menu_img/san-pyar-1.jpg'),
(1, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-1.jpg'),
(1, 'လက်ဘက်သုပ်', 2000,'/menu_img/laphat-thoke-1.jpg'),
(1, 'ပက်ရှူးထမင်း', 3500,'/menu_img/pat-shuu-1.jpg'),
(1, 'အကင်ထောင်း', 3500,'/menu_img/a-kin-1.jpg'),
(1, 'အာလူးထမင်းကြော်', 3500,'/menu_img/arrluu-kyaw-1.jpg'),
(1, 'ကော်ဖီ', 1500,'/menu_img/coffee-1.jpg'),
(1, 'ထောပတ်သီးဖျော်ရည်', 3500,'/menu_img/avocado-1.jpg'),
(1, 'Pineapple juice', 3500,'/menu_img/pineapple-1.jpg'),
(1, 'dragon fruit juice', 2000,'/menu_img/dragon-1.jpg'),

(2, 'အာလူးထမင်းကြော်', 3500,'/menu_img/arrluu-kyaw-2.jpg'),
(2, 'အကင်ထောင်း', 3500,'/menu_img/a-kin-2.jpg'),
(2, 'ဆန်ပြား', 2000,'/menu_img/san-pyar-2.jpg'),
(2, 'ထမင်းဆီစမ်း', 1000,'/menu_img/see-san-2.jpg'),
(2, 'လက်ဘက်ထမင်း', 2000,'/menu_img/laphat-2.jpg'),
(2, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-2.jpg'),
(2, 'လက်ဘက်သုပ်', 2000,'/menu_img/laphat-thoke-2.jpg'),
(2, 'ပက်ရှူးထမင်း', 3500,'/menu_img/pat-shuu-2.jpg'),
(2, 'ပင်လယ်စာထမင်းကြော်', 3500,'/menu_img/sea-kyaw-1.jpg'),
(2, 'ကဗလာသီး', 3500,'/menu_img/gabalar-1.jpg'),
(2, 'ကော်ဖီ', 1500,'/menu_img/coffee-2.jpg'),
(2, 'Pineapple juice', 3500,'/menu_img/pineapple-2.jpg'),
(2, 'dragon fruit juice', 2000,'/menu_img/dragon-3.jpg'),

(3, 'ပင်လယ်စာထမင်းကြော်', 3500,'/menu_img/sea-kyaw-2.jpg'),
(3, 'အာလူးထမင်းကြော်', 3500,'/menu_img/arrluu-kyaw-3.jpg'),
(3, 'မာလာမောက်ချိုက်', 3500,'/menu_img/malar-mout-1.jpg'),
(3, 'အကင်ထောင်း', 3500,'/menu_img/a-kin-3.jpg'),
(3, 'ထမင်းဆီစမ်း', 1000,'/menu_img/see-san-3.jpg'),
(3, 'ကျောက်ပွင့်သုပ်', 1500,'/menu_img/kyout-5.jpg'),
(3, 'လက်ဘက်ထမင်း', 2000,'/menu_img/laphat-3.jpg'),
(3, 'ကော်ဖီ', 1500,'/menu_img/coffee-3.jpg'),
(3, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-3.jpg'),
(3, 'လက်ဘက်သုပ်', 2000,'/menu_img/laphat-thoke-3.jpg'),
(3, 'ပက်ရှူးထမင်း', 3500,'/menu_img/pat-shuu-1.jpg'),
(3, 'ကဗလာသီး', 3500,'/menu_img/gabalar-2.jpg'),
(3, 'Pineapple juice', 3500,'/menu_img/pineapple-4.jpg'),
(3, 'Strawberry juice', 3500,'/menu_img/straw-1.jpg'),
(3, 'dragon fruit juice', 2000,'/menu_img/dragon-2.jpg'),

(4, 'မာလာမောက်ချိုက်', 3500,'/menu_img/malar-mout-2.jpg'),
(4, 'မြေအိုးမြှီးရှည်', 3500,'/menu_img/pot-mee-2.jpg'),
(4, 'ထမင်းဆီစမ်း', 1000,'/menu_img/see-san-4.jpg'),
(4, 'ရှမ်းခေါက်ဆွဲ', 2000,'/menu_img/shan-4.jpg'),
(4, 'ကျောက်ပွင့်သုပ်', 1500,'/menu_img/kyout-4.jpg'),
(4, 'လက်ဘက်သုပ်', 2000,'/menu_img/laphat-thoke-4.jpg'),
(4, 'ငါးသေတ္တာထမင်းကြော်', 3500,'/menu_img/fish-2.jpg'),
(4, 'ပင်လယ်စာထမင်းကြော်', 3500,'/menu_img/sea-kyaw-3.jpg'),
(4, 'ဖက်ထုပ်ကြော်', 2000,'/menu_img/phat-kyaw-4.jpg'),
(4, 'ဆိတ်ထောင်းထမင်း', 2000,'/menu_img/sate-1.jpg'),
(4, 'ပြောင်းဖူးထမင်းကြော်', 3500,'/menu_img/corn-kyaw-2.jpg'),
(4, 'bubble tea', 3500,'/menu_img/bubble-4.jpg'),
(4, 'ထောပတ်သီးဖျော်ရည်', 3500,'/menu_img/avocado-2.jpg'),
(4, 'Pineapple juice', 3500,'/menu_img/pineapple-3.jpg'),
(4, 'Strawberry juice', 3500,'/menu_img/straw-2.jpg'),
(4, 'Orange juice', 3500,'/menu_img/orange-1.jpg'),
(4, 'Kiwi juice', 3500,'/menu_img/kiwi-4.jpg'),


(5, 'ပြောင်းဖူးထမင်းကြော်', 3500,'/menu_img/corn-kyaw-3.jpg'),
(5, 'မြေအိုးမြှီးရှည်', 3500,'/menu_img/pot-mee-1.jpg'),
(5, 'လက်ဘက်သုပ်', 1500,'/menu_img/laphat-thoke-5.jpg'),
(5, 'ကျောက်ပွင့်သုပ်', 1500,'/menu_img/kyout-1.jpg'),
(5, 'ငါးသေတ္တာထမင်းကြော်', 3500,'/menu_img/fish-1.jpg'),
(5, 'မုန့်တီသုပ်', 3500,'/menu_img/mont-ti-1.jpg'),
(5, 'မာလာထမင်းကြော်', 3500,'/menu_img/malar-kyaw-1.jpg'),
(5, 'ဆိတ်ထောင်းထမင်း', 2000,'/menu_img/sate-2.jpg'),
(5, 'ဖက်ထုပ်ပေါင်း', 3500,'/menu_img/phat-htoke-pound-1.jpg'),
(5, 'သီးစုံထမင်းကြော်', 3500,'/menu_img/tee-sone-1.jpg'),
(5, 'ရှောက်သီးသုပ်', 3500,'/menu_img/shout-thoke-1.jpg'),
(5, 'မာလာရှမ်းကော', 3500,'/menu_img/mar-shan-1.jpg'),
(5, 'ထောပတ်သီးဖျော်ရည်', 3500,'/menu_img/avocado-3.jpg'),
(5, 'bubble tea', 3500,'/menu_img/bubble-3.jpg'),
(5, 'Pineapple juice', 3500,'/menu_img/pineapple-4.jpg'),
(5, 'Orange juice', 3500,'/menu_img/orange-2.jpg'),

(6, 'မာလာရှမ်းကော', 3500,'/menu_img/mar-shan-2.jpg'),
(6, 'ဖက်ထုပ်ပေါင်း', 3500,'/menu_img/phat-htoke-pound-2.jpg'),
(6, 'ရှောက်သီးသုပ်', 3500,'/menu_img/shout-thoke-2.jpg'),
(6, 'ကျောက်ပွင့်သုပ်', 1500,'/menu_img/kyout-2.jpg'),
(6, 'တုန်ယမ်းထမင်းကြော်', 3500,'/menu_img/tone-yan-4.jpg'),
(6, 'ထမင်းကြော်', 2000,'/menu_img/hta-min-kyaw-1.jpg'),
(6, 'မာလာထမင်းကြော်', 3500,'/menu_img/malar-kyaw-2.jpg'),
(6, 'ကြက်ဥထမင်းလိပ်', 2000,'/menu_img/egg-late-1'),
(6, 'မုန့်တီသုပ်', 3500,'/menu_img/mont-ti-2.jpg'),
(6, 'Spicy သုပ်', 3500,'/menu_img/spicy-2.jpg'),
(6, 'bubble tea', 3500,'/menu_img/bubble-2.jpg'),
(6, 'Orange juice', 3500,'/menu_img/orange-3.jpg'),
(6, 'lime juice', 3500,'/menu_img/lime.jpg'),
(6, 'Kiwi juice', 3500,'/menu_img/kiwi-3.jpg'),

(7, 'Spicy သုပ်', 3500,'/menu_img/spicy-3.jpg'),
(7, 'မန်းလေးထမင်းပေါင်း', 3500,'/menu_img/mdy-pound-2.jpg'),
(7, 'တုန်ယမ်းထမင်းကြော်', 3500,'/menu_img/tone-yan-2.jpg'),
(7, 'ကျောက်ပွင့်သုပ်', 1500,'/menu_img/kyout-3.jpg'),
(7, 'မာလာထမင်းကြော်', 3500,'/menu_img/malar-kyaw-3.jpg'),
(7, 'မုန့်တီသုပ်', 3500,'/menu_img/mont-ti-3.jpg'),
(7, 'မြေအိုးမြှီးရှည်', 3500,'/menu_img/pot-mee-3.jpg'),
(7, 'အာလူးမာလာ', 3500,'/menu_img/arrluu-malar-1.jpg'),
(7, 'ခေါက်ဆွဲကြော်', 3500,'/menu_img/kHout-swe-1.jpg'),
(7, 'ဂျင်းသုပ်', 3500,'/menu_img/jin-thoke-1.jpg'),
(7, 'ကြာဇံကြော်', 3500,'/menu_img/kyar-san-1.jpg'),
(7, 'bubble tea', 3500,'/menu_img/bubble-1.jpg'),
(7, 'lemon tea', 3500,'/menu_img/lemon-1.jpg'),
(7, 'lime juice', 3500,'/menu_img/lime-2.jpg'),
(7, 'Kiwi juice', 3500,'/menu_img/kiwi-1.jpg'),

(8, 'မန်းလေးထမင်းပေါင်း', 3500,'/menu_img/mdy-pound-1.jpg'),
(8, 'သီးစုံထမင်းကြော်', 3500,'/menu_img/tee-sone-2.jpg'),
(8, 'ဆိတ်ထောင်းထမင်း', 2000,'/menu_img/sate-3.jpg'),
(8, 'ခေါက်ဆွဲကြော်', 3500,'/menu_img/kyout-swe-2.jpg'),
(8, 'ဖက်ထုပ်ပေါင်း', 3500,'/menu_img/phat-htoke-pound-3.jpg'),
(8, 'ဂျင်းသုပ်', 3500,'/menu_img/jin-thoke-2.jpg'),
(8, 'ကြာဇံကြော်', 3500,'/menu_img/kyar-san-2.jpg'),
(8, 'ပြောင်းဖူးထမင်းကြော်', 3500,'/menu_img/corn-kyaw-1.jpg'),
(8, 'တုန်ယမ်းထမင်းကြော်', 3500,'/menu_img/tone-yan-3.jpg'),
(8, 'မာလာထမင်းကြော်', 3500,'/menu_img/malar-kyaw-4.jpg'),
(8, 'အာလူးမာလာ', 3500,'/menu_img/arrluu-malar-2.jpg'),
(8, 'မုန့်တီသုပ်', 3500,'/menu_img/mont-ti-4.jpg'),
(8, 'lime juice', 3500,'/menu_img/lime-3.jpg'),
(8, 'Kiwi juice', 3500,'/menu_img/kiwi-2.jpg'),
(8, 'lemon tea', 3500,'/menu_img/lemon-2.jpg');

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
(2, 3, '0922222224', 'Ma Myint', '12/MaKaNa(N)123459', 'Naypyidaw', 'pass123'),
(2, 4, '0922222229', 'Kp Phyo', '12/MaKaNa(N)123460', 'Naypyidaw', 'pass123'),
(2, 5, '0922222225', 'Thuta', '12/MaKaNa(N)123461', 'Naypyidaw', 'pass123'),
(2, 6, '0922222226', 'Ko Myint', '12/MaKaNa(N)123462', 'Naypyidaw', 'pass123'),
(2, 7, '0922222227', 'Moe Moe', '12/MaKaNa(N)123436',  'Taunggyi', 'pass123'),
(2, 8, '0922222228', 'Aye Aye', '12/MaKaNa(N)123446', 'Bago', 'pass123');

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
