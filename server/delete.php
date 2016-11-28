<?php

/*
{
"name":"",
"description":""
}
 *
 */
include 'common.php';

//Delete element
$stmt = $dbh->prepare('DELETE FROM data WHERE id = :id;');
$stmt->bindParam(':id', $_POST['id']);
$stmt->execute();
