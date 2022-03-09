import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router, { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrlClient } from "../../../utils/createUrlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [, updatePost] = useUpdatePostMutation();
  const intId = useGetIntId();
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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data?.post?.title, text: data?.post?.text }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await updatePost({
            id: intId,
            input: {
              title: values.title,
              text: values.text,
            },
          });

          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Title"
              label="Title"
              type="text"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text"
                label="Body"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrlClient)(EditPost);
