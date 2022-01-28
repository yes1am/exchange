import React, { Component } from 'react'
import { Input, message, Row, Col, Button, Card } from 'antd';
import './index.less'

const { TextArea } = Input;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicKey: '',
            privateKey: '',
            // 想发的消息
            sendMessage: '',
            // 【加密后的】想发的消息
            sendMessageEncrypt: '',
            // 收到的消息
            receiveMessage: '',
            // 【解密后的】收到的消息
            receiveMessageDecrypt: '',
            // 对方的公钥
            otherPublicKey: ''
        };
        this.encryptSendMessage = this.encryptSendMessage.bind(this)
        this.decryptReceiveMessage = this.decryptReceiveMessage.bind(this)
        this.handleOtherPublicKeyChange = this.handleOtherPublicKeyChange.bind(this)
    }
    componentDidMount() {
        const publicKey = localStorage.getItem('publicKey');
        const privateKey = localStorage.getItem('privateKey');
        const otherPublicKey = localStorage.getItem('otherPublicKey');
        if (otherPublicKey) {
            this.setState({
                otherPublicKey
            })
        }
        if (privateKey && publicKey) {
            this.setState({
                publicKey,
                privateKey
            })
        } else {
            this.getKeys()
        }
    }
    getKeys() {
        fetch('/api/tokens')
            .then(response => response.json())
            .then(({ err, publicKey, privateKey }) => {
                if (err) {
                    message.error(`生成公私钥失败: ${err}`);
                } else {
                    localStorage.setItem('publicKey', publicKey)
                    localStorage.setItem('privateKey', privateKey)
                    this.setState({
                        publicKey,
                        privateKey
                    })
                }
            });
    }
    encryptSendMessage() {
        const { otherPublicKey, sendMessage } = this.state;
        fetch('/api/tokens/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: otherPublicKey,
                data: sendMessage
            })
        })
            .then(response => response.json())
            .then(({ err, data }) => {
                if (err) {
                    message.error(`加密消息失败: ${err}`);
                } else {
                    this.setState({
                        sendMessageEncrypt: data
                    })
                }
            });
    }
    // 解密
    decryptReceiveMessage() {
        const { receiveMessage, privateKey } = this.state;
        fetch('/api/tokens/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: privateKey,
                data: receiveMessage
            })
        })
            .then(response => response.json())
            .then(({ err, data }) => {
                if (err) {
                    message.error(`解密消息失败: ${err}`);
                } else {
                    this.setState({
                        receiveMessageDecrypt: data
                    })
                }
            });
    }
    handleOtherPublicKeyChange(e) {
        this.setState({
            otherPublicKey: e.target.value
        })
        localStorage.setItem('otherPublicKey', e.target.value)
    }
    render() {
        const { publicKey, privateKey, sendMessage, sendMessageEncrypt, receiveMessage, receiveMessageDecrypt, otherPublicKey } = this.state;
        return <div className='app'>
            <Card className="card" title="公钥私钥">
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='title'>公钥</div>
                        <TextArea placeholder='你当前的公钥' readOnly rows={8} value={publicKey} />
                    </Col>
                    <Col span={12}>
                        <div className='title'>私钥</div>
                        <TextArea placeholder='你当前的私钥' readOnly rows={8} value={privateKey} />
                    </Col>
                </Row>
            </Card>

            <Card className="card" title="发送消息">
                <Row gutter={8}>
                    <Col span={11} className='flexColumn'>
                        <div className='flexColumn flexAuto'>
                            <div className='title'>对方的公钥</div>
                            <TextArea
                                className="flexAuto"
                                placeholder='请输入对方的公钥'
                                onChange={this.handleOtherPublicKeyChange}
                                value={otherPublicKey}
                            />
                        </div>
                        <div className='flexColumn flexAuto'>
                            <div className='title'>想发送的消息</div>
                            <TextArea
                                className="flexAuto"
                                placeholder='请输入要发送的消息'
                                onChange={e => this.setState({ sendMessage: e.target.value })}
                                value={sendMessage}
                            />
                        </div>
                    </Col>
                    <Col span={2} className="button">
                        <Button
                            type="primary"
                            onClick={this.encryptSendMessage}
                            disabled={!sendMessage.length || !otherPublicKey.length}
                        >
                            转换 =&gt;
                        </Button>
                    </Col>
                    <Col span={11}>
                        <div className='title'>加密后的消息</div>
                        <TextArea readOnly rows={12} value={sendMessageEncrypt} />
                    </Col>
                </Row>
            </Card>
            <Card className="card" title="接受消息">
                <Row gutter={8}>
                    <Col span={11}>
                        <div className='title'>接受到的消息</div>
                        <TextArea
                            placeholder='请输入接收到的消息'
                            onChange={e => this.setState({ receiveMessage: e.target.value })}
                            rows={8}
                            value={receiveMessage}
                        />
                    </Col>
                    <Col span={2} className="button">
                        <Button disabled={!receiveMessage.length} type="primary" onClick={this.decryptReceiveMessage}>转换 =&gt; </Button>
                    </Col>
                    <Col span={11}>
                        <div className='title'>解密后的消息</div>
                        <TextArea readOnly rows={8} value={receiveMessageDecrypt} />
                    </Col>
                </Row>
            </Card>
        </div>
    }
}

export default App