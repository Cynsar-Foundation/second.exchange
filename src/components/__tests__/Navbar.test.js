import { Navbar } from "../layout/Navbar";
import { render, screen, cleanup } from "@testing-library/react";

test("Should render navbar component", () => {
  render(<Navbar />);
  const navbarElement = screen.getByTestId("NavbarContainer");
});
