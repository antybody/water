<template>
<div style="position:relative;height:65px;
      z-index:1010;
      background: #ffffff;">
    <div class="searchbar_tags">
        <form class="searchbar_tags_form">
            <input type="search" id="keyword" class="searchbar_text"
                 :placeholder='inputtext' autocomplete="off">
            <i class="searchbar_clear"></i>
        </form>
          <span class="searchbar_btn">搜索</span>
          
    </div>
        <div style="padding-left:10px;">  
                  {{totaldesc}}
        </div>
</div>
</template>

<script>
export default {
   props:['totaldesc']
}
</script>

<style>
  .searchbar_tags{
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 44px;
      overflow:hidden;
  }
  .searchbar_tags_form{
       background-color: #f2f2f7;  
       position: relative;  
       display: flex;
       -webkit-box-flex:1;
       -webkit-box-align:center;
       align-items: center;
       flex:1;
       width:100%;
       margin:0 10px;
       height: 28px;
       line-height: 28px;
       border-radius:14px;
       overflow: hidden;
       z-index:2;  
       padding:0; 
  }

  .searchbar_tags_inner{
      font-size:0;
      font-family: none;
      white-space:nowrap;
      overflow:hidden;
      overflow-x:auto;
      position: relative;
      top:50%;
      transform: translate(0,-50%);
  }
  .searchbar_text{
      box-sizing: border-box;
      display: block;
      -webkit-box-flex:1;
      flex:1;
      width:100%;
      height: 28px;line-height: 18px;
      padding-left:30px;
      color:#333;
      font-size:14px;
      background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUdwTJiYmJmZmZiYmJmZmZmZmZmZmZmZmZmZmZiYmJmZmZmZmepmQKcAAAALdFJOUwAQwSz36oKWRd5iOI6B8gAAAK1JREFUGNNjYAACM1WXoGQGOGjaDQIaMK747vBGBonS3YUQLqO2mwCIStkkAOYL7TQA08yzFcF09USoPsntIJJjiwGUz+wNYjFtg9uTrQAkrAPhfNHNIMECOJ8dpFS7Ac7n2AQkogXgfMatQMIb4W6GLVj4yOp3YjEP3T5096C7F90/6P5FCg9H1PDaAg0weHhqK6KGtxBUASg+JiWDdCoyoAC4ApiHMBWg8hmVAA2NM1jXr567AAAAAElFTkSuQmCC) 10px no-repeat;
      background-size: 15px auto;
      border:none;
      -webkit-appearance: none;
      border-radius:0;
      margin:0;
      vertical-align:baseline;
      outline:none;
  }
  .searchbar_clear{
      display: block;
      opacity: 0;
      width:35px;
      height: 28px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAO0EbHoAAAAHdFJOUwBNRw0qGDkW33wJAAAAo0lEQVQY02VRwQ3CMAy0SBnAEfCmpOVdpQuUSv0D6gKw/xDYPrUKzj0sX+LYlzORYv3yfaEdMyu6jb4Z6EEb3jAZ/+z88n+NglfBz8LbgkeUd3oWV3tw0JglpKOEqz1PoeU4ZGvw0FLJ9Yz5hOkp3OxaFFj7OIwBCWFQooyk4r7e9/PzvB7V+zS9jenVuNh/Zhjg/lv54f3yflZ++31U+yr3+QPA/yP/xgrpkgAAAABJRU5ErkJggg==) 50% no-repeat;
      background-size:15px auto;
  }
  .searchbar_tags_item{
      position: relative;
      display: inline-block;
      padding:0 25px 0 4px;
      height: 25px;
      line-height:25px;
      font-size:14px;
      color:#fff;
      background-color:#999;
      border-radius:2px;
      text-align:center;
  }
  .searchbar_btn{
      background: #3985ff;
      color:#fff;
      position: relative;
      display: block;
      margin-right:10px;
      padding:0 10px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size:14px;
      border-radius:2px;
      z-index:2;
  }
</style>
