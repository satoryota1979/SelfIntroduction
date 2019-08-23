function showClock1() {
    var nowTime = new Date();
    var nowHour = nowTime.getHours();
    var nowMin = nowTime.getMinutes();
    var nowSec = nowTime.getSeconds();
    if (nowHour <= 9) {
        nowHour = "0" + nowHour;
    }
    if (nowMin <= 9) {
        nowMin = "0" + nowMin;
    }
    if (nowSec <= 9) {
        nowSec = "0" + nowSec;
    }
    var msg = nowHour + ":" + nowMin + ":" + nowSec + " js";
    // document.getElementById("RealtimeClockArea").innerHTML = msg;
}
setInterval('showClock1()', 1000);

$(function () {
    setInterval(function(){
        var nowTime2 = new Date();
        var nowHour2 = nowTime2.getHours();
        var nowMin2 = nowTime2.getMinutes();
        var nowSec2 = nowTime2.getSeconds();
        $('#RealtimeClockJQ').text(nowHour2 + ":" + nowMin2 + ":" + nowSec2 +" jq");
    },1000)
});

function showMyTime() {
    var d1 = new Date();
    var d2 = new Date('1979/05/23 00:00');
    var df = (d1 - d2) / 1000;
    var sec = Math.round(df);
    $('#showMyTime').text('私は'+ sec.toLocaleString() + '秒生きています');
}
setInterval('showMyTime()', 1000);

(function () {
    // 要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");
    // 要素内のクリックされた位置を取得するグローバル変数
    var x;
    var y;

    // マウスが要素内で押された時、又はタッチされた時に動作
    for (var i = 0; i <= elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }

    // マウスが押された際の関数
    function mdown(e) {

        // クラス名に.drag を追加
        this.classList.add('drag');
        console.log(this);

        // タッチデイイベントとマウスのイベントの差異を吸収
        if (e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        // 要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        // ムーブイベントにコールバック
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    function mmove(e) {

        // ドラッグしている要素を取得
        var drag = document.getElementsByClassName('drag')[0];

        // マウスとタッチの差異を吸収
        if (e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        // フリックした時に画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        // マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        // マウスボタンが離された時、又はカーソルが外れた時に動作
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchend", mup, false);
    }

    // マウスボタンが上がったら動作
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        // ムーブベントハンドラの消去
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mousemove", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        // クラス名.drag も消す
        drag.classList.remove("drag");
    }
})