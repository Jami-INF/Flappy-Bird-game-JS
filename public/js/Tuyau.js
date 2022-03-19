class Tuyau{
    constructor(x,y, taille, ctx, skin){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.skin = skin;
        this.taille = taille;
        this.hauteur = taille;
        this.largeur = taille/5;
    }
    draw(){
        this.ctx.drawImage(this.skin, this.x, this.y, this.largeur, this.hauteur);
    }

}