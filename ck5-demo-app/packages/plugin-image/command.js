// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import { findOptimalInsertionPosition } from "@ckeditor/ckeditor5-widget/src/utils";
import {
  IMAGE_CLASS,
  SCHEMA_NAME__IMAGE,
  CUSTOM_PROPERTY__IMAGE,
} from "./constant";
export default class LinkCommand extends Command {
  refresh() {
    const model = this.editor.model;
    const selectedContent = model.getSelectedContent(model.document.selection);
    this.isEnabled = selectedContent.isEmpty;
  }

  execute(data) {
    const model = this.editor.model;
    insertImage(model, data);
  }
}

function insertImage(model, attributes = {}) {
  if (!attributes || !attributes.src) {
    return;
  }

  model.change((writer) => {
    const imageElement = writer.createElement(SCHEMA_NAME__IMAGE, attributes);
    // 使用 findOptimalInsertionPosition 方法来获取最佳位置
    // 如果某个选择位于段落的中间，则将返回该段落之前的位置，不拆分当前段落
    // 如果选择位于段落的末尾，则将返回该段落之后的位置
    const insertAtSelection = findOptimalInsertionPosition(
      model.document.selection,
      model
    );
    model.insertContent(imageElement, insertAtSelection);
  });
}
