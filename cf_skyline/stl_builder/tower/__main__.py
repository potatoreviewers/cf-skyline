import asyncio
import datetime as dt
from .builder import TowerBuilder
from configargparse import ArgumentParser
from cf_skyline.parser import CalendarParser

calendar_parser = CalendarParser()
argument_parser = ArgumentParser()

argument_parser.add_argument('--username', '-u', help='codeforces username', default='tourist')
argument_parser.add_argument('--output', '-o', help='output file', default='output.stl')
argument_parser.add_argument('--year', '-y', help='year', default=dt.datetime.now().year)

async def main():
    args = argument_parser.parse_args()
    username = args.username
    output_file = args.output
    year = args.year

    builder = TowerBuilder(username, year=year)
    data = await CalendarParser.user_activity_dict(username)
    builder.build(data, output_file=f"{username}-{year}.stl")

if __name__ == '__main__':
    asyncio.run(main())
