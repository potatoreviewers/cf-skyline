import asyncio

from aiohttp.web import run_app
from calendar_parser.app import create_app

def main():
    app = create_app()
    run_app(app)

if __name__ == '__main__':
    main()
