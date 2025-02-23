import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router";


export const BizCard = () => {
    const params = useParams();

    return (
        <div>
            <Heading as={"h1"}>BizCard</Heading>
            <Text>Business Card</Text>
            <text>{params.id}</text>
        </div>
    );
}

