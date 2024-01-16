
import {DataSet, Timeline} from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

import { events } from "/data/events.js"
import { lanes } from "/data/lanes.js"

// DOM element where the Timeline will be attached
const container = document.getElementById("visualization");

// set the in-game date
const now = "2079-12-20"

// Create a DataSet (allows two way data-binding)
const items = new DataSet(events);

const groups = new DataSet(lanes);

// Configuration for the Timeline
const options = {
  groupOrder: 'content'
}

// Create a Timeline
const timeline = new Timeline(container, items, groups, options);

