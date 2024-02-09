-- Will create database "attackflow" if it doesn't already exists
CREATE DATABASE IF NOT EXISTS attackflow;

USE attackflow;

-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (x86_64)
--
-- Host: 127.0.0.1    Database: attackflow
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `action` (
  `id` varchar(36) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `confidence` int NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_c32ab9f05c155e84e12ba3fdef` (`annotation_id`),
  CONSTRAINT `FK_c32ab9f05c155e84e12ba3fdefd` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES ('14aeff29-78f7-42c7-b2db-99844c3b1566','B0019','Manipulate Network Traffic','Malware intercepts encrypted web traffic to inject ads',100,'4c8ea422-5692-4b6d-b240-e78c306a562f'),('1cb23ed3-b2c9-47ce-917b-177114d4b482','tag 2 for action 2','name 2 for action 2','description 2 for action 2',100,'0999d5a9-7642-4c82-81d9-9af6138f9915'),('1d88b01a-47bf-45c0-a977-73991dbcfdaf','F0007','Self Deletion','Malware will monitor if a specific file gets deleted and then it will delete itself.',100,'743686b1-3ec3-42e7-bfcf-5a6ce06dd100'),('226a9b94-9629-4e9f-b6a5-f49f28420216','E1608','Install Certificate','The malware installs a certificate.',100,'d73f60a6-345c-429b-907f-ae62264e12e0'),('2ea88fd6-6d49-4cdb-8523-efb643e3fe6b','T1204','User Execution','User of the Patient Zero Workstation clicks on malicious Excel file, compromising the workstation.',100,'440ed669-e7d2-4a14-84d3-ee4fe0b40cc8'),('3962f5b4-01f7-4946-bb2b-fcb747ed5f9b','T1586','Compromise accounts','Compromise and abuse accounts with high privilege levels.',100,'a72f484d-1666-470c-a2f0-fdcff24f77ca'),('40f874e5-f63f-4864-8d32-79fd8d7593de','T1557','Adversary-in-the-Middle','Malware inserts itself into a chain of custody, typically within network packets',100,'c27fd2ad-08c5-410e-8881-fa492b20d0ff'),('58b5921f-bebd-4283-819c-bc264f826a68','T1090','Proxy','Malware uses mitmproxy to intercept and modify web traffic.',100,'fead4729-04bb-45af-8a67-d8c4ac2172bf'),('5c5e7f6f-75de-4c95-96f4-8bc62d09c0dc','T1566.001','Phishing: Spearfishing Attachment','Malicious Microsoft Excel file is attached to a phishing email',100,'96f33bff-91a4-465b-be44-a4456ae5f56e'),('6d9c48ee-d815-4122-9834-d008ec94799e','E1059','Command and Scripting Interpreter','Malware installs a script to inject a JavaScript script and modify web traffic',100,'c46b1ed1-6b9b-4807-8d65-44e34e4a7abd'),('8d84f4bb-3dc5-4ed4-a469-349aa43b6c56','B0030.002','C2 Communication: Receive Data','Malware receives data from the C2 server',100,'b3077d01-66e7-41ee-8c38-725dae3ca59f'),('9c2d5c48-d486-47cd-98da-feeb373d2197','T1486','Data Encrypted for Impact','Detonate Conti ransomware\n',100,'a333d4d9-d29a-448f-813d-78af9bf61a46'),('a2f2d1da-fc25-4033-9393-5f197fb030ac','T1553','Subvert Trust Controls','The malware uses certificates to gain access to HTTPS traffic',100,'736f7e29-1a12-4ef3-986b-a75ac37f3d4c'),('b1284fbc-184d-4d87-9357-60f7a6f8d4a0','tag 1 for action 1','name 1 for action 1','description 1 for action 1',90,'0902efea-086f-4ee6-91e5-c32f9cca5313'),('c5f321ec-9a34-4988-b4e2-1c8959aa61ef','E1204','User Execution','The user opens a disk image file which invisibly installs its components.',100,'2bd3f41a-4345-417d-83ad-8675555c766e'),('ca306980-21aa-4d66-a323-e81ae6bf34cc',' ','Exfiltration','Data is exfiltrated.\n',100,'1b51403b-ffa5-4e52-8997-8749e6d17c4c'),('ceac00b3-48bc-4cbb-9f9e-a3478f2ab756','tag 0 for action 0','name 0 for action 0','description 0 for action 0',80,'089e5b0e-4a49-470f-a386-18ead0f4916d'),('d131a37b-a35d-4fb9-9d45-89c5e633d169','T1083','File and Directory Discovery','Browsed folders and opened files within HSE\n',100,'1c2eea43-19d6-4575-8e44-fd879f10b155'),('e87fc797-f567-40cd-9f0f-662593e8b861',' ','Lateral movement','Lateral movement to 1 statutory and 6 voluntary hospitals\n',100,'725f093b-0bf5-4fc0-8564-7ed544198ae5'),('f11c2d48-584d-4920-9ee3-15470bd7444d','tag 3 for action 3','name 3 for action 3','description 3 for action 3',80,'0c723f4c-abaf-4805-b567-16cfa3dc4c48'),('f89f8f60-25e6-4cb3-a0fb-c399f030aa11','B0023','Install Additional Program','Malware installs an open-source program called mitmproxy.',100,'efa77c05-86e2-4448-86ad-fbccdf57836e'),('fc6bc0cb-0135-4433-a604-5facb4d9a00e','T1185','Browser Session Hijacking ','Malware can modify web traffic for the purpose of injecting Javascript',100,'d0dba638-f999-4e19-ab7e-702461739171');
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `annotation`
--

DROP TABLE IF EXISTS `annotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annotation` (
  `id` varchar(36) NOT NULL,
  `highlight_content` json DEFAULT NULL,
  `highlight_comment` json DEFAULT NULL,
  `highlight_position` json DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `is_currently_existing` tinyint NOT NULL DEFAULT '1',
  `project` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `campaign` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `directory` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  `infrastructure` varchar(255) DEFAULT NULL,
  `ipv4` varchar(255) DEFAULT NULL,
  `malware` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `process` varchar(255) DEFAULT NULL,
  `software` varchar(255) DEFAULT NULL,
  `threat_actor` varchar(255) DEFAULT NULL,
  `tool` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_account` varchar(255) DEFAULT NULL,
  `vulnerability` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a009b46810bf4c8a610c508efc` (`action`),
  UNIQUE KEY `REL_ff43726e140fa1c166349e915b` (`asset`),
  UNIQUE KEY `REL_d45e10168b961e3b6b3a73a115` (`campaign`),
  UNIQUE KEY `REL_7e4e55497509e38c2bcd39046f` (`condition`),
  UNIQUE KEY `REL_e50fae3e5aa6fcfd089ab60902` (`directory`),
  UNIQUE KEY `REL_70299f7e7a65087010770c2a39` (`file`),
  UNIQUE KEY `REL_02222a673c777da0dc0c09e64d` (`identity`),
  UNIQUE KEY `REL_8769959e4ef356c9987f72a99d` (`infrastructure`),
  UNIQUE KEY `REL_8a5fe27eb0fee543add2da660b` (`ipv4`),
  UNIQUE KEY `REL_47d9e2f9dea5beb2a84392c44c` (`malware`),
  UNIQUE KEY `REL_111151f6c74549f9643039a5be` (`note`),
  UNIQUE KEY `REL_50d63a515b9095e53fa8101a46` (`process`),
  UNIQUE KEY `REL_8b6b52839bd8d9da1681d60bb1` (`software`),
  UNIQUE KEY `REL_ce9731b8913ad5425779aaa231` (`threat_actor`),
  UNIQUE KEY `REL_ea60a32cb6cdfba28bbd9f9307` (`tool`),
  UNIQUE KEY `REL_04472f65ca0c6e7e196e89c76a` (`url`),
  UNIQUE KEY `REL_886e03944b89342a5de8368202` (`user_account`),
  UNIQUE KEY `REL_593120e05644cf4c8a724bd1ce` (`vulnerability`),
  KEY `FK_428d65ee31bdf822fc159381559` (`project`),
  KEY `FK_e2dc6f343d40a22eb6691c9c8f4` (`user`),
  CONSTRAINT `FK_02222a673c777da0dc0c09e64d0` FOREIGN KEY (`identity`) REFERENCES `identity` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_04472f65ca0c6e7e196e89c76a7` FOREIGN KEY (`url`) REFERENCES `url` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_111151f6c74549f9643039a5be2` FOREIGN KEY (`note`) REFERENCES `note` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_428d65ee31bdf822fc159381559` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_47d9e2f9dea5beb2a84392c44c0` FOREIGN KEY (`malware`) REFERENCES `malware` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_50d63a515b9095e53fa8101a469` FOREIGN KEY (`process`) REFERENCES `process` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_593120e05644cf4c8a724bd1cef` FOREIGN KEY (`vulnerability`) REFERENCES `vulnerability` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_70299f7e7a65087010770c2a39b` FOREIGN KEY (`file`) REFERENCES `file` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7e4e55497509e38c2bcd39046f5` FOREIGN KEY (`condition`) REFERENCES `condition` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8769959e4ef356c9987f72a99d8` FOREIGN KEY (`infrastructure`) REFERENCES `infrastructure` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_886e03944b89342a5de83682025` FOREIGN KEY (`user_account`) REFERENCES `user_account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8a5fe27eb0fee543add2da660b7` FOREIGN KEY (`ipv4`) REFERENCES `ipv4` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8b6b52839bd8d9da1681d60bb1b` FOREIGN KEY (`software`) REFERENCES `software` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a009b46810bf4c8a610c508efcb` FOREIGN KEY (`action`) REFERENCES `action` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ce9731b8913ad5425779aaa231a` FOREIGN KEY (`threat_actor`) REFERENCES `threat_actor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d45e10168b961e3b6b3a73a1153` FOREIGN KEY (`campaign`) REFERENCES `campaign` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e2dc6f343d40a22eb6691c9c8f4` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE,
  CONSTRAINT `FK_e50fae3e5aa6fcfd089ab609020` FOREIGN KEY (`directory`) REFERENCES `directory` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ea60a32cb6cdfba28bbd9f93071` FOREIGN KEY (`tool`) REFERENCES `tool` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ff43726e140fa1c166349e915b2` FOREIGN KEY (`asset`) REFERENCES `asset` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annotation`
--

LOCK TABLES `annotation` WRITE;
/*!40000 ALTER TABLE `annotation` DISABLE KEYS */;
INSERT INTO `annotation` VALUES ('089e5b0e-4a49-470f-a386-18ead0f4916d','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.681042','2023-10-25 05:19:33.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com','ceac00b3-48bc-4cbb-9f9e-a3478f2ab756',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('0902efea-086f-4ee6-91e5-c32f9cca5313','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.658568','2023-10-25 05:19:33.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com','b1284fbc-184d-4d87-9357-60f7a6f8d4a0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('0999d5a9-7642-4c82-81d9-9af6138f9915','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.614410','2023-10-25 05:19:33.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com','1cb23ed3-b2c9-47ce-917b-177114d4b482',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('0c723f4c-abaf-4805-b567-16cfa3dc4c48','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.366415','2023-10-25 05:19:33.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com','f11c2d48-584d-4920-9ee3-15470bd7444d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('0cbb32bd-83a7-48eb-afad-853b88882daf','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.569902','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,'d9c496d7-aa1a-4397-98cf-3abace15443a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('0da2715b-0fa9-484e-a77e-f04365cf4081','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.404181','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,'2e3a4de2-2853-41fc-a73b-85fec68be391',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1283f7ce-83fe-4731-a4ae-00cba0ab19c1','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.686834','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,'0125546e-3227-4291-9b8a-69950fb2de67',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('15ffc413-df99-4014-9fea-feaac9d48bdf','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.607855','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,'99a1341c-985f-442d-92fc-42f20d6b03bf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1aee95fd-2e5d-4872-a8e5-dd1b3a6ea898','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.753315','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,'ec1d19e7-4a61-4f16-a437-52a36fa625a0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1b51403b-ffa5-4e52-8997-8749e6d17c4c','{\"text\": \"exfiltrating data\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 556.4213027954102, \"x2\": 654.0045547485352, \"y1\": 774.7808685302734, \"y2\": 790.7808685302734, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4213027954102, \"x2\": 654.0045547485352, \"y1\": 774.7808685302734, \"y2\": 790.7808685302734, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:27:01.995029','2023-10-25 06:27:02.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','ca306980-21aa-4d66-a323-e81ae6bf34cc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1bb22f02-1745-49a4-beb7-ee5789c70f64','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.849140','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,'4784fa6c-9ffd-4341-b39d-9417410d9471',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1c2eea43-19d6-4575-8e44-fd879f10b155','{\"text\": \"The Attacker browsed folders & openedfiles on systems within the HSE\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 385.1030349731446, \"x2\": 603.2889785766602, \"y1\": 532.6243591308594, \"y2\": 546.6243591308594, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 8}, {\"x1\": 429.60538482666016, \"x2\": 603.9715347290039, \"y1\": 546.7833557128906, \"y2\": 560.7833557128906, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 8}], \"pageNumber\": 8, \"boundingRect\": {\"x1\": 385.1030349731446, \"x2\": 603.9715347290039, \"y1\": 532.6243591308594, \"y2\": 560.7833557128906, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 8}}','2023-10-25 06:30:29.578005','2023-10-25 06:30:29.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','d131a37b-a35d-4fb9-9d45-89c5e633d169',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1d482a91-2fc2-4bfd-87e9-2e6ea06ebeea','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.227307','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,'5bbc360b-9834-4c91-8a4a-2070535f6371',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2090f975-8802-4576-be76-d12e68650d0d','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.812968','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,'e78043a6-4055-46d6-a91e-13bf3ed1979e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2107d623-be3c-4e1a-8d12-460f8e1b5e4c','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.612402','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,'3b15fcc4-d5c9-47cb-a2fc-05818e56437f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('212fb0df-f8f3-4562-9a78-2ae9a29e3a4e','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.801142','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,'e6f33ada-3bfe-4d03-9cbe-ae88186d7a58',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('21f18f0e-c597-4caa-8038-02a5fad6c69f','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.302576','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,'e4dbb9e6-af43-4f72-9fae-231648605f01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2263dec3-efc1-4b2e-9abe-7af90375d2d4','{\"text\": \"The Malware infection was the result\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 648.69921875, \"x2\": 879.9077758789062, \"y1\": 487.5412902832031, \"y2\": 503.5412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 648.69921875, \"x2\": 879.9077758789062, \"y1\": 487.5412902832031, \"y2\": 503.5412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:40:04.439661','2023-10-25 06:40:04.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,NULL,NULL,'47f93035-3b6b-4018-85b4-488f51814435',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2305a2f0-c9c6-46c8-948b-401bea82854c','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.239337','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,'d5817d1b-2331-467c-8075-c3b66f16b5c9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('24c5fd7e-54f8-4a8e-9e96-4a792f9aa53f','{\"text\": \"servers\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 797.9901733398438, \"x2\": 845.0316772460938, \"y1\": 755.6086044311523, \"y2\": 771.6086044311523, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 797.9901733398438, \"x2\": 845.0316772460938, \"y1\": 755.6086044311523, \"y2\": 771.6086044311523, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:35:02.678292','2023-10-25 06:35:02.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'701a27ea-14cb-487b-b247-74a0e3cbdb48',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2bd3f41a-4345-417d-83ad-8675555c766e','{\"text\": \"When opened\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 120.00000762939452, \"x2\": 244.54166412353516, \"y1\": 697.1772880554199, \"y2\": 720.5106010437012, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 120.00000762939452, \"x2\": 244.54166412353516, \"y1\": 697.1772880554199, \"y2\": 720.5106010437012, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 2}}','2023-10-25 05:40:11.893877','2023-10-25 05:40:11.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','c5f321ec-9a34-4988-b4e2-1c8959aa61ef',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2e384a9d-59d9-4c51-818d-9206fb487adb','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.830826','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,'363f35d4-08fc-49c6-b968-81752a8525c7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('2e987c96-6b36-4435-a5ae-c5810d0373ac','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.573503','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,'53305d32-e31a-4a37-ab5c-2baa8ec4bc9c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('32d3442b-ae3d-4a81-9820-c3dfa8fb02e6','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.615985','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,'a418d524-103a-4df9-8558-ce74ccef6bf2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('34bec559-a2a2-4952-9888-060a13679d2a','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.794350','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,'69c63941-8206-4907-9158-d58800bbec3d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('35539d1e-aebb-4aee-8d5a-a6e65ef7c72c','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.738401','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,'2bd4e9f9-6ead-4395-beba-5c56986f2c34',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('37c62624-666a-4766-8761-a42a7224df60','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.773499','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,'76100e04-cb79-42fa-8a5d-2a0d59252600',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('3dd4c873-6d81-4e18-abd8-7a4e2cbb952d','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.674276','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,'2fac9d44-3b10-4f26-8192-ee51c1ab85ce',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('41d1b07f-d9d2-4e2c-9f99-e7f094d243a5','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.294976','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,'04f2c16d-9e7c-4b5f-9569-33edbb62ce72',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('43b4ca2e-30ae-465a-9680-674e77bfda5b','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.617156','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,'fdf697de-77f1-4c2c-baa2-68e9524a9b16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('43f76ec9-d8df-4c51-aa24-e756df9dfd43','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.806952','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,'6fe03c60-c725-4904-96af-3288842cb8f8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('440ed669-e7d2-4a14-84d3-ee4fe0b40cc8','{\"text\": \"the user of the Patient Zero Workstation clickingand opening a malicious Microsoft Excel file\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 572.3484497070312, \"x2\": 876.2532348632812, \"y1\": 506.6989345550537, \"y2\": 522.6989345550537, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.421875, \"x2\": 834.8234252929688, \"y1\": 525.8656215667725, \"y2\": 541.8656215667725, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.421875, \"x2\": 876.2532348632812, \"y1\": 506.6989345550537, \"y2\": 541.8656215667725, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:51:55.750205','2023-10-25 06:51:55.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','2ea88fd6-6d49-4cdb-8523-efb643e3fe6b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('47e74a3a-0771-4a90-884c-faf4256b0f12','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.761222','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,'5165cc3e-dd1e-4c54-bcfd-affbe6cf725e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('4ad2b9f9-0a17-4a64-a603-c984e19c7ccc','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.735292','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,'cde5687c-b68f-45ef-a27a-4b6001f83265',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('4b6965a0-6696-4e1a-a2d5-d624aaab5ae2','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.571925','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e94c8e17-c16a-44c5-a4f1-2c52a89d0411',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('4c8ea422-5692-4b6d-b240-e78c306a562f','{\"text\": \"encryptedhttps traffic\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 793.357666015625, \"x2\": 881.1519775390625, \"y1\": 200.596435546875, \"y2\": 223.596435546875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}, {\"x1\": 119.9931640625, \"x2\": 217.4637451171875, \"y1\": 227.041748046875, \"y2\": 250.041748046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 119.9931640625, \"x2\": 881.1519775390625, \"y1\": 200.596435546875, \"y2\": 250.041748046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:30:25.558769','2023-10-25 05:30:25.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','14aeff29-78f7-42c7-b2db-99844c3b1566',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('51b346aa-1a23-4ad1-9c48-2178eda56719','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.838720','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4a887850-eb92-471a-9d7b-44db290e4349',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('587eefee-a856-44bb-a4c4-2b9070df1fbc','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.219430','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9de55abb-cf17-4385-97c1-5ee443c27c01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('61cd612d-c57f-4bae-a5ab-007e84e5fc68','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.215171','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'919b784f-4c71-437b-90e4-a2e9df7c4f15',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('67036ab0-7ea9-457c-b6b4-f91b5a978c65','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.679714','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'206f8ec6-ecde-4ae2-b80d-b56381218fbf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('6d726a21-7aa2-48f7-ac7a-7e4f1aac2a60','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.717695','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'161fede6-9910-4818-8b65-c5ebe5c5cb56',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('6ef1f0b1-dcba-44b2-92f0-bc153a95b6ef','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.791904','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8aa8712c-8a9c-4bad-ae55-a72b07ecdf0e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('720c208e-3cc9-41c2-9e6b-b574f9ba576b','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.802659','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'14b14f00-29d3-4fdd-a0f0-e64d238ac12a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('725f093b-0bf5-4fc0-8564-7ed544198ae5','{\"text\": \"moving laterally\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 685.9856948852539, \"x2\": 785.9598159790039, \"y1\": 774.7808837890625, \"y2\": 790.7808837890625, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 685.9856948852539, \"x2\": 785.9598159790039, \"y1\": 774.7808837890625, \"y2\": 790.7808837890625, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:28:49.366535','2023-10-25 06:28:49.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','e87fc797-f567-40cd-9f0f-662593e8b861',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('730a88a7-af5a-4fef-bd09-6a74d7c8da8f','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.774610','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6e77f334-a408-4046-a35d-1be61d00c15d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('736f7e29-1a12-4ef3-986b-a75ac37f3d4c','{\"text\": \" the malware uses the certificate as the first step in gaining access to httpstraffic\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 226.709228515625, \"x2\": 884.8238525390625, \"y1\": 1065.5130615234375, \"y2\": 1088.7630615234375, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}, {\"x1\": 119.9962158203125, \"x2\": 168.875732421875, \"y1\": 1091.963623046875, \"y2\": 1115.213623046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}], \"pageNumber\": 3, \"boundingRect\": {\"x1\": 119.9962158203125, \"x2\": 884.8238525390625, \"y1\": 1065.5130615234375, \"y2\": 1115.213623046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}}','2023-10-25 05:35:07.535802','2023-10-25 05:35:07.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','a2f2d1da-fc25-4033-9393-5f197fb030ac',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('743686b1-3ec3-42e7-bfcf-5a6ce06dd100','{\"text\": \"If spi.app is deleted, the spid-uninstall.plist agent will run the following script:\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 120, \"x2\": 793.6953125, \"y1\": 884.891845703125, \"y2\": 907.891845703125, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 120, \"x2\": 793.6953125, \"y1\": 884.891845703125, \"y2\": 907.891845703125, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:24:55.857773','2023-10-25 05:24:55.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','1d88b01a-47bf-45c0-a977-73991dbcfdaf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('786bb646-b1bc-49d1-90b4-0065ffde1850','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.754194','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'106a1c4c-b6b5-4743-8f6b-7b39d481fcee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('79ce5589-4880-4cdc-8e9d-91eef3b95471','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.804077','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'d399a4b3-31a2-4cdc-8469-d790abfa1dde',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('7f74babf-29cb-454e-a1f8-c7b78e56b2a6','{\"text\": \"data they had encrypted\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 713.4287490844727, \"x2\": 868.0952529907227, \"y1\": 464.48919677734375, \"y2\": 480.48919677734375, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 6}], \"pageNumber\": 6, \"boundingRect\": {\"x1\": 713.4287490844727, \"x2\": 868.0952529907227, \"y1\": 464.48919677734375, \"y2\": 480.48919677734375, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 6}}','2023-10-25 06:24:20.430344','2023-10-25 06:24:20.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'062c2b42-1f91-411f-afe4-8903072a728d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('83640a0a-89e6-447a-a237-f5cb58974a44','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.769067','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'49822866-bc99-4524-9b14-58a17c28ea6a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('8edc9fd2-4f81-4b8a-9d75-5da3a0a64cff','{\"text\": \"statutory andvoluntary hospitals.\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 805.9441299438477, \"x2\": 889.1289443969727, \"y1\": 774.7808380126953, \"y2\": 790.7808380126953, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4255752563477, \"x2\": 679.2256240844727, \"y1\": 793.9475250244141, \"y2\": 809.9475250244141, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4255752563477, \"x2\": 889.1289443969727, \"y1\": 774.7808380126953, \"y2\": 809.9475250244141, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:21:32.360556','2023-10-25 06:21:32.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'f68ca503-82f4-40a8-85f7-76f6857e9f44',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('94f37c8c-f58d-4fc2-b2d9-a6e8592de52b','{\"text\": \"Patient ZeroWorkstation\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 788.4055786132812, \"x2\": 866.2866821289062, \"y1\": 468.3746032714844, \"y2\": 484.3746032714844, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4191284179688, \"x2\": 631.4169921875, \"y1\": 487.5412902832031, \"y2\": 503.5412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4191284179688, \"x2\": 866.2866821289062, \"y1\": 468.3746032714844, \"y2\": 503.5412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:50:21.213853','2023-10-25 06:50:21.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'c279f953-f7b1-4b29-b806-53530e63105d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('96f33bff-91a4-465b-be44-a4456ae5f56e','{\"text\": \"malicious Microsoft Excel file that wasattached to a phishing email sent to the user on 16March 2021.\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 651.3857421875, \"x2\": 892.2619018554688, \"y1\": 525.8656120300293, \"y2\": 541.8656120300293, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4241333007812, \"x2\": 877.3927612304688, \"y1\": 545.0413017272949, \"y2\": 561.0413017272949, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4201049804688, \"x2\": 635.7000122070312, \"y1\": 564.2079277038574, \"y2\": 580.2079277038574, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4201049804688, \"x2\": 892.2619018554688, \"y1\": 525.8656120300293, \"y2\": 580.2079277038574, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:58:19.338360','2023-10-25 06:58:19.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','5c5e7f6f-75de-4c95-96f4-8bc62d09c0dc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('9a23c2db-a1cf-4fd0-8e65-cf3e7c2cc804','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.796461','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'d873c54c-9052-4c7c-ab4a-2966e4772adf',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a016e583-87f1-4b1c-b6d9-82cc0781556d','{\"text\": \"unauthorised access\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 640.3645629882812, \"x2\": 771.0679321289062, \"y1\": 602.2697296142578, \"y2\": 618.2697296142578, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 640.3645629882812, \"x2\": 771.0679321289062, \"y1\": 602.2697296142578, \"y2\": 618.2697296142578, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:56:12.404032','2023-10-25 06:56:12.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'4edfba6f-f358-4cc4-929f-cf113870d119',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a06b6fed-3614-41d6-b6bd-7cd65ef81afb','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.208863','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f6e30f42-77fb-43bb-a0fd-a7921d764841',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a198f6aa-1ff3-47c6-8a85-5d980e46a24c','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.716329','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3ae25833-91a7-4936-be77-374a8b39288b',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a333d4d9-d29a-448f-813d-78af9bf61a46','{\"text\": \" the Attackercontinued to operate in the environment overan eight week period until the detonation of theConti ransomware on 14 May 2021\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 773.8508682250977, \"x2\": 853.0223770141602, \"y1\": 621.4314727783203, \"y2\": 637.4314727783203, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4168472290039, \"x2\": 840.8839492797852, \"y1\": 640.5981597900391, \"y2\": 656.5981597900391, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4187393188477, \"x2\": 854.7715835571289, \"y1\": 659.7808380126953, \"y2\": 675.7808380126953, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4222183227539, \"x2\": 778.3470230102539, \"y1\": 678.9419097900391, \"y2\": 694.9419097900391, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4168472290039, \"x2\": 854.7715835571289, \"y1\": 621.4314727783203, \"y2\": 694.9419097900391, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:31:57.593169','2023-10-25 06:31:57.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','9c2d5c48-d486-47cd-98da-feeb373d2197',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a54bdb73-b232-4c8d-9d48-9b5e88222ca3','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.807015','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6894d3de-e62c-41aa-b98d-eb2678889aab',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a72a4617-1276-4f55-8cf8-b93ccafebb3b','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.778302','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'36d495d6-d5ca-45fd-9735-d02ce3b0e1c6',NULL,NULL,NULL,NULL,NULL,NULL),('a72f484d-1666-470c-a2f0-fdcff24f77ca','{\"text\": \"compromising and abusing a significant numberof accounts\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 556.4194946289062, \"x2\": 860.8535766601562, \"y1\": 698.1142158508301, \"y2\": 714.1142158508301, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}, {\"x1\": 556.4249877929688, \"x2\": 629.765869140625, \"y1\": 717.2752265930176, \"y2\": 733.2752265930176, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4194946289062, \"x2\": 860.8535766601562, \"y1\": 698.1142158508301, \"y2\": 733.2752265930176, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:37:07.191358','2023-10-25 06:37:07.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com','3962f5b4-01f7-4946-bb2b-fcb747ed5f9b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('a7bb8d2a-8142-447c-8561-d6fe269348cf','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.223548','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f9bc666b-f761-4075-93bc-2fb7b2026722',NULL,NULL,NULL,NULL,NULL,NULL),('a803b703-af0e-48a2-8f44-22f1ceb4cc5b','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.231729','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5ab1b937-3a7c-4a4b-9ba3-3b2b46fc038e',NULL,NULL,NULL,NULL,NULL,NULL),('aa29a4d8-01c6-4f16-beef-bfc8fd3921cf','{\"text\": \"compromising a significant number of servers\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 556.4226455688477, \"x2\": 845.0316543579102, \"y1\": 755.6085624694824, \"y2\": 771.6085624694824, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4226455688477, \"x2\": 845.0316543579102, \"y1\": 755.6085624694824, \"y2\": 771.6085624694824, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:33:31.005262','2023-10-25 06:33:31.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,NULL,NULL,'b9d6f7ee-0e41-428b-9db7-b0dbfc079399',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('aa62ab04-fc96-44ce-a0bf-8f70e5769cf4','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.213486','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'48296491-70ec-4720-a928-653ef5f24447',NULL,NULL,NULL,NULL,NULL,NULL),('aecc72f9-d1b0-48b1-99aa-9e7831b25ab8','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.208897','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1a632319-698c-40c6-a41b-459dc320a214',NULL,NULL,NULL,NULL,NULL),('af37dab6-491d-4f2a-9ea3-a625e7a5ef99','{\"text\": \"phishing email\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 643.2341918945312, \"x2\": 734.8267211914062, \"y1\": 545.0412902832031, \"y2\": 561.0412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 643.2341918945312, \"x2\": 734.8267211914062, \"y1\": 545.0412902832031, \"y2\": 561.0412902832031, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:54:11.678073','2023-10-25 06:54:11.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'669d62e3-5e7c-49d4-9b13-d7625251a4e7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b3077d01-66e7-41ee-8c38-725dae3ca59f','{\"text\": \"invisibly installs\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 755.9791641235352, \"x2\": 892.6979141235352, \"y1\": 697.1772766113281, \"y2\": 720.5106201171875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 755.9791641235352, \"x2\": 892.6979141235352, \"y1\": 697.1772766113281, \"y2\": 720.5106201171875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 2}}','2023-10-25 05:39:20.217484','2023-10-25 05:39:20.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','8d84f4bb-3dc5-4ed4-a469-349aa43b6c56',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('ba022192-42b9-43fc-8c48-0a2e399617e4','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.633074','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ca8c96c5-33b4-4471-953e-d01462c43012',NULL,NULL,NULL,NULL,NULL),('be49ef4b-6dd7-48b0-a3b5-1f9329dc16eb','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.613309','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e8335211-0686-4f9b-9052-f9aa73f7d698',NULL,NULL,NULL,NULL,NULL),('bece532d-3d4d-4ecf-9ebe-fcc3bcbbed89','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.654445','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2f806048-51b0-45a8-8fa6-fe456d8b471d',NULL,NULL,NULL,NULL,NULL),('c0444698-8270-4c98-9bef-4e19465bf0e8','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.703230','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2c6524e4-28a4-4e43-a9ab-a4c7098c6de5',NULL,NULL,NULL,NULL),('c27fd2ad-08c5-410e-8881-fa492b20d0ff','{\"text\": \"where malware is able to insert itself into achain of custody somewhere, typically with network packets.\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 507.8958511352539, \"x2\": 884.7396011352539, \"y1\": 996.2032470703124, \"y2\": 1019.5365600585938, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}, {\"x1\": 120.00000762939452, \"x2\": 652.4687576293945, \"y1\": 1022.6511840820312, \"y2\": 1045.9844970703125, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}], \"pageNumber\": 3, \"boundingRect\": {\"x1\": 120.00000762939452, \"x2\": 884.7396011352539, \"y1\": 996.2032470703124, \"y2\": 1045.9844970703125, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}}','2023-10-25 05:36:38.533995','2023-10-25 05:36:38.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','40f874e5-f63f-4864-8d32-79fd8d7593de',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('c296f925-1dc1-4e8d-a9ff-20d5b36b18f6','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.366029','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'caa2531d-8014-4d0d-89ec-043e6bce556a',NULL,NULL,NULL,NULL),('c46b1ed1-6b9b-4807-8d65-44e34e4a7abd','{\"text\": \"inject.py script installed bythe malware:\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 652.171875, \"x2\": 884.5078125, \"y1\": 296.604248046875, \"y2\": 319.604248046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}, {\"x1\": 120, \"x2\": 234.4921875, \"y1\": 323.049560546875, \"y2\": 346.049560546875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 120, \"x2\": 884.5078125, \"y1\": 296.604248046875, \"y2\": 346.049560546875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:28:47.598331','2023-10-25 05:28:47.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','6d9c48ee-d815-4122-9834-d008ec94799e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('ca6ca793-983a-4fca-b5a3-00fbe03ef775','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.833873','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a68d188e-6c76-400f-85a6-eccf718840f5',NULL,NULL,NULL,NULL),('cab76803-2b9f-41b7-a3f0-d398b3701f0b','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.302647','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'d69b4d33-b183-47ee-a662-dffbe3bcc739',NULL,NULL,NULL,NULL),('cdcfbb01-87c5-47e7-bbc4-8e490ebdfa27','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.800228','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'094dcf09-483d-4173-833c-05bacc30c6a9',NULL,NULL,NULL),('d0dba638-f999-4e19-ab7e-702461739171','{\"text\": \"The software is designed to use this capability to modify web traffic for the purpose ofinjecting JavaScript into every page.\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 119.99713134765624, \"x2\": 873.3623046875, \"y1\": 270.1614990234375, \"y2\": 293.1614990234375, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}, {\"x1\": 120, \"x2\": 440.1796875, \"y1\": 296.604248046875, \"y2\": 319.604248046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 119.99713134765624, \"x2\": 873.3623046875, \"y1\": 270.1614990234375, \"y2\": 319.604248046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:27:14.578127','2023-10-25 05:27:14.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','fc6bc0cb-0135-4433-a604-5facb4d9a00e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('d1a65a21-039d-48db-a064-d321f76b3c68','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.783478','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'827d1efa-95db-4666-86ed-db920d51cd10',NULL,NULL,NULL),('d2983fd6-34cd-4dba-8797-446816e417d1','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.382872','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b2c76a77-7000-4d09-9db5-4f009d4c2567',NULL,NULL,NULL),('d5b7c3cd-54ad-46a5-b468-2cdfa44e713e','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.341207','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9c3b22a2-023a-4b96-b08f-c54adcf681ab',NULL,NULL,NULL),('d73f60a6-345c-429b-907f-ae62264e12e0','{\"text\": \"installing a certificate\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 651.3458633422852, \"x2\": 836.9997940063477, \"y1\": 969.755340576172, \"y2\": 993.0886535644532, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}], \"pageNumber\": 3, \"boundingRect\": {\"x1\": 651.3458633422852, \"x2\": 836.9997940063477, \"y1\": 969.755340576172, \"y2\": 993.0886535644532, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 3}}','2023-10-25 05:37:58.529888','2023-10-25 05:37:58.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','226a9b94-9629-4e9f-b6a5-f49f28420216',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('db8f305c-fde4-4e7a-a245-8312fb75014b','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.363257','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ef77c013-1bfb-456d-963e-6c8123bd8833',NULL,NULL),('dc79d523-e995-4436-95e7-1a8ccc24929e','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.736731','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f1530931-c5df-4362-9bf1-db5667f8f4d0',NULL,NULL),('de0cdc7a-a3e1-4d9a-9ce0-9850a335de30','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.836098','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bee0f65a-c79e-4c6d-99fb-48c4e6f7c83a',NULL,NULL),('e07fecbb-a1e6-423c-ba32-6a41fcfbf392','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.697080','2023-10-25 05:19:34.000000',0,'670e9061-23d6-47a2-b03e-a4dfa77b28fc','john@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b36b4ce6-4931-4a84-b6de-d8c839760a79',NULL,NULL),('e3bd282a-0ee9-4efd-b58c-a41b8eda0249','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.848350','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e7f95e68-dd9d-4900-b6b7-277023b9ab62',NULL),('e762d51c-ab31-4cbb-8204-a92ecf285059','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.741496','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f1aa4c79-5be7-4f85-8fd7-7842ac6b00bd',NULL),('ea5d0ecb-5547-4f13-be43-d93adc236096','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.776568','2023-10-25 05:19:34.000000',0,'b6e56c95-c99f-441c-8702-dff0279490a4','root@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8ba8fef4-036d-4bda-ab7c-325b24c6c6fd',NULL),('ec2ec6cb-827a-4a29-9074-bcfbab3229ac','{\"text\": \"Content 1\"}','{\"text\": \"Comment 1\"}','{\"rects\": [{\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 100, \"x2\": 100, \"y1\": 100, \"y2\": 100, \"width\": 200, \"height\": 1200, \"pageNumber\": 1}}','2023-10-25 05:19:32.690259','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bac2edb4-30e1-4a72-bf42-bceed78193d0',NULL),('efa77c05-86e2-4448-86ad-fbccdf57836e','{\"text\": \"the malware installs an open-source program called mitmproxy\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 172.216552734375, \"x2\": 727.13916015625, \"y1\": 120.498046875, \"y2\": 143.748046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 172.216552734375, \"x2\": 727.13916015625, \"y1\": 120.498046875, \"y2\": 143.748046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:32:57.081109','2023-10-25 05:32:57.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','f89f8f60-25e6-4cb3-a0fb-c399f030aa11',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('f4148141-5c8b-4278-ba9f-a174f17b2cec','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.701633','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'002abf6a-5f5c-4486-b18b-f663b252b6de'),('f9b94882-4cd7-472d-8b32-4b53683eb704','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.288111','2023-10-25 05:19:34.000000',1,'7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','kate@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3f41b462-7148-44a2-8f2c-395508bbd875'),('fb68bc67-87cc-47ca-9005-9f9e84d93d4c','{\"text\": \"exfiltrating data\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 556.4213256835938, \"x2\": 654.0045776367188, \"y1\": 774.7808685302734, \"y2\": 790.7808685302734, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}], \"pageNumber\": 7, \"boundingRect\": {\"x1\": 556.4213256835938, \"x2\": 654.0045776367188, \"y1\": 774.7808685302734, \"y2\": 790.7808685302734, \"width\": 992.1266666666666, \"height\": 1403.15, \"pageNumber\": 7}}','2023-10-25 06:18:37.990093','2023-10-25 06:18:38.000000',1,'0c968ec1-bfff-47b0-9a77-e830d54fce05','john@attackflow.com',NULL,'19e3f1a9-ffc0-428b-908c-205a0dd82264',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('fcffe4a3-7cd5-4f86-a8de-7cf25a70960b','{\"text\": \"Content 2\"}','{\"text\": \"Comment 2\"}','{\"rects\": [{\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}], \"pageNumber\": 1, \"boundingRect\": {\"x1\": 120, \"x2\": 120, \"y1\": 120, \"y2\": 120, \"width\": 250, \"height\": 1000, \"pageNumber\": 1}}','2023-10-25 05:19:32.704991','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e34c04ac-0c79-41a4-9c4a-d4bebc9037c3'),('fe5682e9-2af5-4c08-bf05-ad9ac85f81b9','{\"text\": \"Content 3\"}','{\"text\": \"Comment 3\"}','{\"rects\": [{\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}], \"pageNumber\": 2, \"boundingRect\": {\"x1\": 160, \"x2\": 160, \"y1\": 160, \"y2\": 160, \"width\": 150, \"height\": 900, \"pageNumber\": 2}}','2023-10-25 05:19:32.668114','2023-10-25 05:19:34.000000',1,'3dec5d4b-3826-4e48-b15a-c0afddf97ecb','alice@attackflow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'74089956-bfd0-4992-8160-f26f747c7a22'),('fead4729-04bb-45af-8a67-d8c4ac2172bf','{\"text\": \"the software \\\"can be used to intercept, inspect, modify, and replayweb traffic\"}','{\"text\": \"john@attackflow.com\"}','{\"rects\": [{\"x1\": 296.6993408203125, \"x2\": 879.31689453125, \"y1\": 147.697998046875, \"y2\": 170.697998046875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}, {\"x1\": 119.997314453125, \"x2\": 211.10223388671875, \"y1\": 174.143310546875, \"y2\": 197.143310546875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}], \"pageNumber\": 4, \"boundingRect\": {\"x1\": 119.997314453125, \"x2\": 879.31689453125, \"y1\": 147.697998046875, \"y2\": 197.143310546875, \"width\": 1020.0, \"height\": 1319.9999999999998, \"pageNumber\": 4}}','2023-10-25 05:31:31.613455','2023-10-25 05:31:31.000000',1,'0c9332ce-623c-46c7-820d-d0be3168a150','john@attackflow.com','58b5921f-bebd-4283-819c-bc264f826a68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `annotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `annotation_version`
--

DROP TABLE IF EXISTS `annotation_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annotation_version` (
  `version` varchar(255) NOT NULL,
  `annotation` varchar(255) NOT NULL,
  PRIMARY KEY (`version`,`annotation`),
  KEY `FK_02ba3cb78b0b80531cbfdace8c7` (`annotation`),
  CONSTRAINT `FK_02ba3cb78b0b80531cbfdace8c7` FOREIGN KEY (`annotation`) REFERENCES `annotation` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_84802488b7f62109dfa542ff838` FOREIGN KEY (`version`) REFERENCES `version` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annotation_version`
--

LOCK TABLES `annotation_version` WRITE;
/*!40000 ALTER TABLE `annotation_version` DISABLE KEYS */;
INSERT INTO `annotation_version` VALUES ('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','089e5b0e-4a49-470f-a386-18ead0f4916d'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','0902efea-086f-4ee6-91e5-c32f9cca5313'),('b56dfd44-24d7-4f87-89aa-6268cc103378','0999d5a9-7642-4c82-81d9-9af6138f9915'),('fca04e97-0856-4a75-806d-919cbd1f7c86','0c723f4c-abaf-4805-b567-16cfa3dc4c48'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','0cbb32bd-83a7-48eb-afad-853b88882daf'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','0da2715b-0fa9-484e-a77e-f04365cf4081'),('b56dfd44-24d7-4f87-89aa-6268cc103378','1283f7ce-83fe-4731-a4ae-00cba0ab19c1'),('fca04e97-0856-4a75-806d-919cbd1f7c86','15ffc413-df99-4014-9fea-feaac9d48bdf'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','1aee95fd-2e5d-4872-a8e5-dd1b3a6ea898'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','1bb22f02-1745-49a4-beb7-ee5789c70f64'),('b56dfd44-24d7-4f87-89aa-6268cc103378','1d482a91-2fc2-4bfd-87e9-2e6ea06ebeea'),('fca04e97-0856-4a75-806d-919cbd1f7c86','2090f975-8802-4576-be76-d12e68650d0d'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','2107d623-be3c-4e1a-8d12-460f8e1b5e4c'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','212fb0df-f8f3-4562-9a78-2ae9a29e3a4e'),('b56dfd44-24d7-4f87-89aa-6268cc103378','21f18f0e-c597-4caa-8038-02a5fad6c69f'),('fca04e97-0856-4a75-806d-919cbd1f7c86','2305a2f0-c9c6-46c8-948b-401bea82854c'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','2e384a9d-59d9-4c51-818d-9206fb487adb'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','2e987c96-6b36-4435-a5ae-c5810d0373ac'),('b56dfd44-24d7-4f87-89aa-6268cc103378','32d3442b-ae3d-4a81-9820-c3dfa8fb02e6'),('fca04e97-0856-4a75-806d-919cbd1f7c86','34bec559-a2a2-4952-9888-060a13679d2a'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','35539d1e-aebb-4aee-8d5a-a6e65ef7c72c'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','37c62624-666a-4766-8761-a42a7224df60'),('b56dfd44-24d7-4f87-89aa-6268cc103378','3dd4c873-6d81-4e18-abd8-7a4e2cbb952d'),('fca04e97-0856-4a75-806d-919cbd1f7c86','41d1b07f-d9d2-4e2c-9f99-e7f094d243a5'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','43b4ca2e-30ae-465a-9680-674e77bfda5b'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','43f76ec9-d8df-4c51-aa24-e756df9dfd43'),('b56dfd44-24d7-4f87-89aa-6268cc103378','47e74a3a-0771-4a90-884c-faf4256b0f12'),('fca04e97-0856-4a75-806d-919cbd1f7c86','4ad2b9f9-0a17-4a64-a603-c984e19c7ccc'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','4b6965a0-6696-4e1a-a2d5-d624aaab5ae2'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','51b346aa-1a23-4ad1-9c48-2178eda56719'),('b56dfd44-24d7-4f87-89aa-6268cc103378','587eefee-a856-44bb-a4c4-2b9070df1fbc'),('fca04e97-0856-4a75-806d-919cbd1f7c86','61cd612d-c57f-4bae-a5ab-007e84e5fc68'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','67036ab0-7ea9-457c-b6b4-f91b5a978c65'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','6d726a21-7aa2-48f7-ac7a-7e4f1aac2a60'),('b56dfd44-24d7-4f87-89aa-6268cc103378','6ef1f0b1-dcba-44b2-92f0-bc153a95b6ef'),('fca04e97-0856-4a75-806d-919cbd1f7c86','720c208e-3cc9-41c2-9e6b-b574f9ba576b'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','730a88a7-af5a-4fef-bd09-6a74d7c8da8f'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','786bb646-b1bc-49d1-90b4-0065ffde1850'),('b56dfd44-24d7-4f87-89aa-6268cc103378','79ce5589-4880-4cdc-8e9d-91eef3b95471'),('fca04e97-0856-4a75-806d-919cbd1f7c86','83640a0a-89e6-447a-a237-f5cb58974a44'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','9a23c2db-a1cf-4fd0-8e65-cf3e7c2cc804'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','a06b6fed-3614-41d6-b6bd-7cd65ef81afb'),('b56dfd44-24d7-4f87-89aa-6268cc103378','a198f6aa-1ff3-47c6-8a85-5d980e46a24c'),('fca04e97-0856-4a75-806d-919cbd1f7c86','a54bdb73-b232-4c8d-9d48-9b5e88222ca3'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','a72a4617-1276-4f55-8cf8-b93ccafebb3b'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','a7bb8d2a-8142-447c-8561-d6fe269348cf'),('b56dfd44-24d7-4f87-89aa-6268cc103378','a803b703-af0e-48a2-8f44-22f1ceb4cc5b'),('fca04e97-0856-4a75-806d-919cbd1f7c86','aa62ab04-fc96-44ce-a0bf-8f70e5769cf4'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','aecc72f9-d1b0-48b1-99aa-9e7831b25ab8'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','ba022192-42b9-43fc-8c48-0a2e399617e4'),('b56dfd44-24d7-4f87-89aa-6268cc103378','be49ef4b-6dd7-48b0-a3b5-1f9329dc16eb'),('fca04e97-0856-4a75-806d-919cbd1f7c86','bece532d-3d4d-4ecf-9ebe-fcc3bcbbed89'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','c0444698-8270-4c98-9bef-4e19465bf0e8'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','c296f925-1dc1-4e8d-a9ff-20d5b36b18f6'),('b56dfd44-24d7-4f87-89aa-6268cc103378','ca6ca793-983a-4fca-b5a3-00fbe03ef775'),('fca04e97-0856-4a75-806d-919cbd1f7c86','cab76803-2b9f-41b7-a3f0-d398b3701f0b'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','cdcfbb01-87c5-47e7-bbc4-8e490ebdfa27'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','d1a65a21-039d-48db-a064-d321f76b3c68'),('b56dfd44-24d7-4f87-89aa-6268cc103378','d2983fd6-34cd-4dba-8797-446816e417d1'),('fca04e97-0856-4a75-806d-919cbd1f7c86','d5b7c3cd-54ad-46a5-b468-2cdfa44e713e'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','db8f305c-fde4-4e7a-a245-8312fb75014b'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','dc79d523-e995-4436-95e7-1a8ccc24929e'),('b56dfd44-24d7-4f87-89aa-6268cc103378','de0cdc7a-a3e1-4d9a-9ce0-9850a335de30'),('fca04e97-0856-4a75-806d-919cbd1f7c86','e07fecbb-a1e6-423c-ba32-6a41fcfbf392'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','e3bd282a-0ee9-4efd-b58c-a41b8eda0249'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','e762d51c-ab31-4cbb-8204-a92ecf285059'),('b56dfd44-24d7-4f87-89aa-6268cc103378','ea5d0ecb-5547-4f13-be43-d93adc236096'),('fca04e97-0856-4a75-806d-919cbd1f7c86','ec2ec6cb-827a-4a29-9074-bcfbab3229ac'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','f4148141-5c8b-4278-ba9f-a174f17b2cec'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','f9b94882-4cd7-472d-8b32-4b53683eb704'),('b56dfd44-24d7-4f87-89aa-6268cc103378','fcffe4a3-7cd5-4f86-a8de-7cf25a70960b'),('fca04e97-0856-4a75-806d-919cbd1f7c86','fe5682e9-2af5-4c08-bf05-ad9ac85f81b9');
/*!40000 ALTER TABLE `annotation_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvalRequest`
--

DROP TABLE IF EXISTS `approvalRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvalRequest` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` tinyint NOT NULL,
  `description` text NOT NULL,
  `user` varchar(255) NOT NULL,
  `project` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b2220f24dfe1fc30fbca5203db1` (`user`),
  KEY `FK_1ce03c2d427eb3d16e5ee4a854e` (`project`),
  CONSTRAINT `FK_1ce03c2d427eb3d16e5ee4a854e` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_b2220f24dfe1fc30fbca5203db1` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalRequest`
--

LOCK TABLES `approvalRequest` WRITE;
/*!40000 ALTER TABLE `approvalRequest` DISABLE KEYS */;
INSERT INTO `approvalRequest` VALUES ('1d26c16b-c782-4801-be23-3c14a892ce8e','2023-10-25 05:19:33.979537','2023-10-25 05:19:33.979537',0,'test description','kate@attackflow.com','b6e56c95-c99f-441c-8702-dff0279490a4'),('40433ce6-bcc4-425c-972f-69847d71042c','2023-10-25 05:19:33.950072','2023-10-25 05:19:33.950072',1,'test description','alice@attackflow.com','3dec5d4b-3826-4e48-b15a-c0afddf97ecb');
/*!40000 ALTER TABLE `approvalRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_6acdcbba567c6b8905196dea63` (`annotation_id`),
  CONSTRAINT `FK_6acdcbba567c6b8905196dea631` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES ('0125546e-3227-4291-9b8a-69950fb2de67','name 2 for asset 2','description 2 for asset 2','1283f7ce-83fe-4731-a4ae-00cba0ab19c1'),('062c2b42-1f91-411f-afe4-8903072a728d','Encrypted Data','Data encrypyed by Conti ransomware','7f74babf-29cb-454e-a1f8-c7b78e56b2a6'),('19e3f1a9-ffc0-428b-908c-205a0dd82264','Exfiltrated Data','Data is exfiltrated','fb68bc67-87cc-47ca-9005-9f9e84d93d4c'),('2e3a4de2-2853-41fc-a73b-85fec68be391','name 1 for asset 1','description 1 for asset 1','0da2715b-0fa9-484e-a77e-f04365cf4081'),('4edfba6f-f358-4cc4-929f-cf113870d119','User of Patient Zero Workstation','The user compromised by the spearfishing email.','a016e583-87f1-4b1c-b6d9-82cc0781556d'),('669d62e3-5e7c-49d4-9b13-d7625251a4e7',' ','User of Patirent Zero workstation receives malicious Excel file','af37dab6-491d-4f2a-9ea3-a625e7a5ef99'),('701a27ea-14cb-487b-b247-74a0e3cbdb48','HSE Server','The compromised server.','24c5fd7e-54f8-4a8e-9e96-4a792f9aa53f'),('99a1341c-985f-442d-92fc-42f20d6b03bf','name 3 for asset 3','description 3 for asset 3','15ffc413-df99-4014-9fea-feaac9d48bdf'),('c279f953-f7b1-4b29-b806-53530e63105d','Patirent Zero Workstation','The compromised workstation.','94f37c8c-f58d-4fc2-b2d9-a6e8592de52b'),('d9c496d7-aa1a-4397-98cf-3abace15443a','name 0 for asset 0','description 0 for asset 0','0cbb32bd-83a7-48eb-afad-853b88882daf'),('f68ca503-82f4-40a8-85f7-76f6857e9f44','IT Systems','Statuory and voluntary systems compromised','8edc9fd2-4f81-4b8a-9d75-5da3a0a64cff');
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `first_seen` datetime NOT NULL,
  `objective` text NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_2a70e6e6c34ae1d2ded57385bb` (`annotation_id`),
  CONSTRAINT `FK_2a70e6e6c34ae1d2ded57385bb3` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES ('4784fa6c-9ffd-4341-b39d-9417410d9471','name 1 for campaign 1','description 1 for campaign 1','2021-12-12 11:11:11','objective 1 for campaign 1','1bb22f02-1745-49a4-beb7-ee5789c70f64'),('5bbc360b-9834-4c91-8a4a-2070535f6371','name 2 for campaign 2','description 2 for campaign 2','2021-12-12 11:11:11','objective 2 for campaign 2','1d482a91-2fc2-4bfd-87e9-2e6ea06ebeea'),('e78043a6-4055-46d6-a91e-13bf3ed1979e','name 3 for campaign 3','description 3 for campaign 3','2021-12-12 11:11:11','objective 3 for campaign 3','2090f975-8802-4576-be76-d12e68650d0d'),('ec1d19e7-4a61-4f16-a437-52a36fa625a0','name 0 for campaign 0','description 0 for campaign 0','2021-12-12 11:11:11','objective 0 for campaign 0','1aee95fd-2e5d-4872-a8e5-dd1b3a6ea898');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condition`
--

DROP TABLE IF EXISTS `condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condition` (
  `id` varchar(36) NOT NULL,
  `description` text NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_83ffab3103e2baa1a5ea272c7b` (`annotation_id`),
  CONSTRAINT `FK_83ffab3103e2baa1a5ea272c7b2` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condition`
--

LOCK TABLES `condition` WRITE;
/*!40000 ALTER TABLE `condition` DISABLE KEYS */;
INSERT INTO `condition` VALUES ('3b15fcc4-d5c9-47cb-a2fc-05818e56437f','description 0 for condition 0','2107d623-be3c-4e1a-8d12-460f8e1b5e4c'),('47f93035-3b6b-4018-85b4-488f51814435','Patient Zero user opens the malicious Excel file, compromising the Patient Zero workstation.','2263dec3-efc1-4b2e-9abe-7af90375d2d4'),('b9d6f7ee-0e41-428b-9db7-b0dbfc079399','HSE Server is compromised.','aa29a4d8-01c6-4f16-beef-bfc8fd3921cf'),('d5817d1b-2331-467c-8075-c3b66f16b5c9','description 3 for condition 3','2305a2f0-c9c6-46c8-948b-401bea82854c'),('e4dbb9e6-af43-4f72-9fae-231648605f01','description 2 for condition 2','21f18f0e-c597-4caa-8038-02a5fad6c69f'),('e6f33ada-3bfe-4d03-9cbe-ae88186d7a58','description 1 for condition 1','212fb0df-f8f3-4562-9a78-2ae9a29e3a4e');
/*!40000 ALTER TABLE `condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directory`
--

DROP TABLE IF EXISTS `directory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directory` (
  `id` varchar(36) NOT NULL,
  `path` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_4fd2c26e0e105acdb1a390353c` (`annotation_id`),
  CONSTRAINT `FK_4fd2c26e0e105acdb1a390353cf` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directory`
--

LOCK TABLES `directory` WRITE;
/*!40000 ALTER TABLE `directory` DISABLE KEYS */;
INSERT INTO `directory` VALUES ('363f35d4-08fc-49c6-b968-81752a8525c7','path 0 for directory 0','2e384a9d-59d9-4c51-818d-9206fb487adb'),('53305d32-e31a-4a37-ab5c-2baa8ec4bc9c','path 1 for directory 1','2e987c96-6b36-4435-a5ae-c5810d0373ac'),('69c63941-8206-4907-9158-d58800bbec3d','path 3 for directory 3','34bec559-a2a2-4952-9888-060a13679d2a'),('a418d524-103a-4df9-8558-ce74ccef6bf2','path 2 for directory 2','32d3442b-ae3d-4a81-9820-c3dfa8fb02e6');
/*!40000 ALTER TABLE `directory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_f0be2f5a6bbdd9bbb1d691e481` (`annotation_id`),
  CONSTRAINT `FK_f0be2f5a6bbdd9bbb1d691e4817` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES ('04f2c16d-9e7c-4b5f-9569-33edbb62ce72','fileName3.png','41d1b07f-d9d2-4e2c-9f99-e7f094d243a5'),('2bd4e9f9-6ead-4395-beba-5c56986f2c34','fileName0.png','35539d1e-aebb-4aee-8d5a-a6e65ef7c72c'),('2fac9d44-3b10-4f26-8192-ee51c1ab85ce','fileName2.png','3dd4c873-6d81-4e18-abd8-7a4e2cbb952d'),('76100e04-cb79-42fa-8a5d-2a0d59252600','fileName1.png','37c62624-666a-4766-8761-a42a7224df60');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identity`
--

DROP TABLE IF EXISTS `identity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `identity` (
  `id` varchar(36) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `author_email` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_50fc8956a9d6e4f37d06330a7a` (`annotation_id`),
  CONSTRAINT `FK_50fc8956a9d6e4f37d06330a7a3` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identity`
--

LOCK TABLES `identity` WRITE;
/*!40000 ALTER TABLE `identity` DISABLE KEYS */;
INSERT INTO `identity` VALUES ('5165cc3e-dd1e-4c54-bcfd-affbe6cf725e','author 2 for identity 2','author2@gmail.com','47e74a3a-0771-4a90-884c-faf4256b0f12'),('6fe03c60-c725-4904-96af-3288842cb8f8','author 1 for identity 1','author1@gmail.com','43f76ec9-d8df-4c51-aa24-e756df9dfd43'),('cde5687c-b68f-45ef-a27a-4b6001f83265','author 3 for identity 3','author3@gmail.com','4ad2b9f9-0a17-4a64-a603-c984e19c7ccc'),('fdf697de-77f1-4c2c-baa2-68e9524a9b16','author 0 for identity 0','author0@gmail.com','43b4ca2e-30ae-465a-9680-674e77bfda5b');
/*!40000 ALTER TABLE `identity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infrastructure`
--

DROP TABLE IF EXISTS `infrastructure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infrastructure` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_bddecd11fe4d6e9ea4235d8a80` (`annotation_id`),
  CONSTRAINT `FK_bddecd11fe4d6e9ea4235d8a808` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infrastructure`
--

LOCK TABLES `infrastructure` WRITE;
/*!40000 ALTER TABLE `infrastructure` DISABLE KEYS */;
INSERT INTO `infrastructure` VALUES ('4a887850-eb92-471a-9d7b-44db290e4349','infrastructure 1','description 1 for infrastructure 1','51b346aa-1a23-4ad1-9c48-2178eda56719'),('919b784f-4c71-437b-90e4-a2e9df7c4f15','infrastructure 3','description 3 for infrastructure 3','61cd612d-c57f-4bae-a5ab-007e84e5fc68'),('9de55abb-cf17-4385-97c1-5ee443c27c01','infrastructure 2','description 2 for infrastructure 2','587eefee-a856-44bb-a4c4-2b9070df1fbc'),('e94c8e17-c16a-44c5-a4f1-2c52a89d0411','infrastructure 0','description 0 for infrastructure 0','4b6965a0-6696-4e1a-a2d5-d624aaab5ae2');
/*!40000 ALTER TABLE `infrastructure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ipv4`
--

DROP TABLE IF EXISTS `ipv4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ipv4` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_1d92b1ddda19bb87c5f9b58fa2` (`annotation_id`),
  CONSTRAINT `FK_1d92b1ddda19bb87c5f9b58fa20` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipv4`
--

LOCK TABLES `ipv4` WRITE;
/*!40000 ALTER TABLE `ipv4` DISABLE KEYS */;
INSERT INTO `ipv4` VALUES ('14b14f00-29d3-4fdd-a0f0-e64d238ac12a','194.31.98.141','720c208e-3cc9-41c2-9e6b-b574f9ba576b'),('161fede6-9910-4818-8b65-c5ebe5c5cb56','255.255.255.255','6d726a21-7aa2-48f7-ac7a-7e4f1aac2a60'),('206f8ec6-ecde-4ae2-b80d-b56381218fbf','194.31.98.141','67036ab0-7ea9-457c-b6b4-f91b5a978c65'),('8aa8712c-8a9c-4bad-ae55-a72b07ecdf0e','192.99.99.99','6ef1f0b1-dcba-44b2-92f0-bc153a95b6ef');
/*!40000 ALTER TABLE `ipv4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `malware`
--

DROP TABLE IF EXISTS `malware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `malware` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_family` tinyint NOT NULL,
  `type` json NOT NULL,
  `capabilities` json NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_38787b6512fe5ab648797938f3` (`annotation_id`),
  CONSTRAINT `FK_38787b6512fe5ab648797938f39` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `malware`
--

LOCK TABLES `malware` WRITE;
/*!40000 ALTER TABLE `malware` DISABLE KEYS */;
INSERT INTO `malware` VALUES ('106a1c4c-b6b5-4743-8f6b-7b39d481fcee','malware 1','description 1 for asset 1',0,'{\"name1\": \"malware type 1\", \"name2\": \"malware type 2\"}','{\"name1\": \"malware capabilities 1\", \"name2\": \"malware capabilities 2\"}','786bb646-b1bc-49d1-90b4-0065ffde1850'),('49822866-bc99-4524-9b14-58a17c28ea6a','malware 3','description 3 for asset 3',0,'{\"name1\": \"malware type 3\", \"name2\": \"malware type 4\"}','{\"name1\": \"malware capabilities 3\", \"name2\": \"malware capabilities 4\"}','83640a0a-89e6-447a-a237-f5cb58974a44'),('6e77f334-a408-4046-a35d-1be61d00c15d','malware 0','description 0 for asset 0',1,'{\"name1\": \"malware type 0\", \"name2\": \"malware type 1\"}','{\"name1\": \"malware capabilities 0\", \"name2\": \"malware capabilities 1\"}','730a88a7-af5a-4fef-bd09-6a74d7c8da8f'),('d399a4b3-31a2-4cdc-8469-d790abfa1dde','malware 2','description 2 for asset 2',1,'{\"name1\": \"malware type 2\", \"name2\": \"malware type 3\"}','{\"name1\": \"malware capabilities 2\", \"name2\": \"malware capabilities 3\"}','79ce5589-4880-4cdc-8e9d-91eef3b95471');
/*!40000 ALTER TABLE `malware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `authors` json NOT NULL,
  `object_refs` json NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_06456a3afcc3aec56d39487f0b` (`annotation_id`),
  CONSTRAINT `FK_06456a3afcc3aec56d39487f0bf` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES ('3ae25833-91a7-4936-be77-374a8b39288b','content for 2','{\"author1\": \"author 2\", \"author2\": \"author 3\"}','{\"object1\": \"a198f6aa-1ff3-47c6-8a85-5d980e46a24c\"}','a198f6aa-1ff3-47c6-8a85-5d980e46a24c'),('6894d3de-e62c-41aa-b98d-eb2678889aab','content for 3','{\"author1\": \"author 3\", \"author2\": \"author 4\"}','{\"object1\": \"a54bdb73-b232-4c8d-9d48-9b5e88222ca3\"}','a54bdb73-b232-4c8d-9d48-9b5e88222ca3'),('d873c54c-9052-4c7c-ab4a-2966e4772adf','content for 0','{\"author1\": \"author 0\", \"author2\": \"author 1\"}','{\"object1\": \"9a23c2db-a1cf-4fd0-8e65-cf3e7c2cc804\"}','9a23c2db-a1cf-4fd0-8e65-cf3e7c2cc804'),('f6e30f42-77fb-43bb-a0fd-a7921d764841','content for 1','{\"author1\": \"author 1\", \"author2\": \"author 2\"}','{\"object1\": \"a06b6fed-3614-41d6-b6bd-7cd65ef81afb\"}','a06b6fed-3614-41d6-b6bd-7cd65ef81afb');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` varchar(36) NOT NULL,
  `command_line` text NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_fb33a3696bfd9ea897324f401b` (`annotation_id`),
  CONSTRAINT `FK_fb33a3696bfd9ea897324f401b1` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES ('36d495d6-d5ca-45fd-9735-d02ce3b0e1c6','command line 0','a72a4617-1276-4f55-8cf8-b93ccafebb3b'),('48296491-70ec-4720-a928-653ef5f24447','command line 3','aa62ab04-fc96-44ce-a0bf-8f70e5769cf4'),('5ab1b937-3a7c-4a4b-9ba3-3b2b46fc038e','command line 2','a803b703-af0e-48a2-8f44-22f1ceb4cc5b'),('f9bc666b-f761-4075-93bc-2fb7b2026722','command line 1','a7bb8d2a-8142-447c-8561-d6fe269348cf');
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `is_approved` tinyint NOT NULL,
  `is_hidden` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('0c9332ce-623c-46c7-820d-d0be3168a150','Mac malware intercepts encrypted web traffic for ad injection','2023-10-25 05:21:34.691597','2023-10-25 07:09:42.099442','public/1698211307370***SearchAwesome_Adware.pdf','https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=600','Last week, Malwarebytes researcher Adam Thomas found an interesting new piece of Mac malware that exhibits some troubling behaviors, including intercepting encrypted web traffic to inject ads. Let\'s take a closer look at this adware, which Malwarebytes for Mac detects as OSX.SearchAwesome, to see how it\'s installed, its behavior, and the implications of this kind of attack.',1,1),('0c968ec1-bfff-47b0-9a77-e830d54fce05','Conti cyber attack on the HSE','2023-10-25 06:13:39.689912','2023-10-25 07:09:42.084228','public/1698214616351***conti-cyber-attack-on-the-hse-full-report.pdf','https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600','On the 14th of May, the Health Service Executive (HSE), Ireland’s publicly funded healthcare system, fell victim to a Conti ransomware attack, forcing the organization to shut down more than 80,000 affected endpoints and plunging them back to the age of pen and paper. This happened a week after DarkSide, another ransomware strain, hit the USA’s Colonial Pipeline systems.',1,1),('3dec5d4b-3826-4e48-b15a-c0afddf97ecb','title 1 for project 1','2023-10-25 05:19:30.894937','2023-10-25 05:19:30.894937','public/1696816570529***file-raid.pdf',NULL,'description 1 for project 1',0,1),('670e9061-23d6-47a2-b03e-a4dfa77b28fc','DDOS Attack on Dubai','2023-10-25 05:19:30.892903','2023-10-25 05:19:30.892903','public/1696816570529***file-raid.pdf','https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Cloudflare has recently gotten a surge of data that was unimaginable over 2 hours.',1,0),('7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','title 3 for project 3','2023-10-25 05:19:30.900718','2023-10-25 05:19:30.900718','public/1696816570529***file-raid.pdf',NULL,'description 3 for project 3',0,1),('b6e56c95-c99f-441c-8702-dff0279490a4','Microsoft Phishing','2023-10-25 05:19:30.909790','2023-10-25 05:19:30.909790','public/1696816570529***file-raid.pdf','https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','100 million user accounts were compromised due to a misconfiguration in Azure.',1,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `id` varchar(36) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `type` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_54f2fd507ba2a4a93fbeacfdaa3` (`source`),
  KEY `FK_4303e524b923a15c226c8dad98f` (`target`),
  KEY `FK_0b433d74276453d7d68fc506f2b` (`project_id`),
  CONSTRAINT `FK_0b433d74276453d7d68fc506f2b` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4303e524b923a15c226c8dad98f` FOREIGN KEY (`target`) REFERENCES `annotation` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_54f2fd507ba2a4a93fbeacfdaa3` FOREIGN KEY (`source`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES ('0d9c219c-a94a-40bf-b849-38c7229cfe5d','0c9332ce-623c-46c7-820d-d0be3168a150','4c8ea422-5692-4b6d-b240-e78c306a562f','c46b1ed1-6b9b-4807-8d65-44e34e4a7abd','is-effect','{\"AND\": true}'),('137a4ff5-0bf7-4dd1-a4e9-c64d088a97b8','0c968ec1-bfff-47b0-9a77-e830d54fce05','440ed669-e7d2-4a14-84d3-ee4fe0b40cc8','94f37c8c-f58d-4fc2-b2d9-a6e8592de52b','is-effect','{\"AND\": true}'),('168d1b7d-e652-4a29-b844-728a75056b18','670e9061-23d6-47a2-b03e-a4dfa77b28fc','212fb0df-f8f3-4562-9a78-2ae9a29e3a4e','21f18f0e-c597-4caa-8038-02a5fad6c69f','related-to','{\"AND\": true}'),('1712bed6-a42f-4f8b-a690-506ab9053671','0c9332ce-623c-46c7-820d-d0be3168a150','efa77c05-86e2-4448-86ad-fbccdf57836e','fead4729-04bb-45af-8a67-d8c4ac2172bf','is-effect','{\"AND\": true}'),('1a0f5264-7110-456c-a3e7-27098cb5011b','b6e56c95-c99f-441c-8702-dff0279490a4','2090f975-8802-4576-be76-d12e68650d0d','2107d623-be3c-4e1a-8d12-460f8e1b5e4c','related-to','{\"AND\": true}'),('1e0d064b-ee32-4e8c-a1c0-9a60e5b8160a','670e9061-23d6-47a2-b03e-a4dfa77b28fc','0da2715b-0fa9-484e-a77e-f04365cf4081','1283f7ce-83fe-4731-a4ae-00cba0ab19c1','related-to','{\"AND\": true}'),('1e91ee71-bde4-43af-8697-58c3e6cde535','b6e56c95-c99f-441c-8702-dff0279490a4','0c723f4c-abaf-4805-b567-16cfa3dc4c48','0cbb32bd-83a7-48eb-afad-853b88882daf','related-to','{\"AND\": true}'),('29d520f2-b826-435d-ab11-cc82fff80880','0c9332ce-623c-46c7-820d-d0be3168a150','fead4729-04bb-45af-8a67-d8c4ac2172bf','4c8ea422-5692-4b6d-b240-e78c306a562f','is-effect','{\"AND\": true}'),('30ed320c-99f6-430b-a746-b885062a40bf','0c968ec1-bfff-47b0-9a77-e830d54fce05','1c2eea43-19d6-4575-8e44-fd879f10b155','fb68bc67-87cc-47ca-9005-9f9e84d93d4c','is-effect','{\"AND\": true}'),('31803ae1-9805-43b6-a525-d65cbebe6e66','3dec5d4b-3826-4e48-b15a-c0afddf97ecb','2e384a9d-59d9-4c51-818d-9206fb487adb','2e987c96-6b36-4435-a5ae-c5810d0373ac','effect','{\"AND\": true}'),('3a0b566c-d2b7-491f-a72d-10d80faeb173','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','1d482a91-2fc2-4bfd-87e9-2e6ea06ebeea','2090f975-8802-4576-be76-d12e68650d0d','effect','{\"AND\": true}'),('3f6dd0f8-7250-4ba6-a0fd-bb212efafe9c','0c968ec1-bfff-47b0-9a77-e830d54fce05','96f33bff-91a4-465b-be44-a4456ae5f56e','af37dab6-491d-4f2a-9ea3-a625e7a5ef99','is-effect','{\"AND\": true}'),('4a7aeb86-66dc-4764-976b-a799d8d158a8','0c968ec1-bfff-47b0-9a77-e830d54fce05','2263dec3-efc1-4b2e-9abe-7af90375d2d4','a72f484d-1666-470c-a2f0-fdcff24f77ca','is-effect','{\"AND\": true}'),('4cc630f8-3650-45e2-a6ab-ea054a052c9a','0c968ec1-bfff-47b0-9a77-e830d54fce05','aa29a4d8-01c6-4f16-beef-bfc8fd3921cf','a333d4d9-d29a-448f-813d-78af9bf61a46','is-effect','{\"AND\": true}'),('51087804-b4c5-44ac-bf39-cd008915baa5','670e9061-23d6-47a2-b03e-a4dfa77b28fc','0902efea-086f-4ee6-91e5-c32f9cca5313','0999d5a9-7642-4c82-81d9-9af6138f9915','related-to','{\"AND\": true}'),('5fb7306e-4ca4-4fa2-aef5-ba607b45bbba','3dec5d4b-3826-4e48-b15a-c0afddf97ecb','1aee95fd-2e5d-4872-a8e5-dd1b3a6ea898','1bb22f02-1745-49a4-beb7-ee5789c70f64','effect','{\"AND\": true}'),('6109219d-c00c-4138-a0ca-08dbcefbf953','0c968ec1-bfff-47b0-9a77-e830d54fce05','aa29a4d8-01c6-4f16-beef-bfc8fd3921cf','725f093b-0bf5-4fc0-8564-7ed544198ae5','is-effect','{\"AND\": true}'),('615b7d48-1ad9-4d10-8a7f-0f39c5d44d14','0c968ec1-bfff-47b0-9a77-e830d54fce05','96f33bff-91a4-465b-be44-a4456ae5f56e','a016e583-87f1-4b1c-b6d9-82cc0781556d','is-effect','{\"AND\": true}'),('69a3d4b3-d208-4967-b238-a0161dd9b396','0c968ec1-bfff-47b0-9a77-e830d54fce05','725f093b-0bf5-4fc0-8564-7ed544198ae5','8edc9fd2-4f81-4b8a-9d75-5da3a0a64cff','is-effect','{\"AND\": true}'),('6e6cf098-921d-46fd-bce6-207575a6afb2','670e9061-23d6-47a2-b03e-a4dfa77b28fc','2e987c96-6b36-4435-a5ae-c5810d0373ac','32d3442b-ae3d-4a81-9820-c3dfa8fb02e6','related-to','{\"AND\": true}'),('7b8885b3-19a6-401f-bbe0-5adcea3c8ce2','b6e56c95-c99f-441c-8702-dff0279490a4','2305a2f0-c9c6-46c8-948b-401bea82854c','2e384a9d-59d9-4c51-818d-9206fb487adb','related-to','{\"AND\": true}'),('7d600701-6ccb-4b37-8ce4-cef8d1d0d038','0c9332ce-623c-46c7-820d-d0be3168a150','c46b1ed1-6b9b-4807-8d65-44e34e4a7abd','d0dba638-f999-4e19-ab7e-702461739171','is-effect','{\"AND\": true}'),('83ef4c83-378e-412c-a16f-9ff62ccffa8f','670e9061-23d6-47a2-b03e-a4dfa77b28fc','1bb22f02-1745-49a4-beb7-ee5789c70f64','1d482a91-2fc2-4bfd-87e9-2e6ea06ebeea','related-to','{\"AND\": true}'),('89a30fb9-3f9f-4701-8ab7-c0345cadd312','b6e56c95-c99f-441c-8702-dff0279490a4','15ffc413-df99-4014-9fea-feaac9d48bdf','1aee95fd-2e5d-4872-a8e5-dd1b3a6ea898','related-to','{\"AND\": true}'),('8b12c386-d9df-4927-9fc9-9c6dcc3ad470','0c968ec1-bfff-47b0-9a77-e830d54fce05','1b51403b-ffa5-4e52-8997-8749e6d17c4c','fb68bc67-87cc-47ca-9005-9f9e84d93d4c','is-effect','{\"AND\": true}'),('8ea08b9c-c660-4885-af9d-c3d080f83fe5','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','21f18f0e-c597-4caa-8038-02a5fad6c69f','2305a2f0-c9c6-46c8-948b-401bea82854c','effect','{\"AND\": true}'),('8ef8b887-69c4-4fbc-9efc-bee3be44ef7d','0c968ec1-bfff-47b0-9a77-e830d54fce05','a72f484d-1666-470c-a2f0-fdcff24f77ca','aa29a4d8-01c6-4f16-beef-bfc8fd3921cf','is-effect','{\"AND\": true}'),('91569500-1572-4a08-8862-16efa9cec396','3dec5d4b-3826-4e48-b15a-c0afddf97ecb','089e5b0e-4a49-470f-a386-18ead0f4916d','0902efea-086f-4ee6-91e5-c32f9cca5313','effect','{\"AND\": true}'),('9251e0e2-bd06-49ea-8cb5-5be1188dfc59','0c968ec1-bfff-47b0-9a77-e830d54fce05','440ed669-e7d2-4a14-84d3-ee4fe0b40cc8','2263dec3-efc1-4b2e-9abe-7af90375d2d4','is-effect','{\"AND\": true}'),('927c1269-bf4e-4bf2-a7f8-68ac08ac709d','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','0999d5a9-7642-4c82-81d9-9af6138f9915','0c723f4c-abaf-4805-b567-16cfa3dc4c48','effect','{\"AND\": true}'),('946a6995-a52e-4195-8f0e-ae3c6feae853','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','32d3442b-ae3d-4a81-9820-c3dfa8fb02e6','34bec559-a2a2-4952-9888-060a13679d2a','effect','{\"AND\": true}'),('a457c5f7-2a5c-46a8-aa92-cbf651005ab1','0c9332ce-623c-46c7-820d-d0be3168a150','d0dba638-f999-4e19-ab7e-702461739171','743686b1-3ec3-42e7-bfcf-5a6ce06dd100','is-effect','{\"AND\": true}'),('a88869bc-81bb-4368-bcd5-68de7c211d81','0c9332ce-623c-46c7-820d-d0be3168a150','2bd3f41a-4345-417d-83ad-8675555c766e','b3077d01-66e7-41ee-8c38-725dae3ca59f','is-effect','{\"AND\": true}'),('affde979-6b5a-4783-94c8-644497a86b65','0c9332ce-623c-46c7-820d-d0be3168a150','736f7e29-1a12-4ef3-986b-a75ac37f3d4c','efa77c05-86e2-4448-86ad-fbccdf57836e','is-effect','{\"AND\": true}'),('c32867ac-5c87-4840-886e-55d54dbba013','0c9332ce-623c-46c7-820d-d0be3168a150','b3077d01-66e7-41ee-8c38-725dae3ca59f','d73f60a6-345c-429b-907f-ae62264e12e0','is-effect','{\"AND\": true}'),('c38a81ed-35b1-44f3-9820-99a16e46549e','3dec5d4b-3826-4e48-b15a-c0afddf97ecb','0cbb32bd-83a7-48eb-afad-853b88882daf','0da2715b-0fa9-484e-a77e-f04365cf4081','effect','{\"AND\": true}'),('c79a743d-647e-4f79-af42-d590ae19a885','0c9332ce-623c-46c7-820d-d0be3168a150','c27fd2ad-08c5-410e-8881-fa492b20d0ff','736f7e29-1a12-4ef3-986b-a75ac37f3d4c','is-effect','{\"AND\": true}'),('d07e4bfc-d1d2-4f46-94ee-fa4af5c6b0c8','0c968ec1-bfff-47b0-9a77-e830d54fce05','a72f484d-1666-470c-a2f0-fdcff24f77ca','24c5fd7e-54f8-4a8e-9e96-4a792f9aa53f','is-effect','{\"AND\": true}'),('d14b54d6-db57-4e5f-bcff-89f5f4496afb','0c968ec1-bfff-47b0-9a77-e830d54fce05','af37dab6-491d-4f2a-9ea3-a625e7a5ef99','440ed669-e7d2-4a14-84d3-ee4fe0b40cc8','is-effect','{\"AND\": true}'),('d18d58d2-549f-4a4c-b673-c0903dfc3b54','3dec5d4b-3826-4e48-b15a-c0afddf97ecb','2107d623-be3c-4e1a-8d12-460f8e1b5e4c','212fb0df-f8f3-4562-9a78-2ae9a29e3a4e','effect','{\"AND\": true}'),('d3cf4ef0-af0c-4d45-83e1-eb49c8b6e5ca','b6e56c95-c99f-441c-8702-dff0279490a4','34bec559-a2a2-4952-9888-060a13679d2a','35539d1e-aebb-4aee-8d5a-a6e65ef7c72c','related-to','{\"AND\": true}'),('d744e570-f0bf-4c3c-81d4-398fa4c25e3f','0c968ec1-bfff-47b0-9a77-e830d54fce05','1c2eea43-19d6-4575-8e44-fd879f10b155','1b51403b-ffa5-4e52-8997-8749e6d17c4c','is-effect','{\"AND\": true}'),('d9528d8c-f4b6-466a-9648-fb42cd7b55c6','0c968ec1-bfff-47b0-9a77-e830d54fce05','aa29a4d8-01c6-4f16-beef-bfc8fd3921cf','1c2eea43-19d6-4575-8e44-fd879f10b155','is-effect','{\"AND\": true}'),('eb0557a3-c28f-475f-a1f3-4182bd14b279','0c9332ce-623c-46c7-820d-d0be3168a150','d73f60a6-345c-429b-907f-ae62264e12e0','c27fd2ad-08c5-410e-8881-fa492b20d0ff','is-effect','{\"AND\": true}'),('ef33d3e9-9493-4d1b-8191-9a0dfe8c8532','0c968ec1-bfff-47b0-9a77-e830d54fce05','a333d4d9-d29a-448f-813d-78af9bf61a46','7f74babf-29cb-454e-a1f8-c7b78e56b2a6','is-effect','{\"AND\": true}'),('fb8587f9-48d5-45f8-bdc6-1828599510e0','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea','1283f7ce-83fe-4731-a4ae-00cba0ab19c1','15ffc413-df99-4014-9fea-feaac9d48bdf','effect','{\"AND\": true}');
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `software` (
  `id` varchar(36) NOT NULL,
  `path` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_4b3398e6acb6cdfa54ecd172c5` (`annotation_id`),
  CONSTRAINT `FK_4b3398e6acb6cdfa54ecd172c51` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES ('1a632319-698c-40c6-a41b-459dc320a214','path 0 for software 0','aecc72f9-d1b0-48b1-99aa-9e7831b25ab8'),('2f806048-51b0-45a8-8fa6-fe456d8b471d','path 3 for software 3','bece532d-3d4d-4ecf-9ebe-fcc3bcbbed89'),('ca8c96c5-33b4-4471-953e-d01462c43012','path 1 for software 1','ba022192-42b9-43fc-8c48-0a2e399617e4'),('e8335211-0686-4f9b-9052-f9aa73f7d698','path 2 for software 2','be49ef4b-6dd7-48b0-a3b5-1f9329dc16eb');
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testuser`
--

DROP TABLE IF EXISTS `testuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testuser`
--

LOCK TABLES `testuser` WRITE;
/*!40000 ALTER TABLE `testuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `testuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threat_actor`
--

DROP TABLE IF EXISTS `threat_actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `threat_actor` (
  `id` varchar(36) NOT NULL,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `types` json NOT NULL,
  `aliases` json NOT NULL,
  `first_seen` datetime NOT NULL,
  `roles` json NOT NULL,
  `goals` json NOT NULL,
  `sophistication` varchar(255) NOT NULL,
  `resource_level` varchar(255) NOT NULL,
  `primary_motivation` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a8c220f20512c8c9422f965f74` (`annotation_id`),
  CONSTRAINT `FK_a8c220f20512c8c9422f965f74b` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threat_actor`
--

LOCK TABLES `threat_actor` WRITE;
/*!40000 ALTER TABLE `threat_actor` DISABLE KEYS */;
INSERT INTO `threat_actor` VALUES ('2c6524e4-28a4-4e43-a9ab-a4c7098c6de5','Path 0','ThreatActor 0','description 0 for asset 0','{\"type1\": \"ThreatActor type 0\", \"type2\": \"ThreatActor type 1\"}','{\"alias1\": \"ThreatActor alias 0\", \"alias2\": \"ThreatActor alias 1\"}','2022-11-11 12:12:12','{\"role1\": \"ThreatActor role 0\", \"role2\": \"ThreatActor role 1\"}','{\"goal1\": \"ThreatActor goal 0\", \"goal2\": \"ThreatActor goal 1\"}','Sophistication 0','Resource Level 0','Motivation 0','c0444698-8270-4c98-9bef-4e19465bf0e8'),('a68d188e-6c76-400f-85a6-eccf718840f5','Path 2','ThreatActor 2','description 2 for asset 2','{\"type1\": \"ThreatActor type 2\", \"type2\": \"ThreatActor type 3\"}','{\"alias1\": \"ThreatActor alias 2\", \"alias2\": \"ThreatActor alias 3\"}','2022-11-11 12:12:12','{\"role1\": \"ThreatActor role 2\", \"role2\": \"ThreatActor role 3\"}','{\"goal1\": \"ThreatActor goal 2\", \"goal2\": \"ThreatActor goal 3\"}','Sophistication 2','Resource Level 2','Motivation 2','ca6ca793-983a-4fca-b5a3-00fbe03ef775'),('caa2531d-8014-4d0d-89ec-043e6bce556a','Path 1','ThreatActor 1','description 1 for asset 1','{\"type1\": \"ThreatActor type 1\", \"type2\": \"ThreatActor type 2\"}','{\"alias1\": \"ThreatActor alias 1\", \"alias2\": \"ThreatActor alias 2\"}','2022-11-11 12:12:12','{\"role1\": \"ThreatActor role 1\", \"role2\": \"ThreatActor role 2\"}','{\"goal1\": \"ThreatActor goal 1\", \"goal2\": \"ThreatActor goal 2\"}','Sophistication 1','Resource Level 1','Motivation 1','c296f925-1dc1-4e8d-a9ff-20d5b36b18f6'),('d69b4d33-b183-47ee-a662-dffbe3bcc739','Path 3','ThreatActor 3','description 3 for asset 3','{\"type1\": \"ThreatActor type 3\", \"type2\": \"ThreatActor type 4\"}','{\"alias1\": \"ThreatActor alias 3\", \"alias2\": \"ThreatActor alias 4\"}','2022-11-11 12:12:12','{\"role1\": \"ThreatActor role 3\", \"role2\": \"ThreatActor role 4\"}','{\"goal1\": \"ThreatActor goal 3\", \"goal2\": \"ThreatActor goal 4\"}','Sophistication 3','Resource Level 3','Motivation 3','cab76803-2b9f-41b7-a3f0-d398b3701f0b');
/*!40000 ALTER TABLE `threat_actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool`
--

DROP TABLE IF EXISTS `tool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tool` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `types` json NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_84ef42771f2d36422fc50d20ec` (`annotation_id`),
  CONSTRAINT `FK_84ef42771f2d36422fc50d20ec7` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool`
--

LOCK TABLES `tool` WRITE;
/*!40000 ALTER TABLE `tool` DISABLE KEYS */;
INSERT INTO `tool` VALUES ('094dcf09-483d-4173-833c-05bacc30c6a9','name 0 for asset 0','description 0 for asset 0','{\"type1\": \"type 0 for tool\", \"type2\": \"type 1 for tool\"}','cdcfbb01-87c5-47e7-bbc4-8e490ebdfa27'),('827d1efa-95db-4666-86ed-db920d51cd10','name 1 for asset 1','description 1 for asset 1','{\"type1\": \"type 1 for tool\", \"type2\": \"type 2 for tool\"}','d1a65a21-039d-48db-a064-d321f76b3c68'),('9c3b22a2-023a-4b96-b08f-c54adcf681ab','name 3 for asset 3','description 3 for asset 3','{\"type1\": \"type 3 for tool\", \"type2\": \"type 4 for tool\"}','d5b7c3cd-54ad-46a5-b468-2cdfa44e713e'),('b2c76a77-7000-4d09-9db5-4f009d4c2567','name 2 for asset 2','description 2 for asset 2','{\"type1\": \"type 2 for tool\", \"type2\": \"type 3 for tool\"}','d2983fd6-34cd-4dba-8797-446816e417d1');
/*!40000 ALTER TABLE `tool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url`
--

DROP TABLE IF EXISTS `url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `url` (
  `id` varchar(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3cd40c7974cfd4b2f4283b2b1e` (`annotation_id`),
  CONSTRAINT `FK_3cd40c7974cfd4b2f4283b2b1e5` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url`
--

LOCK TABLES `url` WRITE;
/*!40000 ALTER TABLE `url` DISABLE KEYS */;
INSERT INTO `url` VALUES ('b36b4ce6-4931-4a84-b6de-d8c839760a79','values for url 3','e07fecbb-a1e6-423c-ba32-6a41fcfbf392'),('bee0f65a-c79e-4c6d-99fb-48c4e6f7c83a','values for url 2','de0cdc7a-a3e1-4d9a-9ce0-9850a335de30'),('ef77c013-1bfb-456d-963e-6c8123bd8833','values for url 0','db8f305c-fde4-4e7a-a245-8312fb75014b'),('f1530931-c5df-4362-9bf1-db5667f8f4d0','values for url 1','dc79d523-e995-4436-95e7-1a8ccc24929e');
/*!40000 ALTER TABLE `url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_admin` tinyint NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('alice@attackflow.com','alice',0),('john@attackflow.com','john',0),('kate@attackflow.com','kate',0),('root@attackflow.com','Admin',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `is_privileged` tinyint NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_9b2ce6cd677006ae06d3f6f143` (`annotation_id`),
  CONSTRAINT `FK_9b2ce6cd677006ae06d3f6f143f` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES ('8ba8fef4-036d-4bda-ab7c-325b24c6c6fd','kate@attackflow.com','JianJian',1,'ea5d0ecb-5547-4f13-be43-d93adc236096'),('bac2edb4-30e1-4a72-bf42-bceed78193d0','root@attackflow.com','Hokkien Juicy Boy',0,'ec2ec6cb-827a-4a29-9074-bcfbab3229ac'),('e7f95e68-dd9d-4900-b6b7-277023b9ab62','alice@attackflow.com','Professor Beh',1,'e3bd282a-0ee9-4efd-b58c-a41b8eda0249'),('f1aa4c79-5be7-4f85-8fd7-7842ac6b00bd','john@attackflow.com','Jason Yu',0,'e762d51c-ab31-4cbb-8204-a92ecf285059');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_project` (
  `user` varchar(255) NOT NULL,
  `project` varchar(255) NOT NULL,
  PRIMARY KEY (`user`,`project`),
  KEY `FK_6990786cd5acd85e9aa48d63f66` (`project`),
  CONSTRAINT `FK_6990786cd5acd85e9aa48d63f66` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9b702565cebc5125549a5cc894a` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES ('john@attackflow.com','0c9332ce-623c-46c7-820d-d0be3168a150'),('john@attackflow.com','0c968ec1-bfff-47b0-9a77-e830d54fce05'),('alice@attackflow.com','3dec5d4b-3826-4e48-b15a-c0afddf97ecb'),('john@attackflow.com','3dec5d4b-3826-4e48-b15a-c0afddf97ecb'),('john@attackflow.com','670e9061-23d6-47a2-b03e-a4dfa77b28fc'),('kate@attackflow.com','670e9061-23d6-47a2-b03e-a4dfa77b28fc'),('kate@attackflow.com','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea'),('root@attackflow.com','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea'),('alice@attackflow.com','b6e56c95-c99f-441c-8702-dff0279490a4'),('root@attackflow.com','b6e56c95-c99f-441c-8702-dff0279490a4');
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `version` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2d3d4331b44692a9d1605a0aa20` (`project_id`),
  CONSTRAINT `FK_2d3d4331b44692a9d1605a0aa20` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version`
--

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;
INSERT INTO `version` VALUES ('3e7598f5-a218-4674-9b65-f3d771da89ec','1.2','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea'),('5e98fad8-7054-4d05-80c3-28b9313b566d','2.0','b6e56c95-c99f-441c-8702-dff0279490a4'),('6f0679ca-49a7-4a5b-82d4-c7a941b20e65','2.0','b6e56c95-c99f-441c-8702-dff0279490a4'),('8ca5f6ed-6656-440c-85c4-0bfd16187e9e','1.1','670e9061-23d6-47a2-b03e-a4dfa77b28fc'),('8e84cee3-0dc0-4be6-a627-893b2876232c','1.0','3dec5d4b-3826-4e48-b15a-c0afddf97ecb'),('9546b375-1657-4108-b023-243bd7b41904','1.1','670e9061-23d6-47a2-b03e-a4dfa77b28fc'),('b56dfd44-24d7-4f87-89aa-6268cc103378','1.2','7e2652f5-24c2-4c9c-9544-aa9ffd3bcbea'),('fca04e97-0856-4a75-806d-919cbd1f7c86','1.0','3dec5d4b-3826-4e48-b15a-c0afddf97ecb');
/*!40000 ALTER TABLE `version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vulnerability`
--

DROP TABLE IF EXISTS `vulnerability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vulnerability` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `annotation_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_87512d9f00b1a3bbdaf7ea6a01` (`annotation_id`),
  CONSTRAINT `FK_87512d9f00b1a3bbdaf7ea6a014` FOREIGN KEY (`annotation_id`) REFERENCES `annotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vulnerability`
--

LOCK TABLES `vulnerability` WRITE;
/*!40000 ALTER TABLE `vulnerability` DISABLE KEYS */;
INSERT INTO `vulnerability` VALUES ('002abf6a-5f5c-4486-b18b-f663b252b6de','vulnerability 0','description 0 for asset 0','f4148141-5c8b-4278-ba9f-a174f17b2cec'),('3f41b462-7148-44a2-8f2c-395508bbd875','vulnerability 1','description 1 for asset 1','f9b94882-4cd7-472d-8b32-4b53683eb704'),('74089956-bfd0-4992-8160-f26f747c7a22','vulnerability 3','description 3 for asset 3','fe5682e9-2af5-4c08-bf05-ad9ac85f81b9'),('e34c04ac-0c79-41a4-9c4a-d4bebc9037c3','vulnerability 2','description 2 for asset 2','fcffe4a3-7cd5-4f86-a8de-7cf25a70960b');
/*!40000 ALTER TABLE `vulnerability` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 17:40:28
