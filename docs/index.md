## 物料设计规范

### 筛选区

> 当信息有统一且清晰的分类时，系统依据合理的分类为用户提供过滤机制，减少眼前可浏览的信息量，让用户在一个或多个条件下逐步获取到想要的信息。 \*附各产品实际使用情况

<img src="./1.png" />

<h4 style="color: #fff; background-color: #88D498; padding: 4px 8px; border-radius: 4px;">最全通用</h4>
<img src="./img.png" />
<img src="./image.png" />
<h4 style="color: #fff; background-color: #88D498; padding: 4px 8px; border-radius: 4px;">表头筛选</h4>

> 涵盖 XSea 99%的场景、XChaos 20%场景

<p><strong>使用说明：</strong>多为表头的筛选字段直接带入，方便用户快速筛选。常用于列表页</p>
<p>建议列表可通过表头点击，使用户更快捷做筛选条件排序。表单越左数据越重要，使用筛选频率最高</p>
<p><strong>特点：</strong></p>
<p>较为轻量的实时筛选，无确定搜索按钮。</p>
<p>用户多数场景为单一筛选</p>
<p><strong>产品案例：</strong>XSea   99%以上的场景、XChaos 20%场景</p>
<img src="./2.jpeg" />
<h4 style="color: #fff; background-color: #88D498; padding: 4px 8px; border-radius: 4px;">普通筛选</h4>

> 涵盖 XSky99%、XChaos 99%、共享平台 99%场景

<p><strong>使用说明：</strong>独立筛选区，不仅限于列表页，也可用于概览、可视化等页面。</p>
<p><strong>特点：</strong></p>
<p>非实时筛选，有确定搜索按钮。</p>
<p>重筛选器，条件多，用户可以选择查看符合一类或多类条件下的内容。</p>
<p><strong>产品案例：</strong>XSky  100%的场景</p>
<p style="display: inline-block; background-color: rgb(250, 219, 20);"><strong>白底主场景：适用于更多的列表场景</strong></p></br>
<p style="display: inline-block; background-color: rgb(250, 219, 20);"><strong>灰底主场景：概览、视觉可视化等需要明显模块化的</strong></p>
<p>↓白底的↓</p>
<img src="./3.png" />
<p>↓灰底的↓</p>
<img src="./4.png" />
<h4 style="color: #fff; background-color: #88D498; padding: 4px 8px; border-radius: 4px;">普通筛选折叠</h4>
<p><strong>使用说明：</strong>同上，区别在于默认显示使用频率较多的筛选条件，频率较少的使用“展开”、“收起”这种方式。视业务当前页面场景决定。</p>
<p><strong>特点：</strong></p>
<p>更多常用筛选且让筛选器更为简洁，并可保留更多选项</p>
<p><strong>产品案例：</strong>XChaos 80%场景</p>
<p>↓默认状态↓</p>
<img src="./5.jpeg" />
<p>↓展开后↓</p>
<img src="./6.png" />
<h4 style="color: #fff; background-color: #88D498; padding: 4px 8px; border-radius: 4px;">高级筛选</h4>

> 保留高频的筛选条件，将复杂的筛选项隐藏在「高级筛选」中

<p><strong>特点：</strong>筛选为辅助功能收起，在当前场景下，空间利用率更高</p>
<p><strong>产品案例：</strong>TestMa  100%的场景</p>
<p>↓默认状态↓</p>
<img src="./7.png" />
<p>↓展开后↓</p>
<img src="./8.png" />

<p style="display: inline-block; background-color: rgb(250, 219, 20);"><strong>规则说明</strong></p>
<p>筛选项  收起用24栅格</p>
<p><strong>布局：</strong>筛选项收起的情况下只能放一行，4列栅格，选项间距统一16px。筛选区占3列栅格，靠左</p>
<p><strong>按钮：</strong>按钮区占1列栅格，靠右。     按钮是否需要看业务场景（可以不放置）</p>
<p><strong>适配：</strong>4列栅格适配，按钮右侧排放; lable字段，8个字或6个字，8个字无法满足的情况换行处理</p>
<p><strong>高级筛选</strong></p>
<p>展开的情况使用24栅格，推荐4列栅格展示，按钮区占一个栅格区域，右下角排列</p>
<p>可以根据页面实际显示宽度，显示3列，甚至2列</p>
<p><strong>lable字段极限状态</strong></p>
<p>字符限制样式，限制16个字符，超出打点，hover显示</p>
<img src="./9.png" />
