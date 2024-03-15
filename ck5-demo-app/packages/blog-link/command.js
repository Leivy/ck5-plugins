// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import findAttributeRange from "@ckeditor/ckeditor5-typing/src/utils/findattributerange";
import { SCHEMA_NAME__GAP,SCHEMA_NAME__BLOCK} from "./constant";
import { findOptimalInsertionPosition } from "@ckeditor/ckeditor5-widget/src/utils";

export default class LinkCommand extends Command {
  refresh() {
    const model = this.editor.model;
    const doc = model.document;

    // 将链接关联到到 value
    this.value = doc.selection.getAttribute(SCHEMA_NAME__GAP);
    // 根据 editing.js 中定义的 schema 规则来维护按钮的禁用/启用状态
    this.isEnabled =true
    // this.isEnabled = model.schema.checkAttributeInSelection(
    //   doc.selection,
    //   SCHEMA_NAME__GAP
    // );
  }

  execute(data) {
    console.log('command-execute',data);
    
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change((writer) => {
      const blockElement = writer.createElement(SCHEMA_NAME__BLOCK, data);
      console.log("gap- model.change",writer);

      // 使用 findOptimalInsertionPosition 方法来获取最佳位置
      // 如果某个选择位于段落的中间，则将返回该段落之前的位置，不拆分当前段落
      // 如果选择位于段落的末尾，则将返回该段落之后的位置
      const insertAtSelection = findOptimalInsertionPosition(
        model.document.selection,
        model
      );
      model.insertContent(blockElement, insertAtSelection);

      return 

      // 选区的锚点和焦点是否位于同一位置
      if (selection.isCollapsed) {
        const position = selection.getFirstPosition();

        // 光标位于 link 中间
        if (selection.hasAttribute(SCHEMA_NAME__GAP)) {
          const range = findAttributeRange(
            position,
            SCHEMA_NAME__GAP,
            selection.getAttribute(SCHEMA_NAME__GAP),
            model
          );
          this._handleLink(writer, href, range)
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          SCHEMA_NAME__GAP
        );
        for (const range of ranges) {
          this._handleLink(writer, href, range)
        }
      }
    });
  }

  _handleLink(writer, href, range) {
    if (href) {
      writer.setAttribute(SCHEMA_NAME__GAP, href, range);
    } else {
      writer.removeAttribute(SCHEMA_NAME__GAP, range);
    }
  }
}
