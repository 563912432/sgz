(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2f22c28"],{"02f4":function(t,a,i){var e=i("4588"),r=i("be13");t.exports=function(t){return function(a,i){var n,s,c=String(r(a)),o=e(i),l=c.length;return o<0||o>=l?t?"":void 0:(n=c.charCodeAt(o),n<55296||n>56319||o+1===l||(s=c.charCodeAt(o+1))<56320||s>57343?t?c.charAt(o):n:t?c.slice(o,o+2):s-56320+(n-55296<<10)+65536)}}},"0390":function(t,a,i){"use strict";var e=i("02f4")(!0);t.exports=function(t,a,i){return a+(i?e(t,a).length:1)}},"0bfb":function(t,a,i){"use strict";var e=i("cb7c");t.exports=function(){var t=e(this),a="";return t.global&&(a+="g"),t.ignoreCase&&(a+="i"),t.multiline&&(a+="m"),t.unicode&&(a+="u"),t.sticky&&(a+="y"),a}},"214f":function(t,a,i){"use strict";i("b0c5");var e=i("2aba"),r=i("32e9"),n=i("79e5"),s=i("be13"),c=i("2b4c"),o=i("520a"),l=c("species"),u=!n(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),d=function(){var t=/(?:)/,a=t.exec;t.exec=function(){return a.apply(this,arguments)};var i="ab".split(t);return 2===i.length&&"a"===i[0]&&"b"===i[1]}();t.exports=function(t,a,i){var f=c(t),v=!n(function(){var a={};return a[f]=function(){return 7},7!=""[t](a)}),g=v?!n(function(){var a=!1,i=/a/;return i.exec=function(){return a=!0,null},"split"===t&&(i.constructor={},i.constructor[l]=function(){return i}),i[f](""),!a}):void 0;if(!v||!g||"replace"===t&&!u||"split"===t&&!d){var h=/./[f],p=i(s,f,""[t],function(t,a,i,e,r){return a.exec===o?v&&!r?{done:!0,value:h.call(a,i,e)}:{done:!0,value:t.call(i,a,e)}:{done:!1}}),x=p[0],b=p[1];e(String.prototype,t,x),r(RegExp.prototype,f,2==a?function(t,a){return b.call(t,this,a)}:function(t){return b.call(t,this)})}}},"28a5":function(t,a,i){"use strict";var e=i("aae3"),r=i("cb7c"),n=i("ebd6"),s=i("0390"),c=i("9def"),o=i("5f1b"),l=i("520a"),u=i("79e5"),d=Math.min,f=[].push,v="split",g="length",h="lastIndex",p=4294967295,x=!u(function(){RegExp(p,"y")});i("214f")("split",2,function(t,a,i,u){var b;return b="c"=="abbc"[v](/(b)*/)[1]||4!="test"[v](/(?:)/,-1)[g]||2!="ab"[v](/(?:ab)*/)[g]||4!="."[v](/(.?)(.?)/)[g]||"."[v](/()()/)[g]>1||""[v](/.?/)[g]?function(t,a){var r=String(this);if(void 0===t&&0===a)return[];if(!e(t))return i.call(r,t,a);var n,s,c,o=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,v=void 0===a?p:a>>>0,x=new RegExp(t.source,u+"g");while(n=l.call(x,r)){if(s=x[h],s>d&&(o.push(r.slice(d,n.index)),n[g]>1&&n.index<r[g]&&f.apply(o,n.slice(1)),c=n[0][g],d=s,o[g]>=v))break;x[h]===n.index&&x[h]++}return d===r[g]?!c&&x.test("")||o.push(""):o.push(r.slice(d)),o[g]>v?o.slice(0,v):o}:"0"[v](void 0,0)[g]?function(t,a){return void 0===t&&0===a?[]:i.call(this,t,a)}:i,[function(i,e){var r=t(this),n=void 0==i?void 0:i[a];return void 0!==n?n.call(i,r,e):b.call(String(r),i,e)},function(t,a){var e=u(b,t,this,a,b!==i);if(e.done)return e.value;var l=r(t),f=String(this),v=n(l,RegExp),g=l.unicode,h=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(x?"y":"g"),m=new v(x?l:"^(?:"+l.source+")",h),C=void 0===a?p:a>>>0;if(0===C)return[];if(0===f.length)return null===o(m,f)?[f]:[];var y=0,_=0,S=[];while(_<f.length){m.lastIndex=x?_:0;var w,A=o(m,x?f:f.slice(_));if(null===A||(w=d(c(m.lastIndex+(x?0:_)),f.length))===y)_=s(f,_,g);else{if(S.push(f.slice(y,_)),S.length===C)return S;for(var k=1;k<=A.length-1;k++)if(S.push(A[k]),S.length===C)return S;_=y=w}}return S.push(f.slice(y)),S}]})},3846:function(t,a,i){i("9e1e")&&"g"!=/./g.flags&&i("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:i("0bfb")})},"38d4":function(t,a,i){"use strict";var e=i("93d9"),r=i.n(e);r.a},"520a":function(t,a,i){"use strict";var e=i("0bfb"),r=RegExp.prototype.exec,n=String.prototype.replace,s=r,c="lastIndex",o=function(){var t=/a/,a=/b*/g;return r.call(t,"a"),r.call(a,"a"),0!==t[c]||0!==a[c]}(),l=void 0!==/()??/.exec("")[1],u=o||l;u&&(s=function(t){var a,i,s,u,d=this;return l&&(i=new RegExp("^"+d.source+"$(?!\\s)",e.call(d))),o&&(a=d[c]),s=r.call(d,t),o&&s&&(d[c]=d.global?s.index+s[0].length:a),l&&s&&s.length>1&&n.call(s[0],i,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(s[u]=void 0)}),s}),t.exports=s},"5f1b":function(t,a,i){"use strict";var e=i("23c6"),r=RegExp.prototype.exec;t.exports=function(t,a){var i=t.exec;if("function"===typeof i){var n=i.call(t,a);if("object"!==typeof n)throw new TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==e(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,a)}},"6b54":function(t,a,i){"use strict";i("3846");var e=i("cb7c"),r=i("0bfb"),n=i("9e1e"),s="toString",c=/./[s],o=function(t){i("2aba")(RegExp.prototype,s,t,!0)};i("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?o(function(){var t=e(this);return"/".concat(t.source,"/","flags"in t?t.flags:!n&&t instanceof RegExp?r.call(t):void 0)}):c.name!=s&&o(function(){return c.call(this)})},"93d9":function(t,a,i){},a481:function(t,a,i){"use strict";var e=i("cb7c"),r=i("4bf8"),n=i("9def"),s=i("4588"),c=i("0390"),o=i("5f1b"),l=Math.max,u=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,v=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};i("214f")("replace",2,function(t,a,i,h){return[function(e,r){var n=t(this),s=void 0==e?void 0:e[a];return void 0!==s?s.call(e,n,r):i.call(String(n),e,r)},function(t,a){var r=h(i,t,this,a);if(r.done)return r.value;var d=e(t),f=String(this),v="function"===typeof a;v||(a=String(a));var x=d.global;if(x){var b=d.unicode;d.lastIndex=0}var m=[];while(1){var C=o(d,f);if(null===C)break;if(m.push(C),!x)break;var y=String(C[0]);""===y&&(d.lastIndex=c(f,n(d.lastIndex),b))}for(var _="",S=0,w=0;w<m.length;w++){C=m[w];for(var A=String(C[0]),k=l(u(s(C.index),f.length),0),z=[],E=1;E<C.length;E++)z.push(g(C[E]));var T=C.groups;if(v){var Z=[A].concat(z,k,f);void 0!==T&&Z.push(T);var j=String(a.apply(void 0,Z))}else j=p(A,f,k,z,T,a);k>=S&&(_+=f.slice(S,k)+j,S=k+A.length)}return _+f.slice(S)}];function p(t,a,e,n,s,c){var o=e+t.length,l=n.length,u=v;return void 0!==s&&(s=r(s),u=f),i.call(c,u,function(i,r){var c;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return a.slice(0,e);case"'":return a.slice(o);case"<":c=s[r.slice(1,-1)];break;default:var u=+r;if(0===u)return i;if(u>l){var f=d(u/10);return 0===f?i:f<=l?void 0===n[f-1]?r.charAt(1):n[f-1]+r.charAt(1):i}c=n[u-1]}return void 0===c?"":c})}})},aa44:function(t,a,i){},aae3:function(t,a,i){var e=i("d3f4"),r=i("2d95"),n=i("2b4c")("match");t.exports=function(t){var a;return e(t)&&(void 0!==(a=t[n])?!!a:"RegExp"==r(t))}},ac6a:function(t,a,i){for(var e=i("cadf"),r=i("0d58"),n=i("2aba"),s=i("7726"),c=i("32e9"),o=i("84f2"),l=i("2b4c"),u=l("iterator"),d=l("toStringTag"),f=o.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},g=r(v),h=0;h<g.length;h++){var p,x=g[h],b=v[x],m=s[x],C=m&&m.prototype;if(C&&(C[u]||c(C,u,f),C[d]||c(C,d,x),o[x]=f,b))for(p in e)C[p]||n(C,p,e[p],!0)}},b0c5:function(t,a,i){"use strict";var e=i("520a");i("5ca1")({target:"RegExp",proto:!0,forced:e!==/./.exec},{exec:e})},b3d7:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"home"},[i("Header"),i("div",{staticClass:"content mt-20 flex"},[t._m(0),i("div",{staticClass:"content-right ml-20 flex-1 flex"},[t._m(1),i("div",{staticClass:"right-tab-div flex flex-column"},[i("div",{staticClass:"flex-1 flex flex-align-center"},[i("div",{staticClass:"tab text-center"},[i("div",{staticClass:"card",on:{click:t.toUrl}},[i("svg",{staticClass:"icon",staticStyle:{"padding-left":"10px","padding-bottom":"20px","font-size":"120px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconlejieqiyexinxi"}})])]),i("div",{staticClass:"card-title"},[t._v("了解企业信息")])]),i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/qi-chu"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"box-sizing":"border-box","padding-left":"15px","padding-bottom":"10px","font-size":"105px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconqichuyue"}})])])]),i("div",{staticClass:"card-title"},[t._v("期初余额")])],1)]),i("div",{staticClass:"flex-1 flex flex-align-center"},[i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/ji-zhang"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"box-sizing":"border-box","padding-left":"10px","padding-bottom":"20px","font-size":"120px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icontianzhijizhangpingzheng"}})])])]),i("div",{staticClass:"card-title"},[t._v("填制记账凭证")])],1)]),i("div",{staticClass:"flex-2 flex flex-column"},[i("div",{staticClass:"flex flex-1 flex-align-center"},[i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/ri-ji-zhang"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"font-size":"85px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconrijizhang"}})])])]),i("div",{staticClass:"card-title"},[t._v("日记账")])],1),i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/ming-xi-zhang"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"padding-left":"10px","font-size":"100px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconmingxifenleizhang"}})])])]),i("div",{staticClass:"card-title"},[t._v("明细分类账")])],1)]),i("div",{staticClass:"flex-1 flex flex-align-center"},[i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/t-xing-zhang"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"padding-left":"10px","font-size":"100px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconTxingzhang"}})])])]),i("div",{staticClass:"card-title"},[t._v("T型账")])],1),i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/ke-mu-hui-zong"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"box-sizing":"border-box","padding-left":"5px","padding-bottom":"5px","font-size":"80px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconkemuhuizongbiao"}})])])]),i("div",{staticClass:"card-title"},[t._v("科目汇总表")])],1),i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/zong-fen-lei-zhang"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"box-sizing":"border-box","padding-left":"5px","padding-bottom":"5px","font-size":"80px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconzongfenleizhang"}})])])]),i("div",{staticClass:"card-title"},[t._v("总分类账")])],1)])]),i("div",{staticClass:"flex-1 flex flex-align-center"},[i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/zi-chan-fu-zhai-biao"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"padding-left":"5px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconzichanfuzhaibiao"}})])])]),i("div",{staticClass:"card-title"},[t._v("资产负债表")])],1),i("div",{staticClass:"tab text-center"},[i("router-link",{attrs:{to:"/main/li-run-biao"}},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon",staticStyle:{"padding-left":"5px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#iconlirunbiao"}})])])]),i("div",{staticClass:"card-title"},[t._v("利润表")])],1)])])])])],1)},r=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"content-left flex flex-column"},[i("div",{staticClass:"left-card flex-1 pt-20 pl-40 pr-40"},[i("div",{staticClass:"title mb-20"},[t._v("01 基础资料")]),i("div",{staticClass:"wrap"},[t._v("    本模块包括“了解企业信息”和“期初余额”两部分。通过“了解企业信息”模块，能够了解到企业的基本情况。“期初余额”是该企业财务基础数据。")])]),i("div",{staticClass:"left-card flex-1 pt-20 pl-40 pr-40"},[i("div",{staticClass:"title mb-20"},[t._v("02 填制凭证")]),i("div",{staticClass:"wrap"},[t._v("包括“原始凭证”和“记账凭证”。这个模块是整个课程中的核心模块。 学员在本模块中可以见到与实际工作中真实单据样式完全相同的电子彩色原始凭证。")])]),i("div",{staticClass:"left-card flex-1 pt-20 pl-40 pr-40"},[i("div",{staticClass:"title mb-20"},[t._v("03 登记账簿")]),i("div",{staticClass:"wrap"},[t._v("主要是根据前面填制的凭证进行登账操作。包括明细账、日记账、总账登记， 设置了T型账的登记以及科目汇总表的编制，依据编制的科目汇总表来登记总账。")])]),i("div",{staticClass:"left-card flex-1 pt-20 pl-40 pr-40"},[i("div",{staticClass:"title mb-20"},[t._v("04 编制报表")]),i("div",{staticClass:"wrap"},[t._v("这项操作设置了资产负债表和利润表的编制操作，需要学员根据前面所有操作自行编制会计报表")])])])},function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"right-line-div"},[i("div",{staticClass:"tag tag1"},[t._v("01 基础资料")]),i("div",{staticClass:"flex flex-column flex-align-center"},[i("div",{staticClass:"line line1"}),i("div",{staticClass:"line-arrow"},[i("i",{staticClass:"el-icon-caret-bottom"})])]),i("div",{staticClass:"tag tag2"},[t._v("02 填制凭证")]),i("div",{staticClass:"flex flex-column flex-align-center"},[i("div",{staticClass:"line line2"}),i("div",{staticClass:"line-arrow"},[i("i",{staticClass:"el-icon-caret-bottom"})])]),i("div",{staticClass:"tag tag3"},[t._v("03 登记账簿")]),i("div",{staticClass:"flex flex-column flex-align-center"},[i("div",{staticClass:"line line3"}),i("div",{staticClass:"line-arrow"},[i("i",{staticClass:"el-icon-caret-bottom"})])]),i("div",{staticClass:"tag"},[t._v("04 编制报表")])])}],n=(i("28a5"),i("a481"),i("6b54"),i("ac6a"),i("ed08")),s=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},c=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"header"},[i("span",[t._v("会计手工全盘账-系统流程图")])])}],o={name:"Header"},l=o,u=(i("38d4"),i("2877")),d=Object(u["a"])(l,s,c,!1,null,"21b689f1",null),f=d.exports,v={name:"Home",components:{Header:f},computed:{role:function(){return this.$route.params.role},trade_id:function(){return this.$route.params.company_id},basicKeMu:function(){return this.$store.state.basicKeMu}},data:function(){return{subjectData:[]}},created:function(){this.initData()},methods:{initData:function(){var t=this;1===parseInt(Object(n["a"])("scope"))&&(this.trade_id?(sessionStorage.setItem("sgz_company_id",this.trade_id),window.axios.get("".concat(window.adminHost,"/admin/manual/company/").concat(this.trade_id)).then(function(a){var i=a.data;if(i.error_code)t.$message.error("未找到企业信息");else{t.$store.commit("SAVE_COMPANY_INFO",i.data);var e=JSON.parse(i.data["subject"]);t.subjectData=t.basicKeMu,e&&t.subjectData.forEach(function(a){var i=t.getTree(e,a.id);i.length>0&&t.$set(a,"children",i)}),t.$store.commit("SAVE_COMPANY_SUBJECT",e),t.$store.commit("SAVE_KE_MU_INFO",t.deepTraversal(t.subjectData)),t.getAnswer()}})):this.$message.error("缺少企业标识参数")),3===parseInt(Object(n["a"])("scope"))&&window.axios.get("".concat(window.studentHost,"/stu/manual/company")).then(function(a){console.log(a);var i=a.data;if(!i.error_code){t.$store.commit("SAVE_COMPANY_INFO",i.data),sessionStorage.setItem("sgz_company_id",i.data.id);var e=JSON.parse(i.data["subject"]);t.subjectData=t.basicKeMu,e&&t.subjectData.forEach(function(a){var i=t.getTree(e,a.id);i.length>0&&t.$set(a,"children",i)});var r=Date.parse(new Date)/1e3;t.$store.commit("SAVE_KE_MU_INFO",t.deepTraversal(t.subjectData)),sessionStorage.setItem("sgz_start_at",r.toString()),t.getRecord(i.data.id)}})},getAnswer:function(){var t=this;window.axios.get("".concat(window.adminHost,"/admin/manual/answer/").concat(this.trade_id)).then(function(a){var i=a.data;if(i.error_code)t.$message.error("请求失败");else if(i.data.length>0){var e=i.data[0];e["riJiZhang"][0]&&e["riJiZhang"][0]["answer"]&&Array.isArray(e["riJiZhang"][0]["answer"])&&(e["riJiZhang"][0]["answer"]=t.arrayToObj(e["riJiZhang"][0]["answer"])),e["minXiZhang"][1]&&e["minXiZhang"][1]["answer"]&&Array.isArray(e["minXiZhang"][1]["answer"])&&(e["minXiZhang"][1]["answer"]=t.arrayToObj(e["minXiZhang"][1]["answer"])),Array.isArray(e["keMuHuiZong"])&&(e["keMuHuiZong"]=t.arrayToObj(e["keMuHuiZong"])),Array.isArray(e["ziChanFuZhaiBiao"])&&(e["ziChanFuZhaiBiao"]=t.arrayToObj(e["ziChanFuZhaiBiao"])),Array.isArray(e["liRunBiao"])&&(e["liRunBiao"]=t.arrayToObj(e["liRunBiao"])),t.$store.commit("SAVE_ANSWER",e)}}).catch(function(t){console.log(t)})},getRecord:function(t){var a=this;window.axios.post("".concat(window.studentHost,"/stu/manual/record"),{sx_id:1,company_id:t}).then(function(t){var i=t.data;if(i.data){var e=JSON.parse(i.data);e["riJiZhang"][0]&&e["riJiZhang"][0]["answer"]&&Array.isArray(e["riJiZhang"][0]["answer"])&&(e["riJiZhang"][0]["answer"]=a.arrayToObj(e["riJiZhang"][0]["answer"])),e["minXiZhang"][1]&&e["minXiZhang"][1]["answer"]&&Array.isArray(e["minXiZhang"][1]["answer"])&&(e["minXiZhang"][1]["answer"]=a.arrayToObj(e["minXiZhang"][1]["answer"])),Array.isArray(e["keMuHuiZong"])&&(e["keMuHuiZong"]=a.arrayToObj(e["keMuHuiZong"])),Array.isArray(e["ziChanFuZhaiBiao"])&&(e["ziChanFuZhaiBiao"]=a.arrayToObj(e["ziChanFuZhaiBiao"])),Array.isArray(e["liRunBiao"])&&(e["liRunBiao"]=a.arrayToObj(e["liRunBiao"])),a.$store.commit("SAVE_ANSWER",e)}}).catch(function(t){console.log(t)})},getTree:function(t,a){var i=this,e=[];return t.forEach(function(r){if(r.parent_id===a){var n={id:r.id,title:r.title,parent_id:r.parent_id,level:r.level,children:i.getTree(t,r.id)};e.push(n)}}),e},arrayToObj:function(t){var a={};return t.forEach(function(t,i){a[i]=t}),a},deepTraversal:function(t){var a=[];return t.forEach(function(t){var i=function t(i){a.push({value:i.title});var e=i.children;if(e)for(var r=0;r<e.length;r++)t(e[r])};i(t)}),a},toUrl:function(){this.$router.replace("/main/basic-info")},getCookie:function(t){for(var a=t+"=",i=document.cookie.split(";"),e=0;e<i.length;e++){var r=i[e].trim();if(0===r.indexOf(a))return r.substring(a.length,r.length)}return""}}},g=v,h=(i("e0ac"),Object(u["a"])(g,e,r,!1,null,"3abddb7d",null));a["default"]=h.exports},e0ac:function(t,a,i){"use strict";var e=i("aa44"),r=i.n(e);r.a}}]);
//# sourceMappingURL=chunk-f2f22c28.ec1c6cbe.js.map