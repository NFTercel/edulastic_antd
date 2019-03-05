import { desktopSideBar } from "../togglemenu";

describe("Toggle Menu", () => {
  it("desktop sidebar should return an action", () => {
    expect(desktopSideBar()).toMatchSnapshot();
  });
});
