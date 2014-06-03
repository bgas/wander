function gameCtrl($scope, $http) {
  //get image and image info
  //$http.get('http://thecrawlingchaos.com/games/wanderlost/imgObjects.json').success(addLocations(locationObjects));
  
  var addLocations = function(locationObjects){
    // assign json location objects to scope
    $scope.locations = locationObjects;
    // initiate with starting image object
    $scope.init();
  }; 
      
    
  // initiate game with first location
  $scope.init = function() {$scope.makeShowing($scope.locations.hub1, "e")};  
    // change image object that is currently showing
  
  $scope.makeShowing= function(location, direction) {
    //check location validity
    if (!location) {
      alert("you can't go that way");
      return; 
    } else { 
      // make a current location object    
      $scope.locations.current = {
        loc: location,
        compass: direction,
        view: location[direction]['img'],
        link: { 
          loc: $scope.locations[location[direction]["linkLoc"]], 
          face: location[direction]["linkView"]
        }         
      }  
    }
  };
  
  
  // allows left/right rotation, rotate to existing views
  $scope.turn = function(turnDirection, facing){   
    
    var availableDirections= [];
    var currentIndex= 0;
    // populate available directions from locations.current
    var getViews = function(){
      var cardinalDirections = ['n', 'e', 's', 'w'];
      var tempDirections=[];
      var currentKeys = Object.keys($scope.locations.current.loc)
      // filter location.current keys to provide only cardinal directions
      currentKeys.filter( function(element){
        if (cardinalDirections.indexOf(element) != -1){
          tempDirections.push(element)
        }
      });
      availableDirections = tempDirections;
      //update currentIndex in relation to available directions
      currentIndex = availableDirections.indexOf(facing);
    }; 
    var rotate = function(){
      getViews();
      var tempIndex = currentIndex;
      if (turnDirection === "left") {
        if (currentIndex === 0) {
          tempIndex = availableDirections.length -1;
        } else{ 
          tempIndex =  currentIndex -1 ;
          }        
      } else if (turnDirection === "right") { 
        if (currentIndex +1 >= availableDirections.length) {        
          tempIndex = 0;
        } else{ 
          tempIndex =  currentIndex +1 ;
        }  
      }
      return availableDirections[tempIndex];      
    }
    $scope.makeShowing($scope.locations.current.loc, rotate());   
  };
  addLocations(testObject);  
};



var testObject =
{
"hub1": {
  "n": { "img": "capHillBlock/hub1n.jpg", "linkLoc": false },
  "e": { "img": "capHillBlock/hub1e.jpg", "linkLoc":"route1", "linkView":"e" },
  "s": { "img": "capHillBlock/hub1s.jpg", "linkLoc":"route4", "linkView":"s" },
  "w": { "img": "capHillBlock/hub1w.jpg", "linkLoc": false }
},

"route1": {
   "e": { "img": "capHillBlock/route1e.jpg", "linkLoc":"hub2", "linkView":"e" },
   "w": { "img": "capHillBlock/route1w.jpg", "linkLoc":"hub1", "linkView":"w" }
},

 "hub2": {
  "n":  { "img": "capHillBlock/hub2n.jpg", "linkLoc": false },
  "e":  { "img": "capHillBlock/hub2e.jpg", "linkLoc": false },
  "s":  { "img": "capHillBlock/hub2s.jpg", "linkLoc":"route2", "linkView":"s" },
  "w":  { "img": "capHillBlock/hub2w.jpg", "linkLoc":"route1", "linkView":"e" }
}, 
 
"route2": {
  "n":  { "img": "capHillBlock/route2n.jpg", "linkLoc":"hub2", "linkView":"n" },
  "s":  { "img": "capHillBlock/route2s.jpg", "linkLoc":"hub3", "linkView":"s" }
},

"hub3": {
  "n" : { "img": "capHillBlock/hub3n.jpg", "linkLoc":"route2", "linkView":"n" },
  "e" : { "img": "capHillBlock/hub3e.jpg", "linkLoc": false },
  "s" : { "img": "capHillBlock/hub3s.jpg", "linkLoc": false }, 
  "w" : { "img": "capHillBlock/hub3w.jpg", "linkLoc":"route3", "linkView":"w" }

},

"route3":{
  "e":  { "img": "capHillBlock/route3e.jpg", "linkLoc":"hub3", "linkView":"e" },
  "w":  { "img": "capHillBlock/route3w.jpg", "linkLoc":"hub4", "linkView":"w" }
},

"hub4" : {
  "n" : { "img": "capHillBlock/hub4n.jpg", "linkLoc":"route4", "linkView":"n" },
  "e" : { "img": "capHillBlock/hub4e.jpg", "linkLoc":"route3", "linkView":"e" },
  "s" : { "img": "capHillBlock/hub4s.jpg", "linkLoc": false },
  "w" : { "img": "capHillBlock/hub4w.jpg", "linkLoc": false }
},

"route4": {
  "n":  { "img": "capHillBlock/route4n.jpg", "linkLoc":"hub1", "linkView":"n" },
  "s":  { "img": "capHillBlock/route4s.jpg", "linkLoc":"hub4", "linkView":"s" } 
}

};


