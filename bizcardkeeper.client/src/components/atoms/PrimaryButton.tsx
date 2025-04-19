import { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  label: string;
  testId?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
  const { label, testId = "", onClick, disabled = false } = props;

  return (
    <Button
      bg={"teal"}
      size="md"
      data-testid={testId}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}>
      {label}
    </Button>
  );
};
