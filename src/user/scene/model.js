
const scale = 2;

const Tower = (props) => {
  return (
    <>
      <mesh position={props.position}>
        <boxGeometry args={[scale * 0.8, props.height, scale * 0.8]} />
        {/* <meshBasicMaterial attach="material" color="white" /> */}
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

    if (date.getFullYear() === parseInt(year)) {
      let [week, weekday] = WeekInfo(item.creationTimeSeconds);
      calendar[week][weekday] += scale;
    }
  });


  return calendar;
}


const Model = (props) => {
  let calendar = CreateCalendar(props.data, props.year);

  const towers = BuildTowers(calendar);
  return (
    <>
      {towers.map((tower, index) => (
        <Tower key={index} position={tower.position} height={tower.height} />
      ))}
    </>
  );
};

export default Model;