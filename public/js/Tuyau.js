class Tuyau{
    constructor(x,y, ctx, skin){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.skin = skin;
    }
    draw(){
        this.ctx.drawImage(this.skin, this.x, this.y);
    }

}