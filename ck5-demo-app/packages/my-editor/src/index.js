// packages/my-editor/src/index.js

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Link from "@ckeditor/ckeditor5-link/src/link";
// import List from "@ckeditor/ckeditor5-list/src/list";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import AlignmentUI from "@ckeditor/ckeditor5-alignment/src/alignmentui";
// 调试器
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
// 自定义插件
import Bold from "@plugin/plugin-bold/main";
import Link from "@plugin/plugin-link/main";
import Image from "@plugin/plugin-image/main";
import Link2 from "@plugin/blog-link/main";
import Link3 from "@plugin/add-gap";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";

export default class MyEditor {
  constructor(props) {
    Object.assign(
      this,
      {
        id: "editor",
      },
      props
    );
    this.render();
  }

  render() {
    ClassicEditor.create(document.querySelector(`#${this.id}`), {
      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Link,
        Link2,
        Link3,
        Image,
        Indent,
        Alignment,
        AlignmentUI,
        TextTransformation,
      ],
      toolbar: [
        "CustomTagsPlugin",
        "xiaoti-gap",
        "undo",
        "redo",
        "|",
        "alignment:left",
        "alignment:right",
        "alignment:center",
        "alignment:justify",
        Bold.pluginName,
        Link.pluginName,
        Image.pluginName,
      ],
      autoParagraph: false, // 禁用 Autoparagraph 插件
      p: false, // 禁用 <p> 标签包裹
      div: true, // 禁用 <p> 标签包裹
      initialData: this.content,
      // 'imageConfig' --> IMAGE_CONFIG
      imageConfig: {
        className: "wise-wrong",
      },
    })
      .then((editor) => {
        CKEditorInspector.attach(editor);
        this.editor = editor;
        editor.plugins.get("TextTransformation").isEnabled = false;
        return
        // 替换默认的段落处理器，使其不使用 <p> 标签
        editor.conversion.for("dataDowncast").add((downcastDispatcher) => {
          downcastDispatcher.on(
            "insert:paragraph",
            (evt, data, conversionApi) => {
              console.log("insert????");

              // 阻止默认的段落处理器行为
              evt.stop();

              // // 自定义处理器：将段落转换为自定义格式（例如使用换行符）
              // const writer = conversionApi.writer;
              // // writer.setCustomProperty('isBlock', true);
              // writer.openElement('div');
              // writer.openElement('span');
              // conversionApi.consumable.consume(evt.range, 'insert');
              // writer.closeElement();
              // writer.closeElement('div');
            }
          );
        });
      })
      .catch((error) => {
        console.error(error.stack);
      });
  }
}
