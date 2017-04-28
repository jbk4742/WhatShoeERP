<?php
    include("dbConnect.php");
    $index = $_POST['index'];
    $admin= $_POST['admin'];
    $memo = $_POST['memo'];
    $state = $_POST['state'];
    $book = $_POST['book'];

        $sql = "UPDATE whatshoe_order SET  order_state = '$state', _whatshoeman = '$admin', memo = '$memo', book = '$book' WHERE _index='$index'";
        if(mysqli_query($link,$sql)){
            mysqli_close($link);
            echo "1";
        } else{
            echo "2";
        }

?>