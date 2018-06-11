export default {
    playMusic(musics) {
        //musics array 
        //[{
        //  id:0,
        //  name:'',
        //  pic:'',
        //  singer:'',
        //}]
        if (!musics instanceof Array) {
            return console.error('player param type error')
        }
        let musicNum = musics.length;
        if (musicNum == 1) {

        }
    },
    playSingle() {

    },
    playMutiple() {

    }
}