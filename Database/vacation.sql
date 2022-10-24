-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2022 at 09:02 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(17, 13),
(17, 14),
(17, 17),
(17, 21),
(17, 22),
(17, 29),
(17, 33),
(17, 40),
(17, 41),
(20, 17),
(20, 21),
(20, 29),
(20, 31),
(20, 32),
(20, 40),
(20, 41),
(20, 43),
(21, 14),
(21, 16),
(21, 21),
(21, 22),
(21, 33),
(21, 34),
(23, 14),
(23, 17),
(23, 31),
(23, 33),
(23, 34);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(16, 'Tali', 'Feder', 'talilit', '514c021cbd67ecf59a95f219e0f42114439c4f29ce5e7d4393b0a5f8bd14afa022ca10e09c5b325b241ace6e88b9a536c8088ddcb7b1c82b6d50e79954fcd132', 1),
(17, 'Adi', 'Deri', 'adilove', '878682361d5aeb0cdd16947b39f908a04c5677e5b242095aca958be5792d7a8aaddbc6a9b54e0805b42e16f5d93b6bb5be1b361b896c08688ce309242b59c6a0', 2),
(20, 'Roni', 'Gefner', 'ronigef', '2482c557ecd6e67e4fd06608634dd74cf6c5c2d08e27b94b782d60b178a8264c17e2a597e148da13fc1bee645e57b3e3d643258396e25fe8fa011c2b5282cc6c', 2),
(21, 'Avi', 'Levi', 'avilevi', '1504346d15808de9ae795f70400bb79665839ab80694d82dd86697f233408ee9def63c5ddf0131cc2622b8ef3a584614ee7beb1693e96f183d09381ded4cfb99', 2),
(23, 'Uri', 'Luria', 'uri@', '56f0eb3c9da40672f6b15a1619877cc8cab467ae7b4b9078f14b7ec096833873fec59fa267bdcb84dfcaeb659798c29f8ebedc3661b0c1ee64aa3ef925ebd049', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `arrivalDate` date NOT NULL,
  `departureDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `arrivalDate`, `departureDate`, `price`) VALUES
(13, 'Roma', 'The first day in Rome should be devoted to an introductory tour of the historic center of the city.', '63947fba-4cce-11ed-bdc3-0242ac120002.jpg', '2023-01-02', '2023-01-05', '450.00'),
(14, 'Barzelona', 'An excellent choice for those who want to enjoy art, landscapes, food, architecture and shopping.', '20ff1e37-44e2-47f9-a1e7-bd50609cbb43.jpg', '2022-12-22', '2022-12-31', '670.00'),
(16, 'Alaska', 'Alaska is unique and combines sea and glaciers, mountains, forests and animals.', '121c4711-1298-4420-a5de-cef088cea49b.jpg', '2023-01-17', '2023-01-26', '2500.00'),
(17, 'Budapest', 'The capital of Hungary is one of the friendliest destinations for Israelis.', '4ea33a85-0251-4ddc-a239-fd835919c9c4.jpg', '2022-11-29', '2022-12-04', '500.00'),
(21, 'Maroko', 'Just sand and mountains? Absolutely not, fascinating culture and landscapes that are out of this world.', '8c203bc5-7152-4e57-a940-b9a5e4c7cf21.jpg', '2023-04-05', '2023-04-19', '580.00'),
(22, 'London', 'Attracts many tourists especially to the Queen\'s Guard and the famous Big Ben.', 'be11f594-2272-4862-9f94-e17e2244d6c3.jpg', '2022-12-04', '2022-12-12', '710.00'),
(29, 'Sinai', 'The Sinai Peninsula enchants the Israeli traveler with great beaches and a lot of peace.', '360d7bb1-1138-4f04-a150-1942a8c62a71.jpg', '2022-12-20', '2022-12-28', '150.00'),
(31, 'Japan', 'In recent years, Japan has become one of the most desirable and popular destinations in the world.', '3151d150-b0f1-4e39-ae60-b8f36cdf5fc0.jpg', '2023-02-22', '2023-03-05', '1100.00'),
(32, 'Cyprus', 'The relatively cheap price makes Cyprus a popular and sought-after destination for a perfect summer vacation.', '2953b2f2-e47e-4c68-9f17-f2f1dcd64fa2.jpg', '2022-12-25', '2023-01-10', '120.00'),
(33, 'Dubai', 'The charm of this place - from a small fishing village, has become in 60 years no less than a powerhouse.', '5412b65f-a7b0-4263-9231-e76bcb3af814.jpg', '2023-01-02', '2023-01-15', '800.00'),
(34, 'Dublin', 'One of the most intriguing destinations in Europe for the Israeli traveler.', 'c0b87b22-4d90-40c6-bfe7-9d78e674ee4f.jpg', '2022-12-26', '2023-01-09', '580.00'),
(40, 'Pariz', 'The city of lights, romantic and chic, beauty and French style.', '3bed5d3a-f184-4700-a001-5a459de852b8.jpg', '2023-02-05', '2023-02-10', '420.00'),
(41, 'Brazil', 'A beautiful tropical land, a land of carnivals, samba, football and a lot of shades and colors.', '3c2d15f0-949f-4f82-903e-b87691c68de2.jpg', '2023-02-26', '2023-03-10', '880.00'),
(42, 'Arizona', 'The Grand Canyon, in northern Arizona, is one of the most impressive natural sites in the world.', '18330429-b227-4d59-9a7b-127ef9991a87.jpg', '2023-01-14', '2023-01-31', '890.00'),
(43, 'India', 'You can decide what India is for you after you taste everything it has to offer.', '725dfb8e-dbcf-413f-b52f-7b0aa28b3869.jpg', '2023-01-01', '2023-01-13', '672.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
