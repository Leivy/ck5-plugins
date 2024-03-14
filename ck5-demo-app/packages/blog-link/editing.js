// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import inlineHighlight from "@ckeditor/ckeditor5-typing/src/utils/inlinehighlight";
import LinkCommand from "./command";
import {
  SCHEMA_NAME__GAP,
  COMMAND_NAME__GAP,
  EDITORING__GAP,
  SCHEMA_NAME__BLOCK,
  GAP_CLASS,
} from "./constant";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

const HIGHLIGHT_CLASS = "ck-link_selected";

export default class LinkEditing extends Plugin {
  static get pluginName() {
    return EDITORING__GAP;
  }
  static get requires() {
    return [Widget];
  }
  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    // 注册一个 BoldCommand 命令 COMMAND_NAME__GAP -> 'gap'
    editor.commands.add(COMMAND_NAME__GAP, new LinkCommand(editor));

    // 当光标位于 link 中间，追加 class，用于高亮当前超链接
    inlineHighlight(editor, SCHEMA_NAME__GAP, "a", HIGHLIGHT_CLASS);
  }

  // 注册 schema 相当于 model 里的 html 标签 容器
  _defineSchema() {
    console.log("gap-注册schema _defineSchema");
    const schema = this.editor.model.schema;
    schema.register(SCHEMA_NAME__BLOCK, {
      isObject: true,
      isBlock: true,
      allowWhere: "$block",
      allowAttributes: ["class", "databox",'style'],
    });
  }
  // 定义转换器
  _defineConverters() {
    console.log("gap-定义转换器_defineConverters");

    const conversion = this.editor.conversion;
    // 将 model 渲染为 HTML
    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_NAME__BLOCK,
      view: (element, { writer }) => {
        console.log("gap-editingDowncast");
        const widgetElement = createGapElement(
          element,
          writer,
          this.imageConfig
        );
        return widgetElement
        // writer.setCustomProperty(CUSTOM_PROPERTY__IMAGE, true, widgetElement);
        // return toWidget(widgetElement, writer);
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_NAME__BLOCK,
      view: (element, { writer }) => {
        console.log("gap-dataDowncast");

        return createGapElement(element, writer, this.imageConfig);
      },
    });
    // 将 HTML 渲染为 model
    conversion.for("upcast").elementToElement({
      view: {
        name: "figure",
        classes: GAP_CLASS,
      },
      // 根据 View 创建图片 Model
      model: function (view, { writer }) {
        console.log("gap-upcast-根据 View 创建图片 Model");

        const params = {};
        const imageInner = view.getChild(0);
        ["class", "databox"].map((k) => {
          params[k] = imageInner.getAttribute(k);
        });

        return writer.createElement(SCHEMA_NAME__BLOCK, params);
      },
    });
  }
}

function createGapElement(element, writer, imageConfig) {
  console.log("gap-createGapElement", imageConfig);
  // 获取用户配置的 className
  const { className } = imageConfig || {};

  // 使用 createContainerElement 创建容器元素
  const figure = writer.createContainerElement("figure", {
    class: `${GAP_CLASS} ${className || ""}`,
  });

  const _style='background: #eee;height: 20px;'

  // 使用 createEmptyElement 创建 img 标签，并设置属性
  const blockElement = writer.createEmptyElement("div");
  ["class", "databox"].map((k) => {
    writer.setAttribute(k, element.getAttribute(k), blockElement);
  });
  writer.setAttribute('style',_style, blockElement);


  // 将 img 作为子节点插入到 figure
  writer.insert(writer.createPositionAt(figure, 0), blockElement);
  return figure;
}
