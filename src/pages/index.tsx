import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import MainLayout from "../components/Layouts/MainLayout";
import PostItem from "../components/Post/PostItem";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="10px"
      >
        <PostItem
          date={new Date()}
          authorId="testId"
          postId="postId"
          title="test"
          body="Veniam eu id veniam magna eiusmod ex labore. Cillum aliquip est officia id culpa esse do voluptate ad eu anim commodo do. Irure duis deserunt velit adipisicing laborum culpa consequat qui ea consectetur consequat. Fugiat sunt culpa mollit ut excepteur labore sint. Exercitation cupidatat et occaecat minim proident commodo enim. Ullamco nisi non aliqua pariatur Lorem veniam consequat consequat exercitation."
        />
      </Flex>
    </MainLayout>
  );
};

export default Home;
