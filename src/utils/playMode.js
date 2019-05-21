//播放模式配置
const Options = {
    default: {
        label: '默认',
        value: 'default',
        icon: 'my-icon-more'
    },
    random: {
        label: '随机播放',
        value: 'random',
        icon: 'my-icon-random'
    },
    singleRepeat: {
        label: '单曲循环',
        value: 'singleRepeat',
        icon: 'my-icon-repeatone'
    },
    listRepeat: {
        label: '列表循环',
        value: 'listRepeat',
        icon: 'my-icon-repeat'
    }
};

export let ArrayOptions = [];
Object.keys(Options).forEach((key)=>{
    ArrayOptions.push(Options[key]);
});
console.log(ArrayOptions);

export default Options;