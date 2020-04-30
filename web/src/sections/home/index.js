import React from 'react';
import { Form, Icon, Input, Button, Modal,Checkbox  } from 'antd';
import request from 'superagent';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UnwrappedHome extends React.Component {
  state = {
    visible: false,
    fitstName: "",
    lastName: "",
    message:"",
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    let _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let {id,agreement} = values;
      if (!err) {
        console.log('Received values of form: ', values);
        if(agreement){
          request.del('http://127.0.0.1:80/demo/users/' + id)
          .then(function (res) {
            let {message} = res.body;
            _this.setState({
              visible: true,
              message,
              firstName:"",
              lastName:""
            });
            // res.body, res.headers, res.status
          }).catch(function (err) {
            _this.setState({
              visible: true,
              message:"查无此人",
            })
          });
        }else{
          request.get('http://127.0.0.1:80/demo/users/' + id)
          .then(function (res) {
            let {firstName,lastName} = res.body[0];

            _this.setState({
              visible: true,
              firstName,
              lastName
            });
            // res.body, res.headers, res.status
          }).catch(function (err) {
            _this.setState({
              visible: true,
              message:"查无此人",
            })
          });
        }
       
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const usernameError = isFieldTouched('id') && getFieldError('id');

    return (
      <div  style = {{padding:"25px"}}>
        <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
          <Form.Item label="id"  validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: 'Please input your id!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="id"
              />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                i want to delete
              </Checkbox>,
            )}
        </Form.Item >
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Submit
          </Button>
          </Form.Item>
        </Form>
        <Modal
          title="查询返回的信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.firstName?<p>firstName:{this.state.firstName}</p>:<div></div>}
          {this.state.lastName?<p>lastName:{this.state.lastName}</p>:<div></div>}
          {this.state.message?<p>message:{this.state.message}</p>:<div></div>}
        </Modal>
      </div>
    );
  }
}
const Home = Form.create({ name: 'horizontal_login' })(UnwrappedHome);

export default Home;
// export default connect(({counter}) => counter, dispatch => ({
//     increment: () => {
//         dispatch(increment())
//     },
//     decrement: () => {
//         dispatch(decrement())
//     },
//     reset: () => {
//         dispatch(reset())
//     }
// }))(Home);