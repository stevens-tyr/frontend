/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

const sortAssignments = (a, b, asc = true) => {
  const timeA = dayjs(a.dueDate);
  const timeB = dayjs(b.dueDate);
  if (timeA.isSame(timeB)) return 0;
  return timeA[asc ? 'isBefore' : 'isAfter'](timeB) ? 1 : -1;
};

const splitAssignments = assignments => {
  if (assignments.length === 0) {
    return null;
  }

  const pastAssignments = [];
  const upcomingAssignments = [];
  assignments.sort((a, b) => sortAssignments(a, b, false));
  assignments.forEach(a => {
    const dueDate = dayjs(a.dueDate);
    // this assignment is a past assignment
    if (dueDate.isBefore(dayjs())) {
      pastAssignments.push(a);
    } else {
      upcomingAssignments.push(a);
    }
  });
  return { upcomingAssignments, pastAssignments };
};

export { splitAssignments };
