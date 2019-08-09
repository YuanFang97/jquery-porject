<?php
    header("content-type:text/html;charset=utf-8");    

    $con = mysqli_connect("127.0.0.1","root","","jquery-porject");

    $username = $_REQUEST["username"];

    $id = $_REQUEST["id"];
    
    $quantity = $_REQUEST["quantity"];

    $sql = "UPDATE  `jquery-porject`.`shopping` SET  `quantity` =  '$quantity' WHERE  `shopping`.`username` =  '$username' AND  `shopping`.`id` =  '$id'";

    $result = mysqli_query($con,$sql);

    // echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC),true);

    print_r($id);
?>  
