import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from 'actions/counter';
import { Form,Button,Input,Icon } from 'antd';

class UnwrappedCounter extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
      }
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
          const { getFieldDecorator,getFieldValue } = this.props.form;
          const {dispatch} = this.props;
        function toAdd(){
            let id = getFieldValue("id");
            dispatch(increment(id))
        } 
        function toDel(){
            let id = getFieldValue("id");
            dispatch(decrement(id))
        }
          
        return (
            <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
                <Form.Item {...tailFormItemLayout}>
                    <div style = {{padding:"25px"}}>
        <div>当前数组为{[...this.props.counter.counter.count]}</div>
                    </div>
                </Form.Item>
                <Form.Item label="id"  >
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
                    <Button onClick={toAdd}>自增
                    </Button>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button onClick={toDel}>自减
                    </Button>
                </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button onClick={() => this.props.reset()}>重置
                    </Button>
                </Form.Item>
            </Form>
            
        )
    }
}
const Counter = Form.create({ name: 'horizontal_login' })(UnwrappedCounter);

function mapStateToProps(state) {
    return {
        counter: state
    };
}

export default connect(mapStateToProps)(Counter);

// export default connect(({counter}) => counter, dispatch => ({
//     increment: (id) => {
//         debugger
//         dispatch(increment(id))
//     },
//     decrement: (id) => {
//         debugger
//         dispatch(decrement(id))
//     },
//     reset: () => {
//         dispatch(reset())
//     }
// }))(Counter);