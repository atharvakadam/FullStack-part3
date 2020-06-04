(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(t,e,n){t.exports=n(39)},20:function(t,e,n){},21:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(14),r=n.n(c),l=(n(20),n(4)),i=n(3),u=(n(21),n(2)),s=n.n(u);function m(t){var e=t.note,n=t.toggleImportance,o=e.important?"make not important":"make important";return a.a.createElement("div",null,a.a.createElement("li",{className:"note"},e.content,a.a.createElement("button",{onClick:n},o)))}var f=function(){return s.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return s.a.post("/api/notes",t).then((function(t){return t.data}))},g=function(t,e){return s.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))};function d(t){var e=t.message;return null===e?null:a.a.createElement("div",{className:"error"},e)}var v=function(){return a.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},a.a.createElement("br",null),a.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))};var b=function(){var t=Object(o.useState)([]),e=Object(i.a)(t,2),n=e[0],c=e[1],r=Object(o.useState)(""),u=Object(i.a)(r,2),s=u[0],b=u[1],h=Object(o.useState)(!0),E=Object(i.a)(h,2),O=E[0],j=E[1],S=Object(o.useState)("some error happened..."),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(o.useEffect)((function(){f().then((function(t){console.log("initial notes",t),c(t)})).catch((function(t){console.log("fail")}))}),[]),console.log("render",n.length,"notes"),console.log(n);var D=O?n:n.filter((function(t){return!0===t.important}));return a.a.createElement("div",null,a.a.createElement("h1",null,"Notes"),a.a.createElement(d,{message:y}),a.a.createElement("ul",null,D.map((function(t){return a.a.createElement(m,{key:t.id,note:t,toggleImportance:function(){return function(t){console.log("Importance of ",t," needs to be toggled.");var e=n.find((function(e){return e.id===t}));console.log(e.important);var o=Object(l.a)(Object(l.a)({},e),{},{important:!e.important});console.log(o.important),g(t,o).then((function(e){n.map((function(n){return n.id!==t?n:e})),f().then((function(t){console.log("initial notes",t),c(t)})).catch((function(t){console.log("fail")}))})).catch((function(o){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),a.a.createElement("button",{onClick:function(){return j(!O)}},"show",O?"important":"all"),a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),console.log("button clicked",t.target);var e={content:s,date:(new Date).toISOString(),important:Math.random()<.5};p(e).then((function(t){c(n.concat(t)),b("")})).catch((function(t){console.log("fail")}))}},a.a.createElement("input",{id:"FDD",value:s,onChange:function(t){console.log(t.target.value),b(t.target.value),console.log(s)}}),a.a.createElement("button",{type:"submit"},"save")),a.a.createElement(v,null))};r.a.render(a.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.960e64dd.chunk.js.map