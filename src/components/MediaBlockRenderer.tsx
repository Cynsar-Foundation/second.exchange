import React from "react";
import { ContentBlock, ContentState } from "draft-js";

interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

export const Image = (props: BlockComponentProps) => {
  const { block, contentState } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
  return <img src={src} alt={src} role="presentation" />;
};

const Media = (props: BlockComponentProps) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();

  let media = null;
  if (type === "image") {
    media = <Image {...props} />;
  }

  return media;
};

export const mediaBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
};
