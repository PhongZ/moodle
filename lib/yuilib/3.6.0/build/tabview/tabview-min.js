/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("tabview",function(f){var a=f.TabviewBase._queries,e=f.TabviewBase._classNames,g=".",b=f.ClassNameManager.getClassName,c=f.Base.create("tabView",f.Widget,[f.WidgetParent],{_afterChildAdded:function(h){this.get("contentBox").focusManager.refresh();},_defListNodeValueFn:function(){return f.Node.create(c.LIST_TEMPLATE);},_defPanelNodeValueFn:function(){return f.Node.create(c.PANEL_TEMPLATE);},_afterChildRemoved:function(k){var h=k.index,j=this.get("selection");if(!j){j=this.item(h-1)||this.item(0);if(j){j.set("selected",1);}}this.get("contentBox").focusManager.refresh();},_initAria:function(){var h=this.get("contentBox"),i=h.one(a.tabviewList);if(i){i.setAttrs({role:"tablist"});}},bindUI:function(){this.get("contentBox").plug(f.Plugin.NodeFocusManager,{descendants:g+e.tabLabel,keys:{next:"down:39",previous:"down:37"},circular:true});this.after("render",this._setDefSelection);this.after("addChild",this._afterChildAdded);this.after("removeChild",this._afterChildRemoved);},renderUI:function(){var h=this.get("contentBox");this._renderListBox(h);this._renderPanelBox(h);this._childrenContainer=this.get("listNode");this._renderTabs(h);},_setDefSelection:function(h){var i=this.get("selection")||this.item(0);this.some(function(j){if(j.get("selected")){i=j;return true;}});if(i){this.set("selection",i);i.set("selected",1);}},_renderListBox:function(h){var i=this.get("listNode");if(!i.inDoc()){h.append(i);}},_renderPanelBox:function(h){var i=this.get("panelNode");if(!i.inDoc()){h.append(i);}},_renderTabs:function(h){var k=h.all(a.tab),i=this.get("panelNode"),j=(i)?this.get("panelNode").get("children"):null,l=this;if(k){k.addClass(e.tab);h.all(a.tabLabel).addClass(e.tabLabel);h.all(a.tabPanel).addClass(e.tabPanel);k.each(function(o,n){var m=(j)?j.item(n):null;l.add({boundingBox:o,contentBox:o.one(g+e.tabLabel),label:o.one(g+e.tabLabel).get("text"),panelNode:m});});}}},{LIST_TEMPLATE:'<ul class="'+e.tabviewList+'"></ul>',PANEL_TEMPLATE:'<div class="'+e.tabviewPanel+'"></div>',ATTRS:{defaultChildType:{value:"Tab"},listNode:{setter:function(h){h=f.one(h);if(h){h.addClass(e.tabviewList);}return h;},valueFn:"_defListNodeValueFn"},panelNode:{setter:function(h){h=f.one(h);if(h){h.addClass(e.tabviewPanel);}return h;},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null}},HTML_PARSER:{listNode:a.tabviewList,panelNode:a.tabviewPanel}});f.TabView=c;var d=f.Lang,a=f.TabviewBase._queries,e=f.TabviewBase._classNames,b=f.ClassNameManager.getClassName;f.Tab=f.Base.create("tab",f.Widget,[f.WidgetChild],{BOUNDING_TEMPLATE:'<li class="'+e.tab+'"></li>',CONTENT_TEMPLATE:'<a class="'+e.tabLabel+'"></a>',PANEL_TEMPLATE:'<div class="'+e.tabPanel+'"></div>',_uiSetSelectedPanel:function(h){this.get("panelNode").toggleClass(e.selectedPanel,h);},_afterTabSelectedChange:function(h){this._uiSetSelectedPanel(h.newVal);},_afterParentChange:function(h){if(!h.newVal){this._remove();}else{this._add();}},_initAria:function(){var i=this.get("contentBox"),j=i.get("id"),h=this.get("panelNode");if(!j){j=f.guid();i.set("id",j);}i.set("role","tab");i.get("parentNode").set("role","presentation");h.setAttrs({role:"tabpanel","aria-labelledby":j});},syncUI:function(){this.set("label",this.get("label"));this.set("content",this.get("content"));this._uiSetSelectedPanel(this.get("selected"));},bindUI:function(){this.after("selectedChange",this._afterTabSelectedChange);this.after("parentChange",this._afterParentChange);},renderUI:function(){this._renderPanel();this._initAria();},_renderPanel:function(){this.get("parent").get("panelNode").appendChild(this.get("panelNode"));},_add:function(){var i=this.get("parent").get("contentBox"),j=i.get("listNode"),h=i.get("panelNode");if(j){j.appendChild(this.get("boundingBox"));}if(h){h.appendChild(this.get("panelNode"));}},_remove:function(){this.get("boundingBox").remove();this.get("panelNode").remove();},_onActivate:function(h){if(h.target===this){h.domEvent.preventDefault();h.target.set("selected",1);}},initializer:function(){this.publish(this.get("triggerEvent"),{defaultFn:this._onActivate});},_defLabelSetter:function(h){this.get("contentBox").setContent(h);return h;},_defContentSetter:function(h){this.get("panelNode").setContent(h);return h;},_defContentGetter:function(h){return this.get("panelNode").getContent();},_defPanelNodeValueFn:function(){var i=this.get("contentBox").get("href")||"",k=this.get("parent"),j=i.indexOf("#"),h;i=i.substr(j);if(i.charAt(0)==="#"){h=f.one(i);if(h){h.addClass(e.tabPanel);}}if(!h&&k){h=k.get("panelNode").get("children").item(this.get("index"));}if(!h){h=f.Node.create(this.PANEL_TEMPLATE);}return h;}},{ATTRS:{triggerEvent:{value:"click"},label:{setter:"_defLabelSetter",validator:d.isString},content:{setter:"_defContentSetter",getter:"_defContentGetter"},panelNode:{setter:function(h){h=f.one(h);if(h){h.addClass(e.tabPanel);}return h;},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null,validator:"_validTabIndex"}},HTML_PARSER:{selected:function(h){var i=(this.get("boundingBox").hasClass(e.selectedTab))?1:0;return i;}}});},"3.6.0",{requires:["node-pluginhost","node-focusmanager","tabview-base","widget","widget-parent","widget-child"]});