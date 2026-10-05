(function(S){'use strict';class C{constructor(){this.m=new Map();}
getInfo(){return{id:'c11',name:'Async Control',color1:'#FFAB19',blocks:[
{opcode:'w1',blockType:S.BlockType.COMMAND,text:'非同期: [K] の通信開始を宣言',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:'login'}}},
{opcode:'w2',blockType:S.BlockType.COMMAND,text:'非同期: [K] の通信完了を合図 [V]',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:'login'},V:{type:S.ArgumentType.STRING,defaultValue:'OK'}}},
{opcode:'w3',blockType:S.BlockType.COMMAND,text:'非同期: [K] が完了するまで完全に待つ',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:'login'}}},
{opcode:'w4',blockType:S.BlockType.REPORTER,text:'非同期: [K] の最終返却データ',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:'login'}}},
{opcode:'w5',blockType:S.BlockType.BOOLEAN,text:'非同期: [K] は処理中？',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:'login'}}}]};}
w1(a){this.m.set(a.K,{f:false,v:'',p:new Promise(r=>{this.m.has(a.K)?this.m.get(a.K).r=r:this.m.set(a.K,{f:false,v:'',r:r});})});}
w2(a){const o=this.m.get(a.K);if(o){o.f=true;o.v=args.V;if(o.r)o.r();}else{this.m.set(a.K,{f:true,v:a.V});}}
async w3(a){const o=this.m.get(a.K);if(o&&!o.f)await o.p;}
w4(a){const o=this.m.get(a.K);return o?o.v:'';}
w5(a){const o=this.m.get(a.K);return o?!o.f:false;}}
S.extensions.register(new C());})(Scratch);
