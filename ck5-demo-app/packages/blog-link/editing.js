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
  SCHEMA_NAME__INLINE,
} from "./constant";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

const ALLOWATTRIBUTES = [
  "class",
  "databox",
  "style",
  "mtype",
  "fontNums",
  "lineNums",
];

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
    // inlineHighlight(editor, SCHEMA_NAME__GAP, "a", HIGHLIGHT_CLASS);
  }

  // 注册 schema 相当于 model 里的 html 标签 容器
  _defineSchema() {
    console.log("gap-注册schema _defineSchema");
    const schema = this.editor.model.schema;
    schema.extend("$text", {
      allowAttributes: ALLOWATTRIBUTES,
    });
    schema.register(SCHEMA_NAME__BLOCK, {
      // isObject: true,
      // isBlock: true,
      allowWhere: "$block",
      allowAttributes: ALLOWATTRIBUTES,
    });
  }
  // 定义转换器
  _defineConverters() {
    console.log("gap-定义转换器_defineConverters");
    const conversion = this.editor.conversion;
    // 将 model 渲染为 HTML
    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_NAME__BLOCK,
      view: (element, par, data) => {
        const { writer } = par;
        console.log("gap-editingDowncast", par);
        return createBlockElement(element, writer, this.imageConfig);
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_NAME__BLOCK,
      view: (element, { writer }) =>
        createBlockElement(element, writer, this.imageConfig),
    });
    // 将 HTML 渲染为 model
    conversion.for("upcast").elementToElement({
      view: {
        name: "figure",
        classes: GAP_CLASS,
      },
      // 根据 View 创建图片 Model
      model: function (view, { writer }) {
        console.log("gap-upcast-根据 View 创建图片 Model", view);

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
//生成行内元素
function createInlineElement(element, writer, imageConfig) {
  console.log("gap-createInlineElement", imageConfig);
  // 获取用户配置的 className
  const { className } = imageConfig || {};
  const _fontNums = Number(+element.getAttribute("fontNums"));
  console.log("生成行内元素_lineNums", _fontNums);

  const blockElement = writer.createContainerElement("div", {
    class: `${GAP_CLASS}-inline ${className || ""}`,
  });
  writer.setAttribute(
    "style",
    `display:inline-block;width:${4 * _fontNums + 1}px;`,
    blockElement
  );

  // 使用 createContainerElement 创建 blockElement 标签，内部添加空白标签
  const inlineElement = writer.createEmptyElement("div", {
    class: `${GAP_CLASS}-data ${GAP_CLASS}-inline`,
  });
  writer.insert(writer.createPositionAt(blockElement, 0), inlineElement);

  const _style = `display:inline-block;width:${
    4 * _fontNums + 1
  }px;height: 20px;background: #fff;border-bottom:1px solid #ccc;`;
  writer.setAttribute("style", _style, inlineElement);
  return blockElement;
}
//生成块级元素
function createBlockElement(element, writer, imageConfig) {
  console.log("gap-createGapElement", imageConfig);
  // 获取用户配置的 className
  const { className } = imageConfig || {};
  const _lineNums = Number(+element.getAttribute("lineNums"));
  const _mtype = Number(+element.getAttribute("mtype"));
  console.log("_mtype", _mtype);
  if (+_mtype === 1) return createInlineElement(element, writer, imageConfig);

  // 使用 createContainerElement 创建容器元素
  const figure = writer.createContainerElement("figure", {
    class: `${GAP_CLASS}-block ${className || ""}`,
  });

  // 使用 createContainerElement 创建 blockElement 标签，内部添加空白标签
  const blockElement = writer.createContainerElement("div", {
    class: `${GAP_CLASS}-data `,
  });

  if (!Number.isInteger(_lineNums)) return console.log("行数不是整数");
  for (let i = 0; i < _lineNums; i++) {
    //createEmptyElement创建 空白 标签
    const _div = writer.createEmptyElement("div");
    const _style = `${
      i !== 0 ? "border-bottom:1px solid #ccc;" : ""
    }height:20px`;
    writer.setAttribute("style", _style, _div);
    writer.insert(writer.createPositionAt(blockElement, 0), _div);
  }

  const _style = `height: ${
    20 * _lineNums + 1
  }px;background: #fff;border:1px solid #ccc;`;

  // 设置空格数据
  const arr = ["mtype", "fontNums", "lineNums"];
  arr.map((k) => {
    writer.setAttribute(k, element.getAttribute(k), blockElement);
  });
  writer.setAttribute("style", _style, blockElement);

  // 将 blockElement 作为子节点插入到 figure
  writer.insert(writer.createPositionAt(figure, 0), blockElement);
  return figure;
}
