function startGame(){
    let menu = document.querySelector("#menu");
    menu.style.display = "none";
    const canvas = document.querySelector("#canvasFlappy");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-25;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth-17;
        canvas.height = window.innerHeight-17;
    });
    let arrayTuyauxPositions = ['200', '300', '400'];

    // X = largeur
    // Y = hauteur
    let oiseau = new Oiseau(0, -20, canvas.height/15, ctx, false,  10, OISEAU);
    bindEvent();
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
    let gameOver = false;
    function gameLoop(){
        ctx.drawImage(FOND,0,0, FOND.width, canvas.height);
    
        for(let i = 0; i < tuyauxHaut.length; i++){// pour chaque tuyau existant
            tuyauxHaut[i].draw();
            tuyauxBas[i].draw();
            tuyauxHaut[i].x-=5;
            tuyauxBas[i].x-=5;
    
            //collisions avec le haut du tuyaux
            if(oiseau.x+oiseau.largeur > tuyauxHaut[i].x && oiseau.x < tuyauxHaut[i].x+tuyauxHaut[i].skin.width && oiseau.y+oiseau.hauteur > tuyauxHaut[i].y && oiseau.y < tuyauxHaut[i].y+tuyauxHaut[i].skin.height){
                if(gameOver == false){
                    unBindEvent();
                    //startGame();
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    displayMenu();
                    cancelAnimationFrame(myReq);
                    gameOver = true;
                }
                
            }
            //collision avec le bas du tuyaux
            if(oiseau.x+oiseau.largeur > tuyauxBas[i].x && oiseau.x < tuyauxBas[i].x+tuyauxBas[i].skin.width && oiseau.y+oiseau.hauteur > tuyauxBas[i].y && oiseau.y < tuyauxBas[i].y+tuyauxBas[i].skin.height){
                if(gameOver == false){
                    unBindEvent();
                    //startGame();
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    displayMenu();
                    cancelAnimationFrame(myReq);
                    gameOver = true;
                }
            }
            
            //suppression des tuyaux
            /*if(tuyauxHaut[i].x < -100){
                tuyauxHaut.splice(i,1);
                tuyauxBas.splice(i,1);
            }*/
    
        }
        score++;
            
        if( tuyauxHaut.length == 0 || tuyauxHaut[tuyauxHaut.length-1].x < canvas.width/1.60){
            //var rand = Math.floor(Math.random()*arrayTuyauxPositions.length);
            let positionTuyau = Math.round(Math.random()*(canvas.height-300))+300;
            tuyauxHaut.push(new Tuyau(canvas.width, positionTuyau-canvas.height-espace, canvas.height, ctx, TUYAUHAUT));
            tuyauxBas.push(new Tuyau(canvas.width, positionTuyau, canvas.height, ctx, TUYAUBAS));
        }
        
        if(oiseau.inJump){
            oiseau.jump();
        }else{
            oiseau.unJump();
        }
        oiseau.appliquerVelocite();
        oiseau.draw();  
    
    
        if(oiseau.y + oiseau.hauteur >= canvas.height){
            if(gameOver == false){
                unBindEvent();
                //startGame();
                ctx.clearRect(0,0,canvas.width, canvas.height);
                displayMenu();
                cancelAnimationFrame(myReq);
                
                gameOver = true;
            }
            
        }
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, canvas.width/2, 50);
    
        let myReq = requestAnimationFrame(gameLoop);
    }
    gameLoop();

    function bindEvent(){
        document.addEventListener("keydown",oiseauJump);
        document.addEventListener("keyup",oiseauUnJump);
        document.addEventListener("mousedown", oiseauJump);
        document.addEventListener("mouseup", oiseauUnJump);
        document.addEventListener("touchstart", oiseauJump);
        document.addEventListener("touchend", oiseauUnJump);
    }
    function unBindEvent(){
        document.removeEventListener("keydown",oiseauJump);
        document.removeEventListener("keyup",oiseauUnJump);
        document.removeEventListener("mousedown", oiseauJump);
        document.removeEventListener("mouseup", oiseauUnJump);
        document.removeEventListener("touchstart", oiseauJump);
        document.removeEventListener("touchend", oiseauUnJump);
    }
    
}
function displayMenu(){
    let menu = document.querySelector("#menu");
    menu.style.display = "block";
}