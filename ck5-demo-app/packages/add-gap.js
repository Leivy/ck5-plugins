import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import linkIcon from '@ckeditor/ckeditor5-link/theme/icons/link.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class CustomTagsPlugin extends Plugin {
  static get pluginName() {
    return "CustomTagsPlugin";
  }

  init() {
    const editor = this.editor;
   
    // Register commands to insert custom inline and block tags.
    editor.commands.add("insertCustomInlineTag", {
      exec: (editor) => {
        const customInlineTag =
          '<span class="custom-inline-tag">Your content here</span>';
        editor.model.change((writer) => {
          const position = editor.model.document.selection.getFirstPosition();
          writer.insertText(customInlineTag, position);
        });
      },
    });

    editor.commands.add("insertCustomBlockTag", {
      exec: (editor) => {
        const customBlockTag =
          '<div class="custom-block-tag">Your content here</div>';
        editor.model.change((writer) => {
          const position = editor.model.document.selection.getFirstPosition();
          writer.insert(customBlockTag, position);
        });
      },
    });

    // Define the schema for the custom inline tag.
    editor.model.schema.extend("$text", { allowAttributes: "customInlineTag" });

    // Define how the custom inline tag is to be rendered in the view.
    editor.conversion.for("upcast").elementToElement({
      model: "customInlineTag",
      view: {
        name: "span",
        classes: "custom-inline-tag",
      },
    });

    editor.conversion.for("editingDowncast").elementToElement({
      model: "customInlineTag",
      view: (modelElement, viewWriter) => {
        const span = viewWriter.createContainerElement("span", {
          class: "custom-inline-tag",
        });
        return toWidget(span, viewWriter, {
          label: "custom inline tag widget",
        });
      },
    });

    editor.conversion.for("dataDowncast").elementToElement({
      model: "customInlineTag",
      view: (modelElement, viewWriter) =>
        viewWriter.createEmptyElement("span", { class: "custom-inline-tag" }),
    });

    // Define the schema for the custom block tag.
    editor.model.schema.register("customBlockTag", {
      allowWhere: "$block",
      allowContentOf: "$root",
    });

    // Define how the custom block tag is to be rendered in the view.
    editor.conversion.for("upcast").elementToElement({
      model: "customBlockTag",
      view: {
        name: "div",
        classes: "custom-block-tag",
      },
    });

    editor.conversion.for("downcast").elementToElement({
      model: "customBlockTag",
      view: (modelElement, viewWriter) => {
        const div = viewWriter.createContainerElement("div", {
          class: "custom-block-tag",
        });
        return toWidget(div, viewWriter, { label: "custom block tag widget" });
      },
    });
  }
}
