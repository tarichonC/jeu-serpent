
window.onload = function() {

    var CANVASW = 750;
    var CANVASH = 510;
    var BLOCKSIZE = 30;
    var SNAKE_COLOR = "green";
    var APPLE_COLOR = "red";

    var KeyEnum = {
        KEY_SPACE: 32,
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40
    };

    var delay = 120;
    var xCoord = 0;
    var yCoord = 0;
    var canvas; // L'objet HTML canvas dans lequel on dessine
    var ctx;    // Le contexte du canvas
    var snakee; // Notre serpent  
    var apple;

    init();

    function init() {

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = CANVASW;
        canvas.height = CANVASH;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        apple = new Apple([10,10]);
        refresh();

    }

    function refresh() {

        xCoord += 2;
        yCoord += 2;
        ctx.fillStyle = SNAKE_COLOR;
        this.direction = KeyEnum.KEY_LEFT;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        snakee.draw();
        apple.draw();
        snakee.move();
        setTimeout(refresh, delay);  // Ajout du timer

    }
    
    function drawBlock(ctx, block) {
        ctx.fillRect(block[0] * BLOCKSIZE, block[1] * BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
    }

    function Snake(body) {
        
        this.body = body;                               // corps du serpent
        this.direction = KeyEnum.KEY_RIGHT;             // direction du serpent
        this.draw = function() {
            
            ctx.save();
            ctx.fillStyle = SNAKE_COLOR;

            for(var i=0 ; i< this.body.length ; ++ i) {
                drawBlock(ctx, this.body[i]);
            }

            ctx.restore();
            
        };
        
        this.move = function() { 
                                                 // T--------->
            var newHead = this.body[0].slice();  // 1) On copie l'élément de tête (>) qui va
                                                 // correspondre à notre noouvelle tête (N)
            
            switch(this.direction) {            // 2) On modifie le 'x' ou le 'y' de la nouvelle tête
                case KeyEnum.KEY_LEFT:
                    -- newHead[0];
                    break
                case KeyEnum.KEY_RIGHT:
                    ++ newHead[0];
                    break;
                case KeyEnum.KEY_UP:
                    -- newHead[1];
                    break;
                case KeyEnum.KEY_DOWN:
                    ++ newHead[1];
                    break;
                default:
                    throw("Move : direction not a valid direction");
            }

            this.body.unshift(newHead);          // 3) On l'ajoute en tête du tableau [body]
                                                 // T-------->N
            this.body.pop();                     // 4) Finalement on supprime la queue (T)
                                                 // -------->N
        };

        // 
        this.setDirection = function (direction){

            var allowedDirections;

            switch(this.direction) {
                case KeyEnum.KEY_UP:
                case KeyEnum.KEY_DOWN:
                    allowedDirections = [KeyEnum.KEY_LEFT, KeyEnum.KEY_RIGHT];
                    break;

                case KeyEnum.KEY_LEFT:
                case KeyEnum.KEY_RIGHT:
                allowedDirections = [KeyEnum.KEY_DOWN, KeyEnum.KEY_UP];
                    break;
                
                default:
                    throw("setDirection : direction not a valid direction");
            }

            if(allowedDirections.indexOf(direction) > -1) {
                this.direction = direction;
            }

        };

        this.collision = function() {
            
            var collision = false;
        };
        
    }

    function Apple(position) {

        this.position = position;

        this.draw = function() {

            var radius = BLOCKSIZE / 2;
            var x = position[0] * BLOCKSIZE + radius;   
            var y = position[1] * BLOCKSIZE + radius; 

            ctx.save();
            ctx.fillStyle = APPLE_COLOR;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
            
        };
    }


    // Fonction associé à l'evenement KeyDown pour faire bouger 
    // le serpent (fleches) ou relancer la partie (barre espace)
    document.onkeydown = function (event) {
        
        switch(event.keyCode) {

            case KeyEnum.KEY_SPACE:
                break;

            case KeyEnum.KEY_UP:
                break;

            case KeyEnum.KEY_DOWN:
                break;

            case KeyEnum.KEY_LEFT:
                break;

            case KeyEnum.KEY_RIGHT:
                break;
                
            default:
                return;
        }

        snakee.setDirection(event.keyCode);
    }

}