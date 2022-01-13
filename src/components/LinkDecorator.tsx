import React, { ReactNode } from "react";
import { ContentState, CompositeDecorator } from "draft-js";

interface DraftDecoratorComponentProps {
    blockKey: any;
    children?: ReactNode;
    contentState: ContentState;
    decoratedText: string;
    dir?: any;
    end: number;
    entityKey?: string;
    offsetKey: string;
    start: number;
}

export const Link = (props: DraftDecoratorComponentProps) => {
    //@ts-ignore
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a rel="noopener noreferrer" target="_blank" href={url}>
            {props.children}
        </a>
    );
};

export const linkDecorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === "LINK"
                );
            }, callback);
        },
        component: Link,
    },
]);
