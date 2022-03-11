class Oiseau{
    constructor(x, y, taille, ctx, inJump, gravite, skin){
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.hauteur = taille;
        this.largeur = taille*1.5;
        this.ctx = ctx;
        this.velocite = gravite;
        this.inJump = inJump;
        this.gravite = gravite;
        this.skin = skin;
    }
    draw(){

        this.ctx.drawImage(this.skin, this.x, this.y, this.largeur, this.hauteur);
    }

    jump(){
        this.velocite = this.gravite - 20;
    }
    unJump(){
        this.velocite = this.gravite;
    }

    appliquerVelocite(){
        this.y += this.velocite;
    }

}