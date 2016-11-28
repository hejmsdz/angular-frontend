<?php

$decodedContent = json_decode($_POST['data']);

/*
{
"name":"",
"description":""
}
 *
 */
//connect to database
$dbh = new PDO('sqlite:db.sqlite3');
//Insert element

$stmt = $dbh->prepare("INSERT INTO REGISTRY (name, value) VALUES (:name, :value)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':value', $value);

// insert one row
$name = 'one';
$value = 1;
$stmt->execute();
