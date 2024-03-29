// main.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import Editing from './editing';
import { TOOLBAR_NAME__GAP } from './constant';

export default class Link2 extends Plugin {
	static get requires() {
		return [Editing, ToolbarUI,];
	}
	static get pluginName() {
		return TOOLBAR_NAME__GAP;
	}
}
