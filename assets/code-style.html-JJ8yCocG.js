import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as c,c as o,e as i,a as n,d as s,b as t,f as e}from"./app-HLGm9jUa.js";const u="/image/2017_yamaha_mt_10_4k.jpg",d={},r=n("figure",null,[n("img",{src:u,alt:"2017_yamaha_mt_10_4k",tabindex:"0",loading:"lazy"}),n("figcaption",null,"2017_yamaha_mt_10_4k")],-1),k=n("p",null,"规范不是强制性的，对代码的编写和程序的运行不会有致命的问题，但是没有规范会有一系列的问题，比如：",-1),v=n("p",null,"缺乏规范，第一个问题就是团队编码风格不一，增加了成员之间代码的阅读成本，加大了团队协作成本和维护成本； 随着团队人员的变化（多人开发一个应用，或者应用更换开发人员），如果缺乏规范，项目可能会变得一团糟，甚至失控； 即便是个人开发，规范也是需要的，当把项目转给其他人的时候，如果有规范的话，会大大降低阅读成本。",-1),m=e('<h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h2><blockquote><p>基本命名准则</p><ul><li><p>贴合业务</p></li><li><p>简洁、语义化，能够英文释义</p></li><li><p>始终保持一种命名方法。项目中可能多人协同开发，而命名方式有多种都是可行的，进行开发时应保持原来代码命名风格</p></li><li><p>书写时 名词在前 动词形容词在后</p><p>例如：productAdd、productDel</p></li></ul></blockquote><h3 id="项目命名" tabindex="-1"><a class="header-anchor" href="#项目命名" aria-hidden="true">#</a> 项目命名</h3><p>命名使用 snake_case 规则（全部采用小写方式，以下划线分隔）</p><p>正例：h5_station_company</p><p>反例：H5_STATION_COMPANY / h5StationCompany</p><h3 id="目录命名" tabindex="-1"><a class="header-anchor" href="#目录命名" aria-hidden="true">#</a> 目录命名</h3><p>命名使用 kebab-case 规则（全部采用小写方式， 以中划线分隔），有复数结构时，要采用复数命名法， 缩写不用复数）</p><p>注意：</p><p>公共组件以及页面入口，需要单独命名 xxxx/index.vue</p><p>UNI-APP 页面入口，需要文件名跟文件夹名一致（pages/user/user.vue）</p><p>正例：</p><p>src/views/user/index.vue</p><p>反例：</p><p>src/views/user.vue</p><p>**【特殊】**项目中的 components 中的组件目录，使用 kebab-case命名</p><p>正例： components/head-search/page-loading/index.vue</p><p>反例：components/headSearch/pageLoading/index.vue</p><p>**【特殊】**项目中的 其他目录也应使用 kebab-case命名</p><p>正例： src/pages/layout-header/index.vue</p><p>反例：src/pages/layoutHeader/index.vue</p><h3 id="js、css、scss、html、png-等文件命名" tabindex="-1"><a class="header-anchor" href="#js、css、scss、html、png-等文件命名" aria-hidden="true">#</a> JS、CSS、SCSS、HTML、PNG 等文件命名</h3><p>命名使用 kebab-case 规则（全部采用小写方式，以中线分隔）</p><p>正例： src/images/layout-header.jpg</p><p>反例：src/images/layoutHeader.jpg</p><p>**【特殊】**js/ts 文件</p><p>正例： src/utils/eventBus.js</p><p>反例：src/utils/eventbus.js</p><p>不推荐：src/utils/event-bus.js</p><h3 id="命名严谨性" tabindex="-1"><a class="header-anchor" href="#命名严谨性" aria-hidden="true">#</a> 命名严谨性</h3><p>代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。 说明：正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用</p><p>正例：rmb/shanghai 等国际通用的名称，可视同英文</p><p>反例： Jiage [价格] / getShujuList() [数据列表]</p><p>杜绝完全不规范的缩写，避免望文不知义：</p><p>反例： button“缩写”命名成 bt；product “缩写”命名成 pro，此类随意缩写严重 降低了代码的可阅读性</p><p>严禁ABCD123456此类命名</p><h3 id="css-命名规范" tabindex="-1"><a class="header-anchor" href="#css-命名规范" aria-hidden="true">#</a> css 命名规范</h3><h4 id="id" tabindex="-1"><a class="header-anchor" href="#id" aria-hidden="true">#</a> id</h4><p>命名使用 kebab-case 规则（全部采用小写方式，以中线分隔）</p><p>正例： #user-avatar</p><p>反例：#userAvatar</p><h4 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> class</h4>',42),b={href:"https://getbem.com/",target:"_blank",rel:"noopener noreferrer"},g=e(`<p>命名模式</p><ul><li>block {}，block 代表了更高级别的抽象或组件。(多词 - 中划线分割)</li><li>block__element {}，代表 .block 的后代，用于形成一个完整的 .block 的整体。 (多词 - 中划线分割)</li><li>block–modifier {}，代表 .block 的不同状态或不同版本。(多词 - 中划线分割)</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/** 块 */</span>
<span class="token selector">.nav-primary</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">/** 块__元素 */</span>
.nav-primary__link
<span class="token comment">/** 块__元素--修饰符 */</span>
.nav-primary__link--is-active

<span class="token comment">/** 块 */</span>
.grid
<span class="token comment">/** 块__元素 */</span>
.grid__description
<span class="token comment">/** 块__元素 */</span>
.grid__img-wrap
<span class="token comment">/** 块__元素 */</span>
.grid__img

<span class="token comment">/** 块 */</span>
.global-footer
<span class="token comment">/** 块__元素 */</span>
.global-footer__col
<span class="token comment">/** 块__元素 */</span>
.global-footer__header
<span class="token comment">/** 块__元素 */</span>
.global-footer__link
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form form--simple<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form__input<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form__button form__button--disabled<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card-head<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card-head__title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card-head__title__sub<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>子标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card-inner<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>head<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>title-sub<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>子标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>inner<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>article<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>article-body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>article__button-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>按钮1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>article__button-success<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>按钮2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>article<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>按钮1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button-success<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>按钮2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考引用</p>`,13),h={href:"https://codeguide.bootcss.com/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://getbem.com/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844903740978249735",target:"_blank",rel:"noopener noreferrer"},y=e(`<h4 id="书写顺序" tabindex="-1"><a class="header-anchor" href="#书写顺序" aria-hidden="true">#</a> 书写顺序</h4><p>书写顺序按照（相同层级顺序按照字符长度排先后顺序）</p><ul><li>元素位置 层级 显示方式</li><li>元素大小尺寸 对齐方式</li><li>字体 行高</li><li>颜色</li><li>元素外貌修饰</li><li>动画过度设置</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.card</span> <span class="token punctuation">{</span>
    <span class="token comment">/** 元素位置 层级 显示方式 */</span>
    <span class="token property">position</span><span class="token punctuation">:</span> reactive<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>

    <span class="token comment">/** 元素大小尺寸 对齐方式 */</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>

    <span class="token comment">/** 字体 行高 */</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 1.6<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>

    <span class="token comment">/** 颜色 */</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>

    <span class="token comment">/** 元素外貌修饰 */</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> default<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #e8e8e8<span class="token punctuation">;</span>

    <span class="token comment">/** 动画过度设置 */</span>
    <span class="token property">transition-duration</span><span class="token punctuation">:</span> 0.1s<span class="token punctuation">;</span>
    <span class="token property">transition-timing-function</span><span class="token punctuation">:</span> ease-in<span class="token punctuation">;</span>
    <span class="token property">transition-property</span><span class="token punctuation">:</span> color<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常用的-css-命名规则" tabindex="-1"><a class="header-anchor" href="#常用的-css-命名规则" aria-hidden="true">#</a> 常用的 CSS 命名规则</h4><ul><li>头：header</li><li>内容：content/container/wrapper/inner</li><li>尾：footer</li><li>导航：nav</li><li>侧栏：sidebar</li><li>栏目：column</li><li>页面外围控制整体佈局宽度：wrapper</li><li>左右中：left right center</li><li>登录条：login-bar</li><li>标志：logo</li><li>广告：banner</li><li>页面主体：main</li><li>热点：hot</li><li>新闻：news</li><li>下载：download</li><li>子导航：sub-nav</li><li>菜单：menu</li><li>子菜单：submenu</li><li>搜索：search</li><li>友情链接：friend-link</li><li>页脚：footer</li><li>版权：copyright</li><li>滚动：scroll</li><li>标签：tag</li><li>文章列表：list</li><li>提示信息：msg/message</li><li>小技巧：tips</li><li>栏目标题：title</li><li>加入：join</li><li>指南：guide</li><li>服务：service</li><li>注册：register</li><li>状态：status</li><li>投票：vote</li><li>合作伙伴：partner</li></ul><h3 id="js-命名规范" tabindex="-1"><a class="header-anchor" href="#js-命名规范" aria-hidden="true">#</a> JS 命名规范</h3><p>根据 eslint 配置</p><h4 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h4><p>命名方法：小驼峰式命名法</p><p>命名规范：前缀应当是名词 + 后缀动词</p><p>正例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> maxCount <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">let</span> tableTitle <span class="token operator">=</span> <span class="token string">&#39;销售数据&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>反例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> max_count <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">let</span> table_title <span class="token operator">=</span> <span class="token string">&#39;销售数据&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h4><p>命名方法：名称全部大写(必须使用 const 声明)</p><p>命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">MAX_COUNT</span> <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">const</span> <span class="token constant">TABLE_TITLE</span> <span class="token operator">=</span> <span class="token string">&#39;销售数据&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h4><p>命名方法：小驼峰式命名法</p><p>命名规范：前缀应当是动词 + 后缀名词</p><p>动词列表：</p><table><thead><tr><th>动词</th><th>含义</th><th>返回值</th></tr></thead><tbody><tr><td>can</td><td>判断是否可执行某个动作(权限)</td><td>函数返回一个布尔值。true：可执行；false：不可执行</td></tr><tr><td>has</td><td>判断是否含有某个值</td><td>函数返回一个布尔值。true：含有此值；false：不含有此值</td></tr><tr><td>is</td><td>判断是否为某个值</td><td>函数返回一个布尔值。true：为某个值；false：不为某个值</td></tr><tr><td>get</td><td>获取某个值</td><td>函数返回一个非布尔值</td></tr><tr><td>set</td><td>设置某个值</td><td>无返回值、返回是否设置成功或者返回链式对象</td></tr><tr><td>load</td><td>加载某些数据</td><td>无返回值或者返回是否加载完成的结果</td></tr><tr><td>create</td><td>创建某些数据</td><td>必须要有返回值</td></tr><tr><td>remove</td><td>移除某些数据</td><td>无返回值或者返回是已移除的结果</td></tr></tbody></table><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h4><p>命名方法：大驼峰式</p><p>命名规范：前缀为名称</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Persion</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> options<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="类的成员" tabindex="-1"><a class="header-anchor" href="#类的成员" aria-hidden="true">#</a> 类的成员</h4><p>公共属性和方法：小驼峰</p><p>私有属性和方法：前缀为_(下划线)，后面小驼峰</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Persion</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> options<span class="token punctuation">.</span>name
        <span class="token keyword">this</span><span class="token punctuation">.</span>_sex <span class="token operator">=</span> options<span class="token punctuation">.</span>sex
    <span class="token punctuation">}</span>

	<span class="token function">_full</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">姓名：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 性别：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>_sex<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>

	<span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;你好&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>附常用的动词列表：</p><table><thead><tr><th>get 获取</th><th>set 设置</th><th>add 增加</th><th>remove 删除</th></tr></thead><tbody><tr><td>create 创建</td><td>destroy 移除</td><td>start 启动</td><td>stop 停止</td></tr><tr><td>open 打开</td><td>close 关闭</td><td>read 读取</td><td>write 写入</td></tr><tr><td>load 载入</td><td>save 保存</td><td>begin 开始</td><td>end 结束</td></tr><tr><td>backup 备份</td><td>restore 恢复</td><td>import 导入</td><td>export 导出</td></tr><tr><td>split 分割</td><td>merge 合并</td><td>inject 注入</td><td>delete 移除</td></tr><tr><td>add 加入</td><td>append 添加</td><td>clean 清理</td><td>clear 清除</td></tr><tr><td>index 索引</td><td>sort 排序</td><td>find 查找</td><td>search 搜索</td></tr><tr><td>increase 增加</td><td>decrease 减少</td><td>play 播放</td><td>pause 暂停</td></tr><tr><td>launch 启动</td><td>run 运行</td><td>compile 编译</td><td>execute 执行</td></tr><tr><td>debug 调试</td><td>trace 跟踪</td><td>observe 观察</td><td>listen 监听</td></tr><tr><td>build 构建</td><td>publish 发布</td><td>input 输入</td><td>output 输出</td></tr><tr><td>encode 编码</td><td>decode 解码</td><td>encrypt 加密</td><td>decrypt 解密</td></tr><tr><td>compress 压缩</td><td>decompress 解压缩</td><td>pack 打包</td><td>unpack 解包</td></tr><tr><td>parse 解析</td><td>emit 生成</td><td>connect 连接</td><td>disconnect 断开</td></tr><tr><td>send 发送</td><td>receive 接收</td><td>download 下载</td><td>upload 上传</td></tr><tr><td>refresh 刷新</td><td>sync 同步</td><td>update 更新</td><td>revert 复原</td></tr><tr><td>lock 锁定</td><td>unlock 解锁</td><td>check out 签出</td><td>check in 签入</td></tr><tr><td>submit 提交</td><td>commit 交付</td><td>push 推</td><td>pull 拉</td></tr><tr><td>expand 展开</td><td>collapse 折叠</td><td>begin 起始</td><td>end 结束</td></tr><tr><td>start 开始</td><td>finish 完成</td><td>enter 进入</td><td>exit 退出</td></tr><tr><td>abort 放弃</td><td>quit 离开</td><td>obsolete 废弃</td><td>depreciate 废旧</td></tr><tr><td>collect 收集</td><td>collection 合集</td><td></td><td></td></tr></tbody></table>`,35);function q(x,j){const a=l("ExternalLinkIcon");return c(),o("div",null,[r,k,v,i(" more "),m,n("p",null,[s("命名使用 CSS "),n("a",b,[s("BEM"),t(a)]),s(" 规则（全部采用小写方式，以中线、下划线分隔）")]),g,n("p",null,[n("a",h,[s("https://codeguide.bootcss.com/"),t(a)])]),n("p",null,[n("a",_,[s("https://getbem.com/"),t(a)])]),n("p",null,[n("a",f,[s("https://juejin.cn/post/6844903740978249735"),t(a)])]),y])}const N=p(d,[["render",q],["__file","code-style.html.vue"]]);export{N as default};
