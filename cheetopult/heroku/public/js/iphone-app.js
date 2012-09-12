/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {
    $(window).load(function() {
        
        // set global accel value
        var accel =  { x: 0, y: 0, z: 0 }, tilt = { alpha: 0, beta: 0, gamma: 0 };
        var selectedState = false, selectedPNG = '';
        
        $('.cheeto').on('touchstart', function(evt) {
            evt.preventDefault();
            
            // this is how to drill into the touch event - more here:
            // http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html#//apple_ref/javascript/cl/Touch
            // http://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
//            console.log(evt.originalEvent.touches[0].pageX);
            
            // can still target elements with regular jquery calls
            selectedPNG = $(this).data('png');
            var randomRotation = Math.floor(Math.random() * 89) + 1;
            
//            if(!selectedState) {
                $('#bowlContainer').css({
                    'background' : 'url(../images/'+selectedPNG+') scroll no-repeat',
                    '-webkit-transform' : 'rotate('+randomRotation+'deg)'
                });

                $('#message').css({
                    'background-position' : '0px -60px'
                });

                selectedState = true;
//            }
            
        });
        
        $(window).on('devicemotion', function() {
            // going with z since it gives us a good range

//            accel.x = event.acceleration.x.toFixed(2);
//            accel.y = event.acceleration.y.toFixed(2);
            accel.z = event.acceleration.z.toFixed(2);
            
            // if we have a cheeto selected
            if(selectedState) {
                // forward is a negative acceleration so we are looking for negative values here
                if(accel.z < -6 && accel.z > -12) {
                    $('#messageDebug').html('<p>Small: ' + Math.abs(accel.z) + '</p>');
                    socket.emit('accel', { z : accel.z, png: selectedPNG });
                    $('#message').css({
                        'background-position' : '0px -120px'
                    });
                    $('#cheetopult').addClass('animatingSlow');
                    flyingCheeto(0.35);
                } else if(accel.z < -12 && accel.z > -15) {
                    $('#messageDebug').html('<p>Just right!: ' + Math.abs(accel.z) + '</p>');
                    socket.emit('accel', { z : accel.z, png: selectedPNG });
                    $('#message').css({
                        'background-position' : '0px -90px'
                    });
                    $('#cheetopult').addClass('animatingJustRight');
                    flyingCheeto(0.35);
                } else if(accel.z < -15) {
                    $('#messageDebug').html('<p>Too Much!: ' + Math.abs(accel.z) + '</p>');
                    socket.emit('accel', { z : accel.z, png: selectedPNG });
                    $('#message').css({
                        'background-position' : '0px -30px'
                    });
                    $('#cheetopult').addClass('animatingFast');
                    flyingCheeto(0.35);
                }
            }
            
                
            
        });
        
        $('#cheetopult').on('animationend webkitAnimationEnd', function(evt) {
            $(this).removeClass();
        });
        
        var flyingCheeto = function(seconds) {
            
            $('#bowlContainer').css({ 
                'top' : '-170px',
                'opacity' : 0,
                '-webkit-transition' : 'top '+seconds+'s ease-in, opacity 0.5s linear'
            });
            
            setTimeout(function() {
                
                $('#bowlContainer').css({
                    'background' : 'none',
                    'top' : '170px',
                    'opacity' : 0
                });
                
                selectedState = false;
                
                setTimeout(function() {
                    
                    var randomRotation = Math.floor(Math.random() * 89) + 1;
                    
                    $('#bowlContainer').css({
                        'opacity' : 1,
                        'background' : 'url(../images/'+selectedPNG+') scroll no-repeat',
                        '-webkit-transform' : 'rotate('+randomRotation+'deg)'
                    });

                    $('#message').css({
                        'background-position' : '0 -60px'
                    });
                    
                    selectedState = true;
                    
                }, 500);
                
            }, 800);
            
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
