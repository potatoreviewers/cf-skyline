from aiohttp import web
from aiohttp import ClientSession

from calendar_parser import CalendarParser

async def user_activity_json(username):
    parser = CalendarParser()

    async with ClientSession() as session:
        async with session.get(f"https://codeforces.com/api/user.info?handles={username}") as response:
            if response.status != 200:
                return None
            
            async with session.get(f"https://codeforces.com/profile/{username}") as response:
                if response.status != 200:
                    return None
                html = await response.text()
                try:
                    return parser.parse_html(html)
                except Exception as e:
                    print(e)
                    return None

async def user_activity_graph(request):
    username = request.query.get('username')
    if not username:
        return web.Response(text="No username specified", status=400)

    data = await user_activity_json(username)
    res = {
        'status': 'ok',
    }

    status_code = 200
    if not data:
        res['status'] = 'error'
        res['message'] = 'Could not find user'
        status_code = 404

    else:
        res['data'] = data

    return web.json_response(res, status=status_code)

def create_app():
    app = web.Application()
    app.add_routes([web.get('/user_activity_graph', user_activity_graph)])
    return app