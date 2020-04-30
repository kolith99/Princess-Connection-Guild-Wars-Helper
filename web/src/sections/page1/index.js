import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import request from 'superagent';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UnwrappedPage1 extends React.Component {
  state = {
    visible: false,
    id:"",
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
      let {firstName,lastName} = values;
      if (!err) {
        console.log('Received values of form: ', values);
        request.post('http://127.0.0.1:80/demo/users')
          .send({firstName,lastName})
          .then(function (res) {
              let {id} = res.body;
            _this.setState({
              visible: true,
              id
            });
            // res.body, res.headers, res.status
          }).catch(function (err) {
            // err.message, err.response
          });
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

    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');

    return (
      <div style = {{padding:"25px"}}>
        <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
          <Form.Item label="firstName" validateStatus={firstNameError ? 'error' : ''} help={firstNameError || ''}>
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your firstName!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="firstName"
              />,
            )}
          </Form.Item>
          <Form.Item label="lastName"  validateStatus={lastNameError ? 'error' : ''} help={lastNameError || ''}>
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your lastName!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="lastName"
              />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Submit
          </Button>
          </Form.Item>
        </Form>
        <Modal
          title="查询返回信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>当前新增条目的id为：{this.state.id}</p>
        </Modal>
      </div>
    );
  }
}
const Page1 = Form.create({ name: 'horizontal_login' })(UnwrappedPage1);

export default Page1;
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