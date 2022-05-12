DROP DATABASE IF EXISTS `mars_app`;
CREATE DATABASE `mars_app`; 
USE `mars_app`;

SET NAMES utf8 ;
SET character_set_student = utf8mb4 ;



CREATE TABLE `students` (
  `student_id` int(4) NOT NULL UNIQUE AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` char(2) NOT NULL,
  `zip_code` int(5) NOT NULL,
  `phone` varchar(50) NOT NULL,
   `email1` char(50) NOT NULL,
   `email2` char(50) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `students` VALUES (1,'Vinte','3 Nevada Parkway','Syracuse','NY', '12345', '315-252-7305','vinte45@hotmail.com','star@mail.sfsu.edu');
INSERT INTO `students` VALUES (2,'Myworks','34267 Glendale Parkway','Huntington','WV', '18745','304-659-1170','meredith56@hotmail.com', 'meredith56@mail.sfsu.edu');
INSERT INTO `students` VALUES (3,'Yadel','096 Pawling Parkway','San Francisco','CA', '94102','415-144-6037','judith@.gmail.com','judith@mail.sfsu.edu');
INSERT INTO `students` VALUES (4,'Kwideo','81674 Westerfield Circle','Waco','TX', '78521','254-750-0784','kwideo@aol.com','kwideo@mail.sfsu.edu');
INSERT INTO `students` VALUES (5,'Topiclounge','0863 Farmco Road','Portland','OR','25479', '971-888-9129','topiclouinge23@gmail.com','topiclouinge23@mail.sfsu.edu');

CREATE TABLE `pages` (
  `page_id` int(11) NOT NULL UNIQUE,
  `filename` varchar(50) NOT NULL,
  `student_id` int(11) NOT NULL, 
  `page_total` decimal(9,2) NOT NULL,
  `image_total` decimal(9,2) NOT NULL,
  `page_click_date` date NOT NULL,
  `page_click_time` timestamp NOT NULL,
  PRIMARY KEY (`page_id`),
  KEY `FK_student_id` (`student_id`),
  CONSTRAINT `FK_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `pages` VALUES (1,'/mars.html',2,101.79,0.00,'2019-03-09',NULL);
INSERT INTO `pages` VALUES (2,'/mars/image1.html',5,175.32,8.18,'2019-06-11','2019-02-12');
INSERT INTO `pages` VALUES (3,'/mars/plot1.html',5,147.99,0.00,'2019-07-31',NULL);
INSERT INTO `pages` VALUES (4,'/mars/table.xml',3,152.21,0.00,'2019-03-08',NULL);
INSERT INTO `pages` VALUES (5,'/mars/table2.xml',5,169.36,0.00,'2019-07-18',NULL);
INSERT INTO `pages` VALUES (6,'/mars/image2.html',1,157.78,74.55,'2019-01-29','2019-01-03');
INSERT INTO `pages` VALUES (7,'/mars/plot5.html',3,133.87,0.00,'2019-09-04',NULL);

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `image_date_clicked` date NOT NULL,
  `image_click_time` timestamp NOT NULL, 
  `tot_amount_clicks` int(100) NOT NULL,
  `image_extension_name` varchar(4) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_student_id_idx` (`student_id`),
  KEY `fk_page_id_idx` (`page_id`),
  KEY `fk_image_image_method_idx` (`image_method`),
  CONSTRAINT `fk_image_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `fk_image_page` FOREIGN KEY (`page_id`) REFERENCES `pages` (`page_id`),
  CONSTRAINT `fk_image_image_method` FOREIGN KEY (`image_method`) REFERENCES `image_methods` (`image_method_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `images` VALUES (1,5,2,'2019-02-12', '0:45:00', '5','jpg');
INSERT INTO `images` VALUES (2,1,6,'2019-01-03', '01:00:45', '10', 'png');
INSERT INTO `images` VALUES (3,3,11,'2019-01-11', '05:01:12', 'gif');
INSERT INTO `images` VALUES (4,5,13,'2019-01-26', '04:59:21', 'jpg');

CREATE TABLE `students` (
  `id` int(4) NOT NULL UNIQUE AUTO_INCREMENT,
  `admin_name` varchar(50) NOT NULL,
  `admin_pass` varchar(50) NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `students` VALUES (1,'Vinte','3 Nevada Parkway','Syracuse','NY', '12345', '315-252-7305','vinte45@hotmail.com','star@mail.sfsu.edu');




DROP DATABASE IF EXISTS `contributors_mars_app`;
CREATE DATABASE `contributors_mars_app`; 
USE `contributors_mars_app`;

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` char(2) NOT NULL,
   `zip_code` int(5) NOT NULL,
  `contribution_id ` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`author_id`) 
   
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `authors` VALUES (1,'Babara','MacCaffrey','781-932-9754','0 Sage Terrace','Waltham','MA',2273);
INSERT INTO `authors` VALUES (2,'Ines','Brushfield','804-427-9456','14187 Commercial Trail','Hampton','VA',947);
INSERT INTO `authors` VALUES (3,'Freddi','Boagey','719-724-7869','251 Springs Junction','Colorado Springs','CO',2967);
INSERT INTO `authors` VALUES (4,'Ambur','Roseburgh','407-231-8017','30 Arapahoe Terrace','Orlando','FL',457);
INSERT INTO `authors` VALUES (5,'Clemmie','Betchley', NULL,'5 Spohn Circle','Arlington','TX',3675);



