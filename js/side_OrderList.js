/**
 * Created by byeongkwan on 2017-04-05.
 */
$('#main_img').click(function () {
    location.href="main.html";
});

var num=0;
var order_len;
var order = new Array();
var Search = new Array();

//정렬. 색 및 카운트 변수들.
var count_sort_num, count_sort_book, count_sort_order;
count_sort_book = count_sort_num = count_sort_order = 0;
var sort_num_style = document.getElementById('sort_num');
var sort_book_style = document.getElementById('sort_book');
var sort_order_style = document.getElementById('sort_order');

var Modal_OrderInfo = new Example.Modal({
    id: "order_modal" // 모달창 아이디 지정
});

//DB에서 주문정보 긁어오기
$(document).ready(function () {
    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/orderList.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            order_len = data.length;
            for(var i = 0 ; i<data.length ; i++){
                order[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }

            var state0 = 0;
            var state1 = 0;
            var state2 = 0;
            var state3 = 0;
            for(var i=0 ; i<order_len;i++){
                if(order[i+1].state == "0"){
                    state0++;
                } else if(order[i+1].state == "1"){
                    state1++;
                } else if(order[i+1].state == "2"){
                    state2++;
                } else if(order[i+1].state == "3"){
                    state3++;
                }
            }
            document.getElementById('order_state_1').textContent = state0+" counts";
            document.getElementById('order_state_2').textContent = state1+" counts";
            document.getElementById('order_state_3').textContent = state2+" counts";
            document.getElementById('order_state_4').textContent = state3+" counts";
            addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert('error: ' + textStatus);
        },
    });
});


//페이지 번호 추가 한 페이지당 테이블 행 수 20개
function addTablePage() {

    $('#orderList_page').empty();
    $("#orderList_table tr:not(:first)").remove();
    num = 1;
    if(order_len != 0)
        $('#orderList_page').append('<div id="exPage" onclick="exPage()" style="margin-right: 20px; display: inline-block; cursor: pointer">Pre</div>');
    for(var i=1; i<=(order_len/20)+1 ; i++){
        $('#orderList_page').append('<div id="page'+i+'" style="margin-right: 5px; display: inline-block; cursor: pointer" onclick="addTableRow('+i+')">'+i+'</div>');
        if(1<=i && i<=10){

        } else{
            $("#page"+i).hide();
        }
    }
    document.getElementById('page1').style.color = "#f25a45";
    $('#orderList_page').append('<div id="nextPage" onclick="nextPage()" style="margin-left: 20px; display: inline-block; cursor: pointer">Next</div>');
    for(var j = 1 ; j <= 20 ; j++ ){
        var service = new Array();
        service = checkService(j);

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
        if(order[j].code.substring(3,6) == "900"){
            service[4] = "Bespoke";
        }

        var content ;
        if(service[3] >= 2)
            content = service[4] +" except "+service[3]+" counts";
        else
            content = service[4];

        var date_book = new Date(order[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = order[j].book;
        else
            book_date = "-";


        $('#orderList_table_body').append('<tr onclick="add_check('+j+')" style="height: 50px"> <td>'+order[j].index+'</td> <td>'+order[j].id+'</td> <td>'+content+'</td> <td>'+order[j].addr+'</td> <td>'+state+'</td><td>'+order[j].admin+'</td><td>'+order[j].phone+'</td><td>'+book_date+'</td><td>'+order[j].pay+'</td><td>'+order[j].memo+'</td><td>'+order[j].time+'</td> </tr>');
    }

}

//페이지 10개씩 이전페이지
function exPage() {
    num-=10;
    if(num == -9){
        num = 1;
    }
    for(var i=1 ; i<=(order_len/20)+1 ; i++){
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

    if(num > order_len/20 + 1){
        num = (order_len/20 +1)/10;
        num = Math.floor(num) * 10 +1;
    }
    for(var i=1 ; i<=(order_len/20)+1 ; i++){
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

    for(var j=1; j<=order_len/20 +1;j++){
        if(j == i){
            document.getElementById('page'+j).style.color = "#f25a45"
        } else {
            document.getElementById('page'+j).style.color = "#252525";
        }

    }
    $("#order_table tr:not(:first)").remove();

    for(var j = 20*(i-1)+1 ; j <= 20*(i-1)+20 ; j++ ){

        service = checkService(j);

        if(order[j].code.substring(3,6) == "900"){
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

        var content ;
        if(service[3] >= 2)
            content = service[4] +" except "+service[3]+" counts";
        else
            content = service[4];

        var date_book = new Date(order[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = order[j].book;
        else
            book_date = "-";


        $('#orderList_table_body').append('<tr onclick="add_check('+j+')" style="height: 50px"> <td>'+order[j].index+'</td> <td>'+order[j].id+'</td> <td>'+content+'</td> <td>'+order[j].addr+'</td> <td>'+state+'</td><td>'+order[j].admin+'</td><td>'+order[j].phone+'</td><td>'+book_date+'</td><td>'+order[j].pay+'</td><td>'+order[j].memo+'</td><td>'+order[j].time+'</td> </tr>');
    }

}


//모달에 해당 주문 넣기
function add_check(j) {
    var service = new Array();
    var date = new Date(order[j].book);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month < 10) { month = "0" + month; }
    if(day < 10) { day = "0" + day; }
    var hour = date.getHours();
    var min = date.getMinutes();
    if(hour < 10) { hour = "0" + hour; }
    if(min < 10) { min = "0" + min; }
    var book_date = year+"-"+month+"-"+day;
    var book_hour = hour+":"+min+":00";
    
    //예약 날짜가 있을 경우에만 모달에 입력
    if(month){
        document.getElementById('order_modal_book').value = book_date;
        document.getElementById('order_modal_book_time').value = book_hour;
    } else{
        document.getElementById('order_modal_book').value = "";
        document.getElementById('order_modal_book_time').value = "";
    }

    service = checkService(j);
    if(order[j].code.substring(3,6) == "900"){
        service[0] = "Bespoke";
    }
    $('#order_modal_book_time').timepicker({ 'timeFormat': 'H:i:s' });

    document.getElementById('order_modal_index').textContent = order[j].index;
    $('#order_modal_state').val(order[j].state).attr("selected","selected");
    document.getElementById('order_modal_id').textContent = order[j].id;
    document.getElementById('order_modal_phone').textContent = order[j].phone;
    document.getElementById('order_modal_addr').textContent = order[j].addr;
    document.getElementById('order_modal_time').textContent = order[j].time;
    document.getElementById('order_modal_code').innerHTML = order[j].code+"<br>"+service[0];
    document.getElementById('order_modal_pay').textContent = order[j].pay;
    document.getElementById('order_modal_admin').value = order[j].admin;
    document.getElementById('order_modal_etc').textContent = order[j].etc;
    document.getElementById('order_modal_memo').value = order[j].memo;
    document.getElementById('order_modal_price').textContent = service[1]+" $";

    if(order[j].deliver){
        document.getElementById('order_modal_carry').textContent = order[j].deliver;
    } if(order[j].delivery_number){
        document.getElementById('order_modal_deliver').textContent = order[j].delivery_number;
    } if(!order[j].deliver && !order[j].delivery_number) {
        document.getElementById('order_modal_carry').textContent = "Not Yet";
        document.getElementById('order_modal_deliver').textContent ="Not Yet";
    }
    Modal_OrderInfo.show();

}

//modal 창 닫기
$('#order_modal_close').click(function () {

    Modal_OrderInfo.hide();
});

function valid_search_sql(select, date, state) {
    if(select == "" && date == "" && state == "")
        return true;
    return false;
}

//검색
$('#orderList_search_btn').click(function () {

    sort_num_style.style.color = 'black';
    sort_book_style.style.color = 'black';
    sort_order_style.style.color = 'black';

    var sql = "select * from whatshoe_order ";
    var and_count = 0;

    //항목선택
    var search_select_list = document.getElementById('orderList_search_list');
    var search_select = search_select_list.options[search_select_list.selectedIndex].value;

    //검색란
    var search_name = document.getElementById('orderList_division_text').value;

    //날짜 종류 선택
    var search_date_e = document.getElementById('orderList_date');
    var search_date = search_date_e.options[search_date_e.selectedIndex].value;
    var search_date1 = document.getElementById('orderList_date_value1').value;
    var search_date2 = document.getElementById('orderList_date_value2').value;
    
    //주문상태
    var search_state_e = document.getElementById('orderList_orderState');
    var search_state = search_state_e.options[search_state_e.selectedIndex].value;

    if(!valid_search_sql(search_select, search_date, search_state)){
        if(search_name){
                sql += "where "+search_select+" like '%"+search_name+"%' ";
            and_count++;
        }
        if(search_date1 && search_date2){
            if(and_count==0)
                sql += "where "+search_date+" between '"+search_date1+" 00:00:00' and '"+search_date2+"23:59:59' ";
            else
                sql += "and "+search_date+" between '"+search_date1+" 00:00:00' and '"+search_date2+"23:59:59' ";
            and_count++;
        }
        if(search_state != ""){
            if(and_count == 0)
                sql += "where order_state = "+search_state+" ";
            else
                sql += "and order_state = "+search_state+" "
            and_count++;
        }
    }
    sql+=";";

    $.ajax({
        type : 'post',
        dataType : 'json',
        url:'http://whatshoe.co.kr/bk/ERP/php/orderSearchList.php',
        data: 'data='+sql,
        success: function(data){
            console.log(data);
            order_len = data.length;
            order = new Array();
            for(var i = 0 ; i<data.length ; i++){
                order[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
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

//초기화
$('#orderList_first_btn').click(function () {
   location.href = "side_orderList.html";
});

//주문modal에서 정보변경
$('#order_modal_save').click(function () {
    var index = document.getElementById('order_modal_index').textContent;
    var admin = document.getElementById('order_modal_admin').value;
    var memo = document.getElementById('order_modal_memo').value;
    var origin_state_e = document.getElementById('order_modal_state');
    var origin_state = origin_state_e.options[origin_state_e.selectedIndex].value;
    var book_time = document.getElementById('order_modal_book').value;
    var book_time_1 = document.getElementById('order_modal_book_time').value;
    var book = book_time+" "+book_time_1;

    $.post("http://whatshoe.co.kr/bk/ERP/php/orderEdit.php",
        {
            index : index,
            state : origin_state,
            admin : admin,
            memo : memo,
            book : book
        },
        function (data, status) {
            if(data === "1"){
                alert("Success");
                location.href="side_orderList.html";
            } else {
                alert("Failed!");
            }
        });
});



//주문코드번호 분석 후 해당 서비스 출력
function checkService(index) {

    var returnService = new Array();     //반환 하려는 서비스 목록 저장 변수
    var pixItem = new Array();  // 길이 3인 토큰으로 구분하기 위해 쓰는 배열
    var service_code = new Array(); // 해당 서비스 코드 저장
    var length = order[index].code.length;
    var count = 0;
    var serviceName = "";
    pixItem = order[index].code;
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
                    serviceName = man_array_service[i];
                    returnService[1]+= parseInt(man_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+man_array_service[i];
                    returnService[1]+= parseInt(man_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=woman_len; i++){
            if(service_code[k] == woman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = woman_array_service[i];
                    serviceName = woman_array_service[i];
                    returnService[1]+= parseInt(woman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+woman_array_service[i];
                    returnService[1]+= parseInt(woman_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=preman_len; i++){
            if(service_code[k] == preman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = preman_array_service[i];
                    serviceName = preman_array_service[i];
                    returnService[1]+= parseInt(preman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+preman_array_service[i];
                    returnService[1]+= parseInt(preman_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=prewoman_len; i++){
            if(service_code[k] == prewoman_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = prewoman_array_service[i];
                    serviceName = prewoman_array_service[i];
                    returnService[1]+= parseInt(prewoman_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+prewoman_array_service[i];
                    returnService[1]+= parseInt(prewoman_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=bag_len; i++){
            if(service_code[k] == bag_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = bag_array_service[i];
                    serviceName = bag_array_service[i];
                    returnService[1]+= parseInt(bag_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+bag_array_service[i];
                    returnService[1]+= parseInt(bag_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=belt_len; i++){
            if(service_code[k] == belt_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = belt_array_service[i];
                    serviceName = belt_array_service[i];
                    returnService[1]+= parseInt(belt_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+belt_array_service[i];
                    returnService[1]+= parseInt(belt_array_price[i]);
                    count ++;
                }
            }
        }
        for(var i = 1; i<=wallet_len; i++) {
            if(service_code[k] == wallet_array_code[i]){
                if(returnService[0]==""){
                    returnService[0] = wallet_array_service[i];
                    serviceName = wallet_array_service[i];
                    returnService[1]+= parseInt(wallet_array_price[i]);
                }
                else{
                    returnService[0] = returnService[0]+"<br>"+wallet_array_service[i];
                    returnService[1]+= parseInt(wallet_array_price[i]);
                    count ++;
                }
            }
        }
    }
    returnService[3] = count;
    returnService[4] = serviceName;
    return returnService;
}

$( function() {
    $( "#orderList_date_value1" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $( "#orderList_date_value2" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $("#order_modal_book").datepicker({
       dateFormat: 'yy-mm-dd'
    });
} );


//각 해당 클릭하면 그 해당 기준에 따라 정렬.
$('#sort_num').click(function () {
    count_sort_book = count_sort_order = 0;
    if(count_sort_num == 0){
        sort_num_style.style.color = 'red';
        sort_book_style.style.color = 'black';
        sort_order_style.style.color = 'black';
        sortTable("_index", "asc");
        count_sort_num ++;
    } else if(count_sort_num == 1){
        sort_num_style.style.color = 'blue';
        sort_book_style.style.color = 'black';
        sort_order_style.style.color = 'black';
        sortTable("_index", "desc");
        count_sort_num --;
    }
});
$('#sort_book').click(function () {
    count_sort_num = count_sort_order = 0;
    if(count_sort_book == 0){
        sort_book_style.style.color = 'red';
        sort_num_style.style.color = 'black';
        sort_order_style.style.color = 'black';
        sortTable("book", "asc");
        count_sort_book ++;
    } else if(count_sort_book == 1){
        sort_book_style.style.color = 'blue';
        sort_num_style.style.color = 'black';
        sort_order_style.style.color = 'black';
        sortTable("book", "desc");
        count_sort_book --;
    }
});
$('#sort_order').click(function () {
    count_sort_book = count_sort_num =  0;
    if(count_sort_order == 0){
        sort_order_style.style.color = 'red';
        sort_book_style.style.color = 'black';
        sort_num_style.style.color = 'black';
        sortTable("order_time", "asc");
        count_sort_order ++;
    } else if(count_sort_order == 1){
        sort_order_style.style.color = 'blue';
        sort_book_style.style.color = 'black';
        sort_num_style.style.color = 'black';
        sortTable("order_time", "desc");
        count_sort_order --;
    }
});
// sort를 어떤 content 기준으로 order 순서대로 할것인지
function sortTable(content, order1) {
    var sql1 = "select * from whatshoe_order order by "+content+" "+order1+";";
    $.ajax({
        type : 'post',
        dataType : 'json',
        url:'http://whatshoe.co.kr/bk/ERP/php/orderSearchList.php',
        data: 'data='+sql1,
        success: function(data){
            order_len = data.length;
            order = new Array();
            for(var i = 0 ; i<data.length ; i++){
                order[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }
            addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert(request);
            alert(errorThrown);
            alert('error: ' + textStatus);
        },
    });
}