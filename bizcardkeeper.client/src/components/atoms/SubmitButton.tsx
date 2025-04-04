import { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  children?: React.ReactNode;
};

export const SubmitButton: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Button
      type="submit"
      bg={"teal"}
      size="md"
      data-testid="submit-button">
      {children}
    </Button>
  );
};
