import { now } from "./gamedate.js"

const events = [
  {

    start: "2079-04-20",
    end: "2079-07-10",
    content: "Tabasco",
    group: "Carlos",
  },
  {

    start: "2079-07-11",
    end: "2079-09-30",
    content: "Cholula",
    group: "Carlos",
  },
  {
    start: "2078-04-18",
    end: "2078-12-12",
    content: "Prot0",
    group: "Mark",
  },
  {
    start: "2077-04-16",
    end: "2078-04-19",
    content: "Kip",
    group: "Mark",
  },
  {
    content: "Avocado",
    start: "2078-04-25",
    end: "2079-04-19",
    group: "Carlos",
  },
  {
    start: "2079-08-01",
    end: now,
    content: "Otters",
    group: "Jim",
  },
  {
    start: "2079-07-04",
    end: "2079-10-14",
    content: "Motor City Blackout",
    group: "event",
  },
]


export { events }