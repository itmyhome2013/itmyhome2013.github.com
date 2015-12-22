---
layout: post
blog_id: "oracle-regexp_replace"
title: "Oracle的REGEXP_REPLACE函数简单用法"
date: 2015-12-21 00:00:00 -0700
tags: Oracle
category: Oracle
summary: REGEXP_REPLACE让你搜索的字符串的正则表达式模式REPLACE函数的功能
comments: false
---
</br>
REGEXP_REPLACE让你搜索的字符串的正则表达式模式REPLACE函数的功能。默认情况下，

该函数返回source_char与replace_string取代了正则表达式模式的每个实例。

返回的字符串是在相同的字符集source_char。

### 语法

Oracle数据库中的REGEXP_REPLACE函数的语法是：

```sql
REGEXP_REPLACE(source_char, pattern [, replace_string [, position [, occurrence [, match_parameter ] ] ] ] )
```

### 参数

#### *source_char*

搜索值的字符表达式。这通常是一个字符列，可以是任何数据类型CHAR，VARCHAR2，NCHAR，NVARCHAR2，CLOB或NCLOB。

#### *pattern*

正则表达式

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>Value</td> 
     <td>Description</td> 
    </tr> 
    <tr> 
     <td>^</td> 
     <td>Matches the beginning of a string. If used with a <em>match_parameter</em> of 'm', it matches the start of a line anywhere within <em>expression</em>.</td> 
    </tr> 
    <tr> 
     <td>$</td> 
     <td>Matches the end of a string. If used with a <em>match_parameter</em> of 'm', it matches the end of a line anywhere within <em>expression</em>.</td> 
    </tr> 
    <tr> 
     <td>*</td> 
     <td>匹配零个或多个.</td> 
    </tr> 
    <tr> 
     <td>+</td> 
     <td>匹配一个或多个出现.</td> 
    </tr> 
    <tr> 
     <td>?</td> 
     <td>匹配零次或一次出现.</td> 
    </tr> 
    <tr> 
     <td>.</td> 
     <td>匹配任何字符，除了空.</td> 
    </tr> 
    <tr> 
     <td>|</td> 
     <td>Used like an &quot;OR&quot; to specify more than one alternative.</td> 
    </tr> 
    <tr> 
     <td>[ ]</td> 
     <td>Used to specify a matching list where you are trying to match any one of the characters in the list.</td> 
    </tr> 
    <tr> 
     <td>[^ ]</td> 
     <td>Used to specify a nonmatching list where you are trying to match any character except for the ones in the list.</td> 
    </tr> 
    <tr> 
     <td>( )</td> 
     <td>Used to group expressions as a subexpression.</td> 
    </tr> 
    <tr> 
     <td>{m}</td> 
     <td>Matches m times.</td> 
    </tr> 
    <tr> 
     <td>{m,}</td> 
     <td>Matches at least m times.</td> 
    </tr> 
    <tr> 
     <td>{m,n}</td> 
     <td>Matches at least m times, but no more than n times.</td> 
    </tr> 
    <tr> 
     <td>\n</td> 
     <td>n is a number between 1 and 9. Matches the nth subexpression found within ( ) before encountering \n.</td> 
    </tr> 
    <tr> 
     <td>[..]</td> 
     <td>Matches one collation element that can be more than one character.</td> 
    </tr> 
    <tr> 
     <td>[::]</td> 
     <td>Matches character classes.</td> 
    </tr> 
    <tr> 
     <td>[==]</td> 
     <td>Matches equivalence classes.</td> 
    </tr> 
    <tr> 
     <td>\d</td> 
     <td>匹配一个数字字符.</td> 
    </tr> 
    <tr> 
     <td>\D</td> 
     <td>匹配一个非数字字符.</td> 
    </tr> 
    <tr> 
     <td>\w</td> 
     <td>匹配包括下划线的任何单词字符.</td> 
    </tr> 
    <tr> 
     <td>\W</td> 
     <td>匹配任何非单词字符.</td> 
    </tr> 
    <tr> 
     <td>\s</td> 
     <td>匹配任何空白字符，包括空格、制表符、换页符等等.</td> 
    </tr> 
    <tr> 
     <td>\S</td> 
     <td>匹配任何非空白字符.</td> 
    </tr> 
    <tr> 
     <td>\A</td> 
     <td>Matches the beginning of a string or matches at the end of a string before a newline character.</td> 
    </tr> 
    <tr> 
     <td>\Z</td> 
     <td>Matches at the end of a string.</td> 
    </tr> 
    <tr> 
     <td>*?</td> 
     <td>Matches the preceding pattern zero or more occurrences.</td> 
    </tr> 
    <tr> 
     <td>+?</td> 
     <td>Matches the preceding pattern one or more occurrences.</td> 
    </tr> 
    <tr> 
     <td>??</td> 
     <td>Matches the preceding pattern zero or one occurrence.</td> 
    </tr> 
    <tr> 
     <td>{n}?</td> 
     <td>Matches the preceding pattern n times.</td> 
    </tr> 
    <tr> 
     <td>{n,}?</td> 
     <td>Matches the preceding pattern at least n times.</td> 
    </tr> 
    <tr> 
     <td>{n,m}?</td> 
     <td>Matches the preceding pattern at least n times, but not more than m times.</td> 
    </tr> 
</table>

#### *replace_string*

可选。匹配的模式将被替换replace_string字符串。如果省略replace_string参数，

将删除所有匹配的模式，并返回结果字符串。

#### *position*

可选。在字符串中的开始位置搜索。如果省略，则默认为1。

#### *occurrence*
可选。是一个非负整数默认为1，指示替换操作的发生：

如果指定0，那么所有出现将被替换字符串。

如果指定了正整数n，那么将替换第n次出现。

#### *match_parameter*

可选。它允许你修改REGEXP_REPLACE功能匹配的行为。它可以是以下的组合：

<table class="table table-bordered table-striped table-condensed">
    <tr>
      <td>Value</td>
      <td>Description</td>
    </tr>
    <tr>
      <td>'c'</td>
      <td>区分大小写的匹配.</td>
    </tr>
    <tr>
      <td>'i'</td>
      <td>不区分大小写的匹配.</td>
    </tr>
    <tr>
      <td>'n'</td>
      <td>Allows the period character (.) to match the newline character. By default, the period is a wildcard.</td>
    </tr>
    <tr>
      <td>'m'</td>
      <td><em>expression</em> is assumed to have multiple lines, where ^ is the start of a line and $ is the end of a line, regardless of the position of those characters in <em>expression</em>. By default, <em>expression</em> is assumed to be a single line.</td>
    </tr>
    <tr>
      <td>'x'</td>
      <td>Whitespace characters are ignored. By default, whitespace characters are matched like any other character.</td>
    </tr>
</table>

#### EXAMPLE - 匹配第一个字

让我们开始使用REGEXP_REPLACE函数替换字符串中的第一个字。

For example:

```sql
SELECT REGEXP_REPLACE ('itmyhome is my network id', '^(\S*)', 'luck')
FROM dual;

Result: luck is my network id
```

这个例子会返回"luck is my network id"，

因为它会再字符串的开始找到第一个匹配的字符，然后替换为"luck"

#### EXAMPLE - 匹配数字字符

我们将使用REGEXP_REPLACE函数来匹配单个数字字符模式。

For example:

```sql
SELECT REGEXP_REPLACE ('2, 5, and 10 are numbers in this example', '\d', '#')
FROM dual;

Result: '#, #, and ## are numbers in this example'
```

此示例将所指定的`\d`数字将以#字符替换

我们可以改变我们的正则模式来搜索仅两位数字。

For example:

```sql
SELECT REGEXP_REPLACE ('2, 5, and 10 are numbers in this example', '(\d)(\d)', '#')
FROM dual;

Result: '2, 5, and # are numbers in this example'
```

这个例子将替换具有两个数字并排指定的`(\d)(\d)`模式。在这种情况下，它将跳过2和5个数字值和用#字符替换10。

</br>