/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {
    $(window).load(function() {
        
        // set global accel value
        var accel = 0, tilt = { alpha: 0, beta: 0, gamma: 0 };
        
        $('.cheeto').on('touchstart', function(evt) {
            evt.preventDefault();
            
            // this is how to drill into the touch event - more here:
            // http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html#//apple_ref/javascript/cl/Touch
            // http://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
//            console.log(evt.originalEvent.touches[0].pageX);
            
            // can still target elements with regular jquery calls
            var pngName = $(this).data('png');
            var randomRotation = Math.floor(Math.random() * 89) + 1;
            

            
            $('#bowlContainer').css({
                'background' : 'url(../images/'+pngName+') scroll no-repeat',
                '-webkit-transform' : 'rotate('+randomRotation+'deg)'
            });

        });
        
        $(window).on('devicemotion', function() {
            accel = (event.acceleration.x * 100).toFixed(2);
        });
        
        $(window).on('deviceorientation', function() {
//            tilt = (event.alpha * 10).toFixed(2);
            
            tilt.alpha = event.alpha.toFixed(2);
            tilt.beta = event.beta.toFixed(2);
            tilt.gamma = event.gamma.toFixed(2);
        });
        
        setInterval(function() {
            // accelerometer doesnt give us much
//            console.log('acceleration: ' + accel);

            // beta seems really interesting here...
            console.log('alpha: ' + tilt.alpha + 'beta: ' + tilt.beta + 'gamma: ' + tilt.gamma);
        }, 500);

    });
})(jQuery);
