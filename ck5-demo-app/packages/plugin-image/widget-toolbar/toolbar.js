// ./widget-toolbar/toolbar.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import WidgetToolbarRepository from "@ckeditor/ckeditor5-widget/src/widgettoolbarrepository";
import ImageEdit from "./edit/main";
import {
  WIDGET_TOOLBAR_NAME__IMAGE,
  CUSTOM_PROPERTY__IMAGE,
} from "../constant";
import { isWidget } from "@ckeditor/ckeditor5-widget/src/utils";
export default class ImageWidgetToolbar extends Plugin {
  static get requires() {
    return [WidgetToolbarRepository, ImageEdit];
  }

  static get pluginName() {
    return "ImageToolbar";
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    // WIDGET_TOOLBAR_NAME__IMAGE --> "ck-image-toolbar"
    widgetToolbarRepository.register(WIDGET_TOOLBAR_NAME__IMAGE, {
      ariaLabel: "图片工具栏",
      items: [ImageEdit.pluginName],
      getRelatedElement: getSelectedImageWidget,
    });
  }
}

function getSelectedImageWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isImageWidget(viewElement)) {
    return viewElement;
  }

  return null;
}

function isImageWidget(viewElement) {
  return (
    !!viewElement &&
    viewElement.getCustomProperty(CUSTOM_PROPERTY__IMAGE) &&
    isWidget(viewElement)
  );
}
