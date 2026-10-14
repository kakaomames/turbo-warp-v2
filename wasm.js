(function(S){'use strict';class M{constructor(){this.h=new Map();this.c=new Map();}
getInfo(){return{id:'wmx',name:'Wasm Multi Engine',color1:'#9966FF',blocks:[
{opcode:'w',blockType:S.BlockType.COMMAND,text:'Wasm: URL [U] からデータを取得し ID: [I] にキャッシュ',arguments:{U:{type:S.ArgumentType.STRING,defaultValue:''},I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'}}},
{opcode:'l',blockType:S.BlockType.COMMAND,text:'Wasm: パス/バイナリ [B] を ID: [I] として登録(キャッシュ優先)',arguments:{B:{type:S.ArgumentType.STRING,defaultValue:''},I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'}}},
{opcode:'f',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数一覧をJSON配列で出力',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'}}},
{opcode:'t',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数 [F] の引数の数と型を取得',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},F:{type:S.ArgumentType.STRING,defaultValue:'main'}}},
{opcode:'e',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数 [F] を引数配列 [A] で実行',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},F:{type:S.ArgumentType.STRING,defaultValue:'main'},A:{type:S.ArgumentType.STRING,defaultValue:'[]'}}},
{opcode:'m',blockType:S.BlockType.COMMAND,text:'Wasm: ID: [I] のメモリ [O] に数値 [V] を書込',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},O:{type:S.ArgumentType.NUMBER,defaultValue:0},V:{type:S.ArgumentType.NUMBER,defaultValue:0}}},
{opcode:'r',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] のメモリ [O] から数値を読出',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},O:{type:S.ArgumentType.NUMBER,defaultValue:0}}}]};}
async w(a){try{if(!a.U||!a.I)return;const res=await fetch(a.U);if(!res.ok)throw new Error(res.status);const buf=await res.arrayBuffer();this.c.set(a.I,buf);console.log(`Wasm Cache ${a.I} Ready`);}catch(e){console.error(e);}}
async l(a){try{let b=this.c.get(a.I);if(!b){if(a.B.startsWith('data:')||a.B.startsWith('blob:')||a.B.startsWith('http')){const r=await fetch(a.B);b=await r.arrayBuffer();}else{b=new Uint8Array(a.B.split(',').map(Number)).buffer;}}
const m=await WebAssembly.compile(b);const i=await WebAssembly.instantiate(m,{env:{p:console.log,print:console.log}});
this.h.set(a.I,{i:i,m:m});console.log(`Wasm ${a.I} Registered`);}catch(e){console.error(e);}}
f(a){const o=this.h.get(a.I);if(!o)return'[]';const k=[];for(let x in o.i.exports){if(typeof o.i.exports[x]==='function')k.push(x);}return JSON.stringify(k);}
t(a){const o=this.h.get(a.I);if(!o)return'{"err":"not_found"}';try{const s=WebAssembly.Module.exports(o.m).find(e=>e.name===a.F&&e.kind==='function');if(s){return JSON.stringify({name:a.F,param_count:o.i.exports[a.F].length});}}catch(e){}const f=o.i.exports[a.F];return f?JSON.stringify({name:a.F,param_count:f.length,note:'JS_Len'}):'{"err":"not_found"}';}
e(a){const o=this.h.get(a.I);if(!o||!o.i.exports[a.F])return'ERR_NO_INST';const f=o.i.exports[a.F];if(typeof f!=='function')return'ERR_NOT_FUNC';try{const arr=JSON.parse(a.A||'[]');return String(f(...arr));}catch(err){return `ERR_EXEC: ${err.message}`;}}
m(a){const o=this.h.get(a.I);if(!o)return;const mem=o.i.exports.memory||o.m.memory;if(!mem)return;const v=new Uint8Array(mem.buffer);if(a.O>=0&&a.O<v.length)v[a.O]=a.V&0xFF;}
r(a){const o=this.h.get(a.I);if(!o)return 0;const mem=o.i.exports.memory||o.m.memory;if(!mem)return 0;const v=new Uint8Array(mem.buffer);return(a.O>=0&&a.O<v.length)?v[a.O]:0;}}
S.extensions.register(new M());})(Scratch);
