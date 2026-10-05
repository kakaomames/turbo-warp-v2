(function(S){'use strict';const _p='https://',_g='googleapis.com';class G{constructor(){this.t='';}
getInfo(){return{id:'g11',name:'Google Games',color1:'#0F9D58',blocks:[
{opcode:'st',blockType:S.BlockType.COMMAND,text:'games: 手動トークンを設定 [T]',arguments:{T:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'p1',blockType:S.BlockType.REPORTER,text:'games: [/players/[ID]] プレイヤー情報',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:'me'}}},
{opcode:'a1',blockType:S.BlockType.REPORTER,text:'games: [/players/me/achievements] 実績一覧'},
{opcode:'a2',blockType:S.BlockType.REPORTER,text:'games: [/achievements/[ID]/unlock] 実績解除',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'a3',blockType:S.BlockType.REPORTER,text:'games: [/achievements/[ID]/increment] 実績進行',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''},STEPS:{type:S.ArgumentType.NUMBER,defaultValue:1}}},
{opcode:'a4',blockType:S.BlockType.REPORTER,text:'games: [/achievements/[ID]/reveal] 隠し実績表示',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'a5',blockType:S.BlockType.REPORTER,text:'games: [/achievements/[ID]/setStepsAtLeast] 実績段階固定',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''},STEPS:{type:S.ArgumentType.NUMBER,defaultValue:5}}},
{opcode:'l1',blockType:S.BlockType.REPORTER,text:'games: [/leaderboards] ボード一覧'},
{opcode:'l2',blockType:S.BlockType.REPORTER,text:'games: [/leaderboards/[ID]] ボード詳細',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'l3',blockType:S.BlockType.REPORTER,text:'games: [/leaderboards/[ID]/scores] スコア送信',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''},SCORE:{type:S.ArgumentType.STRING,defaultValue:'1000'}}},
{opcode:'l4',blockType:S.BlockType.REPORTER,text:'games: [/leaderboards/[ID]/scores/public/WINDOW_ALL_TIME] ランキング',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'s1',blockType:S.BlockType.REPORTER,text:'games: [/players/me/snapshots] セーブ一覧'},
{opcode:'s2',blockType:S.BlockType.REPORTER,text:'games: [/snapshots/[N]] セーブ開く',arguments:{N:{type:S.ArgumentType.STRING,defaultValue:'save1'}}},
{opcode:'s3',blockType:S.BlockType.REPORTER,text:'games: [/snapshots/[N] (PUT)] セーブ書込',arguments:{N:{type:S.ArgumentType.STRING,defaultValue:'save1'},DATA:{type:S.ArgumentType.STRING,defaultValue:'{}'}}},
{opcode:'s4',blockType:S.BlockType.REPORTER,text:'games: [/snapshots/[ID] (DELETE)] セーブ削除',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'m1',blockType:S.BlockType.REPORTER,text:'games: [/turnbasedmatches] 対戦一覧'},
{opcode:'m2',blockType:S.BlockType.REPORTER,text:'games: [/turnbasedmatches/[ID]] 対戦状態',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'m3',blockType:S.BlockType.REPORTER,text:'games: [/turnbasedmatches/create] 対戦作成 [B]',arguments:{B:{type:S.ArgumentType.STRING,defaultValue:'{}'}}},
{opcode:'m4',blockType:S.BlockType.REPORTER,text:'games: [/turnbasedmatches/[ID]/join] 対戦参戦',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'m5',blockType:S.BlockType.REPORTER,text:'games: [/turnbasedmatches/[ID]/leave] 対戦退出',arguments:{ID:{type:S.ArgumentType.STRING,defaultValue:''}}},
{opcode:'e1',blockType:S.BlockType.REPORTER,text:'games: [/players/me/events] イベント一覧'},
{opcode:'v1',blockType:S.BlockType.REPORTER,text:'games: [/stats] 行動統計'}]};}
st(a){this.t=a.T;}
async _r(p,m='GET',b=null){const u=`${_p}games.${_g}${p}`,h={'Content-Type':'application/json'},tk=this.t||localStorage.getItem('_g_api_token');if(tk)h['Authorization']=`Bearer ${tk}`;const c={method:m,headers:h};if(b&&(m==='POST'||m==='PUT'))c.body=typeof b==='string'?b:JSON.stringify(b);try{const r=await fetch(u,c);return await r.text();}catch(e){return `ERR: ${e.message}`;}}
async p1(a){return this._r(`/games/v1/players/${a.ID}`);}
async a1(){return this._r('/games/v1/players/me/achievements');}
async a2(a){return this._r(`/games/v1/achievements/${a.ID}/unlock`,'POST');}
async a3(a){return this._r(`/games/v1/achievements/${a.ID}/increment?stepsToIncrement=${a.STEPS}`,'POST');}
async a4(a){return this._r(`/games/v1/achievements/${a.ID}/reveal`,'POST');}
async a5(a){return this._r(`/games/v1/achievements/${a.ID}/setStepsAtLeast?steps=${a.STEPS}`,'POST');}
async l1(){return this._r('/games/v1/leaderboards');}
async l2(a){return this._r(`/games/v1/leaderboards/${a.ID}`);}
async l3(a){return this._r(`/games/v1/leaderboards/${a.ID}/scores?score=${a.SCORE}`,'POST');}
async l4(a){return this._r(`/games/v1/leaderboards/${a.ID}/scores/public/WINDOW_ALL_TIME`);}
async s1(){return this._r('/games/v1/players/me/snapshots');}
async s2(a){return this._r(`/games/v1/snapshots/${a.N}`);}
async s3(a){return this._r(`/games/v1/snapshots/${a.N}`,'PUT',a.DATA);}
async s4(a){return this._r(`/games/v1/snapshots/${a.ID}`,'DELETE');}
async m1(){return this._r('/games/v1/turnbasedmatches');}
async m2(a){return this._r(`/games/v1/turnbasedmatches/${a.ID}`);}
async m3(a){return this._r('/games/v1/turnbasedmatches/create','POST',a.B);}
async m4(a){return this._r(`/games/v1/turnbasedmatches/${a.ID}/join`,'POST');}
async m5(a){return this._r(`/games/v1/turnbasedmatches/${a.ID}/leave`,'POST');}
async e1(){return this._r('/games/v1/players/me/events');}
async v1(){return this._r('/games/v1/stats');}}
S.extensions.register(new G());})(Scratch);
