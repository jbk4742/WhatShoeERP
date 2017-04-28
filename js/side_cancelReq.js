/**
 * Created by byeongkwan on 2017-04-26.
 */
$('#main_img').click(function () {
    location.href="main.html";
});

var num=0;
var cancel_len;
var cancel = new Array();
var Search = new Array();

//DB에서 주문정보 긁어오기
$(document).ready(function () {
    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/cancelList.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            cancel_len = data.length;
            for(var i = 0 ; i<data.length ; i++){
                cancel[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }
            if(cancel_len)
                document.getElementById('today_cancel').textContent = cancel_len+" counts";

            addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert('error: ' + textStatus);
        },
    });
});

//페이지 번호 추가 한 페이지당 테이블 행 수 20개
function addTablePage() {
    var state;
    $('#cancel_page').empty();
    $("#cancel_req_table tr:not(:first)").remove();
    num = 1;
    if(cancel_len)
         $('#cancel_page').append('<div id="exPage" onclick="exPage()" style="margin-right: 20px; display: inline-block; cursor: pointer">Pre</div>');
    for(var i=1; i<=(cancel_len/20)+1 ; i++){
        $('#cancel_page').append('<div id="page'+i+'" style="margin-right: 5px; display: inline-block; cursor: pointer" onclick="addTableRow('+i+')">'+i+'</div>');
        if(1<=i && i<=10){

        } else{
            $("#page"+i).hide();
        }
    }
    document.getElementById('page1').style.color = "#f25a45";
    $('#cancel_page').append('<div id="nextPage" onclick="nextPage()" style="margin-left: 20px; display: inline-block; cursor: pointer">Next</div>');
    for(var j = 1 ; j <= 20 ; j++ ){
        var service = new Array();
        service = checkService(j);

        if(cancel[j].state === "0"){
            state = "Pick up";
        } else if(cancel[j].state === "1"){
            state = "Repairing";
        } else if(cancel[j].state === "2"){
            state = "Delivery";
        } else if(cancel[j].state === "3"){
            state = "Delivery completed";
        } else if(cancel[j].state === "4"){
            state = "Cancel";
        }
        if(cancel[j].code.substring(3,6) == "900"){
            service[0] = "Bespoke";
        }
        var date_book = new Date(cancel[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = cancel[j].book;
        else
            book_date = "-";


        $('#cancel_req_table_body').append('<tr> <td>'+cancel[j].index+'</td> <td>'+cancel[j].id+'</td> <td>'+service[0]+'</td> <td>'+cancel[j].addr+'</td> <td>'+state+'</td><td>'+cancel[j].admin+'</td><td>'+cancel[j].phone+'</td><td>'+book_date+'</td><td>'+cancel[j].pay+'</td><td>'+cancel[j].memo+'</td><td>'+cancel[j].time+'</td> </tr>');
    }

}

//페이지 10개씩 이전페이지
function exPage() {
    num-=10;
    if(num == -9){
        num = 1;
    }
    for(var i=1 ; i<=(cancel_len/20)+1 ; i++){
        if(num<=i && i<num+10){
            $("#page"+i).show();
        } else{
            $("#page"+i).hide();
        }
    }
}

//페이지 10개씩 다음페이지
function nextPage() {
    num+=10;

    if(num > cancel_len/20 + 1){
        num = (cancel_len/20 +1)/10;
        num = Math.floor(num) * 10 +1;
    }
    for(var i=1 ; i<=(cancel_len/20)+1 ; i++){
        if(num<=i && i<num+10){
            $("#page"+i).show();
        } else{
            $("#page"+i).hide();
        }
    }

}

//테이블 추가 20개씩
function addTableRow(i) {
    var service = new Array();
    var state;

    for(var j=1; j<=cancel_len/20 +1;j++){
        if(j == i){
            document.getElementById('page'+j).style.color = "#f25a45"
        } else {
            document.getElementById('page'+j).style.color = "#252525";
        }

    }
    $("#cancel_req_table tr:not(:first)").remove();

    for(var j = 20*(i-1)+1 ; j <= 20*(i-1)+20 ; j++ ){

        service = checkService(j);

        if(cancel[j].code.substring(3,6) == "900"){
            service[0] = "Bespoke";
        }

        if(order[j].state === "0"){
            state = "Pick up";
        } else if(order[j].state === "1"){
            state = "Repairing";
        } else if(order[j].state === "2"){
            state = "Delivery";
        } else if(order[j].state === "3"){
            state = "Delivery completed";
        } else if(order[j].state === "4"){
            state = "Cancel";
        }

        $('#cancel_req_table_body').append('<tr> <td>'+cancel[j].index+'</td> <td>'+cancel[j].id+'</td> <td>'+service[0]+'</td> <td>'+cancel[j].addr+'</td> <td>'+state+'</td><td>'+cancel[j].admin+'</td><td>'+cancel[j].phone+'</td><td>'+cancel[j].book+'</td><td>'+cancel[j].pay+'</td><td>'+cancel[j].memo+'</td><td>'+cancel[j].time+'</td> </tr>');
    }

}


//주문코드번호 분석 후 해당 서비스 출력
function checkService(index) {

    var returnService = new Array();     //반환 하려는 서비스 목록 저장 변수
    var pixItem = new Array();  // 길이 3인 토큰으로 구분하기 위해 쓰는 배열
    var service_code = new Array(); // 해당 서비스 코드 저장
    var length = cancel[index].code.length;

    pixItem = cancel[index].code;
    returnService[0] = "";
    returnService[1] = 0;
    var j = 0;
    for (var i=0; i<length/3;i++){
        service_code[i] = new Array();

        service_code[i] = pixItem[j] + pixItem[j+1]+ pixItem[j+2];
        j+=3;
    }

    for(var k=1; k<length/3; k++){
        for(var i = 1; i<=man_len; i++){
            if(service_code[k] == man_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = man_array_service[i];
                    returnService[1]+= parseInt(man_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+man_array_service[i];
                    returnService[1]+= parseInt(man_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=woman_len; i++){
            if(service_code[k] == woman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = woman_array_service[i];
                    returnService[1]+= parseInt(woman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+woman_array_service[i];
                    returnService[1]+= parseInt(woman_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=preman_len; i++){
            if(service_code[k] == preman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = preman_array_service[i];
                    returnService[1]+= parseInt(preman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+preman_array_service[i];
                    returnService[1]+= parseInt(preman_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=prewoman_len; i++){
            if(service_code[k] == prewoman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = prewoman_array_service[i];
                    returnService[1]+= parseInt(prewoman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+prewoman_array_service[i];
                    returnService[1]+= parseInt(prewoman_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=bag_len; i++){
            if(service_code[k] == bag_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = bag_array_service[i];
                    returnService[1]+= parseInt(bag_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+bag_array_service[i];
                    returnService[1]+= parseInt(bag_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=belt_len; i++){
            if(service_code[k] == belt_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = belt_array_service[i];
                    returnService[1]+= parseInt(belt_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+belt_array_service[i];
                    returnService[1]+= parseInt(belt_array_price[i]);
                }
            }
        }
        for(var i = 1; i<=wallet_len; i++) {
            if(service_code[k] == wallet_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = wallet_array_service[i];
                    returnService[1]+= parseInt(wallet_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+wallet_array_service[i];
                    returnService[1]+= parseInt(wallet_array_price[i]);
                }
            }
        }
    }

    return returnService;
}

$( function() {
    $( "#cancel_date_value1" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $( "#cancel_date_value2" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
} );

function valid_search_sql(select, date ) {
    if(select == "" && date == "" )
        return true;
    return false;
}

$('#cancel_req_search_btn').click(function () {
    var sql = "select * from whatshoe_order where order_state = 4";

    //항목선택
    var search_select_list = document.getElementById('cancel_req_search');
    var search_select = search_select_list.options[search_select_list.selectedIndex].value;

    //검색란
    var search_name = document.getElementById('cancel_req_text').value;

    //날짜 종류 선택
    var search_date_e = document.getElementById('cancel_req_dateList');
    var search_date = search_date_e.options[search_date_e.selectedIndex].value;
    var search_date1 = document.getElementById('cancel_date_value1').value;
    var search_date2 = document.getElementById('cancel_date_value2').value;

    if(!valid_search_sql(search_select, search_date)){
        if(search_name){
            sql += " and "+search_select+" like '%"+search_name+"%' ";
        }
        if(search_date1 && search_date2){
                sql += "and "+search_date+" between '"+search_date1+" 00:00:00' and '"+search_date2+"23:59:59' ";
        }
    }
    sql+=";";
    alert(sql);

    $.ajax({
        type : 'post',
        dataType : 'json',
        url:'http://whatshoe.co.kr/bk/ERP/php/orderSearchList.php',
        data: 'data='+sql,
        success: function(data){
            console.log(data);
            cancel_len = data.length;
            cancel = new Array();
            for(var i = 0 ; i<data.length ; i++){
                cancel[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }
            addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert(request);
            alert(errorThrown);
            alert('error: ' + textStatus);
        },
    });

});