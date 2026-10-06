(function(S){'use strict';const _p='https://',_g='googleapis.com';class D{constructor(){this.t='';}
getInfo(){return{id:'dr1',name:'Google Drive',color1:'#4285F4',blocks:[
{opcode:'st',blockType:S.BlockType.COMMAND,text:'drive: 手動トークンを設定 [T]',arguments:{T:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'f1',blockType:S.BlockType.REPORTER,text:'drive: [/drive/v3/files] ファイル一覧を取得'},
{opcode:'f2',blockType:S.BlockType.REPORTER,text:'drive: [/drive/v3/files/[ID]] メタデータ取得',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'f3',blockType:S.BlockType.REPORTER,text:'drive: [/drive/v3/files (POST)] 新規ファイル作成 [N] 内容 [C]',arguments:{N:{type:S.ArgumentType.STRING,defaultValue:'save.json'},C:{type:S.ArgumentType.STRING,defaultValue:'{}'}}},
{opcode:'f4',blockType:S.BlockType.REPORTER,text:'drive: [/drive/v3/files/[ID] (PATCH)] ファイル上書き [ID] 内容 [C]',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''},C:{type:S.ArgumentType.STRING,defaultValue:'{}'}}},
{opcode:'f5',blockType:S.BlockType.REPORTER,text:'drive: [/drive/v3/files/[ID] (DELETE)] ファイル削除',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
// ✨ 【新設】バイナリをそのままGoogleドライブへ直送する1パス1ブロック
{opcode:'fb',blockType:S.BlockType.REPORTER,text:'drive: [/upload/media] バイナリ [B] をファイル名 [N] で直接作成',arguments:{B:{type:S.ArgumentType.STRING,defaultValue:'1,2,3,4'},N:{type:S.ArgumentType.STRING,defaultValue:'game_data.bin'}}}]};}
st(a){this.t=a.T;}
async _r(p,m='GET',b=null,ct='application/json'){const u=`${_p}www.${_g}${p}`,h={'Content-Type':ct},tk=this.t||localStorage.getItem('_g_api_token');if(tk)h['Authorization']=`Bearer ${tk}`;const c={method:m,headers:h};if(b)c.body=b;try{const r=await fetch(u,c);return await r.text();}catch(e){return `DRV_ERR: ${e.message}`;}}
async f1(){return this._r('/drive/v3/files');}
async f2(a){return this._r(`/drive/v3/files/${a.ID}`);}
async f3(a){const bd=`--b\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{"name":"${a.N}"}\r\n--b\r\nContent-Type: text/plain\r\n\r\n${a.C}\r\n--b--`;return this._r('/upload/drive/v3/files?uploadType=multipart','POST',bd,'multipart/related; boundary=b');}
async f4(a){return this._r(`/upload/drive/v3/files/${a.ID}?uploadType=media`,'PATCH',a.C,'text/plain');}
async f5(a){return this._r(`/drive/v3/files/${a.ID}`,'DELETE');}
// ✨ バイナリを動的にパースして直接ストリーム送信するロジック
async fb(a){try{let d;if(a.B.startsWith('data:')){d=await(await fetch(a.B)).blob();}else{d=new Uint8Array(a.B.split(',').map(Number));}
const r1=await this._r(`/upload/drive/v3/files?uploadType=media`,'POST',d,'application/octet-stream');return r1;}catch(e){return `ERR: ${e.message}`;}}}
S.extensions.register(new D());})(Scratch);
