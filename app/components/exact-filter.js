angular.module('exactFilter', [])
.filter('exact', function(){
  return function(items, match){
    var matching = [], matches, falsely = true;
    
    // Return the items unchanged if all filtering attributes are falsy
    angular.forEach(match, function(value, key){
      falsely = falsely && !value;
    });
    if(falsely){
      return items;
    }
    
    angular.forEach(items, function(item){ 
      matches = true;
      angular.forEach(match, function(value, key){ 
        if(!!value){ 
          matches = matches && (item[key] === value);  
        }
      });
      if(matches){
        matching.push(item);  
      }
    });
    return matching;
  }
});