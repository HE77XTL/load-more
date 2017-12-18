var ct = document.querySelector('#ct')
  var btn = document.querySelector('#btn')

  var curIndex = 3  
  var len = 5   
  var isLoading = false  

  btn.addEventListener('click', function(e){
    e.preventDefault();  

    if(isLoading) {
      return   
    }
    isLoading = true   
    ajax('/loadMore', {
      idx: curIndex,
      len: len
    }, function(data){
      appendData(data)
      isLoading = false   
      curIndex = curIndex + len  
    })
 
  }) 
  function ajax(url, json, onSuccess, onError) {
    var xhr = new XMLHttpRequest()
    var arr = []
    for (key in json) {
      arr.push(key + '=' + json[key])
    }
    url += '?' + arr.join('&')
    xhr.open('get', url)
    xhr.send()

     xhr.onload = function(){
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        onSuccess(JSON.parse(this.response))
      }else{
        onError && onError()
      }
    }
  }
  function appendData(data){
    for(var i = 0; i<data.length; i++){
      var child = document.createElement('li')
      child.innerText = data[i]
      ct.appendChild(child)
    }
  }