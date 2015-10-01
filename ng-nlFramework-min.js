angular.module("nlFramework",[]).factory("$nlFramework",["$nlConfig","$nlDrawer","$nlBurger","$nlRefresh","$nlToast","$nlMenu","$nlFab","$nlHelpers","$nlElements",function(e,t,n,o,i,r,s,a,l){var d={init:function(e){d.set(e),l.body=document.body,e.burger&&n.init(),document.body.insertAdjacentHTML("beforeend",'<div id="nlDimm"></div>'),l.drawerDimm=document.getElementById("nlDimm"),l.drawerDimmH=new Hammer(l.drawerDimm),e.refresh&&o.init(),e.drawer&&(document.body.insertAdjacentHTML("beforeend",'<div id="nlSwipe"></div>'),t.init(e.drawer)),e.toast&&(document.body.insertAdjacentHTML("beforeend",'<div id="nlToast"></div>'),i.init()),e.secMenu&&r.init(),e.actionButton&&s.init()},drawer:t,burger:n,refresh:o,toast:i,menu:r,config:e,fab:s,set:function(t){var n=e.options;e.options=a.merge(n,t)}};return d}]).factory("$nlElements",function(){var e={};return e}).factory("$nlConfig",function(){return{openned:!1,plusActive:!1,holdPos:null,reverse:!1,scroll:{},nlRefresh:{},options:{speed:.2,animation:"ease",actionButton:!1,toast:!1,burger:{endY:6,startScale:1,endScale:.7},content:{topBarHeight:0,modify:!1},drawer:{maxWidth:300,openCb:function(){console.log("nlDrawer: openned")},closeCb:function(){console.log("nlDrawer closed")}},refresh:{defaultColor:"#aa3344",activeColor:"#558844",callback:function(){$nlRefresh.syncEnd()}},actionButton:!1,secMenu:!1}}}).factory("$nlHelpers",function(){return{translate:function(e,t,n,o,i,r,s,a,l,d,c){var t=t||0,o=o||0,n=n||"",i=i||"",s=s||"",a=a||!1,u=e;l="nlRefresh"===u.id?l?"scale3d("+l+","+l+",1)":"scale3d(1,1,1)":l?"scale3d("+l+",1,1)":"","burger-top"===u.id?u.style.transformOrigin="100% 100%":"burger-bottom"===u.id&&(u.style.transformOrigin="100% 0%"),u.style.transform="translate3d("+n+t+"px, "+i+o+"px, 0) rotate3d( 0, 0, 1, "+s+r+"deg ) "+l,u.style.webkitTransform="translate("+n+t+"px, "+i+o+"px) translateZ(0) rotate("+s+r+"deg) "+l,a&&(u.style.width=a+"px"),c&&(u.style.opacity=c),a&&(u.style["max-width"]=a+"px"),d&&(u.style.msTransform=u.style.MozTransform=u.style.OTransform="translateX("+n+t+"px) translateY("+i+o+"px) rotate("+s+r+"deg)")},merge:function(e,t){var n={};for(var o in e)n[o]=e[o];for(var o in t)n[o]=t[o];return n}}}).factory("$nlBurger",["$nlConfig","$nlHelpers","$nlElements",function(e,t,n){var o={animate:function(o){var i=e.maxWidth,r=i-Math.abs(o),s=Math.floor(100/i*r);if(s>0){var a=e.options.burger.startScale-Math.abs((1-e.options.burger.endScale)/100*s).toFixed(2),l=Math.floor(.45*s),d=Math.floor(e.options.burger.endY/100*s);d=y_pos_bottom=d<e.options.burger.endY?d:e.options.burger.endY;var c=Math.floor(1.8*s);e.options.reverse&&(c=180+(180-c)),n.burger.style.transition="none",n.burgerTop.style.transition="none",n.burgerBottom.style.transition="none",t.translate(n.burger,0,"",0,"",c,"",""),t.translate(n.burgerTop,0,"",d,"",l,"","",a),t.translate(n.burgerBottom,0,"",y_pos_bottom,"-",l,"-","",a)}},toggle:function(t){n.burger.style.transition="all "+e.options.speed+"s "+e.options.animation,n.burgerTop.style.transition="all "+e.options.speed+"s "+e.options.animation,n.burgerBottom.style.transition="all "+e.options.speed+"s "+e.options.animation,t||t&&!o.isOn?o.setOn():o.setOff()},toggleEnd:function(){setTimeout(function(){n.burger.style.transition="none",n.burgerTop.style.transition="none",n.burgerBottom.style.transition="none",o.isOn?e.options.reverse=!0:(t.translate(n.burger,0,"",0,"-",0,""),e.options.reverse=!1)},1e3*e.options.speed)},setOn:function(){t.translate(n.burgerTop,0,"",e.options.burger.endY,"",45,"","",e.options.burger.endScale),t.translate(n.burgerBottom,0,"",e.options.burger.endY,"-",45,"-","",e.options.burger.endScale),t.translate(n.burger,0,"",0,"-",180,""),o.isOn=!0,o.toggleEnd()},setOff:function(){t.translate(n.burgerTop,0,"",0,"",0,"","",e.options.burger.startScale),t.translate(n.burgerBottom,0,"",0,"",0,"","",e.options.burger.startScale),e.options.reverse?t.translate(n.burger,0,"",0,"-",360,""):t.translate(n.burger,0,"",0,"-",0,""),o.isOn=!1,o.toggleEnd()},init:function(){var t='<div id="nlBurger"><div id="burger-top"></div><div id="burger-center"></div><div id="burger-bottom"></div></div>';null===document.getElementById("nlBurger")&&document.body.insertAdjacentHTML("beforeend",t),n.burger=document.getElementById("nlBurger"),n.burgerH=new Hammer(n.burger),n.burgerTop=document.getElementById("burger-top"),n.burgerBottom=document.getElementById("burger-bottom"),"object"!=typeof e.options.drawer&&n.burgerH.on("tap",function(e){o.toggle()})}};return o}]).factory("$nlDrawer",["$nlConfig","$nlBurger","$nlHelpers","$nlElements","$nlFab",function(e,t,n,o,i){var r={init:function(t){t.openCb&&(r.on.show=t.openCb),t.closeCb&&(r.on.hide=t.closeCb),e.options=n.merge(e.options,t),o.body=document.body,o.bodyH=new Hammer(o.body),o.swipe=document.getElementById("nlSwipe"),o.swipeH=new Hammer(o.swipe),o.drawer=document.getElementById("nlDrawer"),o.drawerH=new Hammer(o.drawer),o.drawerDimm=document.getElementById("nlDimm"),o.drawerDimmH=new Hammer(o.drawerDimm),e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),e.options.content.modify&&(o.viewContent=document.getElementById("nlContent"),o.viewContentH=new Hammer(o.viewContent),o.viewContent.style["margin-top"]=e.options.content.topBarHeight+"px",o.viewContent.style["min-height"]=e.deviceH-e.options.content.topBarHeight+"px",o.viewContent.style.width=e.deviceW+"px"),e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,n.translate(o.drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth),window.onresize=function(t){e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),e.options.content.modify&&(o.viewContent.style.width=e.deviceW+"px",o.viewContent.style["min-height"]=e.deviceH-e.options.content.topBarHeight+"px"),e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,r.openned?n.translate(o.drawer,0,"",0,"",0,"",e.maxWidth):n.translate(o.drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth)},o.drawerH.on("panleft panright",function(e){r.openned&&r.move(e,!0)}),o.drawerDimmH.on("panleft panright",function(e){r.openned&&r.move(e)}),o.swipeH.on("panleft panright",function(e){r.move(e)}),o.drawerH.on("tap",function(e){r.hide()}),o.drawerDimmH.on("tap",function(e){r.hide()}),"object"==typeof e.options.burger&&o.burgerH.on("tap",function(e){o.burger.hasAttribute("ng-click")||r.toggle()}),r.touchEnd(o.swipe),r.touchEnd(o.drawer),r.touchEnd(o.drawerDimm)},on:{show:function(){},hide:function(){}},show:function(){o.drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,n.translate(o.drawer,0,"",0,"",0,"",e.maxWidth),o.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.drawerDimm.style.visibility="visible",o.drawerDimm.style.opacity="1",r.openned=!0,e.options.reverse=!0,e.options.burger&&t.toggle(!0),setTimeout(function(){r.on.show()},1e3*e.options.speed)},hide:function(){o.drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,n.translate(o.drawer,e.maxWidth,"-",0,"",0,""),o.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.drawerDimm.style.visibility="hidden",o.drawerDimm.style.opacity="0",(r.openned||e.options.burger)&&t.toggle(!1),i.toggle(!0),r.openned=!1,setTimeout(function(){r.on.hide()},1e3*e.options.speed)},toggle:function(){r.openned?r.hide():r.show()},move:function(i,s){e.options.direction="panleft"===i.type?"left":"right";var a=i.center.x-e.maxWidth;s&&(e.options.holdPos=e.options.holdPos?e.options.holdPos:a,a+=Math.abs(e.options.holdPos)),a=0>a?a:0;var l=e.options.drawer.maxWidth-Math.abs(a),d=(l/(e.options.drawer.maxWidth/100)/100).toFixed(2);d=1>d?d:1,t.animate(a),o.drawerDimm.style.transition="none",o.drawerDimm.style.visibility="visible",o.drawerDimm.style.opacity=d,o.drawer.style.transition="none",e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,n.translate(o.drawer,a,"",0,"",0,"",e.maxWidth),i.isFinal?("left"===e.options.direction?r.hide():"right"===e.options.direction?r.show():r.onEnd(i,!1),e.options.holdPos=null,e.options.endTrue=!1):e.options.endTrue=!0},touchEnd:function(t){e.onTouch="ontouchstart"in window?!0:!1,e.onTouch?t.addEventListener("touchend",function(e){r.onEnd(e,!0)},!1):t.addEventListener("mouseup",function(e){r.onEnd(e,!1)},!1)},onEnd:function(t,n){var o=n?t.changedTouches[0]:t,i=o.clientX>e.options.drawer.maxWidth/2,s="left"===e.options.direction,a="right"===e.options.direction,l=e.options.endTrue;i&&s&&l||i&&a&&l?r.show():(!i&&s&&l||!i&&a&&l)&&r.hide(),e.options.direction=!1,e.options.endTrue=!1,e.options.holdPos=null,t.preventDefault()}};return r}]).factory("$nlRefresh",["$nlConfig","$nlHelpers","$nlElements",function(e,t,n){var o={init:function(){e.onTouch="ontouchstart"in window?!0:!1,document.body.insertAdjacentHTML("afterbegin",'<div id="nlRefresh"><svg version="1.1" id="reload-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 342.5 342.5" style="enable-background:new 0 0 342.5 342.5;" xml:space="preserve"><path d="M254.37,22.255c-1.161-0.642-2.53-0.795-3.803-0.428c-1.274,0.367-2.35,1.226-2.992,2.387l-21.758,39.391c-1.335,2.417-0.458,5.459,1.96,6.794C264.616,90.748,287.5,129.495,287.5,171.52c0,63.649-51.782,115.431-115.431,115.431S56.638,235.169,56.638,171.52c0-23.888,7.557-47.427,21.382-66.897l34.478,34.478c1.338,1.337,3.315,1.806,5.109,1.21c1.795-0.596,3.101-2.152,3.374-4.024L139.963,6.271c0.228-1.563-0.295-3.141-1.412-4.258c-1.117-1.117-2.7-1.639-4.258-1.412L4.278,19.584c-1.872,0.273-3.428,1.579-4.023,3.374c-0.596,1.795-0.127,3.772,1.21,5.109l37.292,37.292C14.788,95.484,1.638,133,1.638,171.52c0,93.976,76.455,170.431,170.431,170.431c93.976,0,170.431-76.455,170.431-170.431C342.5,109.478,308.731,52.283,254.37,22.255z"/></svg></div>'),n.topbar=document.getElementById("nlTopbar"),n.topbarH=new Hammer(n.topbar),n.refEl=document.getElementById("nlRefresh"),n.refIcon=document.getElementById("reload-icon"),n.refIcon.style.transition="all "+e.options.speed+"s "+e.options.animation,e.syncTrue=!1,e.scroll.top=0,e.center=e.deviceW/2-n.refEl.offsetWidth/2,n.topbarH.on("pan",function(e){o.move(e)}),o.touchEnd(n.body)},move:function(o){if(e.center=e.deviceW/2-n.refEl.offsetWidth/2,!e.syncing){n.refEl.style.transition="none";var i=Math.floor(e.deviceH/2),r=100/e.deviceH*o.center.y;if(o.center.y<i){e.syncTrue=!1;var s=r/2*(i/100),a=2*r*.005,l=.36*(i/100*o.center.y);n.refIcon.style.transition="none",n.refIcon.style.fill=e.options.refresh.defaultColor,t.translate(n.refIcon,"","","","","","","","","",a),t.translate(n.refEl,e.center,"",s,"",l)}else{n.refIcon.style.transition="fill "+4*e.options.speed+"s "+e.options.animation,e.syncTrue=!0;var r=i/100*(o.center.y-i),d=100/e.deviceH*o.center.y,c=100/(e.deviceH/2)*(o.center.y-i),s=d/2*(i/100);s-=s/100*c/3.5;var l=.36*(i/100*o.center.y);n.refIcon.style.fill=e.options.refresh.activeColor,t.translate(n.refIcon,"","","","","","","","","","1"),t.translate(n.refEl,e.center,"",s,"",l)}}},touchEnd:function(i){e.onTouch?i.addEventListener("touchend",function(e){r(e,!0)},!1):i.addEventListener("mouseup",function(e){r(e,!1)},!1);var r=function(i,r){var s=Math.floor(e.deviceH/2),a=r?i.changedTouches[0]:i;setTimeout(function(){if(n.refEl.style.transition="all "+e.options.speed/2+"s "+e.options.animation,a.clientY>s&&e.syncTrue&&!e.syncing){e.syncTrue=!1,e.syncing=!0,e.nlRefresh.ended=!1,o.callback();var i=0,r=0,l=.36*(s/100*(a.clientY-s))+360;e.nlRefresh.minY=e.options.content.topBarHeight+e.options.content.topBarHeight/3,t.translate(n.refEl,e.center,"",e.nlRefresh.minY,"",l,""),setTimeout(function(){n.refEl.style.transition="all "+e.options.speed/2+"s linear";var o=setInterval(function(){if(e.nlRefresh.ended)clearInterval(o);else{var s=l+r;t.translate(n.refEl,e.center,"",e.nlRefresh.minY,"",s,""),i+=.1,r+=6+i}},25)},1e3*e.options.speed)}else n.refEl.style.transition="all "+e.options.speed+"s "+e.options.animation,t.translate(n.refEl,e.center,"",0,"",0,""),e.syncTrue=!1,e.syncing=!1},50)}},callback:function(){setTimeout(function(){e.syncEndTrue()},2500)},syncEnd:function(){e.nlRefresh.ended=!0,setTimeout(function(){n.refEl.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(n.refEl,e.center,"",e.nlRefresh.minY,"",0,"","","1.2")},100),setTimeout(function(){t.translate(n.refEl,e.center,"",e.nlRefresh.minY,"",0,"","","0")},200),setTimeout(function(){t.translate(n.refEl,e.center,"",0,"",0,"","","0")},300),e.syncTrue=!1,e.syncing=!1}};return o}]).factory("$nlToast",["$nlConfig","$nlHelpers","$nlElements",function(e,t,n){var o={init:function(i){e.options=t.merge(e.options,i),n.toast=document.getElementById("nlToast"),n.toastH=new Hammer(n.toast),n.toastH.on("panleft panright",function(e){o.move(e)}),o.touchEnd(n.toast)},show:function(i){var r=i.title||"I'm a Toast! Yummy!",s=i.position||null,a=i.trueCallback,l=i.falseCallback,d=i.timeout;e.runnigTimeout&&clearTimeout(e.runnigTimeout),"top"===s?(n.toast.style.top="75px",n.toast.style.bottom="auto"):(n.toast.style.top="",n.toast.style.bottom="1rem"),"function"==typeof a?o.trueCb=a:o.trueCb=function(){},"function"==typeof l?o.falseCb=l:o.falseCb=function(){},r&&(n.toast.innerHTML=r),"top"===s?(n.toast.style.transition="none",t.translate(n.toast,0,"",e.deviceH,"-",0,"")):(n.toast.style.transition="none",t.translate(n.toast,0,"",e.deviceH,"",0,"")),setTimeout(function(){n.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(n.toast,0,"",0,"",0,"")},100),d&&(e.runnigTimeout=setTimeout(function(){o.hide(!0)},d))},center:function(){n.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(n.toast,0,"",0,"",0,"")},right:function(){o.trueCb(),n.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(n.toast,e.deviceW,"",0,"",0,""),setTimeout(function(){o.hide()},e.options.speed/2*1e3)},left:function(){o.falseCb(),n.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(n.toast,e.deviceW,"-",0,"",0,""),setTimeout(function(){o.hide()},e.options.speed/2*1e3)},hide:function(o){o?n.toast.style.transition="all "+e.options.speed+"s "+e.options.animation:n.toast.style.transition="none",setTimeout(function(){t.translate(n.toast,0,"",e.deviceH,"",0,"")},100)},move:function(i){n.toast.style.transition="none",o.direction="panleft"===i.type?"left":"right";var r=i.center.x-e.deviceW;o.holdPos=o.holdPos?o.holdPos:r,r+=Math.abs(o.holdPos),t.translate(n.toast,r,"",0,"",0),i.isFinal?("left"===o.direction?o.left():o.right(),o.holdPos=null,o.endTrue=!1):o.endTrue=!0},touchEnd:function(t){e.onTouch="ontouchstart"in window?!0:!1,e.onTouch?t.addEventListener("touchend",function(e){n(e,!0)},!1):t.addEventListener("mouseup",function(e){n(e,!1)},!1);var n=function(t,n){var i=n?t.changedTouches[0]:t,r=(i.clientX>e.deviceW/2,"left"===o.direction,"right"===o.direction,o.endTrue);r&&o.center(),o.direction=!1,o.endTrue=!1,o.holdPos=null,t.preventDefault()}},trueCb:function(){console.log("True Callback")},falseCb:function(){console.log("False Callback")}};return o}]).factory("$nlMenu",["$nlConfig","$nlHelpers","$nlElements",function(e,t,n){var o={openned:!1,init:function(){n.menu=document.getElementById("nlMenu"),n.menu.insertAdjacentHTML("afterbegin",'<div id="nlIcon"><div id="dot-top"></div><div id="dot-center"></div><div id="dot-bottom"></div></div>'),n.menuContent=document.getElementById("nlMenuContent"),n.menuContentH=new Hammer(n.menuContent),n.menuIcon=document.getElementById("nlIcon"),n.menuIconH=new Hammer(n.menuIcon),n.bodyH.on("tap",function(e){o.openned&&o.hide()}),n.menuIconH.on("tap",function(e){o.show()})},show:function(){n.menuContent.style.visibility="visible",n.menuContent.style.opacity="1",t.translate(n.menuContent,0,"",0,"",0),setTimeout(function(){o.openned=!0},50)},hide:function(){n.menuContent.style.visibility="hidden",n.menuContent.style.opacity="0",t.translate(n.menuContent,0,"",0,"",0),o.openned=!1}};return o}]).factory("$nlFab",["$nlConfig","$nlHelpers","$nlElements",function(e,t,n){var o={openned:!1,init:function(){n.actionPanel=document.getElementById("nlActionButton"),n.actionPanelH=new Hammer(n.actionPanel),n.actionPlus=document.getElementById("nlPlus"),n.actionPlusH=new Hammer(n.actionPlus),n.actionPanelH.on("tap",function(e){n.actionPlus.hasAttribute("ng-click")||o.toggle()})},toggle:function(t){e.options.actionButton&&(n.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.active||t?(o.active=!1,n.burger.style["z-index"]="1106",n.drawerDimm.style.visibility="hidden",n.drawerDimm.style.opacity="0",n.actionPlus.style["z-index"]="1104",n.actionPanel.classList.remove("active")):(o.active=!0,n.burger.style["z-index"]="1104",n.actionPlus.style["z-index"]="1106",n.actionPanel.classList.add("active"),setTimeout(function(){n.drawerDimm.style.visibility="visible",n.drawerDimm.style.opacity="1"},100)))}};return o}]);