if(!st2draw){
  var st2draw = {}
}

//トーナメントの幅
st2draw.HEIGHT_SPAN = -50;
st2draw.WIDTH_SPAN  = 320;
st2draw.BASELINE = 160;
st2draw.COLOR_NORMAL = "rgb(0, 0, 0)";
st2draw.COLOR_WIN = "rgb(255,0,0)";


st2draw.drawLineCallback = function(start, end, color){};
st2draw.drawNameCallback = function(name, point, size){};

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

      //パックの対応
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
  //幅優先探索を利用して点をツリー情報に付加
  var count = 0;
  var dfs = function(tree){
    if( tree.player ){
      tree.basePoint = [ (count++) * st2draw.WIDTH_SPAN ,
                          st2draw.BASELINE]; 
      return tree;
    }else{
      return [ dfs(tree[0]), dfs(tree[1]) ];
    }
  }
  return dfs(tree);
}
