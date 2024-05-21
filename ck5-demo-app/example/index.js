import Editor from "../packages/my-editor/src/index";

//<p>3333333</p><p>&nbsp;</p>"

const content0 = `
Two solutions, 1 and 2 and 
<div class=\"ck5-xiaoti-gap-inline \" style=\"display:inline-block;width:122px;\" guid=\"fd6ee9eb-2fec-42c5-9d5f-111909bb5e9c\"><span class=\"ck5-xiaoti-gap-data \" style=\"background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:122px;\" mtype=\"1\" fontnums=\"12\" linenums=\"undefined\"></span></div>
, one containing starch and sucrose, and the other .
<div class=\"ck5-xiaoti-gap-inline \" style=\"display:inline-block;width:22px;\" guid=\"fcc4c1f8-f409-4d95-ad8c-6553cf1a44e6\"><span class=\"ck5-xiaoti-gap-data \" style=\"background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:22px;\" mtype=\"1\" fontnums=\"2\" linenums=\"undefined\"></span></div>
<p>containing glucose and protein, were tested with a variety of reagents to confirm their identity.</p>
<div class=\"ck5-xiaoti-gap-block \" guid=\"d4c2d6a2-3daf-4792-a6e4-bbdd6da82020\"><div class=\"ck5-xiaoti-gap-data \" style=\"background:#fff;border:1px solid #ccc;height:41px;\" mtype=\"2\" fontnums=\"undefined\" linenums=\"2\"><div style=\"border-bottom:1px solid #ccc;height:20px;\"></div><div style=\"height:20px;\"></div></div></div>

The table shows the conclusions from the results recorded for the various tests. Which row identifies the two solutions?

<figure class="ck-image wise-test"><img src="//t7.baidu.com/it/u=2621658848,3952322712&amp;fm=193&amp;f=GIF" title="测试图片"></figure>`;

const content1=`<p><span class="ck5-xiaoti-gap-inline " style="display:inline-block;width:232px;" guid="d3d7aa6e-896d-4abb-b1c4-4a8ad4ae8020"><span class="ck5-xiaoti-gap-data " style="background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:232px;" mtype="1" fontnums="23" linenums="undefined"></span></span>33</p><p>块级元素</p><span class="ck5-xiaoti-gap-block " guid="9229bb10-cb80-48b4-8561-969b91cd75ac"><span class="ck5-xiaoti-gap-data " style="background:#fff;border:1px solid #ccc;display:block;height:61px;margin-bottom:10px;" mtype="2" fontnums="undefined" linenums="3"><span style="border-bottom:1px solid #ccc;display:block;height:20px;"></span><span style="border-bottom:1px solid #ccc;display:block;height:20px;"></span><span style="display:block;height:20px;"></span></span></span>`

const content=`<p><span class="ck5-xiaoti-gap-inline " style="display:inline-block;width:232px;" guid="29d23c5b-ffda-4048-9cf1-657bb161dc4a"><span class="ck5-xiaoti-gap-data " style="background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:232px;" mtype="1" fontnums="23" linenums="undefined"></span></span>33</p><p style="text-align:right;">填入<span class="ck5-xiaoti-gap-inline " style="display:inline-block;width:32px;" guid="94d58811-2d31-464a-b4b2-65ae7fb6f216"><span class="ck5-xiaoti-gap-data " style="background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:32px;" mtype="1" fontnums=" 3" linenums="undefined"></span></span></p><p>块级元素</p><span class="ck5-xiaoti-gap-block " guid="e641541f-1ddc-40e5-84f9-36e3728e2081"><span class="ck5-xiaoti-gap-data " style="background:#fff;border:1px solid #ccc;display:block;height:61px;margin-bottom:10px;" mtype="2" fontnums="undefined" linenums="3"><span style="border-bottom:1px solid #ccc;display:block;height:20px;"></span><span style="border-bottom:1px solid #ccc;display:block;height:20px;"></span><span style="display:block;height:20px;"></span></span></span>`

const resulteCOntent=`
<p>Two solutions, 1 and 2 and&nbsp;<span class="ck5-xiaoti-gap-inline " style="display:inline-block;width:122px;" guid="e2334c0f-20b4-4b40-a4b8-a8eef573b18b"><span class="ck5-xiaoti-gap-data " style="background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:122px;" mtype="1" fontnums="12" linenums="undefined"></span></span>, one containing starch and sucrose, and the other .&nbsp;<span class="ck5-xiaoti-gap-inline " style="display:inline-block;width:22px;" guid="023d8182-1115-473b-9604-caa13265cb91"><span class="ck5-xiaoti-gap-data " style="background:#fff;border-bottom:1px solid #ccc;display:inline-block;width:22px;" mtype="1" fontnums="2" linenums="undefined"></span></span></p><p>containing glucose and protein, were tested with a variety of reagents to confirm their identity.</p><div class="ck5-xiaoti-gap-block " guid="486d1797-30a2-4ef1-8bb2-badcaa1724de"><div class="ck5-xiaoti-gap-data " style="background:#fff;border:1px solid #ccc;height:41px;" mtype="2" fontnums="undefined" linenums="2"><div style="border-bottom:1px solid #ccc;height:20px;"></div><div style="height:20px;"></div></div></div><p>The table shows the conclusions from the results recorded for the various tests. Which row identifies the two solutions?</p><figure class="ck-image wise-wrong"><img src="//t7.baidu.com/it/u=2621658848,3952322712&amp;fm=193&amp;f=GIF" title="测试图片"></figure>
`
function render() {
  return new Editor({
    id: "editor-area",
    content:content,
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
