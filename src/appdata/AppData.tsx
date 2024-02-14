// min seconds = 1800 (0.5 hour)
// 3600 (1 hour)
// 5400 (1.5 hour)
// 7200 (2 hour)
// 9000 (2.5 hour)
// max seconds = 10800 (3 hours)

import SolutionOne from "./1/Solution";
import SolutionTwo from "./2/Solution";
import SolutionThree from "./3/Solution";
import SolutionFour from "./4/Solution";
import SolutionFive from "./5/Solution";
import SolutionSix from "./6/Solution";
import SolutionSeven from "./7/Solution";
import SolutionEight from "./8/Solution";
import SolutionNine from "./9/Solution";

export const appData = [
  {
    id: 1,
    question:
      "Create two input fields (minutes and second), seconds will convert to minutes if it exceeds 60 . Have a start button, pause/play button, reset button and display the timer . If 5 minutes and 34 seconds is typed, then timer should look like 05:34",
    dataSet: null,
    allotedSeconds: 3600,
    answer: <SolutionOne />,
    completedOn: null,
  },
  {
    id: 2,
    question:
      "Create a custom react hook to fetch users from an API (https://randomuser.me/api) and display their picture and name on the page one . It must return the list of users, the current user, a function to fetch the next user and a function to move back to the previous user . Test the custom react hook in the index.tsx",
    dataSet: null,
    allotedSeconds: 3600,
    answer: <SolutionTwo />,
    completedOn: null,
  },
  {
    id: 3,
    question:
      "Write a function that get the data from https://jsonplaceholder.typicode.com/users . List the names alone . Add an input box to search and filter the list based on the typed text values",
    dataSet: null,
    allotedSeconds: 1800,
    answer: <SolutionThree />,
    completedOn: null,
  },
  {
    id: 4,
    question:
      "Develop a multiple choice questions app . One question at a time . At the end, score should be visible",
    allotedSeconds: 1800,
    dataSet: [
      { id: 1, ques: "quetion 1", options: ["q1 opt1", "q1 opt2", "q1 opt3"] },
      { id: 2, ques: "quetion 2", options: ["q2 opt1", "q2 opt2", "q2 opt3"] },
      { id: 3, ques: "quetion 3", options: ["q3 opt1", "q3 opt2", "q3 opt3"] },
      { id: 4, ques: "quetion 4", options: ["q4 opt1", "q4 opt2", "q4 opt3"] },
    ],
    answer: <SolutionFour />,
    completedOn: null,
  },
  {
    id: 5,
    question:
      "Build a comment section with infinite nesting and if a comment is deleted then all its child comments should also be deleted",
    allotedSeconds: 3600,
    dataSet: null,
    answer: <SolutionFive />,
    completedOn: null,
  },
  {
    id: 6,
    question:
      "Build a todo app like jira (drag and drop) . It has three sections, todo, inprogress, completed",
    allotedSeconds: 7200,
    dataSet: null,
    answer: <SolutionSix />,
    completedOn: null,
  },
  {
    id: 7,
    question:
      "Have two dropdowns, one is for contries and the other is for cities . After contries is selected, the second dropdown should list the contry's cities",
    allotedSeconds: 1800,
    dataSet: [
      { name: "India", code: "In", cities: ["mumbai", "chennai", "kolkata"] },
      { name: "Pakistan", code: "Pak", cities: ["karachi", "lahore"] },
      {
        name: "Bangladesh",
        code: "Ban",
        cities: ["dhaka", "khulna", "Sylhet"],
      },
    ],
    answer: <SolutionSeven />,
    completedOn: "Tue, 13 Feb 2024",
  },
  {
    id: 8,
    question:
      "Build and email web app, it should have inbox, favorites, deleted and read/unread",
    allotedSeconds: 9000,
    dataSet: null,
    answer: <SolutionEight />,
    completedOn: null,
  },
  {
    id: 9,
    question: "Build X and O game with a bot",
    allotedSeconds: 5400,
    dataSet: null,
    answer: <SolutionNine />,
    completedOn: null,
  },
];
