import { Button } from "@chakra-ui/react/button";
import { FC } from "react";

type Props = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
};

export const PrimaryButton: FC<Props> = (props) => {

    const { label, onClick, disabled = false, isLoading = false } = props;


    return (
        <Button
            bg={"teal"}
            size="md"
            onClick={onClick}
        // disabled={disabled}
        // loading={isLoading}
        >
            {label}
        </Button>
    );
}