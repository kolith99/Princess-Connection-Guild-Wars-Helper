
function forDemo() {
  //===================================================新增=============================================
  this.add = async function (json, UserModel) {
    //新增方法1
    let user = UserModel.build({
      firstName: json.firstName,
      lastName: json.lastName
    });//存在内存中
    user = await user.save();//需要save下
    //新增方法2 直接新增进去
    // const user2 = await UserModel.create({
    //     firstName: "Sue2",
    //     lastName: "Smith2"
    // });
    console.log(user.get({ 'plain': true }));
  }
  //===================================================删除====================================================
  this.delete = async function (json, UserModel) {
    const deleteUser = await UserModel.destroy({ where: { id: json.id } }
    );
    console.log(deleteUser);
  }
  //===================================================修改======================================================
  this.edit = async function (json, UserModel) {
    const updatedUser = await UserModel.update({
      firstName: json.firstName,
      lastName: json.lastName
    }, { where: { id: json.id } }
    );
    console.log(updatedUser);

  }
  //===================================================单表查询======================================================
  this.query = async function (json, UserModel) {
    var users = await UserModel.findOne({ where: { id: json.id } });
    return users;
  }


  //===================================================关联表查询======================================================
  this.queryAssociation = async function (company,user) {
    company.findAll({
      attributes: ['name', 'age', 'address', 'salary'],
      include: [{
          model: user,
          as: 'u',
          attributes: []
      }],
      raw:true
      //raw:true
  }).then(result => {
      return JSON.stringify(result);
  }).catch(err => {
  });
    
  }

}

module.exports = forDemo;
