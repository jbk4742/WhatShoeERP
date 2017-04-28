/**
 * Created by byeongkwan on 2017-04-24.
 */
$('#main_img').click(function () {
    location.href="main.html";
});


var admin_num=0;
var book_num = 0;
var admin_len;
var book_len;
var Admin = new Array();    //담당자 미지정 데이터 저장 배열
var Book = new Array();     //예약 스케쥴 관리 데이터 저장 배열

var order_person ; //주문자수
var order_count = 0; //주문건수
var sum_price = 0; //주문 총금액
var new_person = 0 ; //신규고객
var old_person = 0 ; //단골고객
var price_avr = 0; //객단가;;

//DB에서 주문정보 긁어오기
$(document).ready(function () {
    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/mainAdmin.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            admin_len = data.length;
            for(var i = 0 ; i<data.length ; i++){
                Admin[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }

            admin_addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert('error: ' + textStatus);
        },
    });

    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/mainBook.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            book_len = data.length;
            for(var i = 0 ; i<data.length ; i++){
                Book[i+1] = new Order(data[i].order_index, data[i].order_id, data[i].order_time, data[i].order_code, data[i].order_addr, data[i].order_state, data[i].order_phone, data[i].order_text, data[i].order_pay, data[i].whatshoeman, data[i].memo, data[i].order_book, data[i].delivery_number, data[i].price, data[i].deliver);
            }

            book_addTablePage();
        },
        error: function(request, textStatus, errorThrown){
            alert('error: ' + textStatus);
        },
    });

    //주문 통계부분
    $.ajax({
        type:'POST',
        url:'http://whatshoe.co.kr/bk/ERP/php/mainStats.php',
        dataType:'json',
        timeout: 10000,
        success: function(data){
            order_person = data.length;
            for(var i = 0 ; i<data.length ; i++){
                sum_price += parseInt(data[i].sum_price);
                order_count += parseInt(data[i].count_id);
                if(parseInt(data[i].count_id ) > 1)
                    old_person++;
                else
                    new_person++;
            }
            price_avr = sum_price / order_person;
            document.getElementById('order_count').textContent = order_count+" counts / "+order_person+" person"
            document.getElementById('main_sum_price').textContent = sum_price+" $";
            document.getElementById('main_new_old').textContent = new_person+" counts / "+old_person+" counts"
            document.getElementById('main_avr').textContent = price_avr+" $";
        },
        error: function(request, textStatus, errorThrown){
            alert('error: ' + textStatus);
        },
    });



});


//페이지 번호 추가 한 페이지당 테이블 행 수 20개
function admin_addTablePage() {
    var state;
    $('#notadmin_page').empty();
    $("#main_notadmin tr:not(:first)").remove();
    admin_num = 1;
    if(admin_len != 0)
        $('#notadmin_page').append('<div id="exPage" onclick="admin_exPage()" style="margin-right: 20px; display: inline-block; cursor: pointer">이전</div>');
    for(var i=1; i<=(admin_len/20)+1 ; i++){
        $('#notadmin_page').append('<div id="page'+i+'" style="margin-right: 5px; display: inline-block; cursor: pointer" onclick="admin_addTableRow('+i+')">'+i+'</div>');
        if(1<=i && i<=10){

        } else{
            $("#page"+i).hide();
        }
    }
    document.getElementById('page1').style.color = "#f25a45";
    $('#notadmin_page').append('<div id="nextPage" onclick="admin_nextPage()" style="margin-left: 20px; display: inline-block; cursor: pointer">다음</div>');
    for(var j = 1 ; j <= 20 ; j++ ){

        if(Admin[j].state === "0"){
            state = "Pick up";
        } else if(Admin[j].state === "1"){
            state = "Repairing";
        } else if(Admin[j].state === "2"){
            state = "Delivery";
        } else if(Admin[j].state === "3"){
            state = "Delivery completed";
        } else if(Admin[j].state === "4"){
            state = "Cancel";
        }
        var date_book = new Date(Admin[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = Admin[j].book;
        else
            book_date = "-";

        $('#notadmin_body').append('<tr style="height: 30px"> <td>'+Admin[j].index+'</td> <td>'+Admin[j].id+'</td><td>'+Admin[j].addr+'</td><td>'+Admin[j].admin+'</td><td>'+state+'</td><td>'+book_date   +'</td></tr>');
    }

}

//페이지 10개씩 이전페이지
function admin_exPage() {
    admin_num-=10;
    if(admin_num == -9){
        admin_num = 1;
    }
    for(var i=1 ; i<=(admin_len/20)+1 ; i++){
        if(admin_num<=i && i<admin_num+10){
            $("#page"+i).show();
        } else{
            $("#page"+i).hide();
        }
    }
}

//페이지 10개씩 다음페이지
function admin_nextPage() {
    admin_num+=10;

    if(admin_num > admin_len/20 + 1){
        admin_num = (admin_len/20 +1)/10;
        admin_num = Math.floor(admin_num) * 10 +1;
    }
    for(var i=1 ; i<=(admin_len/20)+1 ; i++){
        if(admin_num<=i && i<admin_num+10){
            $("#page"+i).show();
        } else{
            $("#page"+i).hide();
        }
    }

}

//테이블 추가 20개씩
function admin_addTableRow(i) {
    var state;

    for(var j=1; j<=admin_len/20 +1;j++){
        if(j == i){
            document.getElementById('page'+j).style.color = "#f25a45"
        } else {
            document.getElementById('page'+j).style.color = "#252525";
        }

    }
    $("#main_notadmin tr:not(:first)").remove();

    for(var j = 20*(i-1)+1 ; j <= 20*(i-1)+20 ; j++ ){

        if(Admin[j].state === "0"){
            state = "Pick up";
        } else if(Admin[j].state === "1"){
            state = "Repairing";
        } else if(Admin[j].state === "2"){
            state = "Delivery";
        } else if(Admin[j].state === "3"){
            state = "Delivery completed";
        } else if(Admin[j].state === "4"){
            state = "Cancel";
        }
        var date_book = new Date(Admin[j].book);
        var book_date;
        if(date_book.getMonth()+1)
            book_date = Admin[j].book;
        else
            book_date = "-";

        $('#notadmin_body').append('<tr style="height: 30px"> <td>'+Admin[j].index+'</td> <td>'+Admin[j].id+'</td><td>'+Admin[j].addr+'</td><td>'+Admin[j].admin+'</td><td>'+state+'</td><td>'+book_date+'</td></tr>');
    }

}

//////////////////////////////////////////////////여기서부턴 book 자바스크립트소스

//페이지 번호 추가 한 페이지당 테이블 행 수 20개
function book_addTablePage() {
    var state;

    $('#main_reserve_page').empty();
    $("#reserve_schedule tr:not(:first)").remove();
    book_num = 1;
    if(admin_len != 0)
        $('#main_reserve_page').append('<div id="book_exPage" onclick="book_exPage()" style="margin-right: 20px; display: inline-block; cursor: pointer">이전</div>');
    for(var i=1; i<=(admin_len/20)+1 ; i++){
        $('#main_reserve_page').append('<div id="book_page'+i+'" style="margin-right: 5px; display: inline-block; cursor: pointer" onclick="book_addTableRow('+i+')">'+i+'</div>');
        if(1<=i && i<=10){

        } else{
            $("#book_page"+i).hide();
        }
    }
    document.getElementById('book_page1').style.color = "#f25a45";
    $('#main_reserve_page').append('<div id="book_nextPage" onclick="book_nextPage()" style="margin-left: 20px; display: inline-block; cursor: pointer">다음</div>');
    for(var j = 1 ; j <= 20 ; j++ ){

        if(Book[j].state === "0"){
            state = "Pick up";
        } else if(Book[j].state === "1"){
            state = "Repairing";
        } else if(Book[j].state === "2"){
            state = "Delivery";
        } else if(Book[j].state === "3"){
            state = "Delivery completed";
        } else if(Book[j].state === "4"){
            state = "Cancel";
        }


        $('#reserve_body').append('<tr style="height: 30px"> <td>'+Book[j].index+'</td> <td>'+Book[j].id+'</td><td>'+Book[j].addr+'</td><td>'+Book[j].admin+'</td><td>'+state+'</td><td>'+Book[j].book+'</td></tr>');
    }

}

//페이지 10개씩 이전페이지
function book_exPage() {
    book_num-=10;
    if(book_num == -9){
        book_num = 1;
    }
    for(var i=1 ; i<=(book_len/20)+1 ; i++){
        if(book_num<=i && i<book_num+10){
            $("#book_page"+i).show();
        } else{
            $("#book_page"+i).hide();
        }
    }
}

//페이지 10개씩 다음페이지
function book_nextPage() {
    book_num+=10;

    if(book_num > book_len/20 + 1){
        book_num = (book_len/20 +1)/10;
        book_num = Math.floor(book_num) * 10 +1;
    }
    for(var i=1 ; i<=(book_len/20)+1 ; i++){
        if(book_num<=i && i<book_num+10){
            $("#book_page"+i).show();
        } else{
            $("#book_page"+i).hide();
        }
    }

}

//테이블 추가 20개씩
function book_addTableRow(i) {
    var state;

    for(var j=1; j<=book_len/20 +1;j++){
        if(j == i){
            document.getElementById('book_page'+j).style.color = "#f25a45"
        } else {
            document.getElementById('book_page'+j).style.color = "#252525";
        }

    }
    $("#reserve_schedule tr:not(:first)").remove();

    for(var j = 20*(i-1)+1 ; j <= 20*(i-1)+20 ; j++ ){

        if(Book[j].state === "0"){
            state = "Pick up";
        } else if(Book[j].state === "1"){
            state = "Repairing";
        } else if(Book[j].state === "2"){
            state = "Delivery";
        } else if(Book[j].state === "3"){
            state = "Delivery completed";
        } else if(Book[j].state === "4"){
            state = "Cancel";
        }


        $('#reserve_body').append('<tr style="height: 30px"> <td>'+Book[j].index+'</td> <td>'+Book[j].id+'</td><td>'+Book[j].addr+'</td><td>'+Book[j].admin+'</td><td>'+state+'</td><td>'+Book[j].book+'</td></tr>');
    }

}