import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import STL_URL from "./cf-base.stl";
import Text from "./text";
import { base_position } from "./Canvas";

const scale = 2.4;

const Tower = (props) => {
  return (
    <>
      <mesh position={props.position}>
        <boxGeometry args={[scale * 0.85, props.height, scale * 0.85]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

const BuildTowers = (data) => {
  const kWeeksInYear = 53;
  const kDaysInWeek = 7;

  let towers = [];
  for (let x = 0; x < kWeeksInYear; x++) {
    for (let y = 0; y < kDaysInWeek; y++) {
      const h = data[x][y] * scale;
      const height = Math.log(h * h + 1) * scale;
      const tower = {
        position: [x * scale, height / 2, y * scale],
        height: height
      };
      if (height > 0) {
        towers.push(tower);
      }
    }
  }

  return towers;
};

const CreateCalendar = (data, year) => {
  const WeekInfo = (unixtime) => {
    const date = new Date(unixtime * 1000);
    const first = new Date(date.getFullYear(), 0, 1);

    let days = Math.floor((date - first) / (1000 * 60 * 60 * 24)) + 1;
    const first_weekday = first.getDay() % 7;
    if (first_weekday !== 0) {
      days += first_weekday - 1;
    }
    const week = Math.floor(days / 7);
    const weekday = date.getDay() % 7;
    return [week, weekday]
  }

  const ToDateTime = (unixtime) => {
    const date_time = new Date(unixtime * 1000);
    const y = date_time.getFullYear();
    const m = date_time.getMonth();
    const d = date_time.getDate();
    return new Date(y, m, d);
  }

  const kWeeksInYear = 55;
  const kDaysInWeek = 7;
  let calendar = new Array(kWeeksInYear).fill(0).map(() => new Array(kDaysInWeek).fill(0));

  data.result.forEach(item => {
    const date = ToDateTime(item.creationTimeSeconds);

    if (date.getFullYear() === parseInt(year) && item.verdict === "OK") {
      let [week, weekday] = WeekInfo(item.creationTimeSeconds);
      calendar[week][weekday] += scale;
    }
  });


  return calendar;
}


const Model = (props) => {
  let calendar = CreateCalendar(props.data, props.year);
  const base_geometry = useLoader(STLLoader, STL_URL);
  const ref = useRef();

  const font_size = 5;
  const rotation_angle = (-Math.PI / 180) * 19.5;

  const username_x = -base_position[0];
  const year_x = 120;
  const year_y = -6.5;
  const year_z = 20.9;
  const base_x = -base_position[0];
  const base_y = -base_position[1];
  const base_z = -base_position[2];

  const towers = BuildTowers(calendar);
  return (
    <>
      <mesh ref={ref} position={[base_x, base_y, base_z]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={base_geometry}
      >
        <meshNormalMaterial />
      </mesh>
      {towers.map((tower, index) => (
        <Tower key={index} position={tower.position} height={tower.height} />
      ))}
      <Text text={props.year} size={font_size}
        x={year_x}
        y={year_y}
        z={year_z}
        rotationX={rotation_angle}
      />
      <Text text={props.username} size={font_size}
        x={username_x}
        y={year_y}
        z={year_z}
        rotationX={rotation_angle}
      />
    </>
  );
};

export default Model;