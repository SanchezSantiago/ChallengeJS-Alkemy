CREATE DATABASE personalbudget;

USE personalbudget;

CREATE TABLE `personalbudget`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  );

CREATE TABLE `personalbudget`.`operation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `concept` VARCHAR(45) NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL DEFAULT '0000-00-00' ,
  `category` VARCHAR(45) NOT NULL DEFAULT 'none',
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personalbudget`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

