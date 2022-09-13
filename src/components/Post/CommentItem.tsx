import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type CommentItemProps = {
  comment: NostrEvent;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const router = useRouter();

  return (
    <Flex direction="column">
      <Flex columnGap="5px" alignItems="center">
        <Avatar size="sm" />
        <Text
          color="gray.500"
          cursor="pointer"
          maxW={{ base: "250px", md: "500px" }}
          onClick={() => router.push(`/user/${comment.pubkey}`)}
        >
          {comment.pubkey}
        </Text>
      </Flex>
      <Flex mt="5px" ml="38px">
        {JSON.parse(comment.content)}
      </Flex>
      <Divider mt="10px" />
    </Flex>
  );
};

export default CommentItem;
