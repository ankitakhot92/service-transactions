/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'text!data.json', 'ojs/ojchart', 'ojs/ojtoolbar'],
 function(oj, ko, $, file) {

    function CustomerViewModel() {
      var self = this;

      this.timeAxisTypeValue = ko.observable('enabled');
      this.orientationValue = ko.observable('vertical');
      this.lineTypeValue = ko.observable('stepped');

      var mixedGroups = ["Group A", "Group B", "Group C", "Group D"];
      
      var data = JSON.parse(file);

      //creating an empty array
      var mixedSeries = [];      
      var name ;
      var item;
      var x;
      var y;

      //6 hrs back timestamp

      //IST
      var today = new Date();
      var d = new Date(today);
      var past1 = d.setHours(today.getHours()-6);
      var past = new Date(past1);
      console.log(today);
      console.log(past);

      //UTC
      var now = ((today.toJSON()).slice(0,19)) + 'Z';
      var then = ((past.toJSON()).slice(0,19)) + 'Z';
      console.log(now);
      console.log(then);

      
      var items1 = [];
     

      //filter past 6 hrs data
      for(i=0;i<data.length;i++){
           for(var j=0;j<data[i].transactions.length;j++){
            //alert("hi");
              //creating an object
              var objData = {
                "name": "abc",
                //"items": [{x: "def", y: 0}]
                "items": []
              }
              
              
              var objData1 = {
                "x" : "def",
                "y" : 0
              }

              //console.log(objData.items[0].x);
              
              //get data
              var serviceType = data[i].serviceType;
              var count = data[i].transactions[j].count;
              var dateTime1 = data[i].transactions[j].transactionRequestDateTime;
              var dateTime = dateTime1.toString();
              
              // console.log(serviceType);
              // console.log(count);
              //console.log(dateTime);

              if(then < dateTime && dateTime < now){
                //alert(i);
                var name = data[i].serviceType;
                var x = data[i].transactions[j].transactionRequestDateTime;
                var y = data[i].transactions[j].count;
              
                
              //replace object data
              // objData.items[k].x = x;
              // objData.items[k].y = y;
              //objData.name = name;
              objData1.x = x;
              objData1.y = y;
              //alert("hi");
              // objData.items.push(objData1);
              items1.push(objData1);
              //console.log(items1);
              //alert("hey");
              

              //push data
              // mixedSeries.push(objData);
              }
              
          }
          //replace objData 
          objData.name = name;
          objData.items = items1
          // objData.name = name;
          mixedSeries.push(objData);
          items1 = [];
         
      }
      console.log(items1);
      console.log(mixedSeries);

      this.mixedSeriesValue = ko.observableArray(mixedSeries);
      this.mixedGroupsValue = ko.observableArray(mixedGroups);
      //this.xAxisOptions2({});



      




      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
