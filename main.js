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

    var canvas, ctx;
    var flowers = [];

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    };

    // Update logic
    var update = function () {

    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);

        update();
        draw();
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Event handlers
        window.addEventListener('click', function () {
            flowers.push(0);
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