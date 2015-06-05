window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var main = (function () {

    // Module vars
    var canvas, ctx;
    var flowers = [];

    // Flower constructor
    var Flower = function (o) {
        this.cx = o.cx;
        this.cy = o.cy;
        this.radius = o.radius || 100;

        this.draw = function () {
            var angle = 0.0;

            while (angle < 2 * Math.PI) {
                var x = this.cx + (this.radius / 2) * Math.cos(angle);
                var y = this.cy + (this.radius / 2) * Math.sin(angle);

                circle(x, y , this.radius / 2, 'hsla(321, 95%, 60%, .1)', 'hsla(321, 95%, 75%, .2)');
                angle += 0.5;
            }
        };
    };

    // Circle utility
    var circle = function (centerX, centerY, radius, fillStyle, strokeStyle) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        flowers.forEach(function (f) {
            f.draw();
        });
    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);
        draw();
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Event handlers
        window.addEventListener('click', function (e) {
            flowers.push(new Flower({
                'cx': e.clientX,
                'cy': e.clientY
            }));
        }, false);

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;