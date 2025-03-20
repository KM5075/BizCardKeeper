import { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  label: string;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
  const { label, onClick } = props;

  return (
    <Button
      bg={"teal"}
      size="md"
      onClick={onClick}>
      {label}
    </Button>
  );
};
