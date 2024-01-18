
import {DataSet, Timeline} from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";
import sheetdb from 'sheetdb-node';
// import { events } from "/data/events.js"
// import { lanes } from "/data/lanes.js"
var events = []
var lanes = []

// create a config file
const config = {
  address: 'uto0s2wiuwuez',
};

// Create new client
const client = sheetdb(config);

client.read({sheet: "Data"}).then(function(data) {
  events.push(JSON.parse(data))
  client.read({ sheet: "ID-Group" }).then(function (data2) {
    console.log(data2)
    lanes.push(JSON.parse(data2))
    console.log(lanes)
        chartify()

    }, function(err){
    console.log(err);
  });

}, function(err){
  console.log(err);
});






function chartify() {
  console.log("EVENT: ", events),
  console.log("lanes: ", lanes)


  // DOM element where the Timeline will be attached
  const container = document.getElementById("visualization");

  // set the in-game date
  const now = "2024-01-18"

  // Create a DataSet (allows two way data-binding)
  const items = new DataSet(events[0]);

  const groups = new DataSet(lanes[0]);

  // Configuration for the Timeline
  const options = {
    groupOrder: 'content'
  }

  // Create a Timeline
  const timeline = new Timeline(container, items, groups, options);

}