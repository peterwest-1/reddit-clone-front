import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrlClient } from "../../utils/createUrlClient";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { useMeQuery } from "../../generated/graphql";

interface PostProps {}

export const Post: React.FC<PostProps> = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return <Layout>Loading...</Layout>;
  }
  if (error) {
    return <Layout>error : {error.message}</Layout>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      {!(meData?.me?.id === data.post.creator.id) ? null : (
        <EditDeletePostButtons id={data.post.id} />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrlClient, { ssr: true })(Post);
