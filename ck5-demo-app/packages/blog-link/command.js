// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import findAttributeRange from "@ckeditor/ckeditor5-typing/src/utils/findattributerange";
import {
  GAP_CLASS,
  SCHEMA_NAME__GAP,
  SCHEMA_NAME__BLOCK,
  SCHEMA_NAME__INLINE,
} from "./constant";
import { findOptimalInsertionPosition } from "@ckeditor/ckeditor5-widget/src/utils";

export default class LinkCommand extends Command {
  refresh() {
    const model = this.editor.model;
    const doc = model.document;

    // 将链接关联到到 value
    this.value = doc.selection.getAttribute(SCHEMA_NAME__GAP);
    // 根据 editing.js 中定义的 schema 规则来维护按钮的禁用/启用状态
    this.isEnabled = true;
    // this.isEnabled = model.schema.checkAttributeInSelection(
    //   doc.selection,
    //   SCHEMA_NAME__GAP
    // );
  }

  execute(data) {
    console.log("command-execute", data);

    const model = this.editor.model;
    // const selection = model.document.selection;

    model.change((writer) => {
      const { mtype } = data || {};
      const position = model.document.selection.getFirstPosition();

      //块级

      if (+mtype === 1) {
        console.log("mtype-行内");
        //行内
        const inlineElement = writer.createElement(SCHEMA_NAME__INLINE, data);
        model.insertContent(inlineElement, position);
      } else {
        console.log("mtype-块级");
        const blockElement = writer.createElement(SCHEMA_NAME__BLOCK, data);
        // 使用 findOptimalInsertionPosition 方法来获取最佳位置
        // 如果某个选择位于段落的中间，则将返回该段落之前的位置，不拆分当前段落
        // 如果选择位于段落的末尾，则将返回该段落之后的位置
        model.insertContent(blockElement, position);
      }
      // 选区的锚点和焦点是否位于同一位置
    });
  }
}
