
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";
// import sheetdb from 'sheetdb-node';

var events = []
var lanes = []
var eventsInput = []
var lanesInput
//set the date
var date = new Date();
// var now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var now = new Date().toISOString().substring(0, 10);

var nextYear = (date.getFullYear() + 1)
console.log("Next Year: ", nextYear)
var dateWithoutYear = now.slice(4)
console.log("Date Without Year: ", dateWithoutYear)
var aYearFromNow = nextYear + dateWithoutYear //this will pad the end of the timeline by a year
console.log("now:", now)
console.log("a year from now: ", aYearFromNow)
const apikey = import.meta.env.VITE_API_KEY

//define a getJSON function
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

  //use getJSON to pull the events google sheet, then convert it to usable
  getJSON('https://sheets.googleapis.com/v4/spreadsheets/1iF4p6svtqDrIF6Se0mzd6AzS4CZDsKErbuPTs6cxG2I/values/Data?alt=json&key='+apikey,
    function (err, eventsData) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        eventsInput = eventsData.values
        // convertData(input)
        var headers = eventsInput[0]
        var source = eventsInput
        for (var i = 1; i < source.length; i++) { // iterate over items in the source array (skipping the first one, of course)
          var inputItem = source[i]; // grab the input item who's data we want to copy to the output array
          for (var el = 0; el < inputItem.length; el++) { // iterate over the input item, if any elements are "Now", replace with var now
            if (inputItem[el] == "Now") { inputItem[el] = now }
          }

          var item = {}; // temp item to store those values
          for (var j = 0; j < headers.length; j++) {
            item[headers[j]] = inputItem[j]; // for each string in the header create and assign a property to the temp item
          }
          if (!item.className) { item.className = item.group.replace(/\s+/g, '') } //add a className if it doesn't exist
          var startDate = new Date(item.start)
          var startDateString = startDate.toLocaleDateString()
          var endDate = new Date(item.end)
          var endDateString = endDate.toLocaleDateString()
          item.title = item.content + " (" + startDateString + " - " + endDateString +")" //set the tooltip to the main info plus dates
          events.push(item); // add the temp item to the output array
        }
        console.log("Events: ", events)

  //use getJSON to pull the ID-Group google sheet, then convert it to usable
  getJSON('https://sheets.googleapis.com/v4/spreadsheets/1iF4p6svtqDrIF6Se0mzd6AzS4CZDsKErbuPTs6cxG2I/values/ID-Group?alt=json&key='+apikey,
    function (err, lanesData) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        lanesInput = lanesData.values
        // convertData(input)
        var headers = lanesInput[0]
        var source = lanesInput
        for (var i = 1; i < source.length; i++) { // iterate over items in the source array (skipping the first one, of course)
          var inputItem = source[i]; // grab the input item who's data we want to copy to the output array


          var item = {}; // temp item to store those values
          for (var j = 0; j < headers.length; j++) {
            item[headers[j]] = inputItem[j]; // for each string in the header create and assign a property to the temp item
          }
          lanes.push(item); // add the temp item to the output array
        }
        console.log("Lanes: ", lanes)

        chartify()
      }
    });


      }
    });









function chartify() {


  // DOM element where the Timeline will be attached
  const container = document.getElementById("visualization");


  // Create a DataSet (allows two way data-binding)
  const items = new DataSet(events);

  const groups = new DataSet(lanes);

  // Configuration for the Timeline
  const options = {
    min: "2008-01-01",
    max: aYearFromNow,
    start: "2008-08-01",
    end: now,
    groupOrder: function (a, b) {
      return a.order - b.order
    },
    stack: false,
    // timeAxis: {scale: "month", step: 3}

  }

  // Create a Timeline
  const timeline = new Timeline(container, items, groups, options);

}