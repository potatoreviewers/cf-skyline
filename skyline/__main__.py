import json
import skyline.drawer as drawer

def main():
    with open('data.json', 'r') as f:
        json_data = json.load(f)
        data = json_data['data']

    drawer.draw_skyline(data)
    # for day in data:
    #     print(day, data[day], drawer.coordinates(day))


if __name__ == "__main__":
    main()