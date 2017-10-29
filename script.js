
window.onload = function() {

    var canvasW = 750;
    var canvasH = 500;
    var blockSize = 30;
    var color = "green";
    var delay = 100;
    var xCoord = 0;
    var yCoord = 0;
    var ctx;    // Le contexte du canvas
    var canvas; // L'objet HTML canvas dans lequel on dessine
    var snakee; // Notre serpent
    
    init();


    function init() {


        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = canvasW;
        canvas.height = canvasH;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        refresh();
    }

    function refresh() {

        xCoord += 2;
        yCoord += 2;
        ctx.fillStyle = color;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        snakee.draw();
        snakee.move();
        setTimeout(refresh, delay);  // Ajout du timer

    }
    
    function drawBlock(ctx, block) {
        ctx.fillRect(block[0] * blockSize, block[1] * blockSize, blockSize, blockSize);
    }

    function Snake(body) {
        
        this.body = body;           // corps du serpent
        this.draw = function() {
            
            ctx.save();
            ctx.fillStyle = color;
            for(var i=0 ; i< this.body.length ; ++ i) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
            
        };
        
        this.move = function() { 
                                                 // T--------->
            var newHead = this.body[0].slice();  /* 1) On copie l'élément de tête (>) qui va
                                                    correspondre à notre noouvelle tête (N) */
            ++ newHead[0];                       // 2) On incrément le 'x' de la nouvelle tête
            this.body.unshift(newHead);          // 3) On l'ajoute en tête du tableau [body]
                                                 // T-------->N
            this.body.pop();                       // 4) Et on supprime la queue (T)
                                                 // -------->N
        };
        
    }

}