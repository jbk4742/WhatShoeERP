<?php
    include("dbConnect.php");

	header("Content-Type:application/json");

    mysqli_query($link,"set names utf8");

$sql = $_POST['data'];

function han($s){
    $arr = json_decode('{"s":"'.$s.'"}');
    return reset($arr);
};
function to_han($str) { return preg_replace('/(\\\u[a-f0-9]+)+/e','han("$0")',$str); };


            $result = $sql = mysqli_query($link,$sql) or die(mysqli_error($link));
            $sql = mysqli_num_rows($sql);


            if($sql){
                    $obj = array();
                    while($row = mysqli_fetch_object($result)){
                        $res = new stdClass();
                        $res->order_index = $row->_index;
                        $res->order_id = $row->id;
                        $res->order_time = $row->order_time;
                        $res->order_code = $row->order_code;
                        $res->order_addr = $row->order_address;
                        $res->order_state = $row->order_state;
                        $res->order_phone = $row->order_phone;
                        $res->order_text = $row->order_Text;
                        $res->order_pay = $row->order_with;
                        $res->whatshoeman = $row->_whatshoeman;
                        $res->memo = $row->memo;
                        $res->order_book = $row->book;
                        $res->delivery_number = $row->delivery_number;
                        $res->price = $row->price;
                        $res->deliver = $row->delivery;
                        $obj[] = $res;
                        unset($res);
                    }
                    $encode = json_encode($obj);
                    $encode = to_han($encode);
                    echo $encode;
            } else{
                    $test = "fail";
                    echo json_encode($test);
            }

?>