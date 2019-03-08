import { alignmentStandardsFromMongoToUI, alignmentStandardsFromUIToMongo } from "../helpers";

const alignmentDomainsMongo = [
  {
    name: "Standards for Mathematical Practice",
    id: "849b029540b7e57af772afa1",
    standards: [
      {
        id: "5b9539d384f1ccc6312ed8bc",
        name: "MP.1",
        grades: ["K", "1"],
        description: "Make sense of problems and persevere in solving them.",
        level: "ELO"
      },
      {
        id: "b85f994519dbdd503df6ceed",
        name: "MP.2",
        grades: ["1", "2", "3"],
        description: "Reason abstractly and quantitatively.",
        level: "ELO"
      }
    ]
  },
  {
    name: "Standards 22",
    id: "849b029540b7e57af772af22",
    standards: [
      {
        id: "b85f994519dbdd503df6ce22",
        name: "BB.22",
        grades: ["1", "2", "3"],
        description: "Something Else",
        level: "ELO"
      }
    ]
  }
];

const alignmentRowStandardsUI = [
  {
    description: "Make sense of problems and persevere in solving them.",
    grades: ["K", "1"],
    identifier: "MP.1",
    level: "ELO",
    tloDescription: "Standards for Mathematical Practice",
    tloId: "849b029540b7e57af772afa1",
    _id: "5b9539d384f1ccc6312ed8bc"
  },
  {
    description: "Reason abstractly and quantitatively.",
    grades: ["1", "2", "3"],
    identifier: "MP.2",
    level: "ELO",
    tloDescription: "Standards for Mathematical Practice",
    tloId: "849b029540b7e57af772afa1",
    _id: "b85f994519dbdd503df6ceed"
  },
  {
    description: "Something Else",
    grades: ["1", "2", "3"],
    identifier: "BB.22",
    level: "ELO",
    tloDescription: "Standards 22",
    tloId: "849b029540b7e57af772af22",
    _id: "b85f994519dbdd503df6ce22"
  }
];

describe("Alignment Standards helpers", () => {
  it("prepares alignmentStandardsFromMongoToUI correctly", () => {
    const res = alignmentStandardsFromMongoToUI(alignmentDomainsMongo);
    expect(res).toEqual(alignmentRowStandardsUI);
  });

  it("prepares alignmentStandardsFromUIToMongo correctly", () => {
    const res = alignmentStandardsFromUIToMongo(alignmentRowStandardsUI);
    expect(res).toEqual(alignmentDomainsMongo);
  });
});
