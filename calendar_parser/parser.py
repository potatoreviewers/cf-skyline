from requests import get

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

        script = html[open_bracket_id:close_bracket_id + 1]

        return script
