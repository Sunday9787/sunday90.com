import{_ as s,o as a,c as p,a as e,e as t,f as o}from"./app-CZ3SipWw.js";const c={};function i(l,n){return a(),p("div",null,[n[0]||(n[0]=e("p",null,"没有石油的的钢铁巨兽就是一堆废铜烂铁...",-1)),t(" more "),n[1]||(n[1]=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>编辑的状态管理对于整个编辑器至关重要，如果数据结构没有设计好，则很容易导致在错误的路上一路走到黑。。。开发陷入死胡同。</p><p>不论做什么项目写什么功能，第一行代码绝不能是直接写逻辑，否则，就是在拉💩。</p><p>必要经过</p><p>项目介绍 -&gt; 需求分析 -&gt; 模块拆分 -&gt; 功能设计 -&gt; 数据模型设计 -&gt; 页面绘制 -&gt; 逻辑开发</p><h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2><p>编辑器画布有边距，尺寸和方向，模板名称、撤销队列、重做队列、当前控件</p><h2 id="设计" tabindex="-1"><a class="header-anchor" href="#设计" aria-hidden="true">#</a> 设计</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token keyword">get</span> <span class="token function">changes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Size
  direction<span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;horizontal&#39;</span>
  padding<span class="token operator">:</span> Padding
  currentComponent<span class="token operator">:</span> BuiltinComponent
  components<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">,</span> BuiltinComponent<span class="token operator">&gt;</span>
  componentsData<span class="token operator">:</span> BuiltinComponent<span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token doc-comment comment">/** 历史记录 */</span>
  record<span class="token operator">:</span> BuiltinComponentRecord<span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token doc-comment comment">/** 恢复队列 */</span>
  restore<span class="token operator">:</span> BuiltinComponentRecord<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="size" tabindex="-1"><a class="header-anchor" href="#size" aria-hidden="true">#</a> Size</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> readonly <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">const</span> <span class="token constant">A4</span> <span class="token operator">=</span> <span class="token function">readonly</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;A4&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">vertical</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">794</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1123</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">horizontal</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">1123</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">794</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token constant">A5</span> <span class="token operator">=</span> <span class="token function">readonly</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;A5&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">vertical</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">559</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">794</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">horizontal</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">794</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">559</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token constant">A4</span><span class="token punctuation">,</span> <span class="token constant">A5</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义每一种尺寸的两个方向尺寸，这样切换时只需要切换尺寸名称即可，画布根据名称自动调整尺寸</p><h3 id="padding" tabindex="-1"><a class="header-anchor" href="#padding" aria-hidden="true">#</a> Padding</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">usePadding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> padding <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token number">20</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> padding
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>间距</p><h3 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> Store</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> usePadding <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./usePadding&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useSize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./useSize&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> changes <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">const</span> size <span class="token operator">=</span> <span class="token function">useSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> padding <span class="token operator">=</span> <span class="token function">usePadding</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token doc-comment comment">/**
   * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Template<span class="token punctuation">.</span>Store<span class="token punctuation">}</span></span>
   */</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">direction</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">get</span> <span class="token function">changes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> changes
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">set</span> <span class="token function">changes</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      changes <span class="token operator">=</span> val
      <span class="token keyword">this</span><span class="token punctuation">.</span>componentsData <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>components<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> size<span class="token punctuation">.</span><span class="token constant">A4</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span>
      <span class="token doc-comment comment">/** <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> */</span>
      <span class="token keyword">get</span> <span class="token function">width</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> size<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">[</span>state<span class="token punctuation">.</span>direction<span class="token punctuation">]</span><span class="token punctuation">.</span>width
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token doc-comment comment">/** <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> */</span>
      <span class="token keyword">get</span> <span class="token function">height</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> size<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">[</span>state<span class="token punctuation">.</span>direction<span class="token punctuation">]</span><span class="token punctuation">.</span>height
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    padding<span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Map<span class="token punctuation">&lt;</span>string<span class="token punctuation">,</span> Template<span class="token punctuation">.</span>BuiltinComponent<span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span>
     */</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Template<span class="token punctuation">.</span>BuiltinComponent<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
     */</span>
    <span class="token literal-property property">componentsData</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 历史记录
     * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Template<span class="token punctuation">.</span>BuiltinComponentRecord<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
     */</span>
    <span class="token literal-property property">record</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 恢复队列
     * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Template<span class="token punctuation">.</span>BuiltinComponentRecord<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
     */</span>
    <span class="token literal-property property">restore</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Template<span class="token punctuation">.</span><span class="token operator">|</span><span class="token keyword">null</span><span class="token punctuation">}</span></span>
     */</span>
    <span class="token literal-property property">currentComponent</span><span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> state
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>components</code> 在 store 里我试用了 <code>Map</code> 数据结构来存储控件数据</p><p>为什么使用 <code>Map</code> 存而不是 <code>Array</code> ？</p><blockquote><p>如果使用 <code>Array</code>，那么删除控件时需要准确知道控件的 <code>index</code>。如果是在控件视图上加一个删除按钮则很容易实现删除，但是删除不是跟控件一个视图层上，所以你需要单独维护一个 <code>index</code> 挺费力，使用 <code>Map</code> 则仅仅需要知道 <code>key</code> 即可</p></blockquote><p>为什么会有 <code>componentsData</code> 它跟 <code>components</code> 有什么区别？</p><blockquote><p>没有区别，同样都是存组件数据，但是注意听</p><p>Vue2 的数据劫持并不能劫持Map这类数据，因为vue2劫持数据核心是，使用<code>Object.defineProperty</code> 劫持这些内部操作（如 <code>set</code>、<code>delete</code> 等方法）它们没有固定的属性键名（不像普通对象那样有具体的键值对），所以无法通过定义特定属性的 <code>getter</code> 和 <code>setter</code> 来监听。</p><p>所以需要一个数组来存可响应式数据。</p></blockquote><p>那么上面说Map数据不能被劫持那么，Map数据更新后如何才能刷新视图呢？</p><blockquote><p>非常简单，定义一个变量 <code>changes</code>，<code>Map</code> 数据更新后，手动触发 <code>changes</code> 变化，<code>changesset</code> 触发后 则更新 <code>componentsData</code> 响应式变量即可。</p><p><strong>画布上遍历生成控件使用的变量必须是</strong> <code>componentsData</code></p></blockquote><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>希望你能看懂为何要如此实现，这样你就能跟我一样强了。</p><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1732024503.jpg" alt="不要盲目的崇拜我" tabindex="0" loading="lazy"><figcaption>不要盲目的崇拜我</figcaption></figure>`,28))])}const u=s(c,[["render",i],["__file","template_store.html.vue"]]);export{u as default};
