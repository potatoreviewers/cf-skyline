# Calendar parser

Parser that fetches user activity from Codeforces and converts it to JSON format

![image](https://user-images.githubusercontent.com/51270744/181876788-35a98a44-2ea6-4e08-833d-574385864632.png)


# About parser class
This module provides the class `cf_skyline.CalendarParser` that has the following methods:


## CalendarParser.parse_html

`parse_html(self, html)` 
Takes an HTML string as an argument and returns a dictionary that maps user activity integer to each day represented as string


## CalendarParser.user_activity_json

`user_activity_dict(self, username)`
This method sends GET request to CodeForces to get HTML for the username specified in the method's argument and returns a parsed dictionary
