// toolbar-ui.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import linkIcon from "./addgap.svg";
import {
  COMMAND_NAME__GAP,
  TOOLBAR_NAME__GAP,
  TOOLBAR_LABEL__GAP,
} from "./constant";

import LinkForm from "./form/link-form";

export default class LinkToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    const linkCommand = editor.commands.get(COMMAND_NAME__GAP);

    // TOOLBAR_NAME__GAP -> 'ck-link'
    editor.ui.componentFactory.add(TOOLBAR_NAME__GAP, (locale) => {
      const view = new ButtonView(locale);
      view.set({
        // TOOLBAR_LABEL__GAP -> '超链接'
        label: TOOLBAR_LABEL__GAP,
        tooltip: true,
        icon: linkIcon,
        class: "toolbar_button_link",
      });

      view.bind("isEnabled").to(linkCommand, "isEnabled");
      // 根据 command 的 value 来控制按钮的高亮状态
      view.bind("isOn").to(linkCommand, "value", (value) => !!value);

      this.listenTo(view, "execute", () => {
        // 点击按钮的时候打开弹窗
        this._openDialog(linkCommand.value);
      });
      return view;
    });
  }

  // value 为已设置的超链接，作为初始值传给弹窗表单
  _openDialog(value) {
    new LinkForm({
      value,
      onSubmit: (href) => {
        console.log("onSubmit", href);
        this.editor.execute(COMMAND_NAME__GAP, href);
        this.editor.editing.view.focus()
      },
    });
  }
}
