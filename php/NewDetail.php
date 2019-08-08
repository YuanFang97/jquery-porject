<?php
    header("content-type:text/html;charset=utf-8");    

    $con = mysqli_connect("127.0.0.1","root","","jquery-porject");

    $classify = $_REQUEST["classify"];

    $sql = "SELECT * FROM  `goods-list` WHERE  `classify` =$classify LIMIT 0 , 9";

    $result = mysqli_query($con,$sql);

    echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC),true);
?>
