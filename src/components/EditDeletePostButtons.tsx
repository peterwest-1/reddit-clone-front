import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          size={"sm"}
          mr="4"
          icon={<EditIcon />}
          aria-label="Edit post"
        />
      </NextLink>
      <IconButton
        onClick={() => {
          deletePost({
            id,
          });
        }}
        size={"sm"}
        icon={<DeleteIcon />}
        aria-label="Delete post"
      />
    </Box>
  );
};
function useMeQuery(): [{ data: any }] {
  throw new Error("Function not implemented.");
}
