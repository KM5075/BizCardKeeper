import { Box, Heading, Input, Text } from "@chakra-ui/react";

export const AddBizCard = () => {
  return (
    <Box
      bg={"white"}
      p={4}
      borderRadius="md"
      boxShadow="md">
      <Heading
        size="3xl"
        mb={4}>
        New BizCard
      </Heading>
      <Box>
        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          お名前 *
        </Text>

        <Input mb={4} />

        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          自己紹介 *
        </Text>
        <Input mb={4} />

        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          好きな技術 *
        </Text>
        <Input mb={4} />

        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          Github ID
        </Text>
        <Input mb={4} />

        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          Qiita ID
        </Text>
        <Input mb={4} />

        <Text
          fontSize="lg"
          textAlign={"left"}
          mb={2}>
          Twitter ID
        </Text>
        <Input mb={4} />
      </Box>
    </Box>
  );
};
