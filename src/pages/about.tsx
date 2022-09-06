import { Button, 
        Flex, 
        Spinner, 
        Text,
        Box , 
        Container, 
        Stack , 
        Heading, Image, IconButton , SimpleGrid,
        StackDivider, 
        createIcon, Icon, IconProps, useColorModeValue , Divider} 
from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';

import { homeFeed } from "../atoms/homeFeedAtom";
import PostItem from "../components/Post/PostItem";
import { getUniquePosts, toDateTime } from "../utils";
import Head from "next/head";

import { ReactElement } from "react";

const About: NextPage = () => {
  const postList = useAtomValue(homeFeed);
  const [showPosts, setShowPosts] = useState(false);
  const [loadTime, setLoadTime] = useState(1500);
  const [posts, setPosts] = useState<any>();

  const increaseLoadTime = () => {
    setShowPosts(false);
    setLoadTime(loadTime + 1000);
  };

  useEffect(() => {
    setTimeout(() => setShowPosts(true), loadTime);
  }, [loadTime]);

  useEffect(() => {
    setPosts(postList);
  }, [postList]);
  // Maybe they can go in config
  const colorOne = useColorModeValue('red.50', 'red.400')
  const colorTwo = useColorModeValue('blue.50', 'blue.900')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const iconBgOne =  useColorModeValue('yellow.100', 'yellow.900')
  const icongBgTwo = useColorModeValue('green.100', 'green.900')
  const icongBgThree = useColorModeValue('purple.100', 'purple.900')
  const bgOne = useColorModeValue('blue.50', 'blue.900')
  const borderOne = useColorModeValue('gray.100', 'gray.700')
  const iconBgFour = useColorModeValue('yellow.100', 'yellow.900')
  const iconBgFive = useColorModeValue('green.100', 'green.900')
  const iconBgSix = useColorModeValue('purple.100', 'purple.900')
  return (
    <>
      <Head>
        <title>About - Second Exchange</title>
      </Head>
      {!showPosts && (
        <Flex position="absolute" top="45%" left="47%">
          <Spinner size="xl" />
        </Flex>
      )}
      {showPosts && postList.length === 0 && (
        <Container maxW={'5xl'}>
            <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              Keep exchanging,
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              start earning money!
            </Text>
          </Heading>
          <Text fontSize="md" color={'gray.500'}>
            <p>Second exchange is a censor resitant social media that lets anyone create content.</p>
            <p>You own your data we just relay it wherever you want.</p>
            <p>Private, Secure and your value your content.</p>
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}>
              Get started
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}>
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={colorOne}
          />
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            //boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}>
            <IconButton
              aria-label={'Play Button'}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              icon={<PlayIcon w={12} h={12} />}
              size={'lg'}
              color={'white'}
              position={'absolute'}
              left={'50%'}
              top={'50%'}
              transform={'translateX(-50%) translateY(-50%)'}
            />
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                '/astronot.gif'
              }
            />
          </Box>
        </Flex>
      </Stack>
      </Container>
        )
      }
      {showPosts && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt="25px"
          rowGap="25px"
        >
          {getUniquePosts(posts).map((post) => {
            const postContent: Post = JSON.parse(post.content);
            const postBody = postContent.content.replace(/<[^>]+>/g, "");
            return (
              <PostItem
                key={String(post.id)}
                date={toDateTime(post.created_at)}
                authorId={post.pubkey}
                postId={post.id!}
                title={postContent.title}
                body={postBody}
              />
            );
          })}
        </Flex>
      )}
    <Divider></Divider>
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={colorTwo}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>Privacy at core</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            We use basic cryptography (not crypto coins) to sign your content , just think like your signing a paper but its all digital and using those signatures to share content.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={borderColor}
              />
            }>
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={iconBgOne}
              text={'We dont ask for your phone number'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={icongBgTwo}
              text={'We dont want to know who you are'}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={icongBgThree}
              text={'Create your backup key and start using second exchange'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              '/ufo.gif'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
    <Divider></Divider>

    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              '/planet.gif'
            }
            objectFit={'cover'}
          />
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={bgOne}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>Censor Resistant</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            We use nostr relays to share your content, when you create content the signed data is sent to a dumb relay that shares it across the internet
            to other relays, so your content is protected from censorship.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={borderOne}
              />
            }>
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={iconBgFour}
              text={'Expect the same tool you are familiar with'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={iconBgFive}
              text={'Growth Analytics if you are coming from substack'}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={iconBgSix}
              text={'Decide on your terms how you like to share content'}
            />
          </Stack>
        </Stack>
        
      </SimpleGrid>
    </Container>


      
    </>
  );
};

const PlayIcon = createIcon({
    displayName: 'PlayIcon',
    viewBox: '0 0 58 58',
    d:
      'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
  });

  export const Blob = (props: IconProps) => {
    return (
      <Icon
        width={'100%'}
        viewBox="0 0 578 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
          fill="currentColor"
        />
      </Icon>
    );
  };

  interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
  }

  const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  


export default About;
