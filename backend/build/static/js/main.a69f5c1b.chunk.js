(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,t,n){e.exports=n(47)},24:function(e,t,n){},25:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(18),r=n.n(l),u=n(6),o=n(7),m=n(2),i=(n(24),n(25),function(e){var t=e.addPerson,n=e.handleChange,a=e.newContact,l=e.showForm,r=a.first_name,u=a.last_name,o=a.number,m=a.email;return c.a.createElement(c.a.Fragment,null,c.a.createElement("form",{className:"modal",onSubmit:t},c.a.createElement("div",{className:"modal-content"},c.a.createElement("div",{className:"modal-container"},c.a.createElement("span",{onClick:l,className:"close-modal"},"\xd7"),c.a.createElement("div",null,"First Name: ",c.a.createElement("input",{name:"first_name",value:r,onChange:n,required:!0})),c.a.createElement("div",null,"Last Name: ",c.a.createElement("input",{name:"last_name",value:u,onChange:n,required:!0})),c.a.createElement("div",null,"Email: ",c.a.createElement("input",{name:"email",value:m,onChange:n,type:"email",required:!0})),c.a.createElement("div",null,"Number: ",c.a.createElement("input",{name:"number",value:o,onChange:n,required:!0})),c.a.createElement("div",null,c.a.createElement("button",{className:"submit-form",type:"submit"},"add"))))))}),s=n(8),d=n.n(s),f=function(e){var t=e.contacts,n=e.deletePerson,a=e.showForm;return c.a.createElement(c.a.Fragment,null,c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"First Name"),c.a.createElement("th",null,"Last Name"),c.a.createElement("th",null,"Number"),c.a.createElement("th",null,"Email"),c.a.createElement("th",null,"Created"),c.a.createElement("th",null,"Updated"),c.a.createElement("th",null,"Actions"))),t.map((function(e,t){return c.a.createElement("tbody",{key:e._id},c.a.createElement("tr",null,c.a.createElement("td",null,e.first_name),c.a.createElement("td",null,e.last_name),c.a.createElement("td",null,e.number),c.a.createElement("td",null,e.email),c.a.createElement("td",null,c.a.createElement(d.a,{format:"YYYY/MM/DD"},e.created)),c.a.createElement("td",null,c.a.createElement(d.a,{format:"YYYY/MM/DD"},e.updated)),c.a.createElement("td",null,c.a.createElement("div",{className:"dropdown"},c.a.createElement("div",{className:"dropdown-content"},c.a.createElement("button",{onClick:function(){return a(e,!1)}},"Edit"),c.a.createElement("button",{onClick:function(){return n(e.first_name,e._id)}},"Delete"))))))}))))},E=n(3),h=n.n(E),b="http://localhost:3001/api/contact",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},_=function(e,t){return h.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))},w=function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e}))},g=function(e){var t,n,a=e.successMessage,l=e.errorMessage;return null===a||null===l?null:(a?(t="success",n=a):l&&(t="error",n=l),c.a.createElement("div",{className:"".concat(t)},n))},j=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],l=t[1],r=Object(a.useState)({first_name:"",last_name:"",number:"",email:""}),s=Object(m.a)(r,2),d=s[0],E=s[1],h=Object(a.useState)(""),b=Object(m.a)(h,2),j=b[0],N=b[1],O=Object(a.useState)(""),C=Object(m.a)(O,2),k=C[0],D=C[1],F=Object(a.useState)(!1),M=Object(m.a)(F,2),Y=M[0],y=M[1],S=Object(a.useState)(!0),q=Object(m.a)(S,2),P=q[0],T=q[1],A=function(){p().then((function(e){l(e)}))};Object(a.useEffect)(A,[]);var U=function(e,t){y(!Y),e&&(E(e),T(t))};return c.a.createElement("div",{className:"contact-page"},c.a.createElement("h2",null,"Contacts"),c.a.createElement(g,{successMessage:j,errorMessage:k}),c.a.createElement("button",{className:"add-new",onClick:U},"add new"),Y?c.a.createElement(i,{addPerson:function(e){if(e.preventDefault(),n.find((function(e){return e._id===d._id}))){var t=d._id,a=d.first_name,c=d.last_name,r=d.number,u=d.email,o={first_name:a,last_name:c,number:r,email:u};P?window.confirm("A person with ".concat(u," is already exists, update ").concat(a,"'s with a new info?"))&&_(t,o).then((function(e){A(),N("Updated ".concat(a)),U(),setTimeout((function(){N(null)}),5e3)})):_(t,o).then((function(e){A(),N("Updated ".concat(a)),U(),setTimeout((function(){N(null)}),5e3)}))}else v(d).then((function(e){l(n.concat(e)),N("Added ".concat(d.first_name," ").concat(d.last_name)),U(),A(),setTimeout((function(){N(null)}),5e3)}))},handleChange:function(e){var t=e.target,n=t.name,a=t.value;E(Object(o.a)(Object(o.a)({},d),{},Object(u.a)({},n,a)))},newContact:d,showForm:U}):"",c.a.createElement(f,{contacts:n,showForm:U,deletePerson:function(e,t){window.confirm("Delete ".concat(e," ?"))&&w(t).then((function(){l(n.filter((function(e){return e._id!==t}))),N("Deleted ".concat(d.first_name," ").concat(d.last_name)),A()})).catch((function(t){D("Information of ".concat(e," has already been removed from the server")),setTimeout((function(){D(null)}),5e3)}))}}))};n(46);r.a.render(c.a.createElement(j,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.a69f5c1b.chunk.js.map