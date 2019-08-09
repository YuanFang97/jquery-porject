<?php
    header("content-type:text/html;charset=utf-8");    

    $con = mysqli_connect("127.0.0.1","root","","jquery-porject");

    $username = $_REQUEST["username"];

    $id = $_REQUEST["id"];

    $quantity = $_REQUEST["quantity"];
    
    $imgurl = $_REQUEST["imgurl"];

    $title = $_REQUEST["title"];

    $price = $_REQUEST["price"];

    $sql = "INSERT INTO `jquery-porject`.`shopping` (`username`, `id`, `quantity`, `imgurl`, `title`, `price`) VALUES ('$username', '$id', '$quantity', '$imgurl', '$title', '$price')";

    $result = mysqli_query($con,$sql);

    print_r($username);

    // echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC),true);
?>