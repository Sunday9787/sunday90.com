import{_ as s,o as a,c as t,a as p,e,f as o}from"./app-CxMWSuJm.js";const c={};function l(i,n){return a(),t("div",null,[n[0]||(n[0]=p("p",null,"虚拟列表-完美的障眼法",-1)),e(" more "),n[1]||(n[1]=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>虚拟列表在C端和B端大量数据展示，有些切图仔一点不陌生，有些就很陌生感觉很高端的样子呢🧐</p><h2 id="什么是虚拟列表" tabindex="-1"><a class="header-anchor" href="#什么是虚拟列表" aria-hidden="true">#</a> 什么是虚拟列表</h2><p>有的特殊场景我们不能分页，只能渲染一个长列表。这个长列表中可能有几万条数据，如果全部渲染到页面上用户的设备差点可能就会直接卡死了，这时我们就需要虚拟列表来解决问题</p><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1737532126.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中实线框的item表示在视口区域内真实渲染DOM，虚线框的item表示并没有渲染的DOM。</p><p>在item固定的的虚拟列表中，我们可以根据<code>可视区域的高度</code>和<code>每个item的高度</code>计算得出在可视区域内可以渲染多少个item。不在可视区域里面的item那么就不需要渲染了（不管有几万个还是几十万个item），这样就能解决长列表性能很差的问题啦。</p><h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2><p>我们需要知道item 的高度 从而计算出 可视区应该展示多少个 item，通过滚动条拖动来动态计算 可视区展示的items</p><p>滚动条如何产生？</p><p>滚动容器内放置一个div原素 高度 = 总数据的长度 * item的高度即可</p><h2 id="实现滚动条" tabindex="-1"><a class="header-anchor" href="#实现滚动条" aria-hidden="true">#</a> 实现滚动条</h2><p>根据上图dom结构应该是这样子</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-list<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ol</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-container<span class="token punctuation">&#39;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token value css language-css"><span class="token punctuation">{</span>this.containerStyle<span class="token punctuation">}</span></span></span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- 只渲染可视区域列表数据 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ol</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.app-virtual-list</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
  <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.app-virtual-container</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">inset</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.app-virtual-scroll-bar</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="滚动条怎么来" tabindex="-1"><a class="header-anchor" href="#滚动条怎么来" aria-hidden="true">#</a> 滚动条怎么来？</h3><p>非常简单，我们知道每个item的高度<code>itemHeight</code>，并且知道有多少条数据<code>data.length</code>。那么<code>itemHeight * data.length</code>不就是真实的列表高度了吗</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-list<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-scroll-bar<span class="token punctuation">&#39;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token value css language-css"><span class="token punctuation">{</span><span class="token punctuation">{</span></span></span></span> <span class="token attr-name"><span class="token namespace">height:</span></span> <span class="token attr-name">this.listHeight</span> <span class="token attr-name">+</span> <span class="token attr-name">&#39;px&#39;</span> <span class="token attr-name">}}</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ol</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-container<span class="token punctuation">&#39;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token value css language-css"><span class="token punctuation">{</span>this.containerStyle<span class="token punctuation">}</span></span></span></span><span class="token punctuation">&gt;</span></span>
		<span class="token comment">&lt;!-- 只渲染可视区域列表数据 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ol</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.app-virtual-scroll-bar</code> 采用绝对定位，为了不遮挡住内容，所以需要设置<code>z-index: -1</code></p><h3 id="可视区展示多少个item" tabindex="-1"><a class="header-anchor" href="#可视区展示多少个item" aria-hidden="true">#</a> 可视区展示多少个item？</h3><p>实际上非常简单</p><p>可视区可展示数量 = 向上取整（可视区高度 / item 高度）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 可视区高度
 */</span>
<span class="token keyword">const</span> screenHeight <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
 * 可视区可展示数量 = 向上取整（可视区高度 / item 高度）
 */</span>
<span class="token keyword">const</span> visibleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>screenHeight<span class="token punctuation">.</span>value <span class="token operator">/</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  screenHeight<span class="token punctuation">.</span>value <span class="token operator">=</span> virtualContainer<span class="token punctuation">.</span>value<span class="token punctuation">.</span>clientHeight
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>可视区高度 = app-virtual-list容器的高度</code></p><p>为什么要使用<code>Math.ceil</code>向上取整呢？</p><p>因为如果少了一个在滚动时只要有个item在可视区域漏了一点出来，我们也应该将其渲染</p><p>此时我们得到一下几个变量</p><ul><li>可视区可展示数量 = 向上取整（可视区高度 / item 高度）</li><li>数据的结束索引 = 起始索引 + 可视区可展示数量</li><li>数据起始索引 = 向下取整（滚动高度 / item 高度）</li><li>真实渲染items = 总数据列表.slice(数据起始索引, 数据结束索引)</li><li>列表总高度 = item高度 * 总数据列表长度</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 可视区高度
 */</span>
<span class="token keyword">const</span> screenHeight <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Ref<span class="token punctuation">&lt;</span>HTMLUListElement<span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">const</span> virtualContainer <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 可视区可展示数量 = 向上取整（可视区高度 / item 高度）
 */</span>
<span class="token keyword">const</span> visibleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>screenHeight<span class="token punctuation">.</span>value <span class="token operator">/</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 滚动的高度
 */</span>
<span class="token keyword">const</span> scrollTop <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 列表总高度 = item 高度 * 总数量
 */</span>
<span class="token keyword">const</span> listHeight <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span>length <span class="token operator">*</span> props<span class="token punctuation">.</span>itemHeight
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 数据的起始索引 = 向下取整（滚动高度 / item 高度）
 */</span>
<span class="token keyword">const</span> startIndex <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>scrollTop<span class="token punctuation">.</span>value <span class="token operator">/</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 数据的结束索引 = 起始索引 + 可视区可展示数量
 */</span>
<span class="token keyword">const</span> endIndex <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> startIndex<span class="token punctuation">.</span>value <span class="token operator">+</span> visibleCount<span class="token punctuation">.</span>value
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> offset <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 列表显示数据为
 */</span>
<span class="token keyword">const</span> visibleData <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>startIndex<span class="token punctuation">.</span>value<span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>endIndex<span class="token punctuation">.</span>value<span class="token punctuation">,</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Ref<span class="token punctuation">&lt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;vue/types/jsx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>StyleValue<span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">const</span> containerStyle <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">translate3d(0, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>offset<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px, 0)</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  screenHeight<span class="token punctuation">.</span>value <span class="token operator">=</span> virtualContainer<span class="token punctuation">.</span>value<span class="token punctuation">.</span>clientHeight
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为何起始索引是由-向下取整-滚动高度-item-高度" tabindex="-1"><a class="header-anchor" href="#为何起始索引是由-向下取整-滚动高度-item-高度" aria-hidden="true">#</a> 为何起始索引是由 <code>向下取整（滚动高度 / item 高度）</code>？</h3><p>例如item高度 = 50 滚动高度是100 那么就代表2个item已被遮住</p><p>向下取整是因为如何如果当滚动高度是80时，则代表第二个item有一部分被遮住一部分还在可视区，则不能判定已经遮住</p><h2 id="滚动事件" tabindex="-1"><a class="header-anchor" href="#滚动事件" aria-hidden="true">#</a> 滚动事件</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>UIEvent<span class="token punctuation">}</span></span> <span class="token parameter">e</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">onScroll</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>HTMLUListElement<span class="token punctuation">}</span></span>
   */</span>
  <span class="token keyword">const</span> target <span class="token operator">=</span> e<span class="token punctuation">.</span>target
  scrollTop<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop
  offset<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop <span class="token operator">-</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>scrollTop <span class="token operator">%</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="offset-是如何得来" tabindex="-1"><a class="header-anchor" href="#offset-是如何得来" aria-hidden="true">#</a> offset 是如何得来？</h3><p>首先我们要明白，我们手动创建了真实item的高度<code>app-virtual-scroll-bar</code>那我们滚动的时候拖动的是真实的滚动条，可视区的高度始终是固定的。那么我们在滚动容器的时候，则内容需要跟随滚动条位置，否则容器内items则被卷进去，所以需要给items容器设置一个偏移量让他始终保持在可视区位置</p><h3 id="如何计算-offset" tabindex="-1"><a class="header-anchor" href="#如何计算-offset" aria-hidden="true">#</a> 如何计算 offset？</h3><p>正常来讲<code>scrollTop</code>的值就是offset的偏移量，但是因为当item高度 = 50 滚动高度是120，此时第二个未被遮住那么他距离容器的顶部距离则是20<code>scrollTop % itemHeight</code>(如果非0则表示被除数无法被整除)所以offset的真实值是 <code>scrollTop -(scrollTop % itemHeight) </code></p><h2 id="扩展一下" tabindex="-1"><a class="header-anchor" href="#扩展一下" aria-hidden="true">#</a> 扩展一下</h2><p>我们给新增个功能，滚动到底部一定位置触发事件，让父组件去获取数据，从而实现无限滚动加载数据</p><h3 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h3><table><thead><tr><th>Name</th><th>Type</th><th>describe</th></tr></thead><tbody><tr><td><code>limit</code></td><td>Number</td><td>分页大小</td></tr><tr><td><code>current</code></td><td>Number</td><td>当前第几页</td></tr><tr><td><code>rowKey</code></td><td>String</td><td>key</td></tr><tr><td><code>offset</code></td><td>Number</td><td>底部偏移量</td></tr></tbody></table><p>默认Props配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> defaultProp <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">current</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">rowKey</span><span class="token operator">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">offset</span><span class="token operator">:</span> <span class="token number">80</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要改动的地方很小</p><p>我们需要新增一个loading变量,在滚动的时候，判断</p><p>如果处于loading时则 return</p><p>否则计算最底部item 距离 可视区的距离 是否 &gt;= <code>options.offset</code> 触发 <code>end</code> 事件 通知父组件获取数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>UIEvent<span class="token punctuation">}</span></span> <span class="token parameter">e</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">onScroll</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>HTMLUListElement<span class="token punctuation">}</span></span>
   */</span>
  <span class="token keyword">const</span> target <span class="token operator">=</span> e<span class="token punctuation">.</span>target
  scrollTop<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop
  startOffset<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop <span class="token operator">-</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>scrollTop <span class="token operator">%</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>loading<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>scrollHeight <span class="token operator">-</span> target<span class="token punctuation">.</span>scrollTop <span class="token operator">-</span> screenHeight<span class="token punctuation">.</span>value <span class="token operator">&lt;</span> options<span class="token punctuation">.</span>offset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
    options<span class="token punctuation">.</span>current <span class="token operator">+=</span> <span class="token number">1</span>

    context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过向外暴露loaded方法来通知虚拟列表，数据加载完毕</p><p>首次使用时，自动触发 <code>end</code> 事件,让父组件开始获取数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>

context<span class="token punctuation">.</span><span class="token function">expose</span><span class="token punctuation">(</span><span class="token punctuation">{</span> loaded <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完整的代码" tabindex="-1"><a class="header-anchor" href="#完整的代码" aria-hidden="true">#</a> 完整的代码</h2><p>组件</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> defineComponent<span class="token punctuation">,</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./style.scss&#39;</span>

<span class="token keyword">const</span> defaultProp <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">current</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">rowKey</span><span class="token operator">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">offset</span><span class="token operator">:</span> <span class="token number">80</span> <span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;app-virtual-list&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Array<span class="token punctuation">,</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/** item 高度 */</span>
    <span class="token literal-property property">itemHeight</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prop</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> defaultProp
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**
     * @type {{limit: number, current: number, rowKey: string, offset: number}}
     */</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> defaultProp<span class="token punctuation">,</span> props<span class="token punctuation">.</span>prop<span class="token punctuation">)</span>

    <span class="token keyword">const</span> loading <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 可视区高度
     */</span>
    <span class="token keyword">const</span> screenHeight <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * @type {import(&#39;vue&#39;).Ref&lt;HTMLUListElement&gt;}
     */</span>
    <span class="token keyword">const</span> virtualContainer <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 可视区可展示数量 = 向上取整（可视区高度 / item 高度）
     */</span>
    <span class="token keyword">const</span> visibleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>screenHeight<span class="token punctuation">.</span>value <span class="token operator">/</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 滚动的高度
     */</span>
    <span class="token keyword">const</span> scrollTop <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 列表总高度 = item 高度 * 总数量
     */</span>
    <span class="token keyword">const</span> listHeight <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span>length <span class="token operator">*</span> props<span class="token punctuation">.</span>itemHeight
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 数据的起始索引 = 向下取整（滚动高度 / item 高度）
     */</span>
    <span class="token keyword">const</span> startIndex <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>scrollTop<span class="token punctuation">.</span>value <span class="token operator">/</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 数据的结束索引 = 起始索引 + 可视区可展示数量
     */</span>
    <span class="token keyword">const</span> endIndex <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> startIndex<span class="token punctuation">.</span>value <span class="token operator">+</span> visibleCount<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> startOffset <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * 列表显示数据为
     */</span>
    <span class="token keyword">const</span> visibleData <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>startIndex<span class="token punctuation">.</span>value<span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>endIndex<span class="token punctuation">.</span>value<span class="token punctuation">,</span> props<span class="token punctuation">.</span>data<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * @type {import(&#39;vue&#39;).Ref&lt;import(&#39;vue/types/jsx&#39;).StyleValue&gt;}
     */</span>
    <span class="token keyword">const</span> containerStyle <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">translate3d(0, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>startOffset<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px, 0)</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      screenHeight<span class="token punctuation">.</span>value <span class="token operator">=</span> virtualContainer<span class="token punctuation">.</span>value<span class="token punctuation">.</span>clientHeight
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * @param {UIEvent} e
     */</span>
    <span class="token keyword">function</span> <span class="token function">onScroll</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/**
       * @type {HTMLUListElement}
       */</span>
      <span class="token keyword">const</span> target <span class="token operator">=</span> e<span class="token punctuation">.</span>target
      scrollTop<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop
      startOffset<span class="token punctuation">.</span>value <span class="token operator">=</span> target<span class="token punctuation">.</span>scrollTop <span class="token operator">-</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>scrollTop <span class="token operator">%</span> props<span class="token punctuation">.</span>itemHeight<span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>loading<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>scrollHeight <span class="token operator">-</span> target<span class="token punctuation">.</span>scrollTop <span class="token operator">-</span> screenHeight<span class="token punctuation">.</span>value <span class="token operator">&lt;</span> options<span class="token punctuation">.</span>offset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
        options<span class="token punctuation">.</span>current <span class="token operator">+=</span> <span class="token number">1</span>

        context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    context<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>

    context<span class="token punctuation">.</span><span class="token function">expose</span><span class="token punctuation">(</span><span class="token punctuation">{</span> loaded <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">,</span>
      virtualContainer<span class="token punctuation">,</span>
      listHeight<span class="token punctuation">,</span>
      containerStyle<span class="token punctuation">,</span>
      visibleData<span class="token punctuation">,</span>
      onScroll
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-list<span class="token punctuation">&#39;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>virtualContainer<span class="token punctuation">&#39;</span></span> <span class="token attr-name">onScroll</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onScroll<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-scroll-bar<span class="token punctuation">&#39;</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listHeight <span class="token operator">+</span> <span class="token string">&#39;px&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ol</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-container<span class="token punctuation">&#39;</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>containerStyle<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
          </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>visibleData<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>
              <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app-virtual-item<span class="token punctuation">&#39;</span></span>
              <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>item<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>rowKey<span class="token punctuation">]</span><span class="token punctuation">}</span></span>
              <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>itemHeight <span class="token operator">+</span> <span class="token string">&#39;px&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
            <span class="token punctuation">&gt;</span></span><span class="token plain-text">
              </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
          <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ol</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>样式</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.app-virtual-list </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
  <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.app-virtual-container </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">inset</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.app-virtual-scroll-bar </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>虚拟列表的原理我也看过不少文章，也是似懂半懂的样子，所以想写个组件彻底了解原理可以温故知新</p><p>祝大家新春快乐</p><figure><img src="https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/1737688730.jpg" alt="-468a38b7dc9409a6" tabindex="0" loading="lazy"><figcaption>-468a38b7dc9409a6</figcaption></figure>`,60))])}const r=s(c,[["render",l],["__file","virtual_list.html.vue"]]);export{r as default};
