# exchange(信息交换)

基于 RSA 非对称加密算法的信息交换

## 流程说明

![screely-1643342104471](https://user-images.githubusercontent.com/25051945/151484997-bbe86187-6570-457e-aa8d-73f3c80937b6.png)

如上图，假设有用户 A、B
1. 用户 A、B 访问当前网站时，会生成一对公私钥、
2. 如果 B 要发送消息给用户 A，那么就 A 先将自己的**公钥**告诉 B
3. B 得到 A 的公钥之后，填入到**对方的公钥**输入框，同时填写要发送的消息 **Hello Jane**，点击转换，得到**被 A 的公钥加密后的内容**
4. 将**被 A 的公钥加密后的内容**发给用户A，此时用户A可以通过自己的秘钥解开消息 **Hello Jane**

## 开发

```shell
npm install

npm start
```
