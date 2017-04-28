/**
 * Created by byeongkwan on 2017-03-13.
 */
function Order(index, id, time, code, addr, state, phone, etc, pay, admin, memo, book, num, price, delivery) {
    this.index = index;
    this.id = id;
    this.time = time;
    this.code = code;
    this.addr = addr;
    this.state = state;
    this.phone = phone;
    this.etc = etc;
    this.pay = pay;
    this.admin = admin;
    this.memo = memo;
    this.book = book;
    this.delivery_number = num;
    this.price = price;
    this.deliver = delivery;
}