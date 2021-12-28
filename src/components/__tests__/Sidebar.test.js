import { render, screen, cleanup } from "@testing-library/react";

import Sidebar from "../layout/Sidebar";

test("Should render sidebar component", () => {
  render(<Sidebar />);
  const sidebarElement = screen.getByTestId("sidebar");
  cleanup();
});
