import { responsiveSideBar } from "../responsivetogglemenu";

describe("Responsive Toggle Menu", () => {
  it("responsive sidebar should return an action", () => {
    expect(responsiveSideBar()).toMatchSnapshot();
  });
});
