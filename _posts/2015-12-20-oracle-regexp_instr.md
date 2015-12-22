---
layout: post
blog_id: "oracle-regexp_instr"
title: "Oracle的REGEXP_INSTR函数简单用法"
date: 2015-12-20 00:00:00 -0700
tags: Oracle
category: Oracle
summary: REGEXP_INSTR函数让你搜索一个正则表达式模式字符串,它返回一个整数，指示开始或结束匹配的子位置。
comments: false
---
</br>
REGEXP_INSTR函数让你搜索一个正则表达式模式字符串。函数使用输入字符集定义的字符进行字符串的计算。

它返回一个整数，指示开始或结束匹配的子位置，这取决于return_option参数的值。如果没有找到匹配，则函数返回0。

###语法

Oracle数据库中的REGEXP_INSTR函数的语法是：

```sql
REGEXP_INSTR (source_char, pattern [, position [, occurrence [, return_option [, match_parameter ] ] ]  ] )
```

###参数

#### *source_char*

搜索值的字符表达式，可以是任何数据类型CHAR，VARCHAR2，NCHAR，NVARCHAR2，CLOB或NCLOB的。

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

可选。搜索在字符串中的开始位置。如果省略，则默认为1，这是字符串中的第一个位置。

#### *occurrence*

可选。它是模式字符串中的第n个匹配位置。如果省略，默认为1。

#### *return_option*

可选  指定Oracle返回的位置：

如果指定0，那么Oracle将返回出现的第一个字符的位置。这是默认的。

如果指定1，则Oracle返回字符之后发生的位置。

#### *match_parameter*

可选。它允许你修改REGEXP_INSTR功能匹配的行为。它可以是以下的组合：

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


#### Examples 匹配单个字符

下面看一个最简单的情况，找到字符串中的第一个"e"字的位置。

```sql
SELECT REGEXP_INSTR ('hello itmyhome', 'e')
FROM dual; 

-- Result: 2
```

下面这个例子给出一个字符串， "1"为开始位置 "2"是搜索第二个匹配的，"0"是return_option 返回出现的第一个字符位置

"c"是区分大小写 ，所以将返回13

```sql
SELECT REGEXP_INSTR ('my is itMyhome', 'm', 1, 2, 0, 'c')
FROM dual; 

-- Result: 13
```

#### Examples 匹配多个字符

我们将使用REGEXP_INSTR函数来匹配多字符模式。

```sql
SELECT REGEXP_INSTR ('World filled with love', 'with', 1, 1, 0, 'i')
FROM dual;
```

这个例子将字符串中返回'with'的第一次出现,它将匹配一个词组。

我们可以改变搜索的开始位置，以便我们执行搜索从字符串的中间开始。

For example:

```sql
SELECT REGEXP_INSTR ('my name is itmyhome', 'my', 10, 1, 0, 'i')
FROM dual;
```

这个例子将开始搜索"my"在字符串中的位置10。在这种情况下，在搜索之前，它会跳过字符串中的前9个字符。

#### Examples 匹配多个备选

下面的例子,我们将使用 | 模式。该|模式用于像一个"或"指定多个替代方案。

For example:

```sql
SELECT REGEXP_INSTR ('Itmyhome', 'a|i|o|e|u')
FROM dual;

-- Result: 6
```

这个例子将返回6，因为它是搜索的第一个元音(a,i,o,e或u)字符串。由于我们没有指定match_parameter值时，

REGEXP_INSTR函数将执行区分大小写的搜索，这意味着在"Itmyhome"的'I'将不匹配。

</br>