/**
 * Created by thzo on 04.08.16.
 */
'use strict';
angular.module('magicMirrorAppApp')
  .service('commonService', function () {
    function getArrayOfPropertyOfArray(array, propertyNames) {
      var newArray = [];
      for(var i = 0; i < array.length; i++){
        newArray.push(getChildProperty(array[i], propertyNames))
        //newArray.push(array[i][propertyName]);
      }
      return newArray
    };

    function getChildProperty (entry, propertys){
      if(propertys.length === 1){
        return entry[propertys[0]];
      }
      return getChildProperty(entry[propertys[0]], propertys.slice(1));
    }
    
    return {
      getArrayOfPropertyOfArray: getArrayOfPropertyOfArray
    }
  });
