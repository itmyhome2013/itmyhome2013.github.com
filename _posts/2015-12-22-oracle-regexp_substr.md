---
layout: post
blog_id: "oracle-regexp_substr"
title: "Oracle的REGEXP_SUBSTR函数简单用法"
date: 2015-12-22 00:00:00 -0700
tags: Oracle
category: Oracle
summary: REGEXP_SUBSTR延伸SUBSTR函数的功能，让你搜索一个正则表达式模式字符串。
comments: false
---
</br>
REGEXP_SUBSTR延伸SUBSTR函数的功能，让你搜索一个正则表达式模式字符串。

这也类似于REGEXP_INSTR，而是返回子字符串的位置，它返回的子字符串本身。

###语法

Oracle数据库中的REGEXP_SUBSTR函数的语法是：

```sql
REGEXP_SUBSTR(source_char, pattern [, position [, occurrence [, match_parameter ]]])
```

###参数

#### *source_char*

搜索字符串。可以是任意的数据类型char，VARCHAR2，nchar，CLOB，NCLOB类型

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

#### *position*

可选。搜索在字符串中的开始位置。如果省略，默认为1，这是第一个位置的字符串。

#### *occurrence*

可选。它是模式字符串中的第n个匹配位置。如果省略，默认为1。

#### *match_parameter*

可选。它允许你修改regexp_substr功能匹配的行为。它可以是以下的组合：

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

#### Examples

找出匹配的数字

```sql
SELECT REGEXP_SUBSTR ('hello my phone is 520 ', '[0-9]+') FROM dual; --520
```

下面这个例子返回指定第三次出现的字符

```sql
SELECT REGEXP_SUBSTR ('i like beijing tiananmen', '(\S*)(\s)', 1, 3)
FROM dual;    --beijing
```

</br>