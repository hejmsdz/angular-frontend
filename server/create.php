<?php

/*
{
"name":"",
"description":""
}
 *
 */
include 'common.php';

//Insert element
$name = $_POST['name'];
$description = $_POST['description'];

$stmt = $dbh->prepare("INSERT INTO data (name, description) VALUES (:name, :description)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':description', $description);

$stmt->execute();
