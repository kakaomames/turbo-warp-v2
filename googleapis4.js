(function(S){'use strict';const _p='https://',_g='googleapis.com';class AI{constructor(){this.k='';this.h=[];}
getInfo(){return{id:'gm9',name:'Google Gemini AI',color1:'#4285F4',blocks:[
{opcode:'sk',blockType:S.BlockType.COMMAND,text:'gemini: APIキー(またはトークン)を [K] に設定',arguments:{K:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'g3',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models] 利用可能なモデル一覧(JSON)を取得'},
{opcode:'ch',blockType:S.BlockType.REPORTER,text:'gemini: モデル [M] でチャット会話を実行 質問 [P]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'こんにちは'}}},
{opcode:'ci',blockType:S.BlockType.COMMAND,text:'gemini: 会話履歴を完全に初期化(リセット)'},
{opcode:'wh',blockType:S.BlockType.REPORTER,text:'gemini: 現在までの全会話データをJSONとして書き出す'},
{opcode:'lh',blockType:S.BlockType.COMMAND,text:'gemini: 外部の履歴JSON [J] を読み込んで会話を復元',arguments:{J:{type:S.ArgumentType.STRING,defaultValue:'[]'}}},
{opcode:'g4',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]] 詳細',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'}}},
{opcode:'g5',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]:countTokens] トークン数計算 [P]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'文字数'}}},
{opcode:'g6',blockType:S.BlockType.REPORTER,text:'gemini: パス [/v1beta/models/[M]:generateContent (JSON)] 構造化生成 [P] スキーマ [S]',arguments:{M:{type:S.ArgumentType.STRING,defaultValue:'gemini-1.5-flash'},P:{type:S.ArgumentType.STRING,defaultValue:'敵を3体'},S:{type:S.ArgumentType.STRING,defaultValue:'{"type":"array","items":{"type":"string"}}'}}}]};}
sk(a){this.k=a.K;}
ci(){this.h=[];}
wh(){return JSON.stringify(this.h);}
lh(a){try{const arr=JSON.parse(a.J);if(Array.isArray(arr))this.h=arr;}catch(e){console.error(e);}}
async _r(p,m='POST',b=null){let u=`${_p}generativelanguage.${_g}${p}`,h={'Content-Type':'application/json'};if(this.k){if(this.k.startsWith('ya29.')){h['Authorization']=`Bearer ${this.k}`;}else{u+=`?key=${this.k}`;}}
const c={method:m,headers:h};if(b&&m==='POST')c.body=JSON.stringify(b);try{const r=await fetch(u,c);return await r.text();}catch(e){return `AI_ERR: ${e.message}`;}}
async g3(){return this._r('/v1beta/models','GET');}
async g4(a){return this._r(`/v1beta/models/${a.M}`,'GET');}
async g5(a){return this._r(`/v1beta/models/${a.M}:countTokens`,'POST',{contents:[{parts:[{text:a.P}]}]});}
async g6(a){let s={};try{s=JSON.parse(a.S);}catch(e){}return this._r(`/v1beta/models/${a.M}:generateContent`,'POST',{contents:[{parts:[{text:a.P}]}],generationConfig:{responseMimeType:'application/json',responseSchema:s}});}
async ch(a){this.h.push({role:'user',parts:[{text:a.P}]});const res=await this._r(`/v1beta/models/${a.M}:generateContent`,'POST',{contents:this.h});try{const o=JSON.parse(res);if(o.candidates&&o.candidates[0].content){this.h.push(o.candidates[0].content);return o.candidates[0].content.parts[0].text;}return res;}catch(e){return res;}}
}S.extensions.register(new AI());})(Scratch);
