<?php

include 'common.php';

/*
$content = [
    [
        'id' => '1',
        'name' => 'test1',
        'description' => 'test2'
    ],
    [
        'id' => '99',
        'name' => 'test2',
        'description' => 'test4'
    ]
];
*/

//Select rows
$content = [];
$query = 'SELECT * FROM `data`;';

foreach($dbh->query($query) as $row){
    $content[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description']
    ];
}


echo json_encode($content);
