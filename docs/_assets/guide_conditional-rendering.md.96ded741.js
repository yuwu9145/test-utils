import{g as n,f as s,z as a}from"./common-4aa23611.js";const e='{"title":"Conditional Rendering","frontmatter":{},"headers":[{"level":2,"title":"Finding Elements","slug":"finding-elements"},{"level":2,"title":"Using get()","slug":"using-get"},{"level":2,"title":"Using find() and exists()","slug":"using-find-and-exists"},{"level":2,"title":"Using data","slug":"using-data"},{"level":2,"title":"Conclusion","slug":"conclusion"}],"lastUpdated":1597330264246.2349}';var t={};const o=a('<h1 id="conditional-rendering"><a class="header-anchor" href="#conditional-rendering" aria-hidden="true">#</a> Conditional Rendering</h1><p>Vue Test Utils has a range of features for rendering and making assertions about the state of a component, with the goal of verifying it is behaving correctly. This article will explore how to render components, as well as verify they are rendering content correctly.</p><h2 id="finding-elements"><a class="header-anchor" href="#finding-elements" aria-hidden="true">#</a> Finding Elements</h2><p>One of the most basic features of Vue is the ability to dynamically show, hide and remove elements with <code>v-if</code>. Let&#39;s look at how to test a component that uses <code>v-if</code>.</p><div class="language-js"><pre><code><span class="token keyword">const</span> Nav <span class="token operator">=</span> <span class="token punctuation">{</span>\n  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n    &lt;nav&gt;\n      &lt;a id=&quot;profile&quot; href=&quot;/profile&quot;&gt;My Profile&lt;/a&gt;\n      &lt;a v-if=&quot;admin&quot; id=&quot;admin&quot; href=&quot;/admin&quot;&gt;Admin&lt;/a&gt;\n    &lt;/nav&gt;\n  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      admin<span class="token operator">:</span> <span class="token boolean">false</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>In the <code>&lt;Nav&gt;</code> component, a link to the user&#39;s profile is shown. In addition, if the <code>admin</code> value is <code>true</code>, we reveal a link to the admin section. There are three scenarios which we should verify are behaving correctly:</p><ol><li>The <code>/profile</code> link should be shown.</li><li>When the user is an admin, the <code>/admin</code> link should be shown.</li><li>When the user is not an admin, the <code>/admin</code> link should not be shown.</li></ol><h2 id="using-get"><a class="header-anchor" href="#using-get" aria-hidden="true">#</a> Using <code>get()</code></h2><p><code>wrapper</code> has a <code>get()</code> method that searches for an existing element. It uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector" target="_blank" rel="noopener noreferrer"><code>querySelector</code></a> syntax.</p><p>We can assert the profile link content by using <code>get()</code>:</p><div class="language-js"><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders a profile link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Nav<span class="token punctuation">)</span>\n\n  <span class="token comment">// Here we are implicitly asserting that the</span>\n  <span class="token comment">// element #profile exists.</span>\n  <span class="token keyword">const</span> profileLink <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#profile&#39;</span><span class="token punctuation">)</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span>profileLink<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token string">&#39;My Profile&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>If <code>get()</code> does not return an element matching the selector, it will raise an error, and your test will fail.</p><h2 id="using-find-and-exists"><a class="header-anchor" href="#using-find-and-exists" aria-hidden="true">#</a> Using <code>find()</code> and <code>exists()</code></h2><p><code>get()</code> works for asserting elements do exist. However, as we mentioned, it throws an error when it can&#39;t find an element, so you can&#39;t use it to assert whether if elements exist.</p><p>To do so, we use <code>find()</code> and <code>exists()</code>. The next test asserts that if <code>admin</code> is <code>false</code> (which is it by default), the admin link is not present:</p><div class="language-js"><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;does not render an admin link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Nav<span class="token punctuation">)</span>\n\n  <span class="token comment">// Using `wrapper.get` would throw and make the test fail.</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;#admin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>Notice we are calling <code>exists()</code> on the value returned from <code>.find()</code>? <code>find()</code>, like <code>mount()</code>, also returns a wrapper, similar to <code>mount()</code>. <code>mount()</code> has a few extra methods, because it&#39;s wrapping a Vue component, and <code>find()</code> only returns a regular DOM node, but many of the methods are shared between both. Some other methods include <code>classes()</code>, which gets the classes a DOM node has, and <code>trigger()</code> for simulating user interaction. You can find a list of methods supported <a href="/api/#wrapper-methods">here</a>.</p><h2 id="using-data"><a class="header-anchor" href="#using-data" aria-hidden="true">#</a> Using <code>data</code></h2><p>The final test is to assert that the admin link is rendered when <code>admin</code> is <code>true</code>. It&#39;s <code>false</code> by default, but we can override that using the second argument to <code>mount()</code>, the <a href="/api/#mount-options"><code>mounting options</code></a>.</p><p>For <code>data</code>, we use the aptly named <code>data</code> option:</p><div class="language-js"><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders an admin link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Nav<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        admin<span class="token operator">:</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// Again, by using `get()` we are implicitly asserting that</span>\n  <span class="token comment">// the element exists.</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#admin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token string">&#39;Admin&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>If you have other properties in <code>data</code>, don&#39;t worry - Vue Test Utils will merge the two together. The <code>data</code> in the mounting options will take priority over any default values.</p><p>To learn what other mounting options exist, see <a href="/guide/passing-data.html"><code>Passing Data</code></a> or see <a href="/api/#mount-options"><code>mounting options</code></a>.</p><h2 id="conclusion"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><ul><li>Use <code>find()</code> along with <code>exists()</code> to verify whether if an element is in the DOM.</li><li>Use <code>get()</code> if you expect the DOM element to be in the DOM.</li><li>The <code>data</code> mounting option can be used to set default values on a component.</li></ul>',25);t.render=function(a,e,t,p,c,i){return s(),n("div",null,[o])};export default t;export{e as __pageData};
