function startGame(){
    const canvas = document.querySelector("#canvasFlappy");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-25;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth-17;
        canvas.height = window.innerHeight-17;
    });

    // X = largeur
    // Y = hauteur
    let oiseau = new Oiseau(0, -20, canvas.height/15, ctx, false,  10, OISEAU);




    document.addEventListener("keydown",oiseauJump);
    document.addEventListener("keyup",oiseauUnJump);
    document.addEventListener("mousedown", oiseauJump);
    document.addEventListener("mouseup", oiseauUnJump);
    document.addEventListener("touchstart", oiseauJump);
    document.addEventListener("touchend", oiseauUnJump);

    function oiseauJump(){
        oiseau.inJump = true;
    }
    function oiseauUnJump(){
        oiseau.inJump = false;
    }



    let espace = 300;
    let tuyauxHaut = [];
    let tuyauxBas = [];
    let score = 0;
    function gameLoop(){
        ctx.drawImage(FOND,0,0, FOND.height, canvas.height);
    
        for(let i = 0; i < tuyauxHaut.length; i++){// pour chaque tuyau existant
            tuyauxHaut[i].draw();
            tuyauxBas[i].draw();
            tuyauxHaut[i].x-=5;
            tuyauxBas[i].x-=5;
    
            //collisions
            if(oiseau.x+oiseau.largeur > tuyauxHaut[i].x && oiseau.x < tuyauxHaut[i].x+tuyauxHaut[i].skin.width && oiseau.y+oiseau.hauteur > tuyauxHaut[i].y && oiseau.y < tuyauxHaut[i].y+tuyauxHaut[i].skin.height){
                location.reload();
            }
            if(oiseau.x+oiseau.largeur > tuyauxBas[i].x && oiseau.x < tuyauxBas[i].x+tuyauxBas[i].skin.width && oiseau.y+oiseau.hauteur > tuyauxBas[i].y && oiseau.y < tuyauxBas[i].y+tuyauxBas[i].skin.height){
                location.reload();
            }
            
            //suppression des tuyaux
            /*if(tuyauxHaut[i].x < -100){
                tuyauxHaut.splice(i,1);
                tuyauxBas.splice(i,1);
            }*/
    
        }
        score++;
            
        if( tuyauxHaut.length == 0 || tuyauxHaut[tuyauxHaut.length-1].x < canvas.width/1.60){
            let positionTuyau = Math.floor(Math.random()*(canvas.height-espace-100))+100;
            console.log(Math.floor(Math.random()));
            tuyauxHaut.push(new Tuyau(canvas.width, positionTuyau-TUYAUHAUT.height-espace, ctx, TUYAUHAUT));
            tuyauxBas.push(new Tuyau(canvas.width, positionTuyau, ctx, TUYAUBAS));
        }
        
        if(oiseau.inJump){
            oiseau.jump();
        }else{
            oiseau.unJump();
        }
        oiseau.appliquerVelocite();
        oiseau.draw();  
    
    
        if(oiseau.y + oiseau.hauteur >= canvas.height){
            location.reload();
        }
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, canvas.width/2, 50);
    
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}