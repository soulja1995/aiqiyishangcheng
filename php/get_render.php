<?php
require "conn.php";
$conn->query("set names utf8");
$result=$conn->query("select * from render");
    $arr=array();
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i]=$result->fetch_assoc();
    }
echo json_encode($arr);