<?php

$dbpath = __DIR__.'/db.sqlite';

//Connect to database
$dbh = new PDO("sqlite:$dbpath");