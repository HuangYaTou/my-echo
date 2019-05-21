<template>
    <div id="musicBarContainer">
        <div id="musicBar" v-if="audio_data">
            <div class="music">
                <audio id="audio" autoplay="autoplay" :src="audio_data.sound.source"></audio>
                <!-- 封面 -->
                <router-link class="music-cover" :to="{path:'detail', query:{id:audio_data.sound.id}}">
                    <img :src="audio_data.sound.pic_500">
                </router-link>
                <!-- 信息 -->
                <div class="music-info">
                    <div class="info-name">{{audio_data.sound.name}}</div>
                    <div class="info-author">{{audio_data.sound.user.name}}</div>
                </div>
                <!-- 按钮 -->
                <div class="music-control">
                    <div class="control-icon my-icon-menu" @click="$refs.popup.toggleVisible()"></div>
                    <div class="control-icon control-icon-mid" :class="audio_play?'my-icon-pause':'my-icon-arrow'" @click="SET_AUDIO_PLAY(!audio_play)"></div>
                    <div class="control-icon my-icon-next" @click="listRepeatMode"></div>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="progress_bar">
                <div class="progress_bar_inner" :style="`width:${audio_progress}`"></div>
            </div>
        </div>
        <!-- 播放列表&播放模式 -->
        <popup ref="popup" v-if="audio_data"></popup>
    </div>
</template>

<script type="text/javascript">
import {mapState, mapGetters, mapMutations} from 'vuex'
import Popup from '@/components/Popup'
export default {
    components: {
        Popup
    },
    data() {
        return {
            popupVisible: false
        }
    },
    computed: {
        ...mapState([
            'playMode',
            'playList'
        ]),
        ...mapState({
            audio_ele: state=>state.audio.ele,
            audio_data: state=>state.audio.data,
            audio_play: state=>state.audio.play
        }),
        ...mapGetters([
            'audio_progress'
        ])
    },
    watch: {
        audio_data(val) {
            if(val) {
                this.$nextTick(()=>{
                    this.isAddToPlayList(val);
                    this.audioInit();
                })
            }
        },
        audio_play(val) {
            val?this.audio_ele.play():this.audio_ele.pause();
        }
    },
    methods: {
        ...mapMutations([
            'SET_AUDIO_ELE',
            'SET_AUDIO_DATA',
            'SET_AUDIO_PLAY',
            'SET_AUDIO_DURATION',
            'SET_AUDIO_CURRENT_TIME',
            'SET_PLAY_MODE',
            'SET_PLAY_LIST'
        ]),
        audioInit() {
            let _audio = this.$el.querySelector('#audio');
            this.SET_AUDIO_ELE(_audio);

            _audio.oncanplay = ()=>{
                _audio.play();
                this.SET_AUDIO_DURATION(_audio.duration);
            }

            _audio.ontimeupdate = ()=>{
                this.SET_AUDIO_CURRENT_TIME(Math.floor(_audio.currentTime));
            }

            _audio.onplay = ()=>{
                this.SET_AUDIO_PLAY(true);
            }

            _audio.onpause = ()=>{
                this.SET_AUDIO_PLAY(false);
            }

            _audio.onended = ()=>{
                this.SET_PLAY_MODE(false);
                switch(this.playMode) {
                    case 'random':
                        this.randomMode();
                        break;
                    case 'singleRepeat':
                        this.singleRepeatMode();
                        break;
                    case 'listRepeat':
                        this.listRepeatMode();
                        break;
                }
            }
        },

        // 随机播放
        randomMode() {
            let index = ~~(Math.random()*this.playList.length);
            //如果随机数对应的音乐和当前播放的音乐相同，采取listRepeatMode方法的逻辑处理，否则播放
            let isSame = this.playList[index].sound.id === this.audio_data.sound.id;
            if(isSame) {
                this.listRepeatMode();
            }
            else {
                this.SET_AUDIO_DATA(this.playList[index]);
            }
        },

        // 单曲循环
        singleRepeatMode() {
            this.audio_ele.load();
            this.audio_ele.play();
        },

        // 列表循环
        listRepeatMode() {
            //获取当前播放音乐位置
            let currIndex = this.playList.findIndex((item)=>{
                return item.sound.id === this.audio_data.sound.id;
            });
            if(currIndex>-1) {
                //下一首位置
                let nextIndex = currIndex === this.playList.length-1?0:currIndex+1;
                //只有一首音乐，列表循环或者下一首的时候：重新加载并播放当前音乐
                let isSame = this.playList[nextIndex].sound.id === this.audio_data.sound.id;
                if(isSame) {
                    this.singleRepeatMode();
                }
                else {
                    this.SET_AUDIO_DATA(this.playList[nextIndex]);
                }
            }
            else {
                console.log('正常逻辑的话是不会执行到这里的~');
            }
        },

        isAddToPlayList(item) {
            let ishas = false;
            if(this.playList.find(item=>item.sound.id===item.sound.id)) {
                ishas = true;
            }
            if(!ishas) {
                this.playList.unshift(item);
                this.SET_PLAY_LIST(this.playList);
            }
        }
    }
};

</script>

<style lang='stylus'>
#musicBarContainer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    #musicBar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        width: 100%;
        border-top: 1px solid $borderColor;
        background-color: rgba(255, 255, 255, 0.9);
        .music {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: $musicBarHeight;
            padding: 0 toRem(5);
            .music-cover {
                display: inline-block;
                width: toRem(36);
                height: toRem(36);
                overflow: hidden;
                border: 1px solid #fff;
                box-shadow: 0 0 toRem(2) rgba(0, 0, 0, 0.2);
                img {
                    display: block;
                    width: 100%;
                }
            }
            .music-info {
                flex: 1;
                font-size: toRem(12);
                padding: 0 toRem(8);
                overflow: hidden;
                .info-name {
                    text-ellipsis();
                }
                .info-author {
                    text-ellipsis();
                    margin-top: toRem(5);
                }
            }
            .music-control {
                display: flex;
                align-items: center;
                .control-icon {
                    flex-center();
                    width: toRem(34);
                    height: toRem(34);
                    line-height: 1;
                    color: $normalColor;
                    font-size: toRem(22);
                    margin: 0 toRem(8);
                    border: 1px solid $normalColor;
                    border-radius: 100%;
                    background: #fff;
                    &.control-icon-mid {
                        width: toRem(38);
                        height: toRem(38);
                        font-size: toRem(26);
                    }
                }
            }
        }
        .progress_bar {
            height: toRem(1.5);
            background: rgba(255, 255, 255, 0.9);
            .progress_bar_inner {
                width: 0%;
                height: 100%;
                background-color: $appColor;
            }
        }
    }
}
</style>