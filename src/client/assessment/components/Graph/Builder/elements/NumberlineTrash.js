const removeObject = (board, elementsUnderMouse, setAnswers) => {
  const elementToDelete = elementsUnderMouse.find(
    element => element.elType === "segment" || element.elType === "point"
  );

  if (elementToDelete && elementToDelete.answer) {
    return;
  }

  if (elementToDelete && elementToDelete.elType === "segment") {
    elementToDelete.inherits.forEach(point => board.$board.removeObject(point));
    board.$board.removeObject(elementToDelete);
    board.elements = board.elements.filter(element => element.id !== elementToDelete.id);
    setAnswers();
  } else {
    // Check if it's separate point or not
    if (elementToDelete) {
      if (!board.elements.find(element => element.id === elementToDelete.id)) {
        let parentSegment;

        board.elements
          .filter(element => element.elType === "segment")
          .forEach(segment => {
            if (segment.inherits.some(point => point.id === elementToDelete.id)) {
              parentSegment = segment;
            }
          });

        parentSegment.inherits.forEach(point => board.$board.removeObject(point));
        board.$board.removeObject(parentSegment);
        board.elements = board.elements.filter(element => element.id !== parentSegment.id);
        setAnswers();
      } else {
        board.$board.removeObject(elementToDelete);
        board.elements = board.elements.filter(element => element.id !== elementToDelete.id);
        setAnswers();
      }
    }
  }
};

const cleanBoard = (board, setAnswers) => {
  const segments = board.elements.filter(element => element.elType === "segment" || element.elType === "point");

  segments.forEach(segmentToDelete => {
    if (segmentToDelete.elType === "segment") {
      segmentToDelete.inherits.forEach(point => board.$board.removeObject(point));
      board.$board.removeObject(segmentToDelete);
      board.elements = board.elements.filter(element => element.id !== segmentToDelete.id);
      setAnswers();
    } else {
      // Check if it's separate point or not
      if (segmentToDelete) {
        if (!board.elements.find(element => element.id === segmentToDelete.id)) {
          let parentSegment;

          board.elements
            .filter(element => element.elType === "segment")
            .forEach(segment => {
              if (segment.inherits.some(point => point.id === segmentToDelete.id)) {
                parentSegment = segment;
              }
            });

          parentSegment.inherits.forEach(point => board.$board.removeObject(point));
          board.$board.removeObject(parentSegment);
          board.elements = board.elements.filter(element => element.id !== parentSegment.id);
          setAnswers();
        } else {
          board.$board.removeObject(segmentToDelete);
          board.elements = board.elements.filter(element => element.id !== segmentToDelete.id);
          setAnswers();
        }
      }
    }
  });
};

export default {
  removeObject,
  cleanBoard
};
