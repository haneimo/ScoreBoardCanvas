var scoreBoardCanvas =
  scoreBoardCanvas || {};

scoreBoardCanvas.BasicScoreBoard
 =  function( canvas, data ){
    if( data.type != "tounament" ){
      throw new Error(
        data.type +
         "は未対応のデータです。"
      );
    }
    // 今はtounament分しか
    // かかないが、後にリーグ分、
    // チーム対戦分も書く。
    this.body = data.body;
    this.HEIGHT_SPAN = -50;
    this.WIDTH_SPAN  = 320;

    this.COLOR_NORMAL =
       "rgb(0, 0, 0)";
    this.COLOR_WIN =
        "rgb(255,0,0)";
    this.NAME_PRATE =
        {width:200,height:40};
    this.baseLeft =
      this.NAME_PRATE.width;
    this.canvas = canvas;
    this.canv.font =
      "bold 18px MS ゴシック";
    
    // ひとつの山の最小の高さ。
    // トーナメントの描画領域を
    //  トーナメントの山の深さで
    //  割った数。
    this.marginHeigh =
      height/this._depth();
};

scoreBoardCanvas.BasicScoreBoard.prototype = {
  draw:function( ){
    var root = this.body;
    var _shape = {};
    _toDrawTounament( 
       root, startPoint );
  },
  _toDrawTounament:function(
    tree, topPoint){
      var leftPoint;
      var rightPoint;

      if( _checkNodeTo( tree.left) ) {
         var leftPoint = 
           getConnectionPointFrom( 
             tree.left , topPoint
           )
      }else{
        var leftPoints = {
           x: topPoint.x 
               - this.marginHeigh,
           y: _getCenterYFrom(
                 tree.left
               )
         }
      }
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
  _depth:function(tree){
    return _innerDepth(this.body);
  },
  _innerDepth:
    function(tounamentTree){
    if( not tounamentTree.has "left"
         || not tounamentTree.has "right"){
      return 1;
    }else{
      return 1 + max(
        this._innerDepth(
          tounamentTree.left
        ),
        this._innerDepth(
          tounamentTree.right
        )
      );
    }
  }
}

st2draw.tornament = function(rootTree){
  var drawLines = [];
  var nodeToTopPoint = function(tree){
    if(tree.player){
      var nextPointForSingle = [tree.basePoint[0],
          tree.basePoint[1] + st2draw.HEIGHT_SPAN];

      st2draw.drawNameCallback(tree.player,
          tree.basePoint, st2draw.WIDTH_SPAN);
      st2draw.drawLineCallback(tree.basePoint,nextPointForSingle, 
          tree.win > 0
            ? st2draw.COLOR_WIN
            : st2draw.COLOR_NORMAL );
      return { point:nextPointForSingle,
               win:(!tree.win) ? 0: tree.win };
    }else{
      var left  = nodeToTopPoint(tree[0]);
      var right = nodeToTopPoint(tree[1]);
      var level = Math.min(left.point[1], right.point[1]); 

      var leftColor = st2draw.COLOR_NORMAL;
      var rightColor = st2draw.COLOR_NORMAL;
      var judgeColor = st2draw.COLOR_NORMAL;
      if( left.win > right.win ){
        leftColor = st2draw.COLOR_WIN;
        judgeColor = st2draw.COLOR_WIN;
      }else if(left.win < right.win){
        rightColor =st2draw.COLOR_WIN;
        judgeColor = st2draw.COLOR_WIN;
      }
      var middle = [( left.point[0]+right.point[0])/2.0, level];
      var nextPoint = [ middle[0], middle[1] + st2draw.HEIGHT_SPAN];

      //ï¿½pï¿½bï¿½Nï¿½Ì‘Î‰ï¿½
      var newPoint;
      if(left.point[1] > level){
        newPoint = [ left.point[0], level ];
        st2draw.drawLineCallback(newPoint, left.point, leftColor);
        left.point = newPoint;
      }else if(right.point[1] > level){
        newPoint = [right.point[0], level];
        st2draw.drawLineCallback(newPoint, right.point, rightColor);
        right.point = newPoint;
      }

      st2draw.drawLineCallback(left.point,  middle, leftColor);
      st2draw.drawLineCallback(right.point, middle, rightColor);
      st2draw.drawLineCallback(middle, nextPoint, judgeColor);
      
      var winNum = Math.max(left.win, right.win) - 1;
      if( winNum < 0 ){
        winNum = 0;
      }

      return { point: nextPoint,
               win: winNum };
    }
  };
  
  var topdata = nodeToTopPoint(rootTree);
  var top = topdata.point;
  drawLines.push([ [top[0],top[1] + st2draw.HEIGHT_SPAN ] ,
      top, st2draw.COLOR_NORMAL]);

  return drawLines;
}

st2draw.treeAddPoints = function(tree, startPoint){
  var count = 0;
  var dfs = function(tree){
    if( tree.player ){
      tree.basePoint = [ (count+1) * st2draw.WIDTH_SPAN ,
                          st2draw.BASELINE]; 
      return tree;
    }else{
      return [ dfs(tree[0]), dfs(tree[1]) ];
    }
  }
  return dfs(tree);
}

 var data = {type:'TN',data:
        [[{player:"�Ō�̔ӎ`�F�h�m���l", wins: 0}, {player:"sasimi",wins:1}],
         {player:"hoge", wins:1} ]};

      st2draw.drawNameCallback = function(name, point, width){
        var pading = 4;
        var adjustHeight = 8;
        canv.fillText(name, point[0]+pading,
          point[1] + adjustHeight, width-4*pading);
      }

      st2draw.drawLineCallback = function(start, end, color){
        canv.beginPath();
        canv.strokeStyle = color;
        canv.lineWidth = 4;
        canv.moveTo(start[0], start[1]);
        canv.lineTo(end[0], end[1]);
        canv.closePath();
        canv.stroke();
      }

      var pointed;
      $('#dbg').text(pointed = st2draw.treeAddPoints(data.data));

      var lines = st2draw.tornament(pointed);
      $('#dbg2').text(lines);
      var s ="";
   });
  </script>
  <body>
    <div id="dbg">hoge</div>
    <div id="dbg2">h</div>
    <canvas id="canv" width="640" height="480"></canvas>
  </body>
</html>