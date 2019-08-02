<?php
header("content-type:text/html;charset=utf-8");     

$con = mysqli_connect("127.0.0.1","root","","jquery-porject");

$json = file_get_contents("list.json");

$data = json_decode($json,true);

for($i = 0; $i < count($data);$i++)
{   
    $id = $data[$i]["id"];
    $title = $data[$i]["title"];
    $list1 = $data[$i]["list1"];
    $list2 = $data[$i]["list2"];
    $list3 = $data[$i]["list3"];
    $list4 = $data[$i]["list4"];
    $sql = "INSERT INTO `jquery-porject`.`nav-list` (`id`,`title`, `list1`, `list2`, `list3`, `list4`) VALUES ('$id','$title', '$list1', '$list2', '$list3', '$list4')";
    mysqli_query($con,$sql);
}
?>