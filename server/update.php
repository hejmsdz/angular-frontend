<?php

/*
{
"name":"",
"description":""
}
 */
include 'common.php';

//Update element

$id = $_GET['id'];
$name = $_POST['name'];
$description = $_POST['description'];

$stmt = $dbh->prepare("UPDATE `data` SET name=:name, description=:description WHERE id=:id");
$stmt->bindParam(':id', $id);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':description', $description);

$stmt->execute();
