---
layout: post
title: "test markdown"
date: 2015-01-02 16:25:06 -0700
comments: false
---
##MaHua是什么?
一个在线编辑markdown文档的编辑器

向Mac下优秀的markdown编辑器mou致敬

##MaHua有哪些功能？

* 方便的`导入导出`功能
    *  直接把一个markdown的文本文件拖放到当前这个页面就可以了
    *  导出为一个html格式的文件，样式一点也不会丢失
* 编辑和预览`同步滚动`，所见即所得（右上角设置）
* `VIM快捷键`支持，方便vim党们快速的操作 （右上角设置）
* 强大的`自定义CSS`功能，方便定制自己的展示
* 有数量也有质量的`主题`,编辑器和预览区域
* 完美兼容`Github`的markdown语法
* 预览区域`代码高亮`
* 所有选项自动记忆

##有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(dev.hubo#gmail.com, 把#换成@)
* QQ: 287759234
* weibo: [@草依山](http://weibo.com/ihubo)
* twitter: [@ihubo](http://twitter.com/ihubo)

##捐助开发者
在兴趣的驱动下,写一个`免费`的东西，有欣喜，也还有汗水，希望你喜欢我的作品，同时也能支持一下。
当然，有钱捧个钱场（右上角的爱心标志，支持支付宝和PayPal捐助），没钱捧个人场，谢谢各位。

##感激
感谢以下的项目,排名不分先后

* [mou](http://mouapp.com/) 
* [ace](http://ace.ajax.org/)
* [jquery](http://jquery.com)

##关于作者

```javascript
  var ihubo = {
    nickName  : "草依山hh",
    site : "http://jser.me"
  }
```
{% highlight ruby linenos %}
@Autowired
private IGridEventService eventService;
@Autowired
private IEventTypeService eventTypeService;
{% endhighlight %}
```java
/**
 * save 或 saveAgent 页面init
 * 
 * @return
 */
public String saveInit() {
	String forwordPage = null;
	try {
		String pageTypeFlag = this.getRequest()
				.getParameter("pageTypeFlag");// 登记人还是上报人
		if (StringUtils.isEmpty(pageTypeFlag)) {// 自报情况
			forwordPage = "saveInit";
		} else {// 代理上报情况
			forwordPage = pageTypeFlag;
		}
		this.getRequest().setAttribute("pageTypeFlag", pageTypeFlag);// 响应请求后的页面标识
		this.getRequest().setAttribute("pageFlag", pageFlag);

		String uuid = UUID.randomUUID().toString().trim()
				.replaceAll("-", "");
		ServletActionContext.getRequest().getSession()
				.setAttribute("uuid", uuid);
		event.setTempEventId(uuid);
		event.setEventCode(this.eventCodeService.eventCodeValue("HD",
				"QLQ", "01", "01A"));
		eventTypeList = eventTypeService.getByLevelNumAndParentId("-1");

		Organization org = null;
		User user = this.getCurrentUser();
		// 供网格巡查员自己上报显示初始化上报信息
		this.getRequest().setAttribute("loginName", user.getLoginName());
		this.getRequest().setAttribute("jobTitle", user.getJobTitle());
		this.getRequest().setAttribute("userName", user.getUserName());

		org = OrgUtils.getRootDept(user);

		String types = org.getTypes();
		if (gridOrgList == null) {
			gridOrgList = new ArrayList();
		}
		if (eventBelong == null) {
			eventBelong = new ArrayList();
		}
		// 所属社区
		GridEvent tempGridEvent = null;
		if ("0013".equals(types)) {// 当前用户所在的机构是社区
			tempGridEvent = new GridEvent();
			tempGridEvent.setOrgId(org.getOrganizationId() + "");
			tempGridEvent.setOrgName(org.getName());
			tempGridEvent.setOrgCode(org.getOrgCode());
			eventBelong.add(tempGridEvent);
		} else if ("0002".equals(types)) {// 当前用户所在的机构是街道
			List<Organization> communityList = OrgUtils
					.getSubOrganizationsCommunityByOrgTypes(user);
			if (communityList != null && communityList.size() > 0) {
				GridEvent noValoption = new GridEvent();
				noValoption.setOrgId("");
				noValoption.setOrgName("请选择");
				eventBelong.add(noValoption);
				for (int i = 0; i < communityList.size(); i++) {
					Organization tempOrganization = communityList.get(i);
					tempGridEvent = new GridEvent();
					tempGridEvent.setOrgId(tempOrganization
							.getOrganizationId() + "");
					tempGridEvent.setOrgName(tempOrganization.getName());
					tempGridEvent.setOrgCode(tempOrganization.getOrgCode());
					eventBelong.add(tempGridEvent);
				}
			}
		}

		List<Organization> list = null;
		if (StringUtils.isEmpty(pageTypeFlag)) {// 网格巡查员上报
			list = OrgUtils.getUserOrgByLevelAndTypes(this.getCurrentUser()
					.getUserId(), 5, "0018");
		} else {// 社区信息员替巡查员上报
			list = OrgUtils.getChildrenRecursiveOrgByOrgId_SQL(
					org.getOrganizationId(), 5, "0018");
		}
		// 登记人信息-网格单元
		if (StringUtils.isNotEmpty(types) && list != null
				&& list.size() > 0) {
			if (list.size() > 0) {
				UserOrgJobTitle tempBean = null;
				for (int i = 0; i < list.size(); i++) {
					tempBean = new UserOrgJobTitle();
					Organization tempOrganization = list.get(i);
					String orgName = tempOrganization.getName();
					tempBean.setOrgName(orgName);// 机构名称
					tempBean.setGridOrgid(tempOrganization
							.getOrganizationId() + "");// 单员编号
					tempBean.setOrgCode(tempOrganization.getOrgCode());
					gridOrgList.add(tempBean);
				}
			}
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return forwordPage;
}
```