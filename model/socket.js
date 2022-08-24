module.exports = function(io){
  let mumber = 0 // 储存 在线人数
  let socketList = {} //储存个人信息
  let socketArray = [] // 储存 在线人数信息
  console.log('socket', io)
  io.sockets.on('connection', (socket) => {
    console.log('socket 连接成功');
    socket.on('join', data => {
      console.log(data)
      mumber++
      socket.name = data.name
      socketList[data.name] = socket.id
      data = {
        name: data.name,
        img: data.img,
        mumber: mumber,
        id: socket.id
      }
      let user = {name: data.name ,img: data.img,id: socket.id, tip: false }
      socketArray.push(user)
      console.log(data)

      console.log(socketArray, socketArray.length)
      //是为了 告诉出自己外 所有人
      socket.broadcast.emit('welcome', data.name,socketArray)
      // socket.emit('welcome',data,socketArray)
      //告诉自己
      socket.emit('myself', data.name,socketArray,socket.id)
    })
    socket.on('msg', data => {
      // socket.broadcast.emit('sendmsg',data)
      console.log(data.tid)
      socket.to(data.tid).emit('sMsg',data)
    })
    socket.on('message', data => {
      socket.broadcast.emit('sendmsg',data)
    })
    socket.on('close', function(name){
      if(socketList.hasOwnProperty(name)){
        console.log(name ,'isname')
        delete socketList[name]
        for(let i = 0; i < socketArray.length; i++){
          if(socketArray[i].name == name){
            socketArray.splice(i , 1)
          }
        }
        mumber--;
        socket.broadcast.emit('quit', name, mumber,socketArray)
        console.log(socketArray, 'quit')
      }else {
        console.log(socketArray, 'quit')
      }
    })
    
  })
}