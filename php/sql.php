<?php
header("content-type:text/html;charset=utf-8");     

$con = mysqli_connect("127.0.0.1","root","","jquery-porject");

$json = file_get_contents("../public/goodsList.json");

$data = json_decode($json,true);

for($i = 0; $i < count($data);$i++)
{   
    $id = $data[$i]["id"];
    $imgurl = $data[$i]["imgurl"];
    $price = $data[$i]["price"];
    $title = $data[$i]["title"];
    $explain = $data[$i]["explain"];
    $classify = $data[$i]["classify"];
    $sql = "INSERT INTO `jquery-porject`.`goods-list` (`id`, `imgurl`, `price`, `title`, `explain`, `classify`) VALUES ('$id', '$imgurl', '$price', '$title', '$explain', '$classify')";
    mysqli_query($con,$sql);
}
?>