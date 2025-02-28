import { render } from "@testing-library/react";
import { ThemeWrapper } from "./ThemeWrapper";

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: ThemeWrapper });
};
