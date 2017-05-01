var shopcart = {
    getshopcart(){
        return JSON.parse(localStorage.getItem('shop')||'[]');
    },
    saveshopcart(sp){
        localStorage.setItem('shop',JSON.stringify(sp))
    },
    addshopcart(prod){
        let shops = this.getshopcart();
        let findshops = shops.find(function(item, index, arr){
           return item.id == prod.id;
        });
        if(findshops){
            findshops.num += prod.num;
        }else{
            shops.push(prod);
        }
        this.saveshopcart(shops);
    },
    getTotalCount(){
        let shops = this.getshopcart();
        let sum = 0;
        shops.forEach(function(p){
            sum += p.num;
        });
        return sum;
    },
    delshopcart(index){
        let shopcart = this.getshopcart();
        shopcart.splice(index, 1);
        this.saveshopcart(shopcart);

    },
    
}
export default shopcart;