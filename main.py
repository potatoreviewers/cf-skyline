from cf_skyline.app import create_app 
from aiohttp.web import run_app

def main():
    app = create_app()
    run_app(app, port=8081)

if __name__ == '__main__':
    main()