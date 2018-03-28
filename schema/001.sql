drop database `finalProject`;
create database if not exists `finalProject`;

use `finalProject`;

CREATE TABLE `MERCHANT` (
  `mID` int(11) NOT NULL AUTO_INCREMENT,
  `storeName` varchar(120) DEFAULT NULL,
  `storeAddress` varchar(255) DEFAULT NULL,
  `storePhone` varchar(10) DEFAULT NULL,
  `zipcode` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`mID`),
  KEY `zipcode` (`zipcode`),
  CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`zipcode`) REFERENCES `LOCATIONS` (`zipcode`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;

CREATE TABLE `CATEGORIES` (
  `cID` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TRANSACTIONS` (
  `tID` int(11) NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `categoryID` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `paymentType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tID`),
  KEY `categoryID` (`categoryID`),
  KEY `storeID` (`storeID`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `CATEGORIES` (`cID`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`storeID`) REFERENCES `MERCHANT` (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8; 
 
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

CREATE TABLE `LOCATIONS` (
  `zipcode` varchar(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(35) NOT NULL,
  PRIMARY KEY (`zipcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

