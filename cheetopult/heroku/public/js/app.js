/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {
    $(window).load(function() {
        
        // set global accel value
        var accel =  { x: 0, y: 0, z: 0 }, tilt = { alpha: 0, beta: 0, gamma: 0 };
        
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
            // going with z since it gives us a good range

//            accel.x = event.acceleration.x.toFixed(2);
//            accel.y = event.acceleration.y.toFixed(2);
            accel.z = event.acceleration.z.toFixed(2);
            
            // forward is a negative acceleration so we are looking for negative values here
            if(accel.z < -12 && accel.z > -17) {
                $('#message').html('<p>Small: ' + Math.abs(accel.z) + '</p>');
                socket.emit('accel', { z : accel.z });
                $('#cheetopult').addClass('animatingSlow');
                flyingCheeto(0.35);
            } else if(accel.z < -17 && accel.z > -19) {
                $('#message').html('<p>Just right!: ' + Math.abs(accel.z) + '</p>');
                socket.emit('accel', { z : accel.z });
                $('#cheetopult').addClass('animatingJustRight');
                flyingCheeto(0.35);
            } else if(accel.z < -19) {
                $('#message').html('<p>Too Much!: ' + Math.abs(accel.z) + '</p>');
                socket.emit('accel', { z : accel.z });
                $('#cheetopult').addClass('animatingFast');
                flyingCheeto(0.35);
            }
            
        });
        
        $('#cheetopult').on('animationend webkitAnimationEnd', function(evt) {
            $(this).removeClass();
        });
        
        var flyingCheeto = function(seconds) {
            
            $('#bowlContainer').css({ 
                'top' : '-275px',
                'opacity' : 0,
                '-webkit-transition' : 'top '+seconds+'s ease-in, opacity 0.5s linear'
            });
            
            setTimeout(function() {
                
                $('#bowlContainer').css({
                    'background' : 'none',
                    'top' : '275px',
                    'opacity' : 1,
                    '-webkit-transition' : 'none'
                });
                
            }, 1000);
            
        };
        
        // DEPRECATED - because we went with accel instead
//        $(window).on('deviceorientation', function() {
//            tilt.alpha = event.alpha.toFixed(2);
//            tilt.beta = event.beta.toFixed(2);
//            tilt.gamma = event.gamma.toFixed(2);
//        });
        
        // DEPRECATED BECAUSE I DON'T NEED A TIMER - WE JUST SEND THE MESSAGE IF THE VALUE MATCHES WHAT WE'RE LOOKING FOR
//        setInterval(function() {
//        
//            // beta seems really interesting here...but its only the angle of rotation (0 - 90 - 0)
//            // need to do some sort of check to see if beta goes above a value, then send the socket
////            socket.emit('gyro', { beta : tilt.beta });
//            socket.emit('accel', { z : accel.z });
//            console.log('alpha: ' + tilt.alpha + 'beta: ' + tilt.beta + 'gamma: ' + tilt.gamma);
//        }, 500);

    });
})(jQuery);
