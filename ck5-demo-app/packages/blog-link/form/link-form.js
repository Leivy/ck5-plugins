import Dialog from '../../UI/dialog/dialog';
import './link-form.less';

export default class LinkForm {
	constructor(props) {
		Object.assign(
			this,
			{
				value: null, // 初始值
				onSubmit: () => {},
			},
			props || {}
		);
		this.value= {
			mtype:1,// 1 行内，2 整块
			fontNums: undefined, // 行内-字数
			lineNums: undefined, //  整块-行数
		}// 初始值

		this.render();
	}

	render() {
		const content = template(this.value);
		this.$form = new Dialog({
			content,
			width: '420px',
			onSubmit: this._submit.bind(this),
		});

		const dialog = this.$form.$pop;
		// this.$input = dialog.querySelector(`input[name=linkValue]`);
		// this.$cleanButton = dialog.querySelector('.link-form-button');

		this._bind();
		
		const _this=this
		// 首先要获得所有的按钮
		const box = dialog.querySelector( '#box' );
		const btns = box.querySelectorAll('button');
		const divs = box.querySelectorAll('.link-form-con');
		for ( let i = 0; i < btns.length; i++) {
			const btn = btns[i];
			btn.index = i; // 给每个按钮添加一个自定义属性，用来存储当前的索引
			btn.onclick = function () {
				for (let j = 0; j < btns.length; j++) {
					btns[j].className = '';
				}
				this.className = 'current';
				for (let k = 0; k < divs.length; k++) {
					divs[k].style.display = 'none';
				}
				divs[this.index].style.display = 'block';
				_this.value.mtype=this.getAttribute('mtype')
			};
		}

		//所有输入框
		const inputs=box.querySelectorAll('input');
		console.log('所有输入框',inputs);
		for ( let i = 0; i < inputs.length; i++) {
			const _input = inputs[i];
			_input.index = i; // 给每个按钮添加一个自定义属性，用来存储当前的索引
			_input.onchange = function (e) {
				_this.value[inputs[this.index].name]=e.target.value
				// const _nums=
				// inputs[this.index].style.display = 'block';
			};
		}
	}

	destroy() {
		this._unbind();
	}

	_bind() {
		// this.$cleanButton.addEventListener(
		// 	'click',
		// 	this._handleCleanup.bind(this)
		// );
	}

	_unbind() {
		try {
			this.$cleanButton.removeEventListener(
				'click',
				this._handleCleanup.bind(this)
			);
		} catch (e) {
			console.error('LinkForm Unbind Error: ', e);
		}
	}

	_submit() {
		if (typeof this.onSubmit !== 'function') {
			return;
		}

		return this.onSubmit(this.value);
	}

	_handleCleanup() {
		// this.$input.value = ''
	}
}

function template(data) {
	console.log('template',data);
	
	const body = `
    <div class="link-form">
      <div class="link-form-Box" id="box">
        <button class="current" mtype='1'>插入行内</button>
        <button mtype='2' > 插入整块</button>
        <div class="link-form-con" style="display:block">
			<div class="link-form-item">
				<span >行内字数</span> <input autocomplete="off"
					placeholder="请输入学生答题字数"
					type="text"
					class="link-form-input"
					name="fontNums"
					value="${data.fontNums || ''}"
				/>
			</div>
		</div>
        <div class="link-form-con">
			<div class="link-form-item">
				<span >分割行数</span> <input autocomplete="off"
					placeholder="请输入行数"
					type="text"
					class="link-form-input"
					name="lineNums"
					value="${data.lineNums || ''}"
				/>
			</div>
		</div>
      </div>
    </div>
  `;

	return {
		classes: 'link-form-dialog',
		title: '插入填空题',
		body,
	};
}
