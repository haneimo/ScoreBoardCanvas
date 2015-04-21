# ScoreBoardCanvasについて(こうだったら嬉しいな案)

トーナメント表、リーグ表を指定したキャンバス領域に書き出すためのコードです。ScoreBoardオブジェクトを使います。

使い方の例

    var canvas = document.
      getElementByTagName(
          "canvas-for-tounament"
      )
    
    var basicScoreBoard =
      new BasicScoreBoard( canvas, datas );
    basicScoreBoard.draw( );

datasにはscoreBoard用フォーマットのデータをバインドしておきます。TounamentScoreBoardBilderオブジェクトを使用した方が若干組み立てやすいです。

    var tounamentBuilder = 
      new  TounamentScoreBoardBuilder()
    
    tounamentBuilder.add(
      "player1Name", "userId1");
    tounamentBuilder.add(
      "player2Name", "userId2");
    tounamentBuilder.add(
      "player3Name", "userId3");
    tounamentBuilder.add(
      "player4Name", "userId4");
    tounamentBuilder.add(
      "player5Name", "userId5");

    var tounamentJSON =
      tounamentBuilder.build().getJSON();
    
    JSON.stringify( tounamentJSON );
      =>
      {
        state:"yet",
        left:{
          state:"yet",
          left:{
            state:"yet",
            left:"player1Name",
            right:"player5Name"
          },
          right:"player2Name"
        },
        right:{
          state:"yet",
          left:"player3Name",
          right:"player4Name"
        }
      }

popCard