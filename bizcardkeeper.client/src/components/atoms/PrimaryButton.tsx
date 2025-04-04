import { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  label: string;
  testId?: string;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
  const { label, testId = "", onClick } = props;

  return (
    <Button
      bg={"teal"}
      size="md"
      data-testid={testId}
      onClick={onClick}>
      {label}
    </Button>
  );
};
