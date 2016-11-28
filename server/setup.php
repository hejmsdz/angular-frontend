<?php
/**
 * Created by PhpStorm.
 * User: marcin
 * Date: 28.11.2016
 * Time: 17:36
 */
include 'common.php';

$dbh = new PDO("sqlite:$dbpath");
//setup table

$stmt = $dbh->exec('
    CREATE TABLE data
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255),
    description varchar(255)
    );
');

//Populate with test data

$stmt = $dbh->exec('

INSERT INTO data (name, description) VALUES (\'test\', \'test2\');

');
$stmt = $dbh->exec('

INSERT INTO data (name, description) VALUES (\'test3\', \'test4\');

');