module.exports=(function(io){
    io.on("connection", (socket) => {
        console.log("Users component is connected");
        console.log(socket.id);
      
        socket.on("disconnect", () => {
          console.log(`User ${socket.id} was disconnected`);
        });
      })

})

