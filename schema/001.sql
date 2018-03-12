drop database `finalProject`;
create database if not exists `finalProject`;

use `finalProject`;

CREATE TABLE `MERCHANT` (
	`mID` int(11) NOT NULL AUTO_INCREMENT,
	`storeName` varchar(120) DEFAULT NULL,
	`storeAddress` varchar(255) DEFAULT NULL,
	`storePhone` varchar(10) DEFAULT NULL,
	PRIMARY KEY (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


CREATE TABLE `CATEGORIES` (
  `cID` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TRANSACTIONS` (
  `tID` int(11) NOT NULL AUTO_INCREMENT,
  `store` varchar(120) NOT NULL DEFAULT '',
  `amount` bigint(100) NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `categoryID` int(11) NOT NULL,
  `category` varchar(120) NOT NULL DEFAULT '',
  `storeID` int(11) NOT NULL,
  PRIMARY KEY (`tID`),
  KEY `categoryID` (`categoryID`),
  KEY `storeID` (`storeID`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `CATEGORIES` (`cID`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`storeID`) REFERENCES `MERCHANT` (`mID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `PRODUCTS` (
  `pID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(120) DEFAULT NULL,
  `transaction_ID` int(11) DEFAULT NULL,
  `merchant_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`pID`),
  KEY `transaction_ID` (`transaction_ID`),
  KEY `merchant_ID` (`merchant_ID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`transaction_ID`) REFERENCES `TRANSACTIONS` (`tID`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`merchant_ID`) REFERENCES `MERCHANT` (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
