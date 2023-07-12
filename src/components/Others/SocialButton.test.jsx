import { render, fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import SocialButtons from "./SocialButtons";

jest.mock("next-auth/react");
jest.mock("react-hot-toast");

describe("SocialButtons", () => {
  test("renders all buttons correctly", () => {
    const { getByText } = render(<SocialButtons />);

    getByText("Continue with Facebook");
    getByText("Continue with Google");
    getByText("Continue with Apple");
    getByText("Continue with email");
  });

  test("handles sign in correctly", () => {
    const { getByText } = render(<SocialButtons />);

    fireEvent.click(getByText("Continue with Facebook"));
    expect(toast.error).toHaveBeenCalledWith(
      "For the simplicity of the app, it only works by logging in via google."
    );

    fireEvent.click(getByText("Continue with Google"));
    expect(signIn).toHaveBeenCalledWith("google");

    fireEvent.click(getByText("Continue with Apple"));
    expect(toast.error).toHaveBeenCalledWith(
      "For the simplicity of the app, it only works by logging in via google."
    );

    fireEvent.click(getByText("Continue with email"));
    expect(toast.error).toHaveBeenCalledWith(
      "For the simplicity of the app, it only works by logging in via google."
    );
  });
});
