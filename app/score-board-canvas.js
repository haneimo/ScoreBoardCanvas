var scoreBoardCanvas = scoreBoardCanvas || {};

scoreBoardCanvas.BasicScoreBoard = function( canvas, data ){
    if( data.type != "tounament" ){
      throw new Error( data.type + "は未対応のデータです。" );
    }

    this.body = data.body;
    this.HEIGHT_SPAN = -50;
    this.WIDTH_SPAN  = 320;

    this.COLOR_NORMAL = "rgb(0, 0, 0)";
    this.COLOR_WIN = "rgb(255,0,0)";
    this.NAME_PRATE = { width:200, height:40 };
    this.baseLeft = this.NAME_PRATE.width;
    this.canvas = canvas;
    this.canvas.font = "bold 18px MS ゴシック";
    
    this.mountainHeightParOne = canvas.height/this._getDepth();
};

scoreBoardCanvas.BasicScoreBoard.prototype = {
  draw:function( ){
    var root = this.body;
    var shape = toDrawShape( root );
  },
  toDrawShape:function( root, topPoint ){
  },
  _drawLine:function(
      start, end, color){
        var c = this.canvas;

        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = 4;
        c.moveTo(start[0], start[1]);
        c.lineTo(end[0], end[1]);
        c.closePath();
        c.stroke();
  },
  _drawName:function( start,
    end, name ){
        var pading = 4;
        var adjustHeight = 8;
        // ここでboxを表示
        this.canv.fillText(
          name, point[0]+pading,
          point[1] + adjustHeight,
          width-4*pading
        );
  },
  _getDepth:function(tree){
    return this._innerDepth(this.body);
  },
  _innerDepth: function( tree ){
    if(typeof tree === 'undefined'){
      return 0;
    }else if( ! tree.has("left")
         || ! tree.has("right") ){
      return 1;
    }else{
      return 1 + max(
        this._innerDepth(
          tree.left
        ),
        this._innerDepth(
          tree.right
        )
      );
    }
  }
}

