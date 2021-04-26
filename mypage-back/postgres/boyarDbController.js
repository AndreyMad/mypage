 const client =  require('./index')
console.log(client.query);
const getDots = () => {
    return client.query("SELECT * FROM yandexboyardots").then((res) => {
      return res.rows;
    }).catch(err=>{console.log(err)});
  };
  
  const deleteDot = (id) => {
   
    return client
      .query(`Delete from yandexboyardots where id = '${id}'  `)
      .then((res) => {
     
        if (res.rowCount === 0) {
         
          return{error: "Id not in database"};
        }
      
        return {status:"succes"};
       
      });
  };
  
  const addDot = (data) => {
    const query = `insert into yandexboyardots (latitude, longtitude, name, description, id) VALUES ('${data.latitude}', '${data.longtitude}', '${data.name}', '${data.description}', '${data.id}')`;
    return client.query(query).then((res) => {
      if (res.rowCount === 0) {
        return new Error("NOT ADDED");
      }
      return { status: "succes" };
    });
  };
  
  const editDot = ({ name, latitude, longtitude, description, id }) => {
    let query =''
    if(!name&&!description)
    {
      query = `UPDATE yandexboyardots SET
      latitude = '${latitude}',
      longtitude = '${longtitude}'
     WHERE id = '${id}'
   `;
    }else{
      query = `UPDATE yandexboyardots SET
      latitude = '${latitude}',
      longtitude = '${longtitude}',
      name = '${name}',
      description ='${description}'
     WHERE id = '${id}'
   `;
    }
   
    return client.query(query).then((res) => {
      if (res.rowCount === 0) {
        return new Error("Не изменено");
      }
      return { status: "succes" };
    });
  };
  
    const checkBoyarUser = (user)=>{
    return client.query(`SELECT * FROM boyaradmins where login ='${user.login}'`).then((res) => {
      return res.rows[0];
    });
  }
  const updateBoyarUserToken = (login,token)=>{
    const query = `UPDATE boyaradmins SET
    sessiontoken = '${token}'
    WHERE login = '${login}'
  `;
  return client.query(query).then((res) => {
    if (res.rowCount === 0) {
      return new Error("Не изменено");
    }
    return { status: "succes" };
  });
  }
  
  const checkSessionToken = (token)=>{
    return client.query(`SELECT * FROM boyaradmins where sessiontoken ='${token}'`).then((res) => {
      return res.rows[0];
    }).catch(err=>{return err});
  }
  
  module.exports.getDots = getDots;
  module.exports.deleteDot = deleteDot;
  module.exports.addDot = addDot;
  module.exports.editDot = editDot;
  module.exports.checkBoyarUser = checkBoyarUser;
  module.exports.updateBoyarUserToken= updateBoyarUserToken;
  module.exports.checkSessionToken= checkSessionToken;