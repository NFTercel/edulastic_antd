import { groupBy as _groupBy, uniq } from "lodash";

export const getListOfStudents = (students, classes) => {
  let idList = [];

  let selected = students
    .filter(student => classes.includes(student.groupId))
    .filter(({ _id }) => {
      if (idList.includes(_id)) return false;
      else {
        idList.push(_id);
        return true;
      }
    });
  return selected;
};

export const generateClassData = (classes = [], selectedStudents = [], studentList = [], specificStudents) => {
  if (!specificStudents) {
    return classes.map(_id => ({
      _id
    }));
  }

  selectedStudents = studentList.filter(({ _id }) => selectedStudents.includes(_id));

  let groupedByClass = _groupBy(selectedStudents, "groupId");

  return (
    classes
      .map(classId => {
        let tempStudents = (groupedByClass[classId] || []).map(item => item._id);
        return {
          _id: classId,
          students: uniq(tempStudents)
        };
      })
      // remove classes without students
      .filter(item => item.students && item.students.length)
  );
};

export const formatAssignment = assignment => {
  let students = [];
  let classes = (assignment.class || []).map(item => {
    if (assignment.specificStudents) {
      students = [...students, ...item.students];
    }
    return item._id;
  });

  return {
    ...assignment,
    class: classes,
    students: uniq(students)
  };
};
