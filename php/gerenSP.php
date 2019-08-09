<?php
    header("content-type:text/html;charset=utf-8");    

    $con = mysqli_connect("127.0.0.1","root","","jquery-porject");

    $username = $_REQUEST["username"];

    $sql = "SELECT * FROM  `shopping` WHERE  `username` =$username";

    $result = mysqli_query($con,$sql);

    echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC),true);
?>