import Editor from "../packages/my-editor/src/index";


const content = `
<p>Two<div class=\"ck5-xiaoti-gap-inline \" style=\"display:inline-block;width:52px;\">
<span class=\"ck5-xiaoti-gap-data ck5-xiaoti-gap-inline\" mtype=\"1\" fontnums=\"23\" linenums=\"undefined\" style=\"background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:52px;\"></span>
</div>&nbsp;solutions, 1 and 2, one containing starch and s
ucrose, and the other&nbsp;</p><div class=\"ck5-xiaoti-gap-block \"><div class=\"ck5-xiaoti-gap-data \" style=\"background:#fff;border:1px solid #ccc;height:61px;\" mtype=\"2\" fontnums=\"undefined\" linenums=\"3\"><div style=\"border-bottom:1px solid #ccc;height:20px;\"></div><div style=\"border-bottom:1px solid #ccc;height:20px;\"></div><div style=\"height:20px;\"></div></div></div><p>containing glucose and protein, were tested with a variety of reagents to confirm their identity.</p><p>The table shows the&nbsp;<div class=\"ck5-xiaoti-gap-inline \" style=\"display:inline-block;width:22px;\"><span class=\"ck5-xiaoti-gap-data ck5-xiaoti-gap-inline\" style=\"background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:22px;\"></span></div>conclusions from the results recorded for the various tests. Which row identifies the two solutions?&nbsp;</p><p>&nbsp;</p>
<p>wise&nbsp;<strong>wrong</strong>&nbsp;<a href="wise">hello</a>&nbsp;<strong>world</strong></p> 
<p>1wise&nbsp;<strong>wrong</strong>&nbsp;<a href="wise">hello</a>&nbsp;<strong>world</strong></p>
<p>2wise&nbsp;<strong>wrong</strong>&nbsp;<a href="wise">hello</a>&nbsp;<strong>world</strong></p>

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
