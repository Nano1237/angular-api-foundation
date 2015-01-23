# angular-phonegap-pushNotification

This is a simple foundation for ajax apis.

##Usage

- Add the `angular-api-foundation` module to the Apps Dependencies:
```javascript
angular.module('myApp', ['angular-api-foundation']);
```
- Require the `apiFoundation` factory:
```javascript
myApp.controller('ExampleCtrl',[
    'apiFoundation',
    function(apiFoundation){
        //the following code goes here
    }
]);
```
- Create a new api Object:
```javascript
var api = apiFoundation({
    url: 'https://someWebiste/' //The Url for the api
    demo:function(customParam){ //A Custom method for the api
        return this.api(customParam); //will set the customParam as route element for the api
    },
    anotherDemo:{//For more information scroll down
        route:['a','b'],
        get:['c','d']
    }
});
```
- Use the api Object:
```javascript
api.demo('something').then(function(a){
    a;//success
},function(a){
    a;//error
});
//
//OR
//
api.anotherDemo({//will make a call to https://someWebiste/1/2?c=3&d=4
    a:1,
    b:2,
    c:3,
    d:4
}).then(function(a){
    a;//success
},function(a){
    a;//error
});
```
##More Information:
Comming soon