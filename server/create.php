<?php

$decodedContent = json_decode();

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

$name = $_POST['name'];
$description = $_POST['description'];

$stmt = $dbh->prepare("INSERT INTO data (name, description) VALUES (:name, :description)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':description', $description);

$stmt->execute();
