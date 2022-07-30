# Calendar parser

Module parses user activity graph from [codeforces](https://codeforces.com/) and returns it in json format

![image](https://user-images.githubusercontent.com/51270744/181876788-35a98a44-2ea6-4e08-833d-574385864632.png)

## API endpoint 
`/user_activity_graph`

username parameter is required

### Example

request: `/user_activity_graph?username=muratmurat`

response: 
```json
{
    "status": "ok",
    "data": {
        "2022-03-17": 2,
        "2022-03-16": 2,
        "2022-03-19": 2,
            ...
        "2020-02-06": 3,
        "2022-05-10": 4,
        "2022-05-11": 2
    }
}
```

## Code

* `parser.py` - implementation of CalendarParser class that handles the parsing of html string in the method `parse_html(self, html)`

```python
from calendar_parser import CalendarParser

parser = CalendarParser()
with open("index.html") as html:
    data = parser.parse_html(html.read())
```

* `app.py` contains a simple aiohttp web app and the method `user_activity_json(username)` fetches user info from codeforces

```python
from aiohttp.web import run_app
from calendar_parser.app import create_app

app = create_app()
run_app(app)
```

* `__main__.py` runs web app on port 8080

```
$ python -m calendar_parser
======== Running on http://0.0.0.0:8080 ========
(Press CTRL+C to quit)
```