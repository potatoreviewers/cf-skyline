# Calendar parser

Module parses user activity graph from [codeforces](https://codeforces.com/) and returns it in json format

![image](https://user-images.githubusercontent.com/51270744/181876788-35a98a44-2ea6-4e08-833d-574385864632.png)

## API endpoint 
`/user_activity_graph`

username parameter is required

**Example** 

request: `/user_activity_graph?username=muratmurat`

response: 
```json
{
                    "2022-03-17": {
                        "items": [
                            2
                        ]
                    }, 
                    "2022-03-16": {
                        "items": [
                            2
                        ]
                    }, 
                    "2022-03-19": {
                        "items": [
                            2
                        ]
                    },                     
                    ...
}
```
