export default class ticketDto {
    constructor(code, total,email) { 
        this.code = code;
        this.purchaseDate = new Date();
        this.amount = this.totalAmount(total); ;
        this.purcherser = email;
    }


    totalAmount(total){
        let tot= 0
        total.forEach(prod => {
            tot += prod.producto.price * prod.quantity;
        });
        console.log(tot)
        return tot;
    }
}
