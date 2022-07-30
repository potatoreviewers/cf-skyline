from aiohttp import web
from aiohttp import ClientSession

from calendar_parser import CalendarParser

async def user_activity_graph(request):
    username = request.query.get('username')
    if not username:
        return web.Response(text="No username specified")

    base_url = "https://codeforces.com"

    parser = CalendarParser()

    async with ClientSession() as session:
        async with session.get(f"{base_url}/api/user.info?handles={username}") as response:
            if response.status != 200:
                return web.Response(text="Error: Could not find user")
            
            async with session.get(f"{base_url}/profile/{username}") as response:
                if response.status != 200:
                    return web.Response(text="Error: Could not find user")
                html = await response.text()
                json_string = parser.parse_html(html)
                return web.Response(text=json_string, content_type="application/json")

def create_app():
    app = web.Application()
    app.add_routes([web.get('/user_activity_graph', user_activity_graph)])
    return app