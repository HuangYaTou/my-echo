import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/utils/cache'
import playMode from '@/utils/playMode'

Vue.use(Vuex);

const state = {
    audio: {
        ele: null,
        data: null,
        play: false,
        duration: 0,
        currentTime: 0
    },
    // playMode: playMode['default'].value,
    playMode: playMode.default.value,
    playList: []
};

const getters = {
    audio_progress: state=>{
        return (state,state.audio.currentTime/state.audio.duration*100).toFixed(2)+'%';
    }
};

const mutations = {
    SET_AUDIO_ELE(state, ele) {
        state.audio.ele = ele;
    },
    SET_AUDIO_DATA(state, data) {
        state.audio.data = data;
    },
    SET_AUDIO_PLAY(state, play) {
        state.audio.play = play;
    },
    SET_AUDIO_DURATION(state, duration) {
        state.audio.duration = duration;
    },
    SET_AUDIO_CURRENT_TIME(state, time) {
        state.audio.currentTime = time;
    },
    SET_PLAY_MODE(state, mode) {
        state.playMode = mode;
        cache.setSession('playMode', mode);
    },
    SET_PLAY_LIST(state, list) {
        state.playList = list;
        cache.setSession('playList', list);
    }
};

const actions = {
    INIT_CACHE({commit}) {
        let playMode = cache.getSession('playMode');
        let playList = JSON.parse(cache.getSession('playList'));
        if(playMode) {
            commit('SET_PLAY_MODE', playMode);
        }
        if(playList) {
            commit('SET_PLAY_LIST', playList);
        }
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});