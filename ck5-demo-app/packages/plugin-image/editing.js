// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import ImageCommand from "./command";
import {
  SCHEMA_NAME__IMAGE,
  COMMAND_NAME__IMAGE,
  CUSTOM_PROPERTY__IMAGE,
  IMAGE_CLASS,
  IMAGE_CONFIG,
} from "./constant";

export default class ImageEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  static get pluginName() {
    return "ImageEditing";
  }

constructor(editor) {
  super(editor);

  // 配置 IMAGE_CONFIG 的缺省值
  editor.config.define(IMAGE_CONFIG, {});

  // 通过 get 方法
  this.imageConfig = editor.config.get(IMAGE_CONFIG);
}

  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    editor.commands.add(COMMAND_NAME__IMAGE, new ImageCommand(editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    // SCHEMA_NAME__IMAGE --> "image"
    schema.register(SCHEMA_NAME__IMAGE, {
      isObject: true,
      isBlock: true,
      allowWhere: "$block",
      allowAttributes: ["src", "title"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_NAME__IMAGE,
      view: (element, { writer }) => {
        const widgetElement = createImageViewElement(element, writer, this.imageConfig);
        writer.setCustomProperty(CUSTOM_PROPERTY__IMAGE, true, widgetElement);
        return toWidget(widgetElement, writer);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_NAME__IMAGE,
      view: (element, { writer }) =>
        createImageViewElement(element, writer, this.imageConfig),
    });

    conversion.for("upcast").elementToElement({
      view: {
        name: "figure",
        classes: IMAGE_CLASS,
      },
      // 根据 View 创建图片 Model
      model:function (view, { writer }) {
        const params = {};
        const imageInner = view.getChild(0);
        ["src", "title"].map((k) => {
          params[k] = imageInner.getAttribute(k);
        });
      
        return writer.createElement(SCHEMA_NAME__IMAGE, params);
      }
      ,
    });
  }
}
// 根据 Model 创建图片 View
 function createImageViewElement(element, writer, imageConfig) {
  // 获取用户配置的 className
  const { className } = imageConfig || {};

  // 使用 createContainerElement 创建容器元素
  const figure = writer.createContainerElement("figure", {
    class: `${IMAGE_CLASS} ${className || ""}`,
  });

  // 使用 createEmptyElement 创建 img 标签，并设置属性
  const imageElement = writer.createEmptyElement("img");
  ["src", "title"].map((k) => {
    writer.setAttribute(k, element.getAttribute(k), imageElement);
  });

  // 将 img 作为子节点插入到 figure
  writer.insert(writer.createPositionAt(figure, 0), imageElement);
  return figure;
}