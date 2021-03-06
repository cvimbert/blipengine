
/* global _ */

var RandomGenerator = function(mode, array, options) {
    
    var current = [];
    current = _.clone(array);
    
    
    this.getRandObject = function() {
        
        var index = Math.floor(Math.random() * current.length);
        var choosenObject = current[index];
        
        switch (mode) {
            case "sequence":
                current.splice(index, 1);
                
                if (current.length === 0) {
                    current = _.clone(array);
                }
                
                break;
                
            case "sequencen":
                
                break;
        }
        
        return choosenObject;
    };
    
};