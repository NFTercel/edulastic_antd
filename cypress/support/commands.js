import { userBuilder } from "./generate";
import LoginPage from "../e2e/framework/student/loginPage.js";

Cypress.LocalStorage.clear = () => {};
const BASE_URL = Cypress.config("API_URL");

Cypress.Commands.add("createUser", overrides => {
  const user = userBuilder(overrides);
  return cy
    .request({
      url: `${BASE_URL}/auth/signup`,
      method: "POST",
      body: user
    })
    .then(({ body }) => body.user);
});

Cypress.Commands.add("login", user =>
  cy
    .request({
      url: `${BASE_URL}/auth/login`,
      method: "POST",
      body: user
    })
    .then(({ body }) => {
      window.localStorage.setItem("access_token", body.token);
      return body.user;
    })
);

Cypress.Commands.add("assertHome", () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add("setToken", (role = "teacher") => {
  const postData =
    role == "teacher"
      ? {
          email: "auto.teacher1@snapwiz.com",
          password: "snapwiz"
        }
      : {
          email: "auto.student3@snapwiz.com",
          password: "snapwiz"
        };
  /* cy.request({
          url: `${BASE_URL}/auth/login`,
          method: 'POST',
          body: postData
        }).then(({ body }) => {
          console.log('Result = ', body.result);
          window.localStorage.setItem('access_token', body.result.token);
          return true;
        }); */

  cy.clearLocalStorage();
  const login = new LoginPage();
  cy.visit("/login");
  cy.server();
  cy.route("GET", "**curriculum**").as("apiLoad");
  cy.route("GET", "**assignments**").as("assignment");
  login.fillLoginForm(postData.email, postData.password);
  login.onClickSignin().then(() => {
    if (role == "teacher") {
      cy.wait("@apiLoad");
    } else {
      cy.wait("@assignment");
    }
  });
});

Cypress.Commands.add(
  "assignAssignment",
  (startDt = new Date(), dueDt = new Date(new Date().setDate(startDt.getDate() + 1))) => {
    const accessPostData = {
      email: "auto.teacher1@snapwiz.com",
      password: "snapwiz"
    };

    cy.request({
      url: `${BASE_URL}/auth/login`,
      method: "POST",
      body: accessPostData
    }).then(({ body }) => {
      console.log("Result = ", body.result);
      cy.fixture("assignments").then(asgns => {
        const postData = asgns["default"];
        postData["assignments"][0]["startDate"] = startDt.valueOf();
        postData["assignments"][0]["endDate"] = dueDt.valueOf();
        console.log("asdnDO - ", postData);
        cy.request({
          url: `${BASE_URL}/assignments`,
          method: "POST",
          body: postData,
          headers: {
            authorization: body.result.token,
            "Content-Type": "application/json"
          }
        }).then(({ body }) => {
          console.log("Assignment Assigned = ", body.result._id);
        });
      });
    });
  }
);

Cypress.Commands.add("deleteAllAssignments", () => {
  const teacherPostData = {
    email: "auto.teacher1@snapwiz.com",
    password: "snapwiz"
  };

  const studentPostData = {
    email: "auto.student3@snapwiz.com",
    password: "snapwiz"
  };

  let asgnIds = [];

  cy.request({
    url: `${BASE_URL}/auth/login`,
    method: "POST",
    body: studentPostData
  }).then(({ body }) => {
    cy.request({
      url: `${BASE_URL}/assignments`,
      method: "GET",
      headers: {
        authorization: body.result.token,
        "Content-Type": "application/json"
      }
    }).then(({ body }) => {
      body.result.forEach((asgnDO, i) => {
        asgnIds.push(asgnDO._id);
      });
      console.log("All Assignments = ", asgnIds);
    });
  });

  cy.request({
    url: `${BASE_URL}/auth/login`,
    method: "POST",
    body: teacherPostData
  }).then(({ body }) => {
    asgnIds.forEach(asgnId => {
      cy.request({
        url: `${BASE_URL}/assignments/${asgnId}`,
        method: "DELETE",
        headers: {
          authorization: body.result.token,
          "Content-Type": "application/json"
        }
      }).then(({ body }) => {
        console.log(`${asgnId} :: `, body.result);
      });
    });
  });
});

Cypress.Commands.add(
  "makeSelection",
  {
    prevSubject: "element"
  },
  subject => {
    cy.wrap(subject)
      .trigger("mousedown")
      .then($el => {
        const el = $el[0];
        const document = el.ownerDocument;
        const range = document.createRange();
        range.selectNodeContents(el);
        document.getSelection().removeAllRanges(range);
        document.getSelection().addRange(range);
      })
      .trigger("mouseup");

    cy.document().trigger("selectionchange");
  }
);

Cypress.Commands.add(
  "verifyNumInput",
  {
    prevSubject: "element"
  },
  (subject, step) => {
    const exp = `${step + 1}`;
    cy.wrap(subject)
      .type("{selectall}")
      .type(1)
      .should("have.value", "1")
      .type("{uparrow}")
      .should("have.value", exp)
      .type("{downarrow}")
      .should("have.value", "1");
  }
);

Cypress.Commands.add("logOut", () => {
  cy.clearLocalStorage();
  cy.visit("/").then(win => {
    win.localStorage.clear();
  });
});

Cypress.Commands.add("uploadImage", base64Image => {
  const teacherPostData = {
    email: "auto.teacher1@snapwiz.com",
    password: "snapwiz"
  };
  const formData = new FormData();
  formData.append("file", base64Image);
  cy.request({
    url: `${BASE_URL}/auth/login`,
    method: "POST",
    body: teacherPostData
  }).then(({ body }) => {
    return cy
      .server()
      .route("POST", `${BASE_URL}/file/upload`)
      .as("formRequest")
      .window()
      .then(win => {
        const xhr = new win.XMLHttpRequest();
        xhr.open("POST", `${BASE_URL}/file/upload`);
        xhr.setRequestHeader("authorization", body.result.token);
        xhr.send(formData);
      })
      .wait("@formRequest");
  });
});

class DndSimulatorDataTransfer {
  data = {};

  dropEffect = "move";

  effectAllowed = "all";

  files = [];

  items = [];

  types = [];

  clearData(format) {
    if (format) {
      delete this.data[format];

      const index = this.types.indexOf(format);
      delete this.types[index];
      delete this.data[index];
    } else {
      this.data = {};
    }
  }

  setData(format, data) {
    this.data[format] = data;
    this.items.push(data);
    this.types.push(format);
  }

  getData(format) {
    if (format in this.data) {
      return this.data[format];
    }

    return "";
  }

  setDragImage(img, xOffset, yOffset) {}
}

Cypress.Commands.add(
  "customDragDrop",
  {
    prevSubject: "element"
  },
  (sourceSelector, targetSelector, options) => {
    const dataTransfer = new DndSimulatorDataTransfer();
    const opts = {
      offsetX: 100,
      offsetY: 100,
      ...(options || {})
    };

    cy.wrap(sourceSelector.get(0))
      .trigger("dragstart", {
        dataTransfer
      })
      .trigger("drag", {});

    cy.get(targetSelector).then($el => {
      const { x, y } = $el.get(0).getBoundingClientRect();

      cy.wrap($el.get(0))
        .trigger("dragover", {
          dataTransfer
        })
        .trigger("drop", {
          dataTransfer,
          clientX: x + opts.offsetX,
          clientY: y + opts.offsetY
        })
        .trigger("dragend", {
          dataTransfer
        });
    });
  }
);
