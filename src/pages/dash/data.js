const courses = [
  {
    department: 'CS',
    number: 115,
    section: 'A',
    color: 'red',
    name: 'Introduction to Computer Science'
  },
  {
    department: 'CS',
    number: 284,
    section: 'A',
    color: 'green',
    name: 'Data Structures'
  },
  {
    department: 'CS',
    number: 385,
    section: 'A',
    color: 'blue',
    name: 'Algorithms'
  }
];

const assignments = [
  {
    course: 'CS115 A',
    name: 'Loops',
    description:
      "This week, we're going to have some practice with Loops. Below are a few problems for you to solve. This assignment is due on December 11th, 2018",
    supportingFiles: 'loops.pdf',
    dueDate: '2018-12-11 00:00'
  },
  {
    course: 'CS115 A',
    name: 'Recursion',
    description:
      'Last week, we looked at loops, but this week we want to take a look at recursion. Recursion is another form of iteration that helps programmers to break problem into small subproblems. Attached to this assignment are problems that you guys will implement. This is due on December 20th, 2018.',
    supportingFiles: 'recursion.pdf',
    dueDate: '2018-20-11 00:00'
  },
  {
    course: 'CS284 A',
    name: 'Linked Lists',
    description:
      'Linked Lists are a new data structure that we have introduced about this week. Attached to this page are questions to solve that should help to solidify your knowledge of linked lists.',
    supportingFiles: 'linked_lists.pdf',
    dueDate: '2018-12-11 00:00'
  },
  {
    course: 'CS284 A',
    name: 'Hash Maps',
    description:
      "Hash Maps are probably one of the most important data structures to know, so this week, we've prepared problems that you guys will have to implement that ensures that you will thoroughly understand how to use and implement hashmaps",
    supportingFiles: 'hashmaps.pdf',
    dueDate: '2018-12-20 00:00'
  },
  {
    course: 'CS385 A',
    name: 'Stair Climber',
    description:
      'This week, we\'re going to implement what we\'ve learned in CS101 with recursion to solve a problem. The basic stair climber problem asks the following: "If you can take one or two steps at a time, how many distinct ways are there to climb N stairs?" This problem and its extension problems are in the attached pdf.',
    supportingFiles: 'stair_climber.pdf',
    dueDate: '2018-12-11 00:00'
  },
  {
    course: 'CS385 A',
    name: 'Knapsack Problem',
    description:
      'The knapsack problem is a common interviewing question. The knapsack problem is as follows: "You are passed an array of items with a weight and value. You have a knapsack that can only carry a limited amount of weight. Find the combination of items that maximizes the value that you can put into the knapsack."',
    supportingFiles: 'knapsack.pdf',
    dueDate: '2018-12-20 00:00'
  }
];

export { courses, assignments };
