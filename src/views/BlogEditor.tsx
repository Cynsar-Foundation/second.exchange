import React, { FC } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    AtomicBlockUtils,
    DraftEditorCommand,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { linkDecorator } from "../components/LinkDecorator";
import { mediaBlockRenderer } from "../components/MediaBlockRenderer";

const TEXT_EDITOR_ITEM = "draft-js-example-item";

export const BlogEditor: FC = () => {
    const data = localStorage.getItem(TEXT_EDITOR_ITEM);
    const initialState = data
        ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(data)),
              linkDecorator
          )
        : EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] =
        React.useState<EditorState>(initialState);

    const handleSave = () => {
        const data = JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
        );
        localStorage.setItem(TEXT_EDITOR_ITEM, data);
    };

    const handleInsertImage = () => {
        const src = prompt("Please enter the URL of your picture");
        if (!src) {
            return;
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        return setEditorState(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
        );
    };

    const handleAddLink = () => {
        const selection = editorState.getSelection();
        const link = prompt("Please enter the URL of your link");
        if (!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
            return;
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link,
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "apply-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        setEditorState(
            RichUtils.toggleLink(newEditorState, selection, entityKey)
        );
    };

    const handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    return (
        <div className="blog-editor">
            <button onMouseDown={(e) => handleBlockClick(e, "header-one")} className="blog-formatting-button">
                H1
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, "header-two")} className="blog-formatting-button">
                H2
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, "header-three")} className="blog-formatting-button">
                H3
            </button>
            <button onMouseDown={(e) => handleBlockClick(e, "unstyled")} className="blog-formatting-button">
                Normal
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")} className="blog-formatting-button">
                bold
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, "UNDERLINE")} className="blog-formatting-button">
                underline
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")} className="blog-formatting-button">
                italic
            </button>
            <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")} className="blog-formatting-button">
                strikthrough
            </button>
            <button
                onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}
                className="blog-formatting-button"
            >
                Numbering
            </button>
            <button
                className="blog-formatting-button"
                onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
            >
                Bullets
            </button>
            <button
                className="blog-formatting-button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleInsertImage();
                }}
            >
                image
            </button>
            <button
                className="blog-formatting-button"
                disabled={editorState.getSelection().isCollapsed()}
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleAddLink();
                }}
            >
                link
            </button>

            <input 
                type="text"
                className="blog-title"
                placeholder="Title"
            />

            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockRendererFn={mediaBlockRenderer}
            />
            <button
                className="blog-ops-button"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                Save
            </button>
            <button
                className="blog-ops-button"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                Publish
            </button>
        </div>
    );
};
