/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

/**
 * If past == true, then this function returns all assignments whose dueDate is before today.
 * @param {List of Assignmets} assignments
 * @param {Boolean} past - a variable that determines if we want past assignments or upcoming assignments
 */
const grabAssignments = (assignments, past = true) => {
  if (assignments.length === 0) {
    return null;
  }
  // choose whether we want past assignments or upcoming assignments
  const filteredAssignments = assignments.filter(a => {
    const due = dayjs(a.dueDate);
    return past ? due.isBefore(dayjs()) : due.isAfter(dayjs());
  });

  // return assingments in desired format for antd table
  return filteredAssignments.map(a => {
    const { id, name, dueDate, language } = a;
    return { key: id, name, dueDate, language };
  });
};

const sortAssignments = (a, b, asc = true) => {
  const timeA = dayjs(a.dueDate);
  const timeB = dayjs(b.dueDate);
  if (timeA.isSame(timeB)) return 0;
  if (asc) {
    return timeA.isBefore(timeB) ? 1 : -1;
  }
  return timeA.isAfter(timeB) ? 1 : -1;
};

const splitAssignments = assignments => {
  if (assignments.length === 0) {
    return null;
  }

  // convert assignments in desired format for antd table
  const data = assignments.map(a => {
    const { id, name, dueDate, language } = a;
    return { key: id, name, dueDate, language };
  });
  const past = [];
  const future = [];
  data.sort((a, b) => sortAssignments(a, b, false));
  data.forEach((a, i) => {
    // eslint-disable-next-line no-param-reassign
    a = { ...a, uid: i };
    const dueDate = dayjs(a.dueDate);
    // this assignment is a past assignment
    if (dueDate.isBefore(dayjs())) {
      past.push(a);
    } else {
      future.push(a);
    }
  });
  return { upcomingAssignments: future, pastAssignments: past };
};

export { grabAssignments, splitAssignments };
