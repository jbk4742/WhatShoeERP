<?php
	header("Content-Type:text/html;charset=utf-8");
	header("Content-Type:application/json");
    include("dbConnect.php");
    mysqli_query($link,"set names utf8");


function han($s){
    $arr = json_decode('{"s":"'.$s.'"}');
    return reset($arr);
};
function to_han($str) { return preg_replace('/(\\\u[a-f0-9]+)+/e','han("$0")',$str); };

            $sql = "SELECT count(id) as count_id, sum(price) as sum_price from whatshoe_order group by id;";
            $result = $sql = mysqli_query($link,$sql);
            $sql = mysqli_num_rows($sql);

            if($sql){
                    $obj = array();
                    while($row = mysqli_fetch_object($result)){
                        $res = new stdClass();
                        $res->count_id = $row->count_id;
                        $res->sum_price = $row->sum_price;
                        $obj[] = $res;
                        unset($res);
                    }
                    $encode = json_encode($obj);
                    $encode = to_han($encode);
                    echo $encode;
            } else{
                    echo "2";
            }

?>