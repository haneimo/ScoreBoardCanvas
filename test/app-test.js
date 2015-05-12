describe('テスト実行環境において', function(){
  it('canvasを取得できること', function(){
    var cnv = document.getElementById('cnv').getContext('2d');
    expect( cnv ).toBeDefined();
  });
});

describe('BasicScpreBoard', function() {
  var canvas;
  var scoreBoard;

  beforeEach(function() {
    canvas = document.getElementById('cnv').getContext('2d'); 
    var data ={};
 data.type='tounament';
 data.body=[[],[]];

    scoreBoard = new scoreBoardCanvas.BasicScoreBoard(canvas, data);
  })
  
  it('のインスタンスをサンプルデータを使用して作成できること', function() {
   	expect(scoreBoard).toBeDefined();
  });

  it('の深さは3であること',function{
    var depth =scoreBoard._getDepth();
    expect(depth).toBe( 3 );
  });
});
