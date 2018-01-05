
<template>    
        <ul>
            <li class="q-item" v-for="item in items">
                <a href="javascript:void(0)">
                    <span>
                        {{item.title}}
                        <i></i>
                    </span>
                </a>
            </li>
        </ul>    
</template>

<script>
export default {
    props: ['items'],
    data () {
      return {
        // id: this.item.id
      }
    }
}
</script>

<style>
  ul{
    box-sizing:border-box;
    position: relative;
    padding:10px 5px 10px 15px;
    height: 45px;
    text-align: center;
  }  
  .q-item{
      float: left;
      width:25%;
      font-size:12px;
      padding-right:10px;
  }
  .q-item a{
      display: block;
      position: relative;
      padding:0 5px;
      height: 25px;
      line-height: 25px;
      color:#666;
      background-color: #f2f2f7;
      border-radius:2px;
  }
  .q-item span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
      box-sizing:border-box;
      position: relative;
      display: inline-block;
      max-width: 100%;
      padding-right:13px;
  }
  .q-item span i{
      position: absolute;
      right: 0;
      top:50%;
      margin-top:-2px;
      width:8px;
      height: 5px;
      background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKBAMAAABPkMOvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUdwTMzMzMzMzMzMzMzMzM3NzdLS0svLy6qqqszMzMzMzMzMzGC86tIAAAALdFJOUwDl9UGdJhG9A2jOR0lNjwAAAEdJREFUCNdj8N4NBlsYVkMYuxgCIQxRBmZtEL3JgIFhNoixk4GBgQXEcAAyOKp3797eAGQwJO7eLQaiGVi1NwWAGQyGwkACAKGfIfA79uAMAAAAAElFTkSuQmCC) no-repeat;
      background-size:8px auto; 
  }
  em,i{
      font-style: normal;
  }
</style>
