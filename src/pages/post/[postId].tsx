import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import { useNostrOps } from "../../service/nostrOps";
import { toDateTime } from "../../utils/index";

const PostPage: React.FC = () => {
  const { getPostById, fetchedPost } = useNostrOps();
  const router = useRouter();
  const pool = useAtomValue(relayPoolAtom);
  const postId = router.query.postId;
  const [postContent, setPostContent] = useState<PostStructure | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchPost = async () => {
      if (pool) {
        await getPostById(pool, String(postId));
      }
    };
    if (!fetchedPost) setTimeout(() => fetchPost(), 2000);
    if (fetchedPost)
      setPostContent({
        title: JSON.parse(fetchedPost?.content).title as string,
        createdAt: toDateTime(fetchedPost.created_at),
        content: JSON.parse(fetchedPost?.content).content as string,
        authorId: fetchedPost.pubkey,
      });
  }, [pool, postId, fetchedPost]);

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      {!postContent && (
        <Flex position="absolute" top="45%" left="47%">
          <Spinner size="xl" />
        </Flex>
      )}
      {postContent && postContent !== null && (
        <Flex width="100%" alignItems="center" justifyContent="center">
          <Flex
            flexDirection="column"
            justifyContent="center"
            mt="30px"
            maxWidth="700px"
            rowGap="10px"
          >
            <Flex alignItems="center" columnGap="15px">
              <Tooltip label={postContent.authorId}>
                <Avatar
                  cursor="pointer"
                  onClick={() => router.push(`/user/${postContent.authorId}`)}
                />
              </Tooltip>
              <Flex flexDirection="column">
                <Heading>{postContent.title}</Heading>
                <Text color="gray.600" mt="5px">
                  {moment(postContent.createdAt).format("Do MMM YYYY")}
                </Text>
              </Flex>
            </Flex>
            <Divider borderColor="#898989" />
            <div
              dangerouslySetInnerHTML={{ __html: postContent.content }}
              className="renderer"
            />
            <Flex mt="20px" justifyContent="flex-start">
              <Text fontSize="25px" fontWeight="bold">
                Comments
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default PostPage;
