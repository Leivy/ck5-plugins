// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import inlineHighlight from "@ckeditor/ckeditor5-typing/src/utils/inlinehighlight";
import LinkCommand from "./command";
import {
  SCHEMA_NAME__GAP,
  COMMAND_NAME__GAP,
  EDITORING__GAP,SCHEMA_NAME__BLOCK
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
	console.log('注册 schema_defineSchema');
    const schema = this.editor.model.schema;
	schema.extend('$text', {
		// SCHEMA_NAME__GAP -> 'linkHref'
		allowAttributes: SCHEMA_NAME__GAP,
	});
    // schema.register(SCHEMA_NAME__BLOCK, {
    //   isLimit: true, // Limit Element 就相当于 iframe
    //   isObject: true, // 是否为一个整体
    //   //   allowWhere: "$text", // 允许在哪个 schema 插入
    // });
  }
  // 定义转换器
  _defineConverters() {
    console.log("定义转换器_defineConverters");

    const conversion = this.editor.conversion;
    // 将 model 渲染为 HTML
    conversion.for("downcast").attributeToElement({
      model: SCHEMA_NAME__GAP,
      // attributeToElement 方法中，如果 view 是一个函数，其第一个参数是对应的属性值，在这里就是超链接的 url
      // 实际项目中需要校验 url 的真实性，这里就省略掉了
      view: createGapElement,
    });
	// 将 HTML 渲染为 model
	conversion.for('upcast').elementToAttribute({
		view: {
			name: 'a',
			attributes: {
				href: true,
			},
		},
		model: {
			key: SCHEMA_NAME__GAP,
			value: (viewElement) => viewElement.getAttribute('href'),
		},
	});
   
  }
}

function createGapElement(href, { writer }) {
	console.log('createGapElement',href);
	
  const element = writer.createContainerElement("div");
  // const value = modelElement.getAttribute("value");
  // const innerText = writer.createText(value);
  // writer.insert(writer.createPositionAt(element, 0), innerText);

  // return element;

  return writer.createAttributeElement('a', { href });
}
