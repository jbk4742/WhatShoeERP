<?php
    include("dbConnect.php");
    $id = $_POST['id'];
    $deliver= $_POST['deliver'];
    $delivery = $_POST['delivery'];

        $sql = "UPDATE whatshoe_order SET  order_state = 2, delivery_number = '$deliver', delivery = '$delivery' WHERE _index='$id'";
        if(mysqli_query($link,$sql)){
            mysqli_close($link);
            echo "1";
        } else{
            echo "2";
        }

?>