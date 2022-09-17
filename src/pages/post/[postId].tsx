import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import AutoResizeTextarea from "../../components/Post/AutoGrowTextarea";
import CommentItem from "../../components/Post/CommentItem";
import { useNostrOpsService } from "../../service/nostrOps";
import { toDateTime } from "../../utils/index";
import { getUniquePosts } from "../../utils/index";

const PostPage: React.FC = () => {
  const opsService = useNostrOpsService();
  const toast = useToast();
  const router = useRouter();
  const pool = useAtomValue(relayPoolAtom);
  const postId = router.query.postId;
  const [postContent, setPostContent] = useState<PostStructure | undefined>(
    undefined
  );
  let fetchedPost: any
  let fetchedComments: any
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<NostrEvent[]>([]);

  const handleCommentPost = async () => {
    if (commentText.length === 0) return;

    try {
      await opsService.publishComment(commentText, [["e", postId]], pool);
      toast({
        title: "Comment Posted!",
        duration: 2000,
        isClosable: true,
        status: "success",
      });
    } catch (error) {
      console.log("handleCommentPost: ", error);
      toast({
        title: "Error posting comment",
        duration: 2000,
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    const _fetched = async () => {
      fetchedPost = await opsService._fetchedPost();
    }
    _fetched()
    const fetchPost = async () => {
      if (pool) {
        await opsService.getPostById(pool, String(postId));
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

  useEffect(() => {
    setCommentList(fetchedComments);
  }, [fetchedComments]);

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        await opsService.getPostComments(pool, String(postId));
      }
    };
    fetchComments();
  }, [postId]);

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
            width="700px"
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
                Comments:
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <AutoResizeTextarea
                flexGrow={1}
                placeholder="Leave a comment"
                onChange={(event) => setCommentText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleCommentPost();
                }}
              />
              <Button mt="15px" width="150px" onClick={handleCommentPost}>
                Post Comment
              </Button>
              {commentList && (
                <Flex direction="column" rowGap="20px" mt="30px">
                  {getUniquePosts(commentList, false).map((comment) => (
                    <CommentItem comment={comment} key={comment.id} />
                  ))}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default PostPage;
