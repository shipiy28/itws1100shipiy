CREATE TABLE `siteComments` (
  `primarykey` int(2) UNSIGNED NOT NULL,
  `visitorName` varchar(100) NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `commentText` varchar(500) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
)