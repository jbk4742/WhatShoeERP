/**
 * Created by byeongkwan on 2017-04-27.
 */
$('#main_img').click(function () {
   location.href="main.html";
});
$(document).ready(function () {
    for(var i = 1; i<=man_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+man_array_code[i]+'</td><td>'+man_array_service[i]+'</td><td>'+man_array_price[i]+'</td><td>man shoe</td></tr>')
    }
    for(var i = 1; i<=woman_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+woman_array_code[i]+'</td><td>'+woman_array_service[i]+'</td><td>'+woman_array_price[i]+'</td><td>woman shoe</td></tr>')
    }
    for(var i = 1; i<=preman_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+preman_array_code[i]+'</td><td>'+preman_array_service[i]+'</td><td>'+preman_array_price[i]+'</td><td>preman shoe</td></tr>')
    }
    for(var i = 1; i<=prewoman_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+prewoman_array_code[i]+'</td><td>'+prewoman_array_service[i]+'</td><td>'+prewoman_array_price[i]+'</td><td>prewoman shoe</td></tr>')
    }
    for(var i = 1; i<=bag_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+bag_array_code[i]+'</td><td>'+bag_array_service[i]+'</td><td>'+bag_array_price[i]+'</td><td>bag</td></tr>')
    }
    for(var i = 1; i<=belt_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+belt_array_code[i]+'</td><td>'+belt_array_service[i]+'</td><td>'+belt_array_price[i]+'</td><td>belt</td></tr>')
    }
    for(var i = 1; i<=wallet_len; i++){
        $('#sellService_list_body').append('<tr><td></td><td>'+wallet_array_code[i]+'</td><td>'+wallet_array_service[i]+'</td><td>'+wallet_array_price[i]+'</td><td>wallet</td></tr>')
    }
});
$('#sellService_search').click(function () {

    var search_select_list = document.getElementById('sellService_category');
    var search_select = search_select_list.options[search_select_list.selectedIndex].value;
    var search_service = document.getElementById('sellService_service').value;
    var search_service_num = document.getElementById('sellService_num').value;

    if(search_select != ""){
        $("#sell_service_list tr:not(:first)").remove();
        if(search_select == "man")
            man_search(search_service, search_service_num);
        else if(search_select == "woman")
            woman_search(search_service, search_service_num);
        else if(search_select == "preman")
            preman_search(search_service, search_service_num);
        else if(search_select == "prewoman")
            prewoman_search(search_service, search_service_num);
        else if(search_select == "bag")
            bag_search(search_service, search_service_num);
        else if(search_select == "belt")
            belt_search(search_service, search_service_num);
        else if(search_select == "wallet")
            wallet_search(search_service, search_service_num);
        else
            alert("error");
    }else{
        alert('Please re-enter your search');
    }
});
$('#sellService_first').click(function () {
   location.href="side_sellService.html";
});
function man_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=man_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+man_array_code[i]+'</td><td>'+man_array_service[i]+'</td><td>'+man_array_price[i]+'</td><td>man shoe</td></tr>');
        }
    else{
        for(var i = 1; i<=man_len; i++){
            if(man_array_code[i].indexOf(service_num)!= -1 ||  man_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+man_array_code[i]+'</td><td>'+man_array_service[i]+'</td><td>'+man_array_price[i]+'</td><td>man shoe</td></tr>');
        }
    }
}
function woman_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=woman_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+woman_array_code[i]+'</td><td>'+woman_array_service[i]+'</td><td>'+woman_array_price[i]+'</td><td>woman shoe</td></tr>');
        }
    else{
        for(var i = 1; i<=woman_len; i++){
            if(woman_array_code[i].indexOf(service_num)!= -1 ||  woman_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+woman_array_code[i]+'</td><td>'+woman_array_service[i]+'</td><td>'+woman_array_price[i]+'</td><td>woman shoe</td></tr>');
        }
    }
}
function preman_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=preman_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+preman_array_code[i]+'</td><td>'+preman_array_service[i]+'</td><td>'+preman_array_price[i]+'</td><td>preman shoe</td></tr>');
        }
    else{
        for(var i = 1; i<=preman_len; i++){
            if(preman_array_code[i].indexOf(service_num)!= -1 ||  preman_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+preman_array_code[i]+'</td><td>'+preman_array_service[i]+'</td><td>'+preman_array_price[i]+'</td><td>preman shoe</td></tr>');
        }
    }
}
function prewoman_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=prewoman_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+prewoman_array_code[i]+'</td><td>'+prewoman_array_service[i]+'</td><td>'+prewoman_array_price[i]+'</td><td>prewoman shoe</td></tr>');
        }
    else{
        for(var i = 1; i<=prewoman_len; i++){
            if(prewoman_array_code[i].indexOf(service_num)!= -1 ||  prewoman_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+prewoman_array_code[i]+'</td><td>'+prewoman_array_service[i]+'</td><td>'+prewoman_array_price[i]+'</td><td>prewoman shoe</td></tr>');
        }
    }
}
function bag_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=bag_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+bag_array_code[i]+'</td><td>'+bag_array_service[i]+'</td><td>'+bag_array_price[i]+'</td><td>bag</td></tr>');
        }
    else{
        for(var i = 1; i<=bag_len; i++){
            if(bag_array_code[i].indexOf(service_num)!= -1 ||  bag_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+bag_array_code[i]+'</td><td>'+bag_array_service[i]+'</td><td>'+bag_array_price[i]+'</td><td>bag</td></tr>')
        }
    }
}
function belt_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=belt_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+belt_array_code[i]+'</td><td>'+belt_array_service[i]+'</td><td>'+belt_array_price[i]+'</td><td>belt</td></tr>')
        }
    else{
        for(var i = 1; i<=belt_len; i++){
            if(belt_array_code[i].indexOf(service_num)!= -1 ||  belt_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+belt_array_code[i]+'</td><td>'+belt_array_service[i]+'</td><td>'+belt_array_price[i]+'</td><td>belt</td></tr>')
        }
    }
}
function wallet_search(service_name , service_num) {
    if(!service_num && !service_name)
        for(var i = 1; i<=wallet_len; i++){
            $('#sellService_list_body').append('<tr><td></td><td>'+wallet_array_code[i]+'</td><td>'+wallet_array_service[i]+'</td><td>'+wallet_array_price[i]+'</td><td>wallet</td></tr>')
        }
    else{
        for(var i = 1; i<=wallet_len; i++){
            if(wallet_array_code[i].indexOf(service_num)!= -1 ||  wallet_array_service[i].indexOf(service_name) != -1)
                $('#sellService_list_body').append('<tr><td></td><td>'+wallet_array_code[i]+'</td><td>'+wallet_array_service[i]+'</td><td>'+wallet_array_price[i]+'</td><td>wallet</td></tr>')
        }
    }
}