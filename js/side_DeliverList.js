/**
 * Created by byeongkwan on 2017-04-05.
 */
$('#main_img').click(function () {
    location.href="main.html";
});

var num=0;
var order_len;
var order = new Array();

var Modal_Deliver = new Example.Modal({
    id: "deliverList_modal" // 모달창 아이디 지정
});

//DB에서 주문정보 긁어오기
$(document).ready(function () {
    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/deliverList.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            order_len = data.length;
            for(var i = 0 ; i<data.length ; i++){
                order[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }
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
    $('#deliverList_page').empty();
    $("#deliverList_table tr:not(:first)").remove();
    num = 1;
    if(order_len)
        $('#deliverList_page').append('<div id="exPage" onclick="exPage()" style="margin-right: 20px; display: inline-block; cursor: pointer">이전</div>');
    for(var i=1; i<=(order_len/20)+1 ; i++){
        $('#deliverList_page').append('<div id="page'+i+'" style="margin-right: 5px; display: inline-block; cursor: pointer" onclick="addTableRow('+i+')">'+i+'</div>');
        if(1<=i && i<=10){

        } else{
            $("#page"+i).hide();
        }
    }
    document.getElementById('page1').style.color = "#f25a45";
    $('#deliverList_page').append('<div id="nextPage" onclick="nextPage()" style="margin-left: 20px; display: inline-block; cursor: pointer">다음</div>');
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
            service[0] = "Bespoke";
        }
        var date_book = new Date(order[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = order[j].book;
        else
            book_date = "-";
        $('#deliverList_table_body').append('<tr onclick="add_check('+j+')"> <td>'+order[j].index+'</td> <td>'+order[j].id+'</td> <td>'+service[0]+'</td> <td>'+order[j].addr+'</td> <td>'+state+'</td><td>'+order[j].admin+'</td><td>'+order[j].phone+'</td><td>'+book_date+'</td><td>'+order[j].pay+'</td><td>'+order[j].memo+'</td><td>'+order[j].time+'</td> </tr>');
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
    $("#deliverList_table tr:not(:first)").remove();

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
        var date_book = new Date(order[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = order[j].book;
        else
            book_date = "-";
        $('#deliverList_table_body').append('<tr onclick="add_check('+j+')"> <td>'+order[j].index+'</td> <td>'+order[j].id+'</td> <td>'+service[0]+'</td> <td>'+order[j].addr+'</td> <td>'+state+'</td><td>'+order[j].admin+'</td><td>'+order[j].phone+'</td><td>'+book_date+'</td><td>'+order[j].pay+'</td><td>'+order[j].memo+'</td><td>'+order[j].time+'</td> </tr>');
    }

}
//$('#order_modal_book_time').timepicker({ 'timeFormat': 'H:i:s' });
//모달에 해당 주문 넣기
function add_check(j) {
    var service = new Array();
    service = checkService(j);
    if(order[j].code.substring(3,6) == "900"){
        service[0] = "Bespoke";
    }

    document.getElementById('deliverList_modal_index').textContent = order[j].index;
    document.getElementById('deliverList_modal_state').textContent = order[j].state;
    document.getElementById('deliverList_modal_id').textContent = order[j].id;
    document.getElementById('deliverList_modal_phone').textContent = order[j].phone;
    document.getElementById('deliverList_modal_addr').textContent = order[j].addr;
    document.getElementById('deliverList_modal_time').textContent = order[j].time;
    document.getElementById('deliverList_modal_code').innerHTML = order[j].code+"<br>"+service[0];
    document.getElementById('deliverList_modal_pay').textContent = order[j].pay;
    document.getElementById('deliverList_modal_admin').textContent = order[j].admin;
    document.getElementById('deliverList_modal_book').textContent = order[j].book;
    document.getElementById('deliverList_modal_admin').value = order[j].admin;
    document.getElementById('deliverList_modal_etc').textContent = order[j].etc;
    document.getElementById('deliverList_modal_memo').value = order[j].memo;
    document.getElementById('deliverList_modal_price').textContent = service[1]+" $";

    Modal_Deliver.show();
}

//modal 창 닫기
$('#deliverList_modal_close').click(function () {

    Modal_Deliver.hide();
});

function valid_search_sql(select, date, state) {
    if(select == "" && date == "" && state == "")
        return true;
    return false;
}

$('#deliver_search_btn').click(function () {
    var sql = "select * from whatshoe_order where order_state = 1";

    //항목선택
    var search_select_list = document.getElementById('deliver_search_list');
    var search_select = search_select_list.options[search_select_list.selectedIndex].value;

    //검색란
    var search_name = document.getElementById('deliver_division_text').value;

    //날짜 종류 선택
    var search_date_e = document.getElementById('deliverList_search_date');
    var search_date = search_date_e.options[search_date_e.selectedIndex].value;
    var search_date1 = document.getElementById('deliverList_search_value1').value;
    var search_date2 = document.getElementById('deliverList_search_value2').value;


    if(!valid_search_sql(search_select, search_date)){
        if(search_name){
                sql += " and "+search_select+" like '%"+search_name+"%' ";
        }
        if(search_date1 && search_date2){
                sql += "and "+search_date+" between '"+search_date1+" 00:00:00' and '"+search_date2+"23:59:59' ";
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

$('#deliver_first_btn').click(function () {
   location.href = "side_orderList.html";
});

//주문modal에서 정보변경
$('#deliverList_modal_save').click(function () {
    var id = document.getElementById('deliverList_modal_id').textContent;
    var deliver = document.getElementById('deliverList_modal_deliver').value;
    var delivery_company = document.getElementById('deliverList_modal_deliver').value;
    if(deliver && delivery_company){
        $.post("http://whatshoe.co.kr/bk/ERP/php/deliverEdit.php",
            {
                id : id,
                deliver : deliver,
                delivery : delivery_company
            },
            function (data, status) {
                if(data === "1"){
                    alert("Success!");
                    location.href="side_deliver_req.html";
                } else {
                    alert("Faile!");
                }
            });
    } else{
        alert("Please Delivery Company, Delivery Number enter");
    }

});



//주문코드번호 분석 후 해당 서비스 출력
function checkService(index) {

    var returnService = new Array();     //반환 하려는 서비스 목록 저장 변수
    var pixItem = new Array();  // 길이 3인 토큰으로 구분하기 위해 쓰는 배열
    var service_code = new Array(); // 해당 서비스 코드 저장
    var length = order[index].code.length;

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
    $( "#deliverList_search_value1" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $( "#deliverList_search_value2" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
} );