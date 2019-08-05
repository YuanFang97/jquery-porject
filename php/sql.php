<?php
header("content-type:text/html;charset=utf-8");     

$con = mysqli_connect("127.0.0.1","root","","jquery-porject");

$json = file_get_contents("../public/HomeShop.json");

$data = json_decode($json,true);

for($i = 0; $i < count($data);$i++)
{   
    $img = $data[$i]["img"];
    $title = $data[$i]["title"];
    $vipPrice = $data[$i]["vipPrice"];
    $originalPrice = $data[$i]["originalPrice"];
    $sql = "INSERT INTO `jquery-porject`.`home-goods` (`img`, `title`, `vipPrice`, `originalPrice`) VALUES ('$img', '$title', '$vipPrice', '$originalPrice')";
    mysqli_query($con,$sql);
}
?>