# Calendar parser

Parser that fetches user activity from codeforces and converts it to json format

![image](https://user-images.githubusercontent.com/51270744/181876788-35a98a44-2ea6-4e08-833d-574385864632.png)


# About parser class
This module provides class `cf_skyline.CalendarParser` that has following methods:


## parse_html

Takes html string as an argument and returns dictionary that maps user activity integer to each day represented as string


## user_activity_json

This method sends GET request to codeforces to get html for username specified in method's argument