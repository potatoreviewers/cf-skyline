import json
import datetime as dt
from urllib import request
from bs4 import BeautifulSoup
from aiohttp import ClientSession

class CalendarParser:
    def __init__(self):
        pass

    def __find_matching_bracket(self, html, open_bracket_id):
        bracket_count = 1
        for i in range(open_bracket_id + 1, len(html)):
            if html[i] == "{":
                bracket_count += 1
            elif html[i] == "}":
                bracket_count -= 1
            if bracket_count == 0:
                return i
        return -1

            
    def parse_html(self, html):
        s = "data: {"
        id = html.find(s)
        open_bracket_id = id + len(s) - 1

        if html[open_bracket_id] != "{":
            raise Exception("Error: HTML parsing failed")

        close_bracket_id = self.__find_matching_bracket(html, open_bracket_id)

        if close_bracket_id == -1:
            raise Exception("Error: Could not find closing bracket")

        data = json.loads(html[open_bracket_id:close_bracket_id + 1].replace("items", "\"items\""))
        for day in data:
            data[day] = data[day]['items'][0]

        return data

    def __unix_time_to_date(self, unix_time):
        format = "%Y-%m-%d"
        return dt.datetime.fromtimestamp(unix_time).strftime(format)

    async def user_activity_dict(username):
        parser = CalendarParser()

        async with ClientSession() as session:
            async with session.get(f"https://codeforces.com/api/user.info?handles={username}") as response:
                if response.status != 200:
                    return None
            
            async with session.get(f"https://codeforces.com/api/user.status?handle={username}") as response:
                if response.status != 200:
                    return None

                data = await response.json()
                res = {}

                for sub in data['result']:
                    unix_time = sub['creationTimeSeconds']
                    date_str = parser.__unix_time_to_date(unix_time)
                    if date_str not in res:
                        res[date_str] = 1
                    else:
                        res[date_str] += 1

                return res
