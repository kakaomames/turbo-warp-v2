(function(Scratch) {
  'use strict';

  const _p = 'https' + '://';
  const _g = 'googleapis' + '.com';

  class GoogleGamesModule {
    // パート1で設定された環境変数を自動で引き継ぐ
    get env() {
      return window._google_api_env || { proj: 'my-project-id', token: '' };
    }

    getInfo() {
      return {
        id: 'googleGamesModule',
        name: 'Google Play Games API',
        color1: '#0F9D58', // Googleグリーン
        blocks: [
          // ── プレイヤー情報 ──
          { opcode: 'g_play_get', blockType: Scratch.BlockType.REPORTER, text: 'games: プレイヤー情報を取得 [ID]', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'me' } } },
          // ── 実績 (Achievements) ──
          { opcode: 'g_ach_list', blockType: Scratch.BlockType.REPORTER, text: 'games: 実績一覧を取得' },
          { opcode: 'g_ach_unlock', blockType: Scratch.BlockType.REPORTER, text: 'games: 実績 [ID] を解除', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ach_id' } } },
          { opcode: 'g_ach_increment', blockType: Scratch.BlockType.REPORTER, text: 'games: 実績 [ID] を [STEPS] 段階進める', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ach_id' }, STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } } },
          { opcode: 'g_ach_reveal', blockType: Scratch.BlockType.REPORTER, text: 'games: 隠し実績 [ID] を表示', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ach_id' } } },
          { opcode: 'g_ach_set_steps', blockType: Scratch.BlockType.REPORTER, text: 'games: 実績 [ID] の段階を [STEPS] に固定', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ach_id' }, STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 } } },
          // ── リーダーボード (Leaderboards) ──
          { opcode: 'g_lead_list', blockType: Scratch.BlockType.REPORTER, text: 'games: リーダーボード一覧を取得' },
          { opcode: 'g_lead_get', blockType: Scratch.BlockType.REPORTER, text: 'games: リーダーボード [ID] を取得', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'board_id' } } },
          { opcode: 'g_score_submit', blockType: Scratch.BlockType.REPORTER, text: 'games: ボード [ID] にスコア [SCORE] を送信', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'board_id' }, SCORE: { type: Scratch.ArgumentType.STRING, defaultValue: '1000' } } },
          { opcode: 'g_score_list', blockType: Scratch.BlockType.REPORTER, text: 'games: ボード [ID] のスコアランキングを取得', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'board_id' } } },
          // ── クラウドセーブ (Snapshots) ──
          { opcode: 'g_snap_list', blockType: Scratch.BlockType.REPORTER, text: 'games: セーブデータ一覧を取得' },
          { opcode: 'g_snap_get', blockType: Scratch.BlockType.REPORTER, text: 'games: セーブデータ [NAME] を開く', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'savefile1' } } },
          { opcode: 'g_snap_commit', blockType: Scratch.BlockType.REPORTER, text: 'games: セーブ [NAME] に [DATA] を書き込み', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'savefile1' }, DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{"hp":100}' } } },
          { opcode: 'g_snap_delete', blockType: Scratch.BlockType.REPORTER, text: 'games: セーブデータ [ID] を削除', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'save_id' } } },
          // ── 対戦・その他 ──
          { opcode: 'g_match_list', blockType: Scratch.BlockType.REPORTER, text: 'games: ターン制対戦一覧を取得' },
          { opcode: 'g_match_get', blockType: Scratch.BlockType.REPORTER, text: 'games: 对戦 [ID] の状態を取得', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'match_id' } } },
          { opcode: 'g_match_create', blockType: Scratch.BlockType.REPORTER, text: 'games: 新規対戦部屋を作成 [BODY]', arguments: { BODY: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'g_match_join', blockType: Scratch.BlockType.REPORTER, text: 'games: 対戦 [ID] に参戦', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'match_id' } } },
          { opcode: 'g_match_leave', blockType: Scratch.BlockType.REPORTER, text: 'games: 対戦 [ID] から退出', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'match_id' } } },
          { opcode: 'g_event_list', blockType: Scratch.BlockType.REPORTER, text: 'games: ゲーム内イベント一覧を取得' },
          { opcode: 'g_event_record', blockType: Scratch.BlockType.REPORTER, text: 'games: イベント [ID] をカウント [NUM] 送信', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'evt_id' }, NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } } },
          { opcode: 'g_stat_get', blockType: Scratch.BlockType.REPORTER, text: 'games: プレイヤーの行動統計データを取得' }
        ]
      };
    }

    async _request(path, method = 'GET', body = null) {
      const url = `${_p}games.${_g}${path}`;
      const headers = { 'Content-Type': 'application/json' };
      if (this.env.token) headers['Authorization'] = `Bearer ${this.env.token}`;
      const config = { method, headers };
      if (body && ['POST', 'PATCH', 'PUT'].includes(method)) {
        config.body = typeof body === 'string' ? body : JSON.stringify(body);
      }
      try {
        const response = await fetch(url, config);
        return await response.text();
      } catch (e) {
        return `gamesエラー: ${e.message}`;
      }
    }

    async g_play_get(args) { return this._request(`/games/v1/players/${args.ID}`); }
    async g_ach_list() { return this._request(`/games/v1/players/me/achievements`); }
    async g_ach_unlock(args) { return this._request(`/games/v1/achievements/${args.ID}/unlock`, 'POST'); }
    async g_ach_increment(args) { return this._request(`/games/v1/achievements/${args.ID}/increment?stepsToIncrement=${args.STEPS}`, 'POST'); }
    async g_ach_reveal(args) { return this._request(`/games/v1/achievements/${args.ID}/reveal`, 'POST'); }
    async g_ach_set_steps(args) { return this._request(`/games/v1/achievements/${args.ID}/setStepsAtLeast?steps=${args.STEPS}`, 'POST'); }
    async g_lead_list() { return this._request(`/games/v1/leaderboards`); }
    async g_lead_get(args) { return this._request(`/games/v1/leaderboards/${args.ID}`); }
    async g_score_submit(args) { return this._request(`/games/v1/leaderboards/${args.ID}/scores?score=${args.SCORE}`, 'POST'); }
    async g_score_list(args) { return this._request(`/games/v1/leaderboards/${args.ID}/scores/public/WINDOW_ALL_TIME`); }
    async g_snap_list() { return this._request(`/games/v1/players/me/snapshots`); }
    async g_snap_get(args) { return this._request(`/games/v1/snapshots/${args.NAME}`); }
    async g_snap_commit(args) { return this._request(`/games/v1/snapshots/${args.NAME}`, 'PUT', args.DATA); }
    async g_snap_delete(args) { return this._request(`/games/v1/snapshots/${args.ID}`, 'DELETE'); }
    async g_match_list() { return this._request(`/games/v1/turnbasedmatches`); }
    async g_match_get(args) { return this._request(`/games/v1/turnbasedmatches/${args.ID}`); }
    async g_match_create(args) { return this._request(`/games/v1/turnbasedmatches/create`, 'POST', args.BODY); }
    async g_match_join(args) { return this._request(`/games/v1/turnbasedmatches/${args.ID}/join`, 'POST'); }
    async g_match_leave(args) { return this._request(`/games/v1/turnbasedmatches/${args.ID}/leave`, 'POST'); }
    async g_event_list() { return this._request(`/games/v1/players/me/events`); }
    async g_event_record(args) { return this._request(`/games/v1/events/record`, 'POST', { requestId: Date.now(), updates: [{ eventId: args.ID, updateCount: args.NUM }] }); }
    async g_stat_get() { return this._request(`/games/v1/stats`); }
  }

  Scratch.extensions.register(new GoogleGamesModule());
})(Scratch);
