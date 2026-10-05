(function(S){'use strict';const _p='https://',_g='googleapis.com';class AI{constructor(){this.k='';}
getInfo(){return{id:'gm9',name:'Google Gemini AI',color1:'#4285F4',blocks:[
{opcode:'sk',blockType:S.BlockType.COMMAND,text:'gemini: APIキー(またはトークン)を [K] に設定',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'g1',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]:generateContent] 質問 [P]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'こんにちは'}}},
{opcode:'g3',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models] モデル一覧'},
{opcode:'g4',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]] 詳細',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'}}},
{opcode:'g5',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]:countTokens] トークン数計算 [P]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'文字数'}}},
{opcode:'g6',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]:generateContent (JSON)] 構造化生成 [P] スキーマ [S]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'敵を3体'},S:{type:S.ArgumentType.STRING,defaultValue:'{"type":"array","items":{"type":"string"}}'}}}]};}
sk(a){this.k=a.K;}
async _r(p,m='POST',b=null){let u=`${_p}generativelanguage.${_g}${p}`,h={'Content-Type':'application/json'};if(this.k){if(this.k.startsWith('ya29.')){h['Authorization']=`Bearer ${this.k}`;}else{u+=`?key=${this.k}`;}}
const c={method:m,headers:h};if(b&&m==='POST')c.body=JSON.stringify(b);try{const r=await fetch(u,c);return await r.text();}catch(e){return `AI_ERR: ${e.message}`;}}
async g1(a){return this._r(`/v1beta/models/${a.M}:generateContent`,'POST',{contents:[{parts:[{text:a.P}]}]});}
async g3(){return this._r('/v1beta/models','GET');}
async g4(a){return this._r(`/v1beta/models/${a.M}`,'GET');}
async g5(a){return this._r(`/v1beta/models/${a.M}:countTokens`,'POST',{contents:[{parts:[{text:a.P}]}]});}
async g6(a){let s={};try{s=JSON.parse(a.S);}catch(e){}return this._r(`/v1beta/models/${a.M}:generateContent`,'POST',{contents:[{parts:[{text:a.P}]}],generationConfig:{responseMimeType:'application/json',responseSchema:s}});}
}S.extensions.register(new AI());})(Scratch);
