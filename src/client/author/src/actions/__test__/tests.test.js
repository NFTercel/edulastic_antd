import {
  receiveTestsAction,
  receiveTestByIdAction,
  createTestAction,
  updateTestAction,
  setTestDataAction,
  setDefaultTestDataAction
} from "../tests";

describe("tests", () => {
  it("receive tests should return an action", () => {
    expect(receiveTestsAction(1, 5)).toMatchSnapshot();
    expect(receiveTestsAction(2, 5)).toMatchSnapshot();
    expect(receiveTestsAction(2, 10)).toMatchSnapshot();
  });

  it("receive test by id should return an action", () => {
    expect(receiveTestByIdAction("5bf2a3e0da9400105cac6cf6")).toMatchSnapshot();
    expect(receiveTestByIdAction("5bf2a3e0da9400105cac6cf7")).toMatchSnapshot();
    expect(receiveTestByIdAction("5bf2a3e0da9400105cac6cf8")).toMatchSnapshot();
  });

  it("create test should return an action", () => {
    expect(
      createTestAction({
        title: "New Test",
        description: "",
        renderingType: "assessment",
        status: "draft",
        thumbnail: "https://fakeimg.pl/500x135/",
        createdBy: {},
        tags: [],
        scoring: {
          total: 0,
          testItems: [
            {
              points: 0
            },
            {
              points: 0
            }
          ]
        },
        testItems: ["5bf28847dc39e409216aea00", "5bf28d4edc39e409216aea04"],
        assignments: [],
        standardsTag: {
          curriculum: "",
          standards: []
        },
        grades: [],
        subjects: [],
        courses: [],
        collections: "",
        analytics: {
          usage: "0",
          likes: "0"
        }
      })
    ).toMatchSnapshot();

    expect(
      createTestAction({
        title: "New Test2",
        description: "Unit test items",
        renderingType: "assessment",
        status: "draft",
        thumbnail: "https://fakeimg.pl/500x135/",
        createdBy: {},
        tags: [],
        scoring: {
          total: 0,
          testItems: [
            {
              points: 0
            },
            {
              points: 0
            }
          ]
        },
        testItems: ["5bf28847dc39e409216aea02", "5bf28d4edc39e409216aea06"],
        assignments: [],
        standardsTag: {
          curriculum: "",
          standards: []
        },
        grades: [],
        subjects: ["Math"],
        courses: ["1"],
        collections: "",
        analytics: {
          usage: "10",
          likes: "20"
        }
      })
    ).toMatchSnapshot();
  });

  it("update test should return an action", () => {
    expect(
      updateTestAction(
        ("5bf2a3e0da9400105cac6cf6",
        {
          title: "New Test",
          description: "",
          renderingType: "assessment",
          status: "draft",
          thumbnail: "https://fakeimg.pl/500x135/",
          createdBy: {},
          tags: [],
          scoring: {
            total: 0,
            testItems: [
              {
                points: 0
              },
              {
                points: 0
              }
            ]
          },
          testItems: ["5bf28847dc39e409216aea00", "5bf28d4edc39e409216aea04"],
          assignments: [],
          standardsTag: {
            curriculum: "",
            standards: []
          },
          grades: [],
          subjects: [],
          courses: [],
          collections: "",
          analytics: {
            usage: "0",
            likes: "0"
          }
        })
      )
    ).toMatchSnapshot();

    expect(
      updateTestAction(
        ("5bf2a3e0da9400105cac6cf6",
        {
          title: "New Test2",
          description: "Unit test items",
          renderingType: "assessment",
          status: "draft",
          thumbnail: "https://fakeimg.pl/500x135/",
          createdBy: {},
          tags: [],
          scoring: {
            total: 0,
            testItems: [
              {
                points: 0
              },
              {
                points: 0
              }
            ]
          },
          testItems: ["5bf28847dc39e409216aea02", "5bf28d4edc39e409216aea06"],
          assignments: [],
          standardsTag: {
            curriculum: "",
            standards: []
          },
          grades: [],
          subjects: ["Math"],
          courses: ["1"],
          collections: "",
          analytics: {
            usage: "10",
            likes: "20"
          }
        })
      )
    ).toMatchSnapshot();
  });

  it("set test data should return an action", () => {
    expect(
      setTestDataAction({
        sharing: [
          {
            email: "andrey@snapwiz.com",
            permission: "rxw"
          }
        ],
        createBy: {
          firstName: "andrey",
          lastName: "vasilev",
          email: "andrey@snapwiz.com"
        }
      })
    ).toMatchSnapshot();
  });

  it("set default test data should return an action", () => {
    expect(setDefaultTestDataAction()).toMatchSnapshot();
  });
});
