const Koa = require('koa');
const bodyParser = require('koa-bodyparser');//koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const Router = require('koa-router');//
const app = new Koa();
const router = new Router();
const Sequelize = require('sequelize');
const ForDemo = require('./controllers/forDemo');

const sequelize = new Sequelize(
    'testdb',  // 数据库名称
    'postgres', // 用户名
    'admin', //密码
    {
        host: 'localhost',
        dialect: 'postgres', /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
);

//定义model
const UserModel = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  },{
      tableName:'users'
  });

  const user = sequelize.define('u', {
     id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },
     firstName: {
            type: Sequelize.STRING
     },
     lastName: {
         type: Sequelize.STRING
     }
    }, {
        tableName: 'users'
    })

    const company = sequelize.define('company', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salary:{
            type:Sequelize.REAL,
            allowNull: false
        }
    }, {
        tableName: 'company'
    })
    //user.hasOne(company);
    //user.hasMany(company, {foreignKey: 'userId', sourceKey: 'id'});
    company.belongsTo(user, { foreignKey: 'userid', targetKey: 'id', as: 'u' });



const forDemo = new ForDemo();

app.use(bodyParser())
// 路由
const deploy = new Router();

//新增
deploy.post('/users', async (ctx) => {
    let json = ctx.request.body
    let writeJson = () =>  
        new Promise((resolve, reject) => {
            try {
                forDemo.add(json, UserModel);
                resolve({ code: 0, msg: '新增成功' });
            } catch (error) {
                resolve({ code: -1, msg: '新增失败' + error })
            }
        })
        
    // 返回给前端
    ctx.body = await writeJson()
})
//删除
deploy.delete('/users/ID', async (ctx) => {
    let json = ctx.request.body
    let deleteJson = () => 
        new Promise((resolve, reject) => {
            try {
                forDemo.delete(json, UserModel);
                resolve({ code: 0, msg: '删除成功' });
            } catch (error) {
                resolve({ code: -1, msg: '删除失败' + error })
            }
        })
    ctx.body = await deleteJson()
})
//查询 单表
deploy.get('/users/ID', async (ctx) => {
    let id = ctx.request.query.id
    let json = {
        id: id
    }
    let findJson = () => 
     new Promise((resolve, reject) => {
            try {
                forDemo.query(json, UserModel).then(
                    v => {
                        let user = v;
                        resolve({ code: 0, msg: '获取成功 firstName:' + user.firstName + '       firstName:' + user.lastName });
                    }
                );
            } catch (error) {
                resolve({ code: -1, msg: '获取失败' + error });
            }
     })
    ctx.body = await findJson()
})
//查询 关联表 
deploy.get('/usersAndCompany', async (ctx) => {
    let findJson = () => 
     new Promise((resolve, reject) => {
            try {
                forDemo.queryAssociation(company,user).then(
                    v => {
                        let user = v;
                        resolve({ code: 0, msg: '获取成功 firstName:' + user[0].firstName + '       firstName:' + user[0].lastName });
                    }
                );
            } catch (error) {
                resolve({ code: -1, msg: '获取失败' + error });
            }
        })
    ctx.body = await findJson()
})

//修改
deploy.put('/users/ID', async (ctx) => {
    let json = ctx.request.body
    let writeJson = () => 
        new Promise((resolve, reject) => {
            try {
                forDemo.edit(json, UserModel);
                resolve({ code: 0, msg: '修改成功' });
            } catch (error) {

                resolve({ code: -1, msg: '修改失败' + error })
            }
        })
    // 返回给前端
    ctx.body = await writeJson()
})


// 装载所有子路由
router.use('/deploy', deploy.routes(), deploy.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

//端口号
app.listen(8082);

