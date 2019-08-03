<?php
header("content-type:text/html;charset=utf-8");     

$con = mysqli_connect("127.0.0.1","root","","jquery-porject");

$json = file_get_contents("text.json");

$data = json_decode($json,true);

for($i = 0; $i < count($data);$i++)
{   
    $bgImg = $data[$i]["bgImg"];
    $mainImg = $data[$i]["mainImg"];
    $rightImg = $data[$i]["rightImg"];
    $li1 = $data[$i]["li1"];
    $li2 = $data[$i]["li2"];
    $li3 = $data[$i]["li3"];
    $li4 = $data[$i]["li4"];
    $li5 = $data[$i]["li5"];
    $li6 = $data[$i]["li6"];
    $liBgC = $data[$i]["liBgC"];
    $liBorderC = $data[$i]["liBorderC"];
    $sql = "INSERT INTO `jquery-porject`.`classifylist-top` (`bgImg`, `mainImg`, `rightImg`, `li1`, `li2`, `li3`, `li4`, `li5`, `li6`, `liBgC`, `liBorderC`) VALUES ('$bgImg', '$mainImg', '$rightImg', '$li1', '$li2', '$li3', '$li4', '$li5', '$li6', '$liBgC', '$liBorderC')";
    mysqli_query($con,$sql);
}
?>