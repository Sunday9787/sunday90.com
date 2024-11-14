import{_ as i,o as n,c as a,a as d,e as s,f as l}from"./app-DoCbvI0I.js";const r={};function t(c,e){return n(),a("div",null,[e[0]||(e[0]=d("p",null,"编辑器，这个词听起来就挺高大上的，事实确实也不那么简单",-1)),s(" more "),e[1]||(e[1]=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>这篇文章是编辑器写完后的接近一年 才想起来要打算写一篇文章记录。编辑器于22年12月11日开始写 直到 23年3月底写完。23年回想起来太难了，差点结束程序员👨🏻‍💻生涯 哎。。。太难了。。。</p><p>写编辑器的动机起初是公司内有一个模板编辑器模块，看上去确实挺强的，实现的功能有对齐辅助线、缩放、属性编辑、撤销、重做、历史记录，保存为模板可以使用模板根据控件绑定的字段可以填充数据渲染并导出pdf打印。大致看了下模块代码，发现有些地方写的并不够清晰，比较乱，如果后续交由我来维护可能到时候有些摸不着北。但是代码组织还是不错，模板控件的设计很有条理，是可以学到不少东西。</p><p>不巧23年春节公司放假最后一天，把我裁了。。。22年7月20才刚刚进去。。。23年春节后回来就开始投简历，发现投下去基本上很多是已读未回或者未读，要么就是明确拒绝大专，必须本科+以上。。。</p><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/202410271800925.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>失业后，想着自从17年5月入行到23年也有5年半了，总觉得自己仿佛是到了一个瓶颈，无法突破，投简历又始终没有面试邀约，心态逐渐发生了变化有些着急，想着不如趁着这个时期静下心来提升自己。遂想着试着仿写前公司的模板编辑器。</p><h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h2><p>模板编辑器是一个类似word的编辑器，但是不能手动添加文本等等，必须使用内置的控件来生成特定场景下的模板。例如医院的病例报告，可能不同的科室上有不同的特定病因名词，又或者要展示某个病因，则需要开发对应的控件。</p><p>今天这个模板编辑器没有实现那么复杂的控件，但是核心模块实现其实这些也就达到目的了</p><p><em>说明：目前编辑器只实现了前端部分，没有涉及到后端填充数据，所以也就没有绑定数据key等逻辑</em></p><h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/202410281534536.png" alt="template_editor" tabindex="0" loading="lazy"><figcaption>template_editor</figcaption></figure><ol><li>支持拖拉添加控件</li><li>控件可拖拉移动</li><li>控件拖拉时显示对齐辅助线</li><li>控件可被组合</li><li>撤销重做&amp;历史记录</li><li>字体，字体大小、边框、尺寸、属性修改，是否显示下划线、虚线</li><li>模板可支持预览</li><li>画布可支持修改：尺寸、方向、边距</li><li>画布支持缩放</li><li>画布支持拖拉</li><li>模板支持预览</li></ol><h3 id="原型" tabindex="-1"><a class="header-anchor" href="#原型" aria-hidden="true">#</a> 原型</h3><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1730276804.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="整体架构" tabindex="-1"><a class="header-anchor" href="#整体架构" aria-hidden="true">#</a> 整体架构</h3><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1730276834.png" alt="模板编辑器应用架构" tabindex="0" loading="lazy"><figcaption>模板编辑器应用架构</figcaption></figure><h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h2><p>编辑器采用<code>Vue2.7.14</code> + <code>ES6+</code> + <code>SCSS</code> + <code>PUG</code> 开发，之所以没用 <code>Vue3</code> 是应为我当时还不会 <code>Vue3</code>，手动狗头</p><p>其主要目的是学习 <code>组合式api</code>，从而后面可以平滑过渡到 <code>Vue3</code></p><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./src/views/template
├── action
│   ├── image
│   │   └── sprite.svg
│   ├── index.vue  --------------------- 模板编辑器入口
│   ├── template-aside.vue ------------- 模板编辑器左边栏（控件栏）模块
│   ├── template-editor.vue ------------ 模板编辑器模块
│   ├── template-property-option.vue --- 模板编辑器特殊属性模块
│   ├── template-property.vue ---------- 模板编辑器控件属性模块
│   ├── template-stage.vue ------------- 模板编辑器画布
│   └── template-toolbar.vue ----------- 模板编辑器工具栏
├── components ------------------------- 模板编辑器组件
│   ├── builtin ------------------------ 内置控件
│   │   ├── builtin-group.vue ---------- 内置控件-组
│   │   ├── builtin-input.vue ---------- 内置控件-输入框
│   │   ├── builtin-select.vue --------- 内置控件-下拉选择
│   │   ├── index.js
│   │   └── mixins --------------------- 控件公共props逻辑
│   │       └── index.js
│   ├── template-area.vue -------------- 模板编辑器框选组件(核心组件)
│   ├── template-contextmenu.vue ------- 模板编辑器右键菜单组件
│   ├── template-control.vue ----------- 模板编辑器控件拖拉组件(核心组件)
│   ├── template-document -------------- 模板编辑器文档模式(不可编辑控件，但是可对控件进行，输入或者选择值，设置预设值)
│   │   ├── index.js
│   │   └── render.vue
│   ├── template-mark-line.vue --------- 模板编辑器辅助线组件(纯渲染) 辅助线实现逻辑需要看  hooks/useMarkLine.js
├── constant.js ------------------------ 模板常量(事件名称)
├── hooks ------------------------------ 模板hooks
│   ├── useBorder.js ------------------- 计算边距大小(因为使用的是mm,所以需要转为px)
│   ├── useBuiltin.js ------------------ 使用内置控件(编辑器侧边栏展示的控件)
│   ├── useMarkLine.js ----------------- 提供计算辅助线显示隐藏和自动对齐功能
│   ├── usePadding.js ------------------ 画布边距
│   ├── useProperty.js ----------------- 初始化内置组件属性
│   ├── useRecord.js ------------------- 提供历史记录功能
│   ├── useSetting.js ------------------ 提供预设内置组件特殊属性配置
│   ├── useSize.js --------------------- 预设画布尺寸
│   ├── useStore.js -------------------- 编辑器全局状态(核心功能)
│   └── useToHtml.js ------------------- 将模板转为普通HTML预览展示
└── utils
    ├── index.js ----------------------- 工具函数库，包含自定义事件创建组件&amp;组，删除组，属性类，获取组件在画布内的位置，格式化控件属性
    └── record.js ---------------------- 历史记录日志打印

8 directories, 36 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>我的文字功底一直很差😅，上学时候写作文作文编都不会编，将就着读，见谅见谅。有问题留言我会一一解答</p>`,24))])}const v=i(r,[["render",t],["__file","template_editor_guide.html.vue"]]);export{v as default};
