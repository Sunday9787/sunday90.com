import{_ as s,o as a,c as t,a as p,e,f as o}from"./app-CZ3SipWw.js";const c={};function l(i,n){return a(),t("div",null,[n[0]||(n[0]=p("p",null,"框选这个功能 easy 非常 so easy😉",-1)),e(" more "),n[1]||(n[1]=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>这玩意就是翻版的 Photoshop 框选工具，没错我就是设计出身😌</p><h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2><p>框选的时候，如果控件在框选范围内则就算是框选上，直接组合成组。当然可以做成一个快捷键组成组，其实对于这种应用来讲，没必要，快捷方便才是第一位，它并不是图像处理。</p><h2 id="设计" tabindex="-1"><a class="header-anchor" href="#设计" aria-hidden="true">#</a> 设计</h2><p>esay 非常 easy</p><p>监听鼠标移动然后遍历所有控件比对 控件的四角位置是不是在，鼠标绘制的范围内，如果在，就组合在一块</p><p>get</p><h2 id="视图" tabindex="-1"><a class="header-anchor" href="#视图" aria-hidden="true">#</a> 视图</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pug<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
svg.template-area(
  xmlns=&quot;http://www.w3.org/2000/svg&quot;
  :width=&quot;rectStyle.width&quot;
  :height=&quot;rectStyle.height&quot;
  :style=&quot;{ left: rectStyle.left, top: rectStyle.top }&quot;)
  rect(stroke=&quot;var(--color-primary)&quot; fill=&quot;rgba(0, 0, 0, 0.1)&quot; stroke-width=&quot;1&quot; height=&quot;100%&quot; width=&quot;100%&quot;)
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;TemplateArea&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;stageInstance&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">scale</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>Name</th><th>Type</th><th>说明</th></tr></thead><tbody><tr><td><code>scale</code></td><td><code>Number</code></td><td>缩放比例(20-100)</td></tr></tbody></table><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
* <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Ref<span class="token punctuation">&lt;</span><span class="token punctuation">{</span>x<span class="token operator">:</span> number<span class="token punctuation">,</span> y<span class="token operator">:</span> number<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span>
* 鼠标暂存的位置
*/</span>
<span class="token keyword">const</span> stagePosition <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token comment">// 鼠标划过的宽高XY</span>
<span class="token keyword">const</span> rect <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
* <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Map<span class="token punctuation">&lt;</span>number<span class="token punctuation">,</span> Template<span class="token punctuation">.</span>BuiltinComponent<span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>PointerEvent<span class="token punctuation">}</span></span> <span class="token parameter">e</span>
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">pointerdown</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>stageInstance<span class="token punctuation">.</span>spaceDown<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">const</span> scale <span class="token operator">=</span> props<span class="token punctuation">.</span>scale <span class="token operator">/</span> <span class="token number">100</span>
  <span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageX <span class="token operator">-</span> vm<span class="token punctuation">.</span>stageRect<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">/</span> scale <span class="token operator">-</span> vm<span class="token punctuation">.</span>offset<span class="token punctuation">.</span>x
  <span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageY <span class="token operator">-</span> vm<span class="token punctuation">.</span>stageRect<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">/</span> scale <span class="token operator">-</span> vm<span class="token punctuation">.</span>offset<span class="token punctuation">.</span>y

  rect<span class="token punctuation">.</span>x <span class="token operator">=</span> x
  rect<span class="token punctuation">.</span>y <span class="token operator">=</span> y

  stagePosition<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> e<span class="token punctuation">.</span>pageX<span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> e<span class="token punctuation">.</span>pageY <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要是位置的初始化操作</p><p><code>components</code> 是为了存框选范围内的空间</p><h3 id="框选" tabindex="-1"><a class="header-anchor" href="#框选" aria-hidden="true">#</a> 框选</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>PointerEvent<span class="token punctuation">}</span></span> <span class="token parameter">e</span>
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">pointermove</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>stagePosition<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> scale <span class="token operator">=</span> props<span class="token punctuation">.</span>scale <span class="token operator">/</span> <span class="token number">100</span>
    <span class="token keyword">const</span> w <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageX <span class="token operator">-</span> stagePosition<span class="token punctuation">.</span>value<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">/</span> scale
    <span class="token keyword">const</span> h <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageY <span class="token operator">-</span> stagePosition<span class="token punctuation">.</span>value<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">/</span> scale

    rect<span class="token punctuation">.</span>w <span class="token operator">=</span> w
    rect<span class="token punctuation">.</span>h <span class="token operator">=</span> h

    store<span class="token punctuation">.</span>components<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> component <span class="token operator">=</span> store<span class="token punctuation">.</span>components<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>uid<span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        item<span class="token punctuation">.</span>props<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&gt;=</span> rect<span class="token punctuation">.</span>x <span class="token operator">&amp;&amp;</span>
        item<span class="token punctuation">.</span>props<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;=</span> rect<span class="token punctuation">.</span>x <span class="token operator">+</span> rect<span class="token punctuation">.</span>w <span class="token operator">&amp;&amp;</span>
        item<span class="token punctuation">.</span>props<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&gt;=</span> rect<span class="token punctuation">.</span>y <span class="token operator">&amp;&amp;</span>
        item<span class="token punctuation">.</span>props<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;=</span> rect<span class="token punctuation">.</span>y <span class="token operator">+</span> rect<span class="token punctuation">.</span>h
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>components<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>component<span class="token punctuation">.</span>uid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          components<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>component<span class="token punctuation">.</span>uid<span class="token punctuation">,</span> component<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遍历所有控件，判断xy是否在框选的矩形范围内，如果框选内的组件Map存在则跳过，否则存进Map。</p><p><em>目前只实现了从左上角到右下角框选，没有实现另外三个方向</em></p><h3 id="框选完成" tabindex="-1"><a class="header-anchor" href="#框选完成" aria-hidden="true">#</a> 框选完成</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>PointerEvent<span class="token punctuation">}</span></span> <span class="token parameter">e</span>
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">pointerup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  stagePosition<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span>
  rect<span class="token punctuation">.</span>w <span class="token operator">=</span> rect<span class="token punctuation">.</span>h <span class="token operator">=</span> rect<span class="token punctuation">.</span>x <span class="token operator">=</span> rect<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>components<span class="token punctuation">.</span>size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>components<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;area&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    components<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;unArea&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重置变量</p><p>触发area事件后，画布接收此事件，并emit到<code>eventBus</code>事件管理中。</p><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>为什么要在画布中中转一次事件？</p><p>因为如果直接在area组件中直接emit事件到<code>eventBus</code>事件中心，太过于分散，不利于维护，且不利于扩展</p><p>这样做的优势在于：</p><ol><li><p><strong>降低耦合</strong>：子组件不会直接与全局 EventBus 交互，这样就减少了对子组件的依赖，使得子组件更加独立和可复用。</p></li><li><p><strong>事件管理清晰</strong>：父组件成为事件的“路由器”，它可以控制哪些事件需要广播到全局，以及如何进行广播。</p></li><li><p><strong>可维护性</strong>：如果需要变更全局 EventBus 的逻辑，直接修改父组件的处理逻辑即可，而不必调整子组件。</p></li></ol><p><em>事实上，编辑器内所有的组件都是这样传递事件的</em></p><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1731608104.jpg?imageMogr2/interlace/1/quality/100/thumbnail/400x" alt="好饿早知道不做前端了" tabindex="0" loading="lazy"><figcaption>好饿早知道不做前端了</figcaption></figure>`,33))])}const r=s(c,[["render",l],["__file","template_editor_area.html.vue"]]);export{r as default};