/* eslint-disable import/prefer-default-export */
export const assignmentForm = [
  {
    type: 'text',
    label: 'Assignment Name',
    name: 'name',
    placeholder: 'Assignment Name Here'
  },
  {
    type: 'editor',
    label: 'Assignment Description',
    placeholder: 'Assignment description here',
    name: 'description'
  },
  {
    type: 'select',
    label: 'Language',
    name: 'language',
    options: [
      { name: 'Python', value: 'python' },
      { name: 'Java', value: 'java' },
      { name: 'C', value: 'c' },
      { name: 'C++', value: 'c++' }
    ]
  },
  { type: 'date-time', label: 'Due Date', name: 'dueDate' },
  {
    type: 'file',
    label: 'Supporting File(s)',
    name: 'supportingFiles'
  },
  {
    type: 'number',
    label: 'Maximum Allowed Submissions',
    name: 'numAttempts',
    placeholder: 'Maximum allowed submissions',
    min: 0
  },
  {
    type: 'editor',
    label: 'Build Command',
    name: 'TestBuildCMD'
  }
];

// export const assignmentForm = [
//   {
//     type: 'text',
//     label: 'Assignment Name',
//     name: 'name',
//     placeholder: 'Assignment Name Here'
//   },
//   {
//     type: 'editor',
//     label: 'Assignment Description',
//     placeholder: 'Assignment description here',
//     name: 'description'
//   },
//   { type: 'select', label: 'Language', name: 'language' },
//   { type: 'date-time', label: 'Due Date', name: 'dueDate' },
//   {
//     type: 'number',
//     label: 'Maximum Allowed Submissions',
//     name: 'numAttempts',
//     placeholder: 'Maximum allowed submissions',
//     min: 0
//   },
//   {
//     type: 'file',
//     label: 'Supporting File(s)',
//     name: 'assignment-files'
//   },
//   {
//     type: 'editor',
//     label: 'Build Command',
//     name: 'TestBuildCMD'
//   },
//   {
//     type: 'header',
//     label: 'Test Cases'
//   },
//   {
//     type: 'text',
//     label: 'Test Command',
//     placeholder: 'Test command here',
//     name: 'assignment-test-1'
//   },
//   {
//     type: 'editor',
//     label: 'Expected Output',
//     placeholder: 'Expected test output here',
//     name: 'assignment-test-1-out'
//   },
//   {
//     type: 'checkbox',
//     label: 'Visible To Students?',
//     name: 'assignment-test-1-visible'
//   }
// ];
