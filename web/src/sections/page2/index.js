import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import request from 'superagent';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UnwrappedPage2 extends React.Component {
  state = {
    visible: false,
    fitstName: "",
    lastName: ""
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
      message:""
    });
  };

  handleSubmit = e => {
    let _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let {id,firstName,lastName} = values;
      if (!err) {
        console.log('Received values of form: ', values);
        request.put('http://127.0.0.1:80/demo/users/' + id)
            .send({firstName,lastName})
          .then(function (res) {
            _this.setState({
              visible: true,
              message:res.body.message
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

    const usernameError = isFieldTouched('id') && getFieldError('id');
    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');

    return (
      <div style = {{padding:"25px"}}>
        <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
          <Form.Item label="id" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: 'Please input your id!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="id"
              />,
            )}
          </Form.Item>
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
          <Form.Item label="lastName" validateStatus={lastNameError ? 'error' : ''} help={lastNameError || ''}>
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
          title="查询返回的信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>message:{this.state.message}</p>
        </Modal>
      </div>
    );
  }
}
const Page2 = Form.create({ name: 'horizontal_login' })(UnwrappedPage2);

export default Page2;
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
// }))(Page2);