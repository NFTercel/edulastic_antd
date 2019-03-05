describe('Test Graphing - 1st quadrant', () => {
  before(() => {
    cy.setToken();
  });

  it('Visit Item List Page', () => {
    cy.visit('/author/items');
  });

  it('Check Flow', () => {
    cy.get('button')
      .contains('Create')
      .should('be.visible');
    cy.contains('Create').click();
    cy.contains('Add New').click();

    cy.get('li').should('contain', 'Multiple Choice');
    cy.get('li').should('contain', 'Fill in the Blanks');
    cy.get('li').should('contain', 'Classify, Match & Order');
    cy.get('li').should('contain', 'Written & Spoken');
    cy.get('li').should('contain', 'Highlight');
    cy.get('li').should('contain', 'Math');
    cy.get('li').should('contain', 'Graphing');
    cy.get('li').should('contain', 'Charts');
    cy.get('li').should('contain', 'Chemistry');
    cy.get('li').should('contain', 'Other');
  });

  it('Graphing - graphing Test', () => {
    cy.get('li')
      .contains('Graphing')
      .click();

    cy.get('div')
      .contains('Graphing in the 1st quadrant')
      .parent()
      .prev()
      .click();

    cy.get('div')
      .find('[contenteditable]')
      .eq(0)
      .focus()
      .clear()
      .type('Draw a point');

    cy.get('input[name="x_min"]')
      .clear()
      .type(-5);

    cy.get('input[name="x_max"]')
      .clear()
      .type(15);

    cy.get('input[name="y_min"]')
      .clear()
      .type(-5);

    cy.get('input[name="y_max"]')
      .clear()
      .type(15);

    // Tools container

    cy.get('div')
      .contains('Tools')
      .parent()
      .within(() => {
        cy.get('select')
          .eq(0)
          .as('CurrentTool');

        cy.get('select')
          .eq(1)
          .parent()
          .next()
          .click();
      });

    cy.contains('button', 'ADD NEW GROUP')
      .as('AddNewGroupBtn')
      .click();

    cy.get('@AddNewGroupBtn')
      .click();

    cy.contains('div', 'Group 1')
      .find('button', 'ADD TOOL')
      .click();

    cy.contains('span', 'Group 2')
      .find('svg')
      .click();

    cy.get('input[type="number"][min=0]')
      .clear()
      .type(2);

    cy.contains('select', 'No')
      .select('Compare by points');
  });

  const svgWidth = 600;
  const svgHeight = 600;

  function CreateEvent(eventName, pos, offset) {
    const ev = new Event(eventName);
    ev.clientX = pos[0] * svgWidth + offset[0];
    ev.clientY = pos[1] * svgHeight + offset[1];

    return ev;
  }

  function CreatePointerDown(xPer, yPer, offsetX, offsetY) {
    return CreateEvent('pointerdown', [xPer, yPer], [offsetX, offsetY]);
  }

  function CreatePointerUp(xPer, yPer, offsetX, offsetY) {
    return CreateEvent('pointerup', [xPer, yPer], [offsetX, offsetY]);
  }


  // xK - percentage of graph width
  // yK - percentage of graph height
  function InvokeBoardTrigger(xK, yK) {
    cy.get('@Board')
      .then((board) => {
        cy.window()
          .then((window) => {
            console.log(board);

            const boardRect = board[0].getBoundingClientRect();

            const left = boardRect.left + window.pageXOffset;
            const { top } = boardRect;
            const downEvent = CreatePointerDown(xK, yK, left, top);
            const upEvent = CreatePointerUp(xK, yK, left, top);

            let result = true;
            console.log(downEvent);
            console.log(upEvent);
            try {
              board[0].dispatchEvent(downEvent);
              window.document.dispatchEvent(upEvent);
            } catch (e) {
              result = false;
            }

            assert.isTrue(result, 'invoke board trigger');
          });
      });
  }

  // Needed variables - CurrentTool, Board, ClearBtn
  function TestDraw(tool, points, selector, save = false) {
    cy.get('@CurrentTool')
      .select(tool);

    for (let i = 0; i < points.length; i++) {
      InvokeBoardTrigger(points[i][0], points[i][1]);
    }

    cy.get('@Board')
      .find(selector)
      .should('exist');

    if (!save) {
      cy.get('@ClearBtn').click();

      cy.get('@Board')
        .find(selector)
        .should('not.exist');
    }
  }

  it('Set Advance Options', () => {
    // Layout settings
    cy.get('input[name="layout_width"]')
      .clear()
      .type('600');

    cy.get('input[name="layout_height"]')
      .clear()
      .type('600');

    cy.get('input[name="layout_margin"]')
      .clear()
      .type('100');

    cy.get('input[name="layout_margin"]')
      .clear()
      .type('100');

    cy.get('input[name="layout_snapto"]')
      .clear()
      .type('grid');

    // Draw label zero
    cy.contains('Draw label zero')
      .click();

    // Display position on hover checkbox
    cy.contains('Display position on hover')
      .click();

    cy.get('[data-cy="numerical"]')
      .parent()
      .select('uppercase_alphabet');

    cy.get('[data-cy="small"]')
      .parent()
      .select('large');

    // Grid
    cy.contains('Axis X')
      .parent()
      .parent()
      .within(() => {
        cy.get('input[name="xDistance"]')
          .clear()
          .type('2');

        cy.get('input[name="xTickDistance"]')
          .clear()
          .type('2');

        cy.contains('Show axis label')
          .click();

        cy.get('input[name="xAxisLabel"]')
          .should('be.visible')
          .clear()
          .type('abscissa');

        cy.contains('Hide ticks')
          .click();

        cy.contains('Draw labels')
          .click();

        cy.contains('Min arrow')
          .click();

        cy.contains('Max arrow')
          .click();

        cy.contains('Comma in label')
          .click();
      });

    cy.contains('Axis Y')
      .parent()
      .parent()
      .within(() => {
        cy.get('input[name="yDistance"]')
          .clear()
          .type('2');

        cy.get('input[name="yTickDistance"]')
          .clear()
          .type('2');

        cy.contains('Show axis label')
          .click();

        cy.get('input[name="yAxisLabel"]')
          .should('be.visible')
          .clear()
          .type('ordinate');

        cy.contains('Hide ticks')
          .click();

        cy.contains('Draw labels')
          .click();

        cy.contains('Min arrow')
          .click();

        cy.contains('Max arrow')
          .click();

        cy.contains('Comma in label')
          .click();
      });


    // Background image
    cy.get('input[name="src"]')
      .type('https://www.cypress.io/img/logo-dark.36f3e062.png');

    cy.get('input[name="height"]')
      .clear()
      .type('30');

    cy.get('input[name="width"]')
      .clear()
      .type('90');

    cy.contains('X axis image position')
      .siblings('input')
      .clear()
      .type('5');

    cy.contains('Y axis image position')
      .siblings('input')
      .clear()
      .type('5');

    cy.get('input[name="opacity"]')
      .clear()
      .type('5');

    cy.contains('Show background shape points')
      .click();

    cy.contains('Background shapes')
      .siblings()
      .find('svg image')
      .should('exist');

    // Controls
    cy.contains('Controls')
      .parent()
      .should('be.visible')
      .within(() => {
        cy.contains('ADD TOOL')
          .click();

        cy.get('[data-cy="selectStyle"]')
          .last()
          .select('Reset');
      });
  });

  it('Set Correct Answer', () => {
    cy.get('select[data-cy="selectStyle"]')
      .eq(0)
      .as('CurrentTool');

    cy.get('svg[width="600"]')
      .parent()
      .as('Board');

    // Clear button
    cy.contains('Reset')
      .as('ClearBtn');

    TestDraw('Point', [[0.6, 0.6]], 'ellipse[fill="#00b2ff"]');
    TestDraw('Line', [[0.6, 0.6], [0.3, 0.3]], 'line[stroke="#00b2ff"]');
    TestDraw('Ray', [[0.6, 0.6], [0.3, 0.3]], 'line[stroke="#00b2ff"]');
    TestDraw('Segment', [[0.6, 0.6], [0.3, 0.3]], 'line[stroke="#00b2ff"]');
    TestDraw('Vector', [[0.6, 0.6], [0.3, 0.3]], 'line[stroke="#00b2ff"]');
    TestDraw('Circle', [[0.6, 0.6], [0.3, 0.3]], 'ellipse[stroke="#00b2ff"]');
    TestDraw('Parabola', [[0.6, 0.6], [0.7, 0.7]], 'path[stroke="#00b2ff"]');
    TestDraw('Sine', [[0.6, 0.6], [0.7, 0.7]], 'path[stroke="#00b2ff"]');
    TestDraw('Polygon',
      [[0.6, 0.6], [0.8, 0.6], [0.8, 0.4], [0.6, 0.4], [0.6, 0.6]],
      'line[stroke="#00b2ff"]');

    /* Correct answer */
    TestDraw('Point', [[0.6, 0.6]], 'ellipse[fill="#00b2ff"]', true);
  });

  it('Visit Preview Page', () => {
    cy.server();
    cy.route('PUT', '**/testitem/**').as('saveItem');
    cy.route('GET', '**/testitem/**').as('reload');

    cy.contains('div', 'SAVE')
      .should('be.visible')
      .click();

    cy.wait('@saveItem');
    cy.wait('@reload');

    cy.contains('PREVIEW').should('be.visible');
    cy.contains('PREVIEW').click();
  });

  it('Check Answers', () => {
    // Set board variable for InvokeBoardTrigger function
    cy.get('[data-cy="axis-quadrants-container"] svg')
      .last()
      .parent()
      .as('Board');

    // Clear button
    cy.contains('Clear')
      .as('ClearBtn');

    cy.contains('Show Answers')
      .click();

    // Yellow point (correct answer)
    cy.get('@Board')
      .find('ellipse[fill="#ffcb00"]')
      .should('exist');

    cy.get('@ClearBtn')
      .click();

    /* Draw red point */
    InvokeBoardTrigger(0.6, 0.7);

    cy.get('button')
      .contains('Check Answer')
      .as('CheckAnswer')
      .click();

    // Red point
    cy.get('@Board')
      .find('ellipse[fill="#ee1658"]')
      .should('exist');

    cy.get('@ClearBtn')
      .click();

    /* Draw correct answer */
    InvokeBoardTrigger(0.5, 0.5);

    cy.get('@CheckAnswer')
      .click();

    cy.get('@Board')
      .find('ellipse[fill="#1fe3a1"]')
      .should('exist');
  });
});
