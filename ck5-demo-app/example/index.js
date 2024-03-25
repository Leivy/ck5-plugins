import Editor from "../packages/my-editor/src/index";


const content = `
Two solutions, 1 and 2, one containing starch and sucrose, and the other.

<p>containing glucose and protein, were tested with a variety of reagents to confirm their identity.</p>

The table shows the conclusions from the results recorded for the various tests. Which row identifies the two solutions?

<figure class="ck-image wise-test"><img src="//t7.baidu.com/it/u=2621658848,3952322712&amp;fm=193&amp;f=GIF" title="测试图片"></figure>`;

function render() {
  return new Editor({
    id: "editor-area",
    content,
  });
}

function _bind($editor) {
  const submitBtn = document.getElementById("submit");
  submitBtn.onclick = function () {
    const val = $editor.editor && $editor.editor.getData();
    console.log("editorGetValue", val);
  };
}

const editor = render();
_bind(editor);
