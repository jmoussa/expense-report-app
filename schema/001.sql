drop database `finalProject`;
create database if not exists `finalProject`;

use `finalProject`;

CREATE TABLE `LOCATIONS` (
  `zipcode` varchar(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(35) NOT NULL,
  PRIMARY KEY (`zipcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `MERCHANT` (
  `mID` int(11) NOT NULL AUTO_INCREMENT,
  `storeName` varchar(120) NOT NULL DEFAULT '',
  `storeAddress` varchar(255) NOT NULL DEFAULT '',
  `storePhone` varchar(20) NOT NULL DEFAULT '',
  `zipcode` varchar(9) NOT NULL DEFAULT '',
  PRIMARY KEY (`mID`),
  KEY `zipcode` (`zipcode`),
  CONSTRAINT FOREIGN KEY (`zipcode`) REFERENCES `LOCATIONS` (`zipcode`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8;

CREATE TABLE `CATEGORIES` (
  `cID` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(120) NOT NULL DEFAULT '',
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

CREATE TABLE `TRANSACTIONS` (
  `tID` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(20,2) NOT NULL DEFAULT '0.00',
  `date` varchar(20) NOT NULL DEFAULT '',
  `categoryID` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `paymentType` varchar(100) NOT NULL DEFAULT '',
  `isReturned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tID`),
  KEY `categoryID` (`categoryID`),
  KEY `storeID` (`storeID`),
  CONSTRAINT FOREIGN KEY (`categoryID`) REFERENCES `CATEGORIES` (`cID`),
  CONSTRAINT FOREIGN KEY (`storeID`) REFERENCES `MERCHANT` (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

CREATE TABLE `PRODUCTS` (
  `pID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(120) NOT NULL DEFAULT '',
  `transaction_ID` int(11) NOT NULL,
  `merchant_ID` int(11) NOT NULL,
  PRIMARY KEY (`pID`),
  KEY `transaction_ID` (`transaction_ID`),
  KEY `merchant_ID` (`merchant_ID`),
  CONSTRAINT FOREIGN KEY (`transaction_ID`) REFERENCES `TRANSACTIONS` (`tID`),
  CONSTRAINT FOREIGN KEY (`merchant_ID`) REFERENCES `MERCHANT` (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

