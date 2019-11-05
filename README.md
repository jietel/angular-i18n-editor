
# angular-i18n-editor

可视化编辑i18n多语言翻译
Manage i18n translation of angular with web visualization


以一个默认语言为基础，可以切换各个语言输入翻译。这样部署后把它交给翻译人员可以节省开发人员大量时间！

#### 使用说明

1. 克隆代码命令行进入angular-i18n-editor目录
2. 执行npm install
3. 输入npm run start
4. 浏览器访问localhost:8106即可输入多国语言翻译

#### 注意事项

1. 在src/main.js文件里可以修改默认语言或默认语言目录：

```
var langPath = './i18n/';
var baseLang = 'zh';
```
2. 将需要翻译的主语言文件，比如zh.json复制到./i18n/目录下，然后建立各国语言相应的json文件即可在页面中刷新输入。

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
