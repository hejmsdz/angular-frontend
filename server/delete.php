<?php

/*
{
"name":"",
"description":""
}
 *
 */
include 'common.php';
//connect to database
$dbh = new PDO("sqlite:$dbpath");
//Insert element

$stmt = $dbh->prepare("DELETE FROM data WHERE id = :id LIMIT 1;");
$stmt->bindParam(':id', $_POST['id']);

$stmt->execute();
