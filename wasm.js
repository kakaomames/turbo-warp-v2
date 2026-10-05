(function(S){'use strict';class M{constructor(){this.h=new Map();}
getInfo(){return{id:'wmx',name:'Wasm Multi Engine',color1:'#9966FF',blocks:[
{opcode:'l',blockType:S.BlockType.COMMAND,text:'Wasm: パス [/register] バイナリ [B] を ID: [I] として登録',arguments:{B:{type:S.ArgumentType.STRING,defaultValue:''},I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'}}},
{opcode:'f',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数一覧をJSON配列で出力',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'}}},
{opcode:'t',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数 [F] の引数の数と型を取得',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},F:{type:S.ArgumentType.STRING,defaultValue:'main'}}},
{opcode:'e',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] の関数 [F] を引数配列 [A] で実行',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},F:{type:S.ArgumentType.STRING,defaultValue:'main'},A:{type:S.ArgumentType.STRING,defaultValue:'[0,0]'}}},
{opcode:'m',blockType:S.BlockType.COMMAND,text:'Wasm: ID: [I] のメモリ [O] に数値 [V] を書込',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},O:{type:S.ArgumentType.NUMBER,defaultValue:0},V:{type:S.ArgumentType.NUMBER,defaultValue:0}}},
{opcode:'r',blockType:S.BlockType.REPORTER,text:'Wasm: ID: [I] のメモリ [O] から数値を読出',arguments:{I:{type:S.ArgumentType.STRING,defaultValue:'wasm1'},O:{type:S.ArgumentType.NUMBER,defaultValue:0}}}]};}
async l(a){try{let b;if(a.B.startsWith('data:')){const r=await fetch(a.B);b=await r.arrayBuffer();}else{b=new Uint8Array(a.B.split(',').map(Number)).buffer;}
const m=await WebAssembly.compile(b);const i=await WebAssembly.instantiate(m,{env:{p:console.log}});
this.h.set(a.I,{i:i,m:m,bm:i.exports.memory?new Uint8Array(i.exports.memory.buffer):null});console.log(`Wasm ${a.I} Ready`);}catch(e){console.error(e);}}
f(a){const o=this.h.get(a.I);if(!o)return'[]';const k=[];for(let x in o.i.exports){if(typeof o.i.exports[x]==='function')k.push(x);}return JSON.stringify(k);}
t(a){const o=this.h.get(a.I);if(!o)return'{}';try{const s=WebAssembly.Module.exports(o.m).find(e=>e.name===a.F&&e.kind==='function');if(s){return JSON.stringify({name:a.F,param_count:o.i.exports[a.F].length});}}catch(e){}const f=o.i.exports[a.F];return f?JSON.stringify({name:a.F,param_count:f.length,note:'JS_Len'}):'{"err":"not_found"}';}
e(a){const o=this.h.get(a.I);if(!o||!o.i.exports[a.F])return'ERR_NO_INST';const f=o.i.exports[a.F];if(typeof f!=='function')return'ERR_NOT_FUNC';try{const arr=JSON.parse(a.A);return String(f(...arr));}catch(err){return `ERR_EXEC: ${err.message}`;}}
m(a){const o=this.h.get(a.I);if(o&&o.bm)o.bm[a.O]=a.V;}
r(a){const o=this.h.get(a.I);return o&&o.bm?o.bm[a.O]:0;}}
S.extensions.register(new M());})(Scratch);
