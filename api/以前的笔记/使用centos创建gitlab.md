##CentOS6.5下创建gitlab

>	分享链接：http://pan.baidu.com/s/1kT0z2V9

*	使用虚拟机或者使用独立主机安装好centos之后，需要你配置好你的网络环境和ip

###安装需要提供：

	*	CentOS 6.5
	*	Gitlab 7.1.1_omnibus

第一步：

>	开始安装

```
sudo yum install openssh-server
sudo yum install postfix
sudo rpm -i gitlab-7.1.1_omnibus-1.el6.x86_64.rpm
```

此外这里需要安装一个从windows获取文件到centOS的命令

```
$> yum install lrzsz
$> sz	//这样使用就可以看到文件选择框
```

>	修改访问host

```
sudo -e /etc/gitlab/gitlab.rb
```

可以修改成这样：

```
external_url "https://git.bobserverstation.com"
```

安装并启动gitlab

```
sudo gitlab-ctl reconfigure
sudo lokkit -s http -s ssh
```

不出意外访问刚才填入的host或ip应该能访问gitlab了
默认用户名root，密码5iveL!fe