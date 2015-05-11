describe('テスト実行環境において', function(){
  it('canvasを取得できること', function(){
    var cnv = document.getElementById('cnv').getContext('2d');
    expect( cnv ).toBeDefined();
  });
});

describe('BasicScpreBoard', function() {
  var canvas;
  beforeEach(function() {
    canvas = document.getElementById('cnv').getContext('2d'); 
  })
  
  it('のインスタンスを作成できること', function() {
    var data = {type:'tounament'}
    var scoreBoard = new scoreBoardCanvas.BasicScoreBoard(canvas, data);
   	expect(scoreBoard).toBeDefined();
  });
});
