/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Particle = function() {
    
    var pos = {
        x: 0,
        y: 0
    }
    
    var speed = {
        x: 1,
        y: 1
    };
    
    this.init = function() {
        // start the stepper and start the cheeto animating in a random direction
        animationStartTime = Date.now();
        step();
    }
    
    var step = function() {
        
        var self = this;
        update();
        window.requestAnimationFrame(self.step());
        
    }    
    
    var update = function() {
        console.log('working');
    }
};